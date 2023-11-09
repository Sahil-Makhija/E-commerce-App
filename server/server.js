const express = require('express');
const app = express()
const cors = require('cors');
const dotenv = require('dotenv')
const connectToDatabase = require('./database');


const adminRoutes = require('./routes/adminRoutes')
const userRoutes = require('./routes/userRoutes')
const orderRoutes = require('./routes/orderRoutes')
const paymentRoutes = require('./routes/paymentRoutes')


//Configuration
const cookieParser = require('cookie-parser');
const Product = require('./models/productModel');
dotenv.config()
const { PORT, MAINHOST,FRONTEND_URL } = process.env

//Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:`${FRONTEND_URL}`,
    credentials:true
}));


//database connection...
connectToDatabase()

app.listen(PORT, MAINHOST, () => {
    console.log(`server started at http://${MAINHOST}:${PORT}`);
})
app.get('/', (req, res) => {
    res.end('welcome')
})
//Routes
app.use('/admin', adminRoutes)
app.use('/',orderRoutes)
app.use('/',userRoutes)
app.use('/order/payment',paymentRoutes)
