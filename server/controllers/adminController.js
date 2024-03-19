const Admin = require('../models/Admin');
const adminService = require('../services/adminService');

const router = require('express').Router();

router.post('/login', async (req, res) => {

    const adminData = req.body;

    const result = await adminService.login(adminData);

    res.json(result);

    const mainAdmin = await Admin.findOne({ isAdmin: true });
    if(!mainAdmin) {
        await Admin.create({
            username: 'admin',
            password: 'Admin123!',
            email: 'adminEmail@gmail.com',
            isAdmin: true
        });
        console.log('The main admin profile is created!')
    }
})


module.exports = router;