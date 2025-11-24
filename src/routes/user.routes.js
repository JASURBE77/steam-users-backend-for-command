const {create, get, deleted, update, login, register} = require("../controller/user.controller")
const express = require("express")
const router = express.Router()

router.post("/post/user", create)
router.get("/get/api/alluser", get)
router.delete("/api/users/delete/:id", deleted)
router.put("/updated/user/:id", update)

router.post("/user/login", login)
router.post("/user/create/register", register)

module.exports = router 