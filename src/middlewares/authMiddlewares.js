const jwt = require('jsonwebtoken');

const verifyAppToken = (req, res, next) => {

    const appToken = req.header('app-token');

    if (!appToken) {
        return res.status(401).json({
            message: 'Application token missing'
        });
    }

    try {

        const decoded = jwt.verify(
            appToken,
            process.env.APP_TOKEN_SECRET
        );

        req.app = decoded;

        next();

    } catch(error) {

        return res.status(401).json({
            message: 'Invalid application token'
        });

    }
};

module.exports = verifyAppToken;