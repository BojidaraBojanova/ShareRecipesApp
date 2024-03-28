const router = require('express').Router();

const userService = require('../services/userService');
const recipeService = require('../services/recipeService');
const Recipe = require('../models/Recipe');

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

router.post('/:userId/favorite/:recipeId', async( req, res) => {
    try {
        const userId = req.params.userId;
        const recipeId = req.params.recipeId;
        console.log('UserId',userId)
        await userService.addFavoriteRecipe(userId, recipeId);
        res.json({message: 'Recipe added to favorites'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

router.delete('/:userId/favorite/:recipeId', async( req, res) => {
    try {
        const userId = req.params.userId;
        const recipeId = req.params.recipeId;
        await userService.removeFavoriteRecipe(userId, recipeId);
        res.json({message: 'Recipe is removed from favorites'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

router.get('/favorite-recipes/:userId', async(req, res) => {
    try {
        const userId = req.params.userId;
        const user = await userService.getOne(userId);
        if(!user){
            return res.status(404).json({ message: 'User not found' });
        }
        const favoriteRecipes = await Recipe.find({ _id: {$in: user.favoriteRecipe } });
        console.log(favoriteRecipes);
        res.json(favoriteRecipes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
})

module.exports = router;