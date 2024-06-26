const Admin = require('../models/Admin');
const adminService = require('../services/adminService');
const recipeService = require('../services/recipeService');
const userService = require('../services/userService')

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
        res.status(500).json({ message: error.message })
    }

    
})

router.get('/logout', async (req, res) => {
    try {
        res.clearCookie('admin');
        res.status(200).json({ok: true, message: 'Logout successful'});
    } catch (error) {
        console.error('Error in logout', error);
        res.status(500).json({ message: error.message });
    }
});

router.post('/categories', async (req, res) => {
    try {
        
        const { categoryName, image } = req.body;

        const createdCategory = await adminService.create({ categoryName, image });

        res.status(201).json(createdCategory);
    } catch (error) {
        console.error('Error creating category', error);
        res.status(500).json({ message: error.message })
    }
})

router.post('/addRecipe', async(req, res) => {
    const recipeData = req.body;
    const ownerId = req.body.ownerId;

    try {
        const result = await recipeService.create(ownerId, recipeData);
        res.status(201).json(result);

    } catch (error) {
        console.error('Error adding recipe', error);
        res.status(500).json({ message: error.message });
    }

})

router.get('/users', async(req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error in fetching the users', error);
        res.status(500).json({ message: error.message })
    }
})

router.get('/categories', async (req, res) => {
    try {
        const categories = await adminService.getAllCategories().lean();

        res.status(200).json(categories);        
    } catch (error) {
        console.error('Error in fetching the categories', error);
        res.status(500).json({ message: error.message })
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
        res.status(500).json({ message: error.message })
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
    res.status(500).json({ message: error.message })
   }

})

router.delete('/deleteUser/:userId', async(req, res) => {
    try {
        const userId = req.params.userId;
        const deletedUser = await adminService.deleteUser(userId);

        if(deletedUser){
            res.status(200).json(deletedUser);

        }else{
            res.status(404).json({ error: 'User not found' });
        }

    } catch (error) {
        console.error('Error in deleting the user', error);
        res.status(500).json({ message: error.message })
    }
})

module.exports = router;