
var express = require('express');
const { mongoose } = require('mongoose');


var app = express();
const cors = require('cors')

app.use(cors())

require('./models/ProductSchema')


const URI = "mongodb+srv://maheshkmb64:Kmb$3895@cluster0.e4f48s9.mongodb.net/inventorymanage?retryWrites=true&w=majority"
const PORT = process.env.PORT || 3001


mongoose.connect(URI).then(()=>{
  console.log("Database connected")
  app.listen(PORT,()=>{
    console.log("App listening on PORT:",PORT)
  })
})

const productModel = mongoose.model('product')

app.use(express.json());
app.use(express.urlencoded({ extended: false }));



app.get('/',async(req,res)=>{

  try {
    const data =  await productModel.find({}).lean()
    res.send(data)
  } catch (error) {
    console.log("error in fetching products",error)
    res.send(error)
  }


 
})

app.post('/add',async(req,res)=>{
  const newModel = new productModel()
  newModel.name = req.body.name
  newModel.quantity = req.body.quantity
  newModel.imageLink = req.body.imageLink
  try {
    newModel.save().then((response)=>{
      console.log("Data inserted succesfully ",response)
      res.send(response)
    })
  } catch (error) {
    console.log("Error in adding document",error)
    res.send(error)
  }
})

app.get('/getProd/:_id',async(req,res)=>{
  try {
    const data = await productModel.findOne({_id:req.params._id})
    console.log(data)
    res.send(data)
  } catch (error) {
    console.log("Error in retrieving single data",error)
  }
})

app.post('/update/:_id',(req,res)=>{
  console.log("api called")
  try {
    productModel.updateOne({_id:req.params._id},{
      name:req.body.name,
      quantity:req.body.quantity
    }).then((response)=>{
      res.send(response)
      console.log(response)
    })
  } catch (error) {
    console.log("Error in updating product",error)
  }
})





module.exports = app;
