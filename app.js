var express=require('express');
var app=express();
var bodyparser=require('body-parser');
var dbConnection=require('./connection/db.connection.js');
var employeeRouter=require('./routes/employee.route.js');
var userRouter=require('./routes/user.routes.js');
var HTTP_CODES = require('./config/statusCodes');
var logger = require('./util/logger');
//var verifyToken = require('./middlewares/verifyToken');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));


//app.use('/api',verifyToken,userRouter);
app.use('/api',employeeRouter);
//app.use('/api',verifyToken,userRouter);


app.use((req, res, next)=> {
  var err = new Error('Not Found');
  err.Status = 404;
  err.Info = "Route Not Found"
  next(err);
});


app.use((err, req, res, next)=> {
  
  if (err.isBoom) {
    var error = {
      "statusCode": 400,
      "info": "Check Request Payload",
      // "error":err
       "error": err.data[0].message.replace(/\"/g, '')
    
    };
    res.status(400).send(error);
    //logger.info(error);
    logger.error(error);
  }

  else {
    
    if (err.name == "SequelizeDatabaseError") {
      console.log("Invalid Column Name");
      var errorMessage = {
        "statusCode": 404,
        "info": "Invalid Column Name / Check DB Columns",
        "error": err
      };
      res.status(404).send(errorMessage);
      logger.error(errorMessage);
    }
  
    else if (err.name == "SequelizeAccessDeniedError") {
      console.log("Invalid Password")
      var errorMessage = {
        "status": 500,
        "info": "DB Credentials Error",
        "error": err
      };
      res.status(500).send(errorMessage);
      logger.error(eerrorMessage);
    }
    
    else if (err.statusCode == 404) {
      var errorMessage = {
        "statusCode": parseInt(err.statusCode),
        "error": err
      };
      res.status(404).json(errorMessage);
      logger.error(errorMessage);
    }
    
    else if (err.statusCode == 400) {
      var errorMessage = {
        "statusCode": parseInt(err.statusCode),
        "info": "Bad Request",
        "error": err
      };
      res.status(400).json(errorMessage);
      logger.error(errorMessage);
    }
    
    else {
      res.status(500).send(err);
      logger.error(err);
    }
  }

});
app.listen(3000,()=>{
 logger.info('server running at 3000');
})
module.exports = app;
