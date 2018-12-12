const express = require('express');
const router = express.Router();
const userServices = require('../services/user.services');
const expressJoi = require('express-joi-validator');
const requestSchema = require('../schemas/user.schema');

router.post('/register', expressJoi(requestSchema.addUserSchema), userServices.addUser);
router.post('/login', userServices.login);

router.get('/getallusers',userServices.getAllUsers);
router.get('/getuserbyid/:Id', userServices.getUserById);
router.post('/createuser',expressJoi(requestSchema.adduserSchema), userServices.createUser);
router.put('/updateuser/:Id',expressJoi(requestSchema.adduserSchema), userServices.updateUser);
router.delete('/deleteuser/:Id', userServices.deleteUser);



module.exports = router;
