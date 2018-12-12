const sequelize=require('sequelize');
const config=require('../config/db.config.js');
var logger = require('../util/logger');

var dbConnection=new sequelize(config.database,config.username,config.password,{
    host:config.host,
    dialect:config.dialect,
    operatorsAliases: false
});

dbConnection.authenticate().then(() => {
    logger.info("data base connection established");
  }).catch((err=>{
 logger.error(err);
  }));

  module.exports=dbConnection;
   

