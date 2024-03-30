const Admin = require('../models/Admin');
const adminService = require('../services/adminService');

const router = require('express').Router();

router.post('/login', async (req, res) => {

    const adminData = req.body;

    try {
        const result = await adminService.login(adminData);

        res.status(200).json(result);

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
    } catch (error) {
        console.error('Error in admin login', error);
        res.status(500).json({ message: 'Internal Server Error'})
    }

    
})

router.get('/logout', async (req, res) => {
    try {
        res.clearCookie('admin');
        res.status(200).json({ok: true, message: 'Logout successful'});
    } catch (error) {
        console.error('Error in logout', error);
        res.status(500).json({ error: 'Internal Server Error'});
    }
});

router.post('/categories', async (req, res) => {
    try {
        
        const { categoryName, image } = req.body;

        const createdCategory = await adminService.create({ categoryName, image });

        res.status(201).json(createdCategory);
    } catch (error) {
        console.error('Error creating category', error);
        res.status(500).json({ error: 'Internal Server Error'})
    }
})

router.get('/categories', async (req, res) => {
    try {
        const categories = await adminService.getAllCategories().lean();

        res.status(200).json(categories);        
    } catch (error) {
        console.error('Error in fetching the categories', error);
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

router.put('/editCategory/:categoryId', async(req, res) => {
    const categoryData = req.body;
    const categoryId = req.params.categoryId;

    try {
        console.log(categoryData);
        const editedCategory = await adminService.editCategory(categoryId, categoryData);

        res.status(201).json(editedCategory);

    } catch (error) {
        console.error('Error editing category', error);
        res.status(500).json({ error: 'Internal Server Error'})
    }
})

router.delete('/deleteCategory/:categoryId', async(req, res) => {
   try {
    const categoryId = req.params.categoryId;
    const deletedCategory = await adminService.deleteCategory(categoryId);
    
    if(deletedCategory){
        res.status(200).json(deletedCategory);
    }else{
        res.status(404).json({ error: 'Category not found' });
    }
   } catch (error) {
    console.error('Error in deleting the category', error);
    res.status(500).json({ error: 'Internal Server Error'})
   }

})

module.exports = router;