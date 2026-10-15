// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },

//   addresses: [
//     {
//       name: String,
//       mobileNo: String,
//       houseNo: String,
//       street: String,
//       landmark: String,
//       city: String,
//       country: String,
//       postalCode: String,
//     },
//   ],
//   orders: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Order",
//     },
//   ],
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// const User = mongoose.model("User", userSchema);

// module.exports = User;

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    addresses: [
      {
        name: String,
        mobileNo: String,
        houseNo: String,
        street: String,
        landmark: String,
        city: String,
        country: String,
        postalCode: String,
      },
    ],
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
  },
  { timestamps: true }, // ✅ replaces createdAt: { default: Date.now }
);

module.exports = mongoose.model("User", userSchema);
