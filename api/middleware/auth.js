const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

/**
 * Verifies the Bearer token in the Authorization header.
 * On success: attaches { userId } to req.user and calls next().
 * On failure: responds 401 and stops the request.
 */
const authMiddleware = (req, res, next) => {
  try {
    const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "No token provided. Please log in.",
      });
    }

    const token = header.split(" ")[1];

    const decoded = jwt.verify(token, JWT_SECRET);

    // Attach user id to the request — routes will use req.userId
    req.userId = decoded.id;

    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Session expired. Please log in again.",
      });
    }
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid token.",
      });
    }
    console.error("Auth error:", err.message);
    return res.status(500).json({
      success: false,
      message: "Authentication error.",
    });
  }
};

module.exports = authMiddleware;
