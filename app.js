const express = require('express')
const app = express()
const bodyparser = require('body-parser')
//morgan logs all the requests
const morgan = require('morgan')
const mongoose = require('mongoose')


const productRoutes = require('./api/routes/products')
const orderRoutes = require('./api/routes/orders')

mongoose.connect('mongodb://localhost/node_shop')

app.use(morgan('dev'))
app.use('/uploads',express.static('uploads'))
app.use(bodyparser.urlencoded({extended : false}))
app.use(bodyparser.json())

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
      return res.status(200).json({});
    }
    next();
  });
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