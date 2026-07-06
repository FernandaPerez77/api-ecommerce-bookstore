const swaggerJsDoc = require('swagger-jsdoc');

const options = {
    definition:{
        openapi:'3.0.0',
        info:{
            title:'BookStore API',
            version:'1.0.0',
            description:'Secure Ecommerce API'
        },
        servers:[
            {
                url:'http://localhost:5100'
            }
        ]
    },

    apis:['./src/routes/*.js']
};

const swaggerSpec=swaggerJsDoc(options);

module.exports=swaggerSpec;