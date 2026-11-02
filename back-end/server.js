require('dotenv').config();
const express = require('express');
const cors = require('cors');

const productRoutes = require('./router/productRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/products', productRoutes);

// 404
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  if (!err.isOperational) console.error(err);

  res.status(statusCode).json({
    message: err.isOperational ? err.message : 'Internal server error',
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
