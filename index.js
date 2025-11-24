const express = require('express')
const userRoutes = require("./src/routes/user.routes")
const connectDB = require('./src/config/db')
const app = express()
const cors = require("cors")

app.use(cors())

app.use(express.json())
app.use('/' , userRoutes)
connectDB()

const PORT = process.env.PORT || 8080
app.listen(PORT , () => {
    console.log('server is runnig on http://localhost:8080');
    
})