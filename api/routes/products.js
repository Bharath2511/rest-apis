const express = require('express')
const router = express.Router()

router.get('/',(req,res,next)=>{
     res.status(200).json({
         message : "get req to /products"
     })
})

router.post('/',(req,res,next)=>{
    res.status(200).json({
        message : "post req to /products"
    })
})

module.exports = router