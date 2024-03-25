const User = require("../models/User");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { SECRET_KEY } = require('../config');

exports.getOne = (userId) => User.findById(userId);


exports.register = async(userData) =>{

    if(userData.password !== userData.rePassword){
        throw new Error('Password mismatch!');
    }

    if(userData.password){
        userData.password = await bcrypt.hash(userData.password, 10);
    }

    const user = await User.create(userData);

    const accessToken = jwt.sign({
        _id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
    }, SECRET_KEY)

    return{
        _id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        accessToken
    }
};

exports.login = async(userData) => {
   const user = await User.findOne({ email: userData.email });
   
   if(!user){
        throw new Error('No such user is registered!');
   }


   const isValid = await bcrypt.compare(userData.password, user.password);

   if(!isValid){
        throw new Error('Wrong password!');
   }

   const accessToken = jwt.sign({
    _id: user._id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    }, SECRET_KEY)

    return{
        _id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        accessToken
    }

};


exports.editUser = async (userId, userData) => {
    if(userData.password){
        userData.password = await bcrypt.hash(userData.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(userId, userData, {new: true, runValidators: true})

    return updatedUser;
};

