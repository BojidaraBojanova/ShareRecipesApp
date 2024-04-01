const Admin = require("../models/Admin");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { SECRET_KEY } = require('../config');
const Category = require("../models/Category");
const User = require("../models/User");


exports.login = async(adminData) => {
    const admin = await Admin.findOne({ username: adminData.username });

    if(!admin){
        throw new Error('No such admin!');
    }

    const isValid = await bcrypt.compare(adminData.password, admin.password);

    if(!isValid){
        throw new Error('Wrong password!');
    }

    // const accessToken = jwt.sign({
    //     _id: admin._id,
    //     email: admin.email,
    //     username: admin.username
    // }, SECRET_KEY)

    const token = await generateToken(admin);

    return{
        _id: admin._id,
        email: admin.email,
        username: admin.username,
        token
    }
};

exports.create = async(categoryData) => {
    const createdCategory = await Category.create({
        ...categoryData
    });

    console.log(createdCategory)

    return createdCategory;
}

exports.getAllCategories = () => Category.find();

exports.editCategory = (categoryId, categoryData) => Category.findByIdAndUpdate(categoryId, categoryData, { runValidators: true });

exports.deleteCategory = (categoryId) => Category.findByIdAndDelete(categoryId);

exports.deleteUser = (userId) => User.findByIdAndDelete(userId);

function generateToken(admin){
    const payload = {
        _id: admin._id,
        email: admin.email,
        username: admin.username
    }

    return jwt.sign(payload, SECRET_KEY, { expiresIn: '2h' });
}