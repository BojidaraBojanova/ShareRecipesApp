const Admin = require("../models/Admin");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { SECRET_KEY } = require('../config');
const Category = require("../models/Category");


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