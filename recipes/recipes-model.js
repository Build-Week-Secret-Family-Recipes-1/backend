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

const addRecipe= (recipe) => {
  return db ('recipes')
  .insert(recipe)
  .then(ids => {
    return findRecipeById(ids[0])
  })
}

module.exports = {
  find,
  findById,
  findInstructions,
  addRecipe
}

