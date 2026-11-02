const express = require('express');
const app = express();
const cors= require('cors');


require('dotenv').config();
const productRoutes = require('./router/productRoutes');

const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());

app.use('/api/products', productRoutes);
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  const statusCode = err.statusCode || err.status || 500;

  if (statusCode >= 500) {
    console.error(err);
  }

  return res.status(statusCode).json({
    message:
      statusCode >= 500
        ? "Internal server error"
        : err.message,
  });
});

app.listen(PORT, () =>{
    console.log(`Server is running at http://localhost:${PORT}`);
})