var express=require('express');
var router= express.Router();
var employeeService=require('../services/employee.service');
const expressJoi = require('express-joi-validator');
const requestSchema = require('../schemas/employee.schema.js');

router.get('/getallemployees',employeeService.getAllEmployees);
router.get('/getemployeebyid/:Id', expressJoi(requestSchema.query), employeeService.getEmployeeById);
router.post('/createemployee',expressJoi(requestSchema.addEmployeeSchema), employeeService.createEmployee);
router.put('/updateemployee/:Id',expressJoi(requestSchema.addEmployeeSchema), employeeService.updateEmployee);
router.delete('/deleteemployee/:Id', employeeService.deleteEmployee);

module.exports = router;
