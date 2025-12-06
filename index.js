const express = require('express')
const userRoutes = require("./src/routes/user.routes")
const connectDB = require('./src/config/db')
const app = express()
const cors = require("cors")
const steamgameRouter = require("./src/routes/game.routes")
const AppleUserRouter = require("./src/routes/Apple.user.routes")
const ProductsRouter = require("./src/routes/product.routes")

app.use(cors())

app.use(express.json())
app.use('/' , userRoutes)
app.use("/", ProductsRouter)
app.use("/", steamgameRouter)
app.use("/", AppleUserRouter)
connectDB()

const PORT = process.env.PORT || 8080
app.listen(PORT , () => {
    console.log('server is runnig on http://localhost:8080');
    
})