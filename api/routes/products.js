const express = require('express')
const router = express.Router()

router.get('/',(req,res,next)=>{
     res.status(200).json({
         message : "get req to /products"
     })
})

router.post('/',(req,res,next)=>{
    res.status(201).json({
        message : "post req to /products"
    })
})

router.get('/:productId',(req,res,next)=> {
   const id = req.params.productId
   if (id === "special") {
       res.status(200).json({
           message : 'you have discovered a special id',
           id : id
       })
   }
   else {
     res.status(200).json({
        message : 'you passed in an id' 
     })
   }
})

router.patch('/:productId',(req,res,next)=> {
  res.status(200).json({
      message : 'updated product'
  })
 })

 router.delete('/:productId',(req,res,next)=> {
    res.status(200).json({
        message : 'delete product'
    })
   })
  

module.exports = router