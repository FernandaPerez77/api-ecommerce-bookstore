const express = require('express');

const router = express.Router();

const {
    generateAppToken
} = require('../controllers/authController');


router.post('/app-token', generateAppToken);


module.exports = router;