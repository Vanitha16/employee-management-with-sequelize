let mock = require('mock-require');
// mock('../models/employee.model','../models/employee-mock-model.js');

const chai = require('chai');
const chaiHttp = require('chai-http');

const should = require('chai').should();
const empService = require('../services/employee.service');
const server = require('../app.js');
chai.use(chaiHttp);

describe("Employee Functionality", function () {
   it('#Get All Employees', function (done) {
        chai.request(server)
            .get('/api/getallemployees')
           
            .end(function (err, res) {
                res.should.have.status(200);
                done();
            });
    })

    it('#Get Employee Based on Id', function (done) {
        chai.request(server)
            .get('/api/getemployeebyid/:Id')
           
            .end(function (err, res) {
                res.should.have.status(200);
                done();
            });
    })

    it('#Add New Employee', function (done) {
   
        let request = {
            FirstName: "lavanya",
            MiddleName: " ",
            LastName: "ganireddy",
            Gender: "F",
            DateOfBirth: "2000-02-03",
            Email: "test1@gmail.com",
            Phone: "23456788",
            Designation: "SE",
            Project:"abc2.0",
            Module: "xxx",
            City: "hyd",
            State: "TS",
            Country: "IN",
            PostalCode: "530000",
           
        };
        chai.request(server)
            .post('/api/createemployee')
          
            .send(request)
            .end(function (err, res) {
             
                if(err){
                    console.log(err)
                }
                
                res.should.have.status(200);
                done();
            });
    })
})
