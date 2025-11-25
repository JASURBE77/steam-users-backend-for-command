    const jwt = require("jsonwebtoken");

    module.exports = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Token kerak (Bearer token)" });
    }

    try {
        const decoded = jwt.verify(token, "super_secret_key");
        req.user = decoded;     // { id: USER_ID }
        next();

    } catch (error) {
        return res.status(401).json({ message: "Token noto‘g‘ri", error: error.message });
    }
    };
