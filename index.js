const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./src/config/database');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./src/docs/swagger');

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

// Routes
app.use('/api/books', require('./src/routes/bookRoutes'));
app.use('/api/users', require('./src/routes/userRoutes'));

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req, res) => {
    res.send('Hello BookStore API');
});

const PORT = process.env.PORT || 5100;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});