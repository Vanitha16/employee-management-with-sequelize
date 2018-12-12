const sequelize=require('sequelize');
var dbConnection=require('../connection/db.connection.js');

var Employee=dbConnection.define('employee',{
    Id: { 
        type: sequelize.BIGINT,
         autoIncrement: true,
          primaryKey: true 
        },
    FirstName: sequelize.STRING,
    MiddleName: sequelize.STRING,
    LastName: sequelize.STRING,
    Gender: sequelize.STRING,
    DateOfBirth: sequelize.DATE,
    Email: sequelize.STRING,
    isDeleted: sequelize.INTEGER,
    Phone: sequelize.STRING,
    Designation: sequelize.STRING,
    Project: sequelize.STRING,
    Module: sequelize.STRING,
    City: sequelize.STRING,
    State: sequelize.STRING,
    Country: sequelize.STRING,
    PostalCode: sequelize.BIGINT
}, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'employee'
        
    });

module.exports = {

    Employee: Employee

};