const jwt = require('jsonwebtoken');
const logger = require('../util/logger');
var HTTP_CODES = require('../config/statusCodes');

 var verifyToken=(req, res, next) =>{

    var token = req.headers['token'];
    if (!token) {
        logger.error("No Access Token Provided");

        res.status(401).send({
            "statusCode": HTTP_CODES.UNAUTHORIZED,
            "info": "Failed to Authenticate token."
        });
    }
    else {
        jwt.verify(token, "SECRET_KEY",(err, decoded)=> {
            if (err) {
                logger.error("Failed to Authenticate token.");
                res.status(401).send({
                    "HTTP_CODES": HTTP_CODES.UNAUTHORIZED,
                    "info": "Failed to Authenticate token.",
                    "error": err.name + ' - ' + err.message
                });
            }
            else {
                next();
            }
        });
    }
}
//module.exports=verifyToken;