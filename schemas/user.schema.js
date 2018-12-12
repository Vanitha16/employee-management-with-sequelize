const Joi = require('joi');

var adduserSchema = {
    body: {
        FirstName: Joi.string().required(),
        LastName: Joi.string().required(),
        Email: Joi.string().email({ minDomainAtoms: 2 }),
        Password : Joi.string().required()
    }
};

module.exports = {
    adduserSchema: adduserSchema
}