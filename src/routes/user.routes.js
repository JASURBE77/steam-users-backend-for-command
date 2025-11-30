const {create, getProfile, get, deleted, update, login, register} = require("../controller/user.controller")
const express = require("express")
const router = express.Router()
const  auth = require("../middleware/auth")
router.post("/post/user", create)
router.get("/get/api/alluser", get)
router.delete("/api/users/delete/:id", deleted)
router.put("/updated/user/:id", update)
router.get("/user/profile", auth, getProfile)
router.post("/user/login", login)
router.post("/user/create/register", register)

module.exports = router 