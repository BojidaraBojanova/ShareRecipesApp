const Recipe = require('../models/Recipe');
const recipeService = require('../services/recipeService');

const router = require('express').Router();

router.get('/category/recipes/:categoryId', async(req, res) => {
    const categoryId = req.params.categoryId;
    try {
        const recipes = await Recipe.find({ category: categoryId });
        res.status(200).json(recipes);
    } catch (error) {
        console.error('Error fetching recipes by category', error);
        res.status(500).json({ message: 'Server Error' });
    }
})

router.get('/category/recipe/details/:recipeId', async(req, res) => {
    const recipeId = req.params.recipeId;
    console.log(recipeId)
    try {
        const recipe = await recipeService.getOne(recipeId);
        console.log(recipe);
        res.status(200).json(recipe);
    } catch (error) {
        console.error('Error fetching recipe', error);
        res.status(500).json({ message: 'Server Error' });
    }
})

router.get('/users/:userId/recipes', async(req, res) => {
    const userId = req.params.userId;

    try {
        const recipes = await Recipe.find({ owner: userId});
        res.status(200).json(recipes);
    } catch (error) {
        console.error('Error fetching user recipes:', error);
        res.status(500).json({message: 'Server Error'});  
    };
})

module.exports = router;
