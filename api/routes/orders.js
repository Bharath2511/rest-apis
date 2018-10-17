const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Order = require('../models/order')

router.get('/',(req,res,next)=>{
     res.status(200).json({
        message : "orders are fetched" 
     })
})

router.post('/',(req,res,next)=>{
    const order = {
        productId : req.body.productId,
        quantity : req.body.quantity
    }
    res.status(201).json({
       message : "order was created",
       orders : order 
    })
})

router.get('/:orderId',(req,res,next)=>{
    res.status(200).json({
       message : "order details" ,
       orderId : req.params.orderId
    })
})

router.delete('/:orderId',(req,res,next)=>{
    res.status(200).json({
       message : "order deleted" ,
       orderId : req.params.orderId
    })
})



module.exports = router