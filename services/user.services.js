var HTTP_CODES = require('../config/statusCodes');
const userModel = require('../models/user.model');
const Bcrypt = require('bcrypt');
const logger = require('../util/logger');
const uuidv1 = require('uuidv1');
const jwt = require('jsonwebtoken');
const SALT = 10;

var addUser = async (req, res, next) => {


    let requestPayload = req.body;

    if (requestPayload != undefined && requestPayload != null) {

        Bcrypt.genSalt(SALT, function (err, salt) {

            Bcrypt.hash(requestPayload.Password, salt, async function (err, hash) {
                if (err) {
                    next(err);
                }
                else {

                    requestPayload.UserUID = uuidv1();
                    //requestPayload.IsDeleted = 0;
                    requestPayload.Password = hash;
                    let userData = await userModel.User.create(requestPayload);
                    if (userData) {
                        res.send(userData)
                    }
                    else {
                        res.send({
                            "statusCode": HTTP_CODES.BAD_REQUEST,
                            "info": "Cannot register User Data",
                            "error": []
                        })
                    }
                }

            })
        })
        }
    }


    var login = async (req, res, next) => {

        try {
            var userData = await userModel.User.findOne({
                where: {
                    Email: req.body.EmailId
                }
            });
            if (userData) {
                Bcrypt.compare(req.body.Password, userData.Password, async function (err, isMatch) {
                    if (err) {
                        next(err)
                    }
                    if (isMatch) {
                        var token = await jwt.sign({ Email: userData.Email }, "SECRET_KEY", { expiresIn: '900s' });

                        res.status(statusCode.OK).send({
                            "statusCode": HTTP_CODES.OK,
                            "info": "Login Successful",
                            "user": {
                                "email": userData.Email,
                                "token": token
                            }
                        })
                    }
                    else {
                        next({
                            "statusCode": HTTP_CODES.BAD_REQUEST,
                            "error": "Password Doesn't Match",
                        })
                    }
                })
            }
            else {
                next({
                    "statusCode": HTTP_CODES.BAD_REQUEST,
                    "error": "User Email Not Found",
                })
            }
        }
        catch (e) {
            next(e);
        }
    }

    var getAllUsers = async (req, res, next) => {

        logger.error("hitted url is " + req.protocol + '://' + req.get('host') + req.originalUrl)
        try {
            let userData = await userModel.User.findAll(
                { where: { isDeleted: 0 } }
            );
            res.status(HTTP_CODES.OK).send({
                "statusCode": HTTP_CODES.OK,
                "info": "List of Users",
                "users": userData
            })
            logger.info("user details are: ", userData)
            return next(e)
        }
        catch (e) {
            next(e)


        }
    }


    var getUserById = async (req, res, next) => {
        logger.error("hitted url is " + req.protocol + '://' + req.get('host') + req.originalUrl)
        try {
            let userId = req.params.Id
            let userData = await userModel.User.findById(userId);
            if (!userData) {
                logger.error(HTTP_CODES.BAD_REQUEST);
                res.status(HTTP_CODES.BAD_REQUEST).send({
                    "statusCode": HTTP_CODES.BAD_REQUEST,
                    Error: "there is no existing user based on given Id"
                })

                return next(e);
            }

            else {
                let userId = req.params.Id
                let userData = await userModel.User.findById(userId);
                res.status(HTTP_CODES.OK).send({
                    "statusCode": HTTP_CODES.OK,
                    "info": "user details based on Id",
                    "users": userData
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


    var createUser = async (req, res, next) => {
        try {
            if (req.body != undefined) {
                let userData = await userModel.User.create(req.body);

                res.status(HTTP_CODES.OK).send({
                    "statusCode": HTTP_CODES.OK,
                    "info": "Successfully Created user Data",
                    "users": userData
                })
                return next(e);
            }
        }
        catch (e) {
            res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send({
                "statusCode": HTTP_CODES.INTERNAL_SERVER_ERROR,
                "info": "List of users",
                "error": e
            })
        }
    }


    var updateUser = async (req, res, next) => {
        try {
            if (req.body != null) {
                const id = req.params.Id;

                let userData = await userModel.User.update(req.body,
                    {
                        where: {
                            Id: id
                        }
                    })

                res.status(HTTP_CODES.OK).send({
                    "statusCode": HTTP_CODES.OK,
                    "info": "Successfully updated user Data",
                    "users": userData
                })
            }
        }
        catch (e) {
            next(e);
        }
    }


    // var deleteUser = async (req, res, next) => {
    //     try {
    //        // if (req.body != null) {
    //     const id = req.params.Id;
    //     let userData = await userModel.User.destroy({
    //         where: { id: id }
    //     })
    //       //  }
    //         res.send("user deleted sucessfully");
    //     }

    //     catch (e) {

    //         next(e);
    //     }
    // }

    var deleteUser = async (req, res, next) => {
        try {
            if (req.body != null) {
                const id = req.params.Id;

                let userData = await userModel.User.update({ isDeleted: 1 },
                    {
                        where: {
                            Id: id
                        }
                    })

                res.status(HTTP_CODES.OK).send({
                    "statusCode": HTTP_CODES.OK,
                    "info": "Successfully updated user Data",
                    "users": userData
                })
            }
        }
        catch (e) {
            next(e);
        }
    }


    module.exports = {
        login: login,
        addUser: addUser,
        getAllUsers: getAllUsers,
        createUser: createUser,
        getUserById: getUserById,
        updateUser: updateUser,
        deleteUser: deleteUser
    };



