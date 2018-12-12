const Joi = require('joi');

var addEmployeeSchema = {
    
    body: {
        FirstName: Joi.string().required(),
        MiddleName: Joi.string().allow(null).allow(''),
        LastName: Joi.string().required(),
        Gender: Joi.string().required().valid('m', 'f'),
        DateOfBirth: Joi.date().required(),
        Email: Joi.string().email({ minDomainAtoms: 2 }),
       // isDeleted:Joi.number(),
        Phone: Joi.string().required(),
        Designation: Joi.string().required(),
        Project: Joi.string().required(),
        Module: Joi.string().required(),
        City: Joi.string().required(),
        State: Joi.string().required(),
        Country: Joi.string().required(),
        PostalCode: Joi.number().required(),
      
    }
};

 
module.exports = {
    addEmployeeSchema: addEmployeeSchema,
 
}