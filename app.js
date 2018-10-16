const express = require('express')
const app = express()
//morgan logs all the requests
const morgan = require('morgan')


const productRoutes = require('./api/routes/products')
const orderRoutes = require('./api/routes/orders')

app.use(morgan('dev'))

app.use('/orders',orderRoutes)
app.use('/products',productRoutes)

app.use((req,res)=>{
    res.status(200).json({
        message : "working"
    })
})

module.exports = app