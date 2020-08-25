const db = require('../data/dbconfig')

async function find() {
  return await db('recipes')
}

function findRecipeById(id) {
  return db('recipes')
    .where('recipes.id', id)
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
  findRecipeById,
  addRecipe
}

