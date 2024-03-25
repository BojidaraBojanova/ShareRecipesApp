const Recipe = require('../models/Recipe');

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

module.exports = router;
