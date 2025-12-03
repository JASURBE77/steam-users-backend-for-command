// const mongoose = require("mongoose")
// const userSCHEMA = new mongoose.Schema({
//     name: {type: String, required:true},
//     surname: {type:String,},
//     email:{type: String, required: true,unique: true},
//     password:{type:String, required:true}
    
// })


// module.exports =  mongoose.model("UserModel", userSCHEMA)

const mongoose = require("mongoose")

const gameSchema = new mongoose.Schema({
    title: {type:String, required:true},
    description: {type:String, required:true},
    price: {type:String, required:true},
    discount: {type:Number, required:true},
    categoryId: {type:String, required:true},
    developer: {type:String, required:true},
    image:[ {type:String, required:true}],
    releaseDate: {type:Number, required:true},
    rating: {type:Number, required:true},
    janre: {type:String, required:true}
})

module.exports = mongoose.model("GameModel", gameSchema)