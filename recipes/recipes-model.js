const db = require('../data/dbconfig')

async function find() {
  return await db('recipes')
}

function findById(id) {
  return db('recipes')
    .where('recipes.id', id)
    .select('recipes.name')
}

function findInstructions(id) {
  return db('recipes')
    .where('recipes.id', id)
    .join('steps', 'steps.recipes_id', 'recipes.id')
    .select('steps.description as instruction', 'steps.step as stepOrder')
    .orderBy('steps.step', 'asc')
}

function findIngredients(id) {
  return db('recipes_ingredients')
    .where('recipes_ingredients.recipe_id', id)
    .join('ingredients', 'ingredients.id', 'recipes_ingredients.ingredient_id')
    .select('ingredients.name as ingredient')
}

function findRecipesByIngredient(id) {
  return db('ingredients')
    .where('ingredients.id', id)
    .join('recipes_ingredients', 'ingredients.id', 'recipes_ingredients.ingredient_id')
    .join('recipes', 'recipes.id', 'recipes_ingredients.recipe_id')
    .select('recipes.name as recipe')
}

module.exports = {
  find,
  findById,
  findInstructions,
  findIngredients,
  findRecipesByIngredient,
}