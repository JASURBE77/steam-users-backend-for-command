// const mongoose = require("mongoose");
// const UserModel = require("./user.model");
// const productSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: true,
//     trim: true
//   },

//   description: {
//     type: String,
//     required: true,
//   },

//   price: {
//     type: Number,     // price -> Number bo‘lishi kerak!
//     required: true,
//   },

//   images: {
//     type: [String],   // OLX’da ko‘p rasm bo‘ladi
//     required: true,
//   },

//   category: {
//     type: String,
//     required: true,
//   },

//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },

//  seller: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

//   rating: {
//     type: Number,
//     default: 0
//   }
// });

// module.exports = mongoose.model("Product", productSchema);
const mongoose = require("mongoose");
const UserModel = require("./user.model"); // bu qatorda import qilamiz

const productSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  images: { type: [String], required: true },
  category: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel" }, // ref User modeli
  rating: { type: Number, default: 0 }
});

module.exports = mongoose.model("Product", productSchema);
