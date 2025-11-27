const AppleUserModel = require("../models/Apple.users.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


class AppleUserController {
    constructor(secret) {
        this.jwtSecret = secret
    }

    async register(req, res) {
        try {
            const {name, surname, email, password} = req.body

            
    if (!name || !surname || !email || !password) {
      return res.status(400).json({ message: "Barcha maydonlar majburiy" });
    }

      const existUser = await AppleUserModel.findOne({ email });
        if (existUser) {
          return res.status(400).json({ message: "Bu email allaqachon mavjud" });
        }
            const hashedPassword = await bcrypt.hash(password, 15)

            const AppleUser = new AppleUserModel({
                name,
                surname,
                email,
                password:hashedPassword
            })

            await AppleUser.save()

            res.status(201).json({ message: "User registered successfully" });


        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async login(req, res) {
        try {
            
            const {email, password} = req.body

            const userApple = await AppleUserModel.findOne({ email})

              if (!userApple) return res.status(404).json({ error: "User not found" });

              const isMatch = await bcrypt.compare(password, userApple.password)

              if (!isMatch) return res.status(400).json({ error: "Invalid password" });

              const token = jwt.sign({id:userApple._id}, this.jwtSecret, {expiresIn: "7d"});

              res.json({token})


        } catch (err) {
             res.status(500).json({ error: err.message });
        }
    }

    async get(req, res) {
        try {
            const getappleuser = await AppleUserModel.find()

            res.status(200).json(getappleuser)
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

const applseUsercontoller = new AppleUserController("super_secret_key");

module.exports = applseUsercontoller