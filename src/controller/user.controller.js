const UserModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// 🔹 Middleware: Tokenni tekshiradi
exports.authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "Unauthorized" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, "super_secret_key");
    req.userId = decoded.id;
    req.userData = decoded; // username, name va id saqlanadi
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// 🔹 Admin create user
exports.create = async (req, res) => {
  try {
    const { name, surname, username, balance, avatar, email, password } = req.body;

    if (!name || !surname || !username || balance === undefined || !avatar || !email || !password) {
      return res.status(400).json({ message: "Barcha maydonlar majburiy" });
    }

    const existUser = await UserModel.findOne({ email });
    if (existUser) {
      return res.status(400).json({ message: "Bu email allaqachon mavjud" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      name,
      surname,
      username,
      balance,
      avatar,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(201).json({
      message: "User yaratildi (admin-create)",
      user: newUser,
    });
  } catch (e) {
    return res.status(500).json({ message: "Server xatosi", error: e.message });
  }
};

// 🔹 REGISTER bilan token qaytarish
exports.register = async (req, res) => {
  try {
    const { name, surname, username, email, password } = req.body;

    if (!name || !surname || !username || !email || !password) {
      return res.status(400).json({ message: "Barcha maydonlar majburiy" });
    }

    const existUser = await UserModel.findOne({ email });
    if (existUser) {
      return res.status(400).json({ message: "Bu email allaqachon mavjud" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      name,
      surname,
      username,
      balance: 0,
      avatar: "default.png",
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id, username: newUser.username, name: newUser.name },
      "super_secret_key",
      { expiresIn: "7d" }
    );

    return res.status(201).json({
      message: "Ro‘yxatdan o‘tish muvaffaqiyatli",
      user: newUser,
      token,
    });
  } catch (e) {
    return res.status(500).json({ message: "Server xatosi", error: e.message });
  }
};

// 🔹 LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) return res.status(400).json({ message: "Email yoki parol noto‘g‘ri" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Email yoki parol noto‘g‘ri" });

    const token = jwt.sign(
      { id: user._id, username: user.username, name: user.name },
      "super_secret_key",
      { expiresIn: "7d" }
    );

    return res.status(200).json({ message: "Login muvaffaqiyatli", token, user });
  } catch (e) {
    return res.status(500).json({ message: "Server xatosi", error: e.message });
  }
};

// 🔹 USER CRUD
exports.get = async (req, res) => {
  try {
    const users = await UserModel.find();
    return res.status(200).json({ message: "Barcha userlar olindi", users });
  } catch (e) {
    return res.status(500).json({ message: "Server xatosi", error: e.message });
  }
};

exports.deleted = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await UserModel.findByIdAndDelete(id);
    if (!deletedUser) return res.status(400).json({ message: "User topilmadi" });

    return res.status(200).json({ message: "User o‘chirildi", user: deletedUser });
  } catch (e) {
    return res.status(500).json({ message: "Server xatosi", error: e.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, surname, username, balance, avatar, email } = req.body;

    const user = await UserModel.findById(id);
    if (!user) return res.status(404).json({ message: "User topilmadi" });

    if (name) user.name = name;
    if (surname) user.surname = surname;
    if (username) user.username = username;
    if (balance !== undefined) user.balance = balance;
    if (avatar) user.avatar = avatar;
    if (email) user.email = email;

    await user.save();
    return res.status(200).json({ message: "User muvaffaqiyatli yangilandi", user });
  } catch (e) {
    return res.status(500).json({ message: "Server xatosi", error: e.message });
  }
};

// 🔹 GET PROFILE (token orqali)
exports.getProfile = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId).select("-password");
    if (!user) return res.status(404).json({ message: "User topilmadi" });
    return res.status(200).json({ message: "Profile ma’lumotlari", user });
  } catch (e) {
    return res.status(500).json({ message: "Server xatosi", error: e.message });
  }
};
