let sqlConnection;
let SequelizeMock = require('sequelize-mock');
sqlConnection = new SequelizeMock();

let Employee = sqlConnection.define('employee', {
    Id: 1,
    FirstName: "vanitha",
    MiddleName: "rani",
    LastName: "kundrapu",
    Gender: "F",
    DateOfBirth: "2000-01-01",
    Email: "test@gmail.com",
    IsDeleted: 0,
    Phone: "9999999999",
    Designation: "Tester",
    Project:"abc2.0",
    Module: "xxx",
    City: "Vizag",
    State: "AP",
    Country: "India",
    PostalCode: "530000",
   
}, {
        timestamps: false,
        freezeTableName: true, 
        tableName: 'employee'
    });



module.exports = {

    Employee: Employee

};