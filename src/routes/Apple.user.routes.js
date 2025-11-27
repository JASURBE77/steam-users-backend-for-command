const express = require("express");
const applseUsercontoller = require("../controller/AppleUser.Controller")
const router = express.Router();
const auth = require("../middleware/auth")
router.post("/register/apple" ,(req, res) => applseUsercontoller.register(req, res));
router.post("/login/apple", (req, res) => applseUsercontoller.login(req, res));
router.get("/get/apple/user",  (req, res) => applseUsercontoller.get(req, res))

module.exports = router