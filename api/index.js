require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dns = require("dns");

const Order = require("./models/order");
const User = require("./models/user");
const authMiddleware = require("./middleware/auth");
const { loginLimiter, registerLimiter } = require("./middleware/rateLimiter");

// ══════════════════════════════════════════════
// ENV VALIDATION
// ══════════════════════════════════════════════
const requiredEnv = ["MONGO_URI", "JWT_SECRET"];
const missing = requiredEnv.filter((k) => !process.env[k]);
if (missing.length) {
  console.error(`❌ Missing env vars: ${missing.join(", ")}`);
  process.exit(1);
}

const app = express();
const PORT = parseInt(process.env.PORT, 10) || 8000;
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

// ══════════════════════════════════════════════
// MIDDLEWARE
// ══════════════════════════════════════════════
dns.setServers(["8.8.8.8", "1.1.1.1"]);

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// ══════════════════════════════════════════════
// DATABASE
// ══════════════════════════════════════════════
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ DB connected"))
  .catch((error) => {
    console.error("❌ DB connection error:", error.message);
    process.exit(1);
  });

// ══════════════════════════════════════════════
// HEALTH CHECK
// ══════════════════════════════════════════════
app.get("/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// ══════════════════════════════════════════════
// AUTH ROUTES (public, rate-limited)
// ══════════════════════════════════════════════

app.post("/register", registerLimiter, async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists. Please login.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
    });

    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    return res.status(201).json({
      success: true,
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        addresses: newUser.addresses,
        orders: newUser.orders,
        createdAt: newUser.createdAt,
      },
    });
  } catch (error) {
    console.error("Register Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

app.post("/login", loginLimiter, async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required" });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    return res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error.message);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

// ══════════════════════════════════════════════
// PROTECTED ROUTES (auth required)
// ══════════════════════════════════════════════

// ─── Addresses ───

app.post("/addresses", authMiddleware, async (req, res) => {
  try {
    const { address } = req.body;
    const userId = req.userId;

    if (!address || typeof address !== "object") {
      return res
        .status(400)
        .json({ success: false, message: "Valid address object is required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    user.addresses.push(address);
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Address created successfully",
      addresses: user.addresses,
    });
  } catch (error) {
    console.error("Add address error:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Error adding address" });
  }
});

app.get("/addresses/:userId", authMiddleware, async (req, res) => {
  try {
    const { userId } = req.params;

    if (userId !== req.userId) {
      return res
        .status(403)
        .json({ success: false, message: "Not authorized" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      addresses: user.addresses || [],
    });
  } catch (error) {
    console.error("Get addresses error:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Error retrieving addresses" });
  }
});

// ─── Orders ───

app.post("/orders", authMiddleware, async (req, res) => {
  try {
    const { cartItems, totalPrice, shippingAddress, paymentMethod } = req.body;
    const userId = req.userId;

    if (!cartItems?.length || !shippingAddress || !paymentMethod) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const products = cartItems.map((item) => ({
      name: item?.name ?? item?.title ?? "Unknown Product",
      quantity: item.quantity,
      price: item.price,
      image: item?.image ?? "",
    }));

    const order = new Order({
      user: userId,
      products,
      totalPrice,
      shippingAddress,
      paymentMethod,
    });

    await order.save();

    user.orders.push(order._id);
    await user.save();

    return res.status(201).json({
      success: true,
      message: "Order created successfully!",
      order,
    });
  } catch (error) {
    console.error("Create order error:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Error creating order" });
  }
});

app.get("/orders/:userId", authMiddleware, async (req, res) => {
  try {
    const { userId } = req.params;

    if (userId !== req.userId) {
      return res
        .status(403)
        .json({ success: false, message: "Not authorized" });
    }

    const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });

    return res.status(200).json({ success: true, orders: orders || [] });
  } catch (error) {
    console.error("Get orders error:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Error retrieving orders" });
  }
});

// ─── Profile ───

app.get("/profile/:userId", authMiddleware, async (req, res) => {
  try {
    const { userId } = req.params;

    if (userId !== req.userId) {
      return res
        .status(403)
        .json({ success: false, message: "Not authorized" });
    }

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Profile error:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Error retrieving profile" });
  }
});

// ─── Delete an address ───
app.delete("/addresses/:addressId", authMiddleware, async (req, res) => {
  try {
    const { addressId } = req.params;
    const userId = req.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const address = user.addresses.id(addressId);
    if (!address) {
      return res
        .status(404)
        .json({ success: false, message: "Address not found" });
    }

    address.deleteOne();
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Address removed",
      addresses: user.addresses,
    });
  } catch (error) {
    console.error("Delete address error:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Error removing address" });
  }
});

// ─── Update an address ───
app.put("/addresses/:addressId", authMiddleware, async (req, res) => {
  try {
    const { addressId } = req.params;
    const userId = req.userId;
    const { address } = req.body;

    if (!address || typeof address !== "object") {
      return res
        .status(400)
        .json({ success: false, message: "Valid address is required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const existing = user.addresses.id(addressId);
    if (!existing) {
      return res
        .status(404)
        .json({ success: false, message: "Address not found" });
    }

    // Only update allowed fields — no arbitrary keys
    const allowed = [
      "name",
      "mobileNo",
      "houseNo",
      "street",
      "landmark",
      "city",
      "country",
      "postalCode",
    ];
    allowed.forEach((key) => {
      if (address[key] !== undefined) {
        existing[key] = address[key];
      }
    });

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Address updated",
      addresses: user.addresses,
    });
  } catch (error) {
    console.error("Update address error:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Error updating address" });
  }
});
// ══════════════════════════════════════════════
// 404 HANDLER (must be AFTER all routes)
// ══════════════════════════════════════════════
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// ══════════════════════════════════════════════
// GLOBAL ERROR HANDLER (must be LAST)
// ══════════════════════════════════════════════
app.use((err, req, res, next) => {
  console.error("💥 Unhandled error:", err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error",
  });
});

// ══════════════════════════════════════════════
// START SERVER
// ══════════════════════════════════════════════
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server started on http://0.0.0.0:${PORT}`);
  console.log(`   Environment: ${process.env.NODE_ENV || "development"}`);
});
