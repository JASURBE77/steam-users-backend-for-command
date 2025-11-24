const express = require('express')
const userRoutes = require("./src/routes/user.routes")
// const gameRoutes = require('./src/routes/game.routes')
const connectDB = require('./src/config/db')
const app = express()
const cors = require("cors")

app.use(cors())

app.use(express.json())
app.use('/' , userRoutes)
// app.use('/', gameRoutes)
connectDB()

app.listen(8080 , () => {
    console.log('server is runnig on http://localhost:8080');
    
})