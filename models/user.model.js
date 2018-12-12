const sequelize = require('sequelize');
var dbConnection = require('../connection/db.connection');

let User = dbConnection.define('user', {
    Id: {
         type: sequelize.BIGINT, 
         autoIncrement: true, 
         primaryKey: true 
        },
    UserUID: sequelize.STRING,
    FirstName: sequelize.STRING,
    LastName: sequelize.STRING,
    Email: sequelize.STRING,
    Password: sequelize.STRING,
    IsDeleted: sequelize.INTEGER
}, {
        timestamps: false,
        freezeTableName: true, 
        tableName: 'user'
    });

module.exports = {

    User: User

};