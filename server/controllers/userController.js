const router = require('express').Router();

const { isGuest, isAuth } = require('../middlewares/authMiddleware')
const userService = require('../services/userService');
const recipeService = require('../services/recipeService');
const Recipe = require('../models/Recipe');

router.post('/register', async(req, res) => {
    
    const userData = req.body;
    try {
        const result = await userService.register(userData);
        res.status(201).json(result);
        
    } catch (error) {
        console.error('Error in user registration', error);
        res.status(500).json({ message: error.message})
    }


});

router.post('/login', async(req, res) => {
    
    const userData = req.body;

    try {
        const result = await userService.login(userData);
        res.status(200).json(result);

    } catch (error) {
        console.error('Error in user login', error);
        res.status(500).json({ message: error.message})
    }


});

router.get('/profile/:userId', async(req, res) => {
    const userId = req.params.userId;
    try {
        const user = await userService.getOne(userId);
        res.status(200).json(user);
    } catch (error) {
        console.error('Error in fetching the user', error);
        res.status(500).json({ message: error.message })
    }

})

router.get('/logout', async(req, res) => {
    try {
        res.clearCookie('user');
        res.status(200).json({ok: true, message: 'Logout successful'});
    } catch (error) {
        console.error('Error in logout', error);
        res.status(500).json({ message: error.message });
    }
});

router.put('/profile/edit/:userId', async(req, res) => {
    const userData = req.body;
    const userId = req.params.userId;

    try { 
        const editedUser = await userService.editUser(userId, userData);
        res.status(201).json(editedUser);

    } catch (error) {
        console.error('Error in editing the user', error);
        res.status(500).json({ message: error.message });
    }
})

router.post('/addRecipe', async(req, res) => {
    const recipeData = req.body;
    const userId = req.body.userId;
    
    try {
        const result = await recipeService.create(userId, recipeData);
        res.status(201).json(result);

    } catch (error) {
        console.error('Error adding recipe', error);
        res.status(500).json({ message: error.message });
    }
})

router.post('/:userId/favorite/:recipeId', async( req, res) => {
    try {
        const userId = req.params.userId;
        const recipeId = req.params.recipeId;
        await userService.addFavoriteRecipe(userId, recipeId);
        res.status(201).json({message: 'Recipe added to favorites'});
    } catch (error) {
        console.error('Error adding recipe to favorite', error);
        res.status(500).json({ message: error.message });
    }
})

router.delete('/:userId/favorite/:recipeId', async( req, res) => {
    try {
        const userId = req.params.userId;
        const recipeId = req.params.recipeId;
        await userService.removeFavoriteRecipe(userId, recipeId);
        res.status(200).json({ message: 'Recipe is removed from favorites'});
    } catch (error) {
        console.error('Error delete recipe from favorite', error);
        res.status(500).json({ message: error.message });
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
        res.status(200).json(favoriteRecipes);
    } catch (error) {
        console.error('Error in fetching the favorite recipe', error);
        res.status(500).json({ message: error.message });
    }
})

module.exports = router;