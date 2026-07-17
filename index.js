const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./src/config/database');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./src/docs/swagger');
const verifyAppToken = require('./src/middlewares/authMiddlewares');

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

// Routes
app.use('/api/books', verifyAppToken, require('./src/routes/bookRoutes'));
app.use('/api/users', verifyAppToken, require('./src/routes/userRoutes'));
app.use('/api/auth', require('./src/routes/authRoutes'));
// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req, res) => {
    res.send('Hello BookStore API');
});

const PORT = process.env.PORT || 5100;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});