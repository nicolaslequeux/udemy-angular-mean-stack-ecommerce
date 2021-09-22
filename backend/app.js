const express = require('express');
const app = express();

const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');

require("dotenv/config")

app.use(cors());
app.options('*', cors())


// Middleware (ex body-parser now node.js based!)
app.use(express.json());
// HTTP request logger middleware to get additional information in the console
app.use(morgan('tiny'));
// Express middleware for validating JWT
app.use(authJwt());
// public static folder
app.use('/public/uploads', express.static(__dirname + '/public/uploads'))
// Middleware to handle error (latest position)
app.use(errorHandler);

//Routes
const categoriesRoutes = require('./routes/categories');
const productsRoutes = require('./routes/products');
const usersRoutes = require('./routes/users');
const ordersRoutes = require('./routes/orders');

const api = process.env.API_URL;

app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes);


mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "eshop-database"
})
    .then(() => { console.log('Database connected') })
    .catch((err) => console.log(err))


app.listen(3000, () => {
    console.log('Serevr is running on http://localhost:3000');
})

