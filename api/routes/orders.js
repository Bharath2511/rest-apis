const express = require('express')
const routes = express.Router()

router.get('/',(req,res,next)=>{
     res.status(200).json({
        message : "orders are fetched" 
     })
})

router.post('/',(req,res,next)=>{
    res.status(201).json({
       message : "order was created" 
    })
})

router.post('/orderId',(req,res,next)=>{
    res.status(200).json({
       message : "order details" ,
       orderId : req.params.orderId
    })
})

router.delete('/orderId',(req,res,next)=>{
    res.status(200).json({
       message : "order deleted" ,
       orderId : req.params.orderId
    })
})



module.exports = router