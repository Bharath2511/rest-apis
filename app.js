const express = require('express')
const app = express()
//morgan logs all the requests
const morgan = require('morgan')


const productRoutes = require('./api/routes/products')
const orderRoutes = require('./api/routes/orders')

app.use(morgan('dev'))

app.use('/orders',orderRoutes)
app.use('/products',productRoutes)

app.use((req,res,next) => {
      const error = new Error('not found')
      error.status = 404
      //this will forward our customized request instead of
      //original request
      next(error)
})
app.use((error,req,res,next)=> {
    //all the errors
    res.status(error.status || 500)
    res.json({
        error : {
            message : error.message
        }
    })
})

app.use((req,res)=>{
    res.status(200).json({
        message : "working"
    })
})

module.exports = app