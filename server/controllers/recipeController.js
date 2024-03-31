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
        res.status(500).json({ message: error.message });
    }
})

router.get('/category/recipe/details/:recipeId', async(req, res) => {
    const recipeId = req.params.recipeId;
    try {
        const recipe = await recipeService.getOne(recipeId);
        res.status(200).json(recipe);
    } catch (error) {
        console.error('Error fetching recipe', error);
        res.status(500).json({ message: error.message });
    }
})

router.get('/users/:userId/recipes', async(req, res) => {
    const userId = req.params.userId;

    try {
        const recipes = await Recipe.find({ owner: userId});
        res.status(200).json(recipes);
    } catch (error) {
        console.error('Error fetching user recipes:', error);
        res.status(500).json({ message: error.message });  
    };
})

router.put('/users/recipe/edit/:recipeId', async(req, res) => {
    const recipeData = req.body;
    const recipeId = req.params.recipeId;

    try {
        const editedRecipe = await recipeService.editRecipe(recipeId, recipeData);
        res.status(201).json(editedRecipe);
    } catch (error) {
        console.error('Error editing the recipe', error);
        res.status(500).json({ message: error.message })
    }
})

router.delete('/users/recipe/delete/:recipeId', async(req, res) => {
    const recipeId = req.params.recipeId;
    try {
        const deletedRecipe = await recipeService.deleteRecipe(recipeId);

        if(deletedRecipe){
            res.status(200).json(deletedRecipe);
        }else{
            res.status(404).json({ error: 'Recipe not found'})
        }
    } catch (error) {
        console.error('Error deleting the recipe', error);
        res.status(500).json({ message: error.message })
    }

})

router.get('/home/last-three-recipes', async(req, res) => {
    try {
        const recipes = await recipeService.getLatest();
        res.status(200).json(recipes);
    } catch (error) {
        console.error('Error fetching the recipe', error);
        res.status(500).json({ message: error.message });
    }
})

router.get('/admin/recipes', async(req, res) => {
    try{
        const recipes = await recipeService.getAllRecipes();

        res.status(200).json(recipes);
    }catch (error) {
        console.error('Error in fetching the recipes', error);
        res.status(500).json({ message: error.message });
    }
})

module.exports = router;
