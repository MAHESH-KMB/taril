const mongoose = require('mongoose')
const productsSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    imageLink:{
        type:String,
        required:true
    }
})

mongoose.model('product',productsSchema)

