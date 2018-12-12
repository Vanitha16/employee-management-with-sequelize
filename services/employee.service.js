var HTTP_CODES = require('../config/statusCodes');
const employeeModel = require('../models/employee.model.js');
var logger = require('../util/logger');

var getAllEmployees = async (req, res, next) => {
    logger.info("hitted url is " + req.protocol + '://' + req.get('host') + req.originalUrl)
    logger.info("Entered into GET route")
    try {
        let empData = await employeeModel.Employee.findAll(
            { where: { isDeleted: 0 } }
        );
        res.status(HTTP_CODES.OK).send({
            "statusCode": HTTP_CODES.OK,
            "info": "List of Employees",
            "employees": empData
        })
        logger.info("Employee details are: ", empData)

    }
    catch (e) {
        next(e)

        logger.error(e)
    }
}


var getEmployeeById = async (req, res, next) => {
    logger.info("hitted url is " + req.protocol + '://' + req.get('host') + req.originalUrl)
    try {
        let empId = req.params.Id
        let empData = await employeeModel.Employee.findById(empId);
        if (!empData) {
            logger.error(HTTP_CODES.BAD_REQUEST, Error + " there is no existing employee based on given Id");
            res.status(HTTP_CODES.BAD_REQUEST).send({
                "statusCode": HTTP_CODES.BAD_REQUEST,
                Error: "there is no existing employee based on given Id"
            })
        }

        else {
            let empData = await employeeModel.Employee.findById(empId);
            res.status(HTTP_CODES.OK).send({
                "statusCode": HTTP_CODES.OK,
                "info": "Employee Details based on Id",
                "employees": empData
            })
        }
    }

    catch (e) {
        res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send({
            "statusCode": HTTP_CODES.INTERNAL_SERVER_ERROR,
            "info": "data",
            "error": e
        })
        logger.error(e);
    }
}


var createEmployee = async (req, res, next) => {
    try {
        if (req.body != undefined) {
            let empData = await employeeModel.Employee.create(req.body);

            res.status(HTTP_CODES.OK).send({
                "statusCode": HTTP_CODES.OK,
                "info": "Successfully Created Employee Data",
                "employees": empData
            })
            return next(e);
        }
    }
    catch (e) {
        res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send({
            "statusCode": HTTP_CODES.INTERNAL_SERVER_ERROR,
            "info": "List of Employees",
            "error": e
        })
    }
}


var updateEmployee = async (req, res, next) => {
    const id = req.params.Id;

    let empData = await employeeModel.Employee.update(req.body,
        {
            where: {
                Id: id
            }
        })

    res.status(HTTP_CODES.OK).send({
        "statusCode": HTTP_CODES.OK,
        "info": "Successfully updatedEmployee Data",
        "employees": empData
    })
    return next(e);
}


// var deleteEmployee = async (req, res, next) => {
//     const id = req.params.Id;
//     let empData = await employeeModel.Employee.destroy({
//         where: { id: id }
//     })

//     res.send("employee deleted sucessfully");

// }

var deleteEmployee = async (req, res, next) => {
    try {
        if (req.body != null) {
            const id = req.params.Id;

            let empData = await employeeModel.Employee.update({ isDeleted: 1 },
                {
                    where: {
                        Id: id
                    }
                })

            res.status(HTTP_CODES.OK).send({
                "statusCode": HTTP_CODES.OK,
                "info": "Successfully updated user Data",
                "users": empData
            })
        }
    }
    catch (e) {
        next(e);
    }
}
module.exports = {
    getAllEmployees: getAllEmployees,
    createEmployee: createEmployee,
    getEmployeeById: getEmployeeById,
    updateEmployee: updateEmployee,
    deleteEmployee: deleteEmployee
};