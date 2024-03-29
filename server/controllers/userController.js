const router = require('express').Router();

const userService = require('../services/userService');
const recipeService = require('../services/recipeService');

router.post('/register', async(req, res) => {
    
    const userData = req.body;

    const result = await userService.register(userData);

    res.json(result);
});

router.post('/login', async(req, res) => {
    
    const userData = req.body;

    const result = await userService.login(userData);

    res.json(result);
});

router.get('/profile/:userId', async(req, res) => {
    const userId = req.params.userId;
    const user = await userService.getOne(userId);

    res.json(user);
})

router.get('/logout', async(req, res) => {
    res.json({ok: true});
});

router.put('/profile/edit/:userId', async(req, res) => {
    const userData = req.body;
    const userId = req.params.userId;

    try { 
        console.log('User Data:',userData);
        const editedUser = await userService.editUser(userId, userData);
        console.log('Edited User:', editedUser)
        res.status(201).json(editedUser);

    } catch (error) {
        console.log('Error', error);
        res.status(500).json({ message: 'Error editing user'});
    }
})

router.post('/addRecipe', async(req, res) => {
    const recipeData = req.body;
    const userId = req.body.userId;
    
    try {
        const result = await recipeService.create(userId, recipeData);
        res.status(201).json(result);

    } catch (error) {
        console.log('Error', error);
        res.status(500).json({ message: 'Error adding recipe'});
    }
})

module.exports = router;