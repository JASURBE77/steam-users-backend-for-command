const mongoose = require("mongoose");

const userSCHEMA = new mongoose.Schema({
    name: { type: String, required: true },
    surname: { type: String },
    username: { type: String, required: true, unique: true },
    balance: { type: Number, required: true },
    avatar: [{ type: String, required: true }],
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    // 🔹 Reset password uchun maydonlar
    resetCode: { type: String },              // 6 xonali kod
    resetCodeExpire: { type: Date },          // kodning amal qilish muddati
});

module.exports = mongoose.model("UserModel", userSCHEMA);
