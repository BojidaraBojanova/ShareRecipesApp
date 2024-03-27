const Recipe = require('../models/Recipe');

exports.getOne = (recipeId) => Recipe.findById(recipeId);

exports.create = async(userId, recipeData) => {
    const createdRecipe = await Recipe.create({
        ...recipeData,
        owner: userId
    });

    return createdRecipe;
};

exports.editRecipe = async(recipeId, recipeData) => {
    const updatedRecipe = await Recipe.findByIdAndUpdate(recipeId, recipeData, {new: true, runValidators: true});

    return updatedRecipe;
}

exports.deleteRecipe = (recipeId) => Recipe.findByIdAndDelete(recipeId);