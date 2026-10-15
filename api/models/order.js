const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // ✅ fixed typo
    },
    products: [
      {
        name: { type: String, required: true },
        quantity: { type: Number, required: true, min: 1 },
        price: { type: Number, required: true, min: 0 },
        image: { type: String, required: true },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    shippingAddress: {
      name: { type: String, required: true },
      mobileNo: { type: String, required: true },
      houseNo: { type: String, required: true },
      street: { type: String, required: true },
      landmark: { type: String, required: true },
      postalCode: { type: String, required: true },
    },
    paymentMethod: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }, // ✅ adds createdAt + updatedAt automatically
);

module.exports = mongoose.model("Order", orderSchema);
