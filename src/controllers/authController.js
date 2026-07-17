const jwt = require('jsonwebtoken');

const generateAppToken = (req,res)=>{
    try{

        const token = jwt.sign(
            {
                app:"BookStoreAPI"
            },
            process.env.APP_TOKEN_SECRET
        );

        res.json({
            message:"Application token generated",
            token
        });

    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }
};


module.exports = {
    generateAppToken
};