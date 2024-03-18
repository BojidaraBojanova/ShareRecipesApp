const User = require("../models/User");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


exports.register = async(userData) =>{

    if(userData.password !== userData.rePassword){
        throw new Error('Password mismatch!');
    }

    const user = await User.create(userData);

    const accessToken = jwt.sign({
        _id: user._id,
        email: user.email
    }, 'ADDSECRETKEY')

    return{
        _id: user._id,
        email: user.email,
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
    email: user.email
    }, 'ADDSECRETKEY')

    return{
        _id: user._id,
        email: user.email,
        accessToken
    }

};
