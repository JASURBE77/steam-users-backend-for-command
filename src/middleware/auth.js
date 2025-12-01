
// const jwt = require("jsonwebtoken");

// module.exports = (req, res, next) => {
//     const token = req.headers.authorization?.split(" ")[1]; // Bearer TOKEN

//     if (!token) {
//         return res.status(401).json({ message: "Token kerak (Bearer token)" });
//     }

//     try {
//         const decoded = jwt.verify(token, "super_secret_key"); // Secret controller bilan bir xil bo‘lishi kerak
//         req.user = decoded; // { id: USER_ID }
//         next();
//     } catch (err) {
//         return res.status(401).json({ message: "Token noto‘g‘ri", error: err.message });
//     }
// };
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization; // Bearer TOKEN

    if (!authHeader) {
        return res.status(401).json({ message: "Token kerak (Bearer token)" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Token noto‘g‘ri" });
    }

    try {
        const decoded = jwt.verify(token, "super_secret_key");
        req.userId = decoded.id; // 🔹 req.userId ga saqlash
        next();
    } catch (err) {
        return res.status(401).json({ message: "Token noto‘g‘ri", error: err.message });
    }
};
