const Recipe = require('../models/Recipe');

exports.create = async(userId, recipeData) => {
    const createdRecipe = await Recipe.create({
        ...recipeData,
        owner: userId
    });

    return createdRecipe;
};