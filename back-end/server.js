const express = require('express');
const app = express();
const cors= require('cors');
const { products } = require('../front-end/src/pages/products/dataProducts');

require('dotenv').config();
const productRoutes = require('./router/productRoutes');

const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());

app.use('/api/products', productRoutes);

app.listen(PORT, () =>{
    console.log(`Server is running at http://localhost:${PORT}`);
})