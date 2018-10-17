const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const multer = require('multer')
const checkAuth = require('../middleware/check-auth')
const ProductController = require('../controllers/products')
const storage = multer.diskStorage({
    //how file get stored
    destination : function(req,file,cb) {
       cb(null,'./uploads/')
    },
    filename : function(req,file,cb) {
       cb(null,new Date().toISOString()+file.originalname)
    }
})

const fileFilter = (req,file,cb) => {
    //reject a file
    if(file.minetype === "image/jpeg" || file.minetype === "image/png") {
        cb(null,true)
    } else {
        cb(null,false)
    }
       
}
const upload = multer({
    storage:storage,
    limits : {
    fileSize : 1024*1024*5
},
fileFilter :fileFilter
})

const Product = require('../models/product')

router.get('/',ProductController.products_get_all)
 
router.post('/',checkAuth,upload.single('productImage'),ProductController.products_create_product)

router.get('/:productId',ProductController.product_get_product)

router.patch('/:productId',checkAuth,(req,res,next)=> {
    const updateOps = {}
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value
    }
  Product.update({_id:req.params.productId},{$set:updateOps})
  .exec()
  .then(result => {
      console.log(result)
      res.status(200).json({
          message : "product updated",
          request : {
              type : "GET",
              url : "https://localhost:3001/products/"+req.params.id
          }
      })
  })
  .catch(err => {
      console.log(err)
      res.status(500).json({error:err})
  })
 })

 router.delete('/:productId',checkAuth,(req,res,next)=> {
   Product.remove({_id : req.params.productId})
   .exec()
   .then(result => {
       res.status(200).json({
           message : "product deleted",
          request : {
              type : "POST",
              url : 'http://localhost:3000/products',
              body : {name : "String", price : "Number"}
          } 
       })
   })
   .catch(err => {
       console.log(err)
       res.status(500).json({
           error : err
       })
   })
    
   })
  

module.exports = router