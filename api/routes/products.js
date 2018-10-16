const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Product = require('../models/product')

router.get('/',(req,res,next)=>{
   Product.find().select('name price _id').exec().then(docs => {
       //console.log(docs)
       const response = {
           count : docs.length,
           products : docs.map(doc => {
               return {
                   name : doc.name,
                   price : doc.price,
                   _id : doc.id,
                   request : {
                       type :'GET',
                       url :'http://localhost:3001/products/'+doc._id
                   }
               }
           })
       }
       res.status(200).json({
           response
       })
       .catch(err => {
           console.log(err)
           res.status(500).json({
               err
           })
       })
   })
})

router.post('/',(req,res,next)=>{
    
    const product = new Product({
        _id : new mongoose.Types.ObjectId(),
        name : req.body.name,
        price : req.body.price
    })
    product.save()
    .then(result => {
        console.log(result)
        res.status(201).json({
            message : "post req to /products",
            createdProduct : result
    })
    .catch(err => { console.log(err)
    res.status(500).json({
        error : err
    })})
       
    })
})

router.get('/:productId',(req,res,next)=> {
   const id = req.params.productId
   Product.findById(id)
   .exec()
   .then(doc => {
       console.log('from db',doc)
       if(doc) {
       res.status(200).json(doc)
       } else {
           res.status(404).json({message : "no valid entry"})
       }
   }).catch(err => {console.log(err)
    res.status(500).json({
        error : err
    })
})
})

router.patch('/:productId',(req,res,next)=> {
    const updateOps = {}
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value
    }
  Product.update({_id:req.params.productId},{$set:updateOps})
  .exec()
  .then(result => {
      console.log(result)
      res.status(200).json({result})
  })
  .catch(err => {
      console.log(err)
      res.status(500).json({error:err})
  })
 })

 router.delete('/:productId',(req,res,next)=> {
   Product.remove({_id : req.params.productId})
   .exec()
   .then(result => {
       res.status(200).json({result})
   })
   .catch(err => {
       console.log(err)
       res.status(500).json({
           error : err
       })
   })
    
   })
  

module.exports = router