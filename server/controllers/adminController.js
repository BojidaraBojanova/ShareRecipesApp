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

router.get('/logout', async (req, res) => {
    res.json({ok: true});
});

router.post('/categories', async (req, res) => {
    try {
        
        const { categoryName, image } = req.body;

        const createdCategory = await adminService.create({ categoryName, image });

        res.status(201).json(createdCategory);
    } catch (error) {
        console.log('Error', error);
        res.status(500).json({ message: 'Error creating category'})
    }
})

router.get('/categories', async (req, res) => {
    try {
        const categories = await adminService.getAllCategories().lean();

        res.json(categories);        
    } catch (error) {
        console.error('Error in getting the categories', error);
    }
})

module.exports = router;