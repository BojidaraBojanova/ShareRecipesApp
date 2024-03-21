const Admin = require("../models/Admin");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { SECRET_KEY } = require('../config');


exports.login = async(adminData) => {
    const admin = await Admin.findOne({ username: adminData.username });

    if(!admin){
        throw new Error('No such admin!');
    }

    const isValid = await bcrypt.compare(adminData.password, admin.password);

    if(!isValid){
        throw new Error('Wrong password!');
    }

    const accessToken = jwt.sign({
        _id: admin._id,
        email: admin.email,
        username: admin.username
    }, SECRET_KEY)

    return{
        _id: admin._id,
        email: admin.email,
        username: admin.username,
        accessToken
    }
}