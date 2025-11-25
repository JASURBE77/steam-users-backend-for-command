const { createProduct, getProduct } = require("../controller/product.controller");
const auth = require("../middleware/auth");
const express = require("express");

const router = express.Router();

router.post("/product/post", auth, createProduct);  // 🔐 token shart!
router.get("/get/all/products", getProduct);

module.exports = router;
