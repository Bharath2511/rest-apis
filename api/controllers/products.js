const Product = require('../models/product')
const mongoose = require('mongoose')

exports.products_get_all = (req,res,next)=>{
    Product.find().select('name price _id productImage').exec().then(docs => {
        //console.log(docs)
        const response = {
            count : docs.length,
            products : docs.map(doc => {
                return {
                    name : doc.name,
                    price : doc.price,
                    productImage : doc.productImage,
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
 }

 exports.products_create_product = (req,res,next)=>{
    console.log(req.file)
    const product = new Product({
        _id : new mongoose.Types.ObjectId(),
        name : req.body.name,
        price : req.body.price
    })
    product.save()
    .then(result => {
        console.log(result)
        res.status(201).json({
            message : "created product successfully",
            createdProduct : {
                name : result.name,
                price : result.price,
                _id : result._id,
                productImage :req.file.path,
                request : {
                    type : "GET",
                    url :"http://localhost:3001/products/"+result._id
                }
            }
    })
    .catch(err => { console.log(err)
    res.status(500).json({
        error : err
    })})
       
    })
}

exports.product_get_product = (req,res,next)=> {
    const id = req.params.productId
    Product.findById(id)
    .exec()
    .then(doc => {
        console.log('from db',doc)
        if(doc) {
        res.status(200).json({
            product :doc,
            request : {
                type : "GET",
                url :"http://localhost:3001/products"
            }
         })
        } else {
            res.status(404).json({message : "no valid entry"})
        }
    }).catch(err => {console.log(err)
     res.status(500).json({
         error : err
     })
 })
 }
 
 exports.products_update_product = (req,res,next)=> {
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
 }

 exports.products_delete_product = (req,res,next)=> {
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
     
    }