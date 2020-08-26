const db = require('../data/dbconfig.js');

async function find(user_id) {
  return await db('recipes')
  .where({user_id})
}

function findRecipeByTitle(title, user_id) {
  return db('recipes')
  .where({title, user_id})
}

function findRecipeByCategory(category, user_id) {
  return db('recipes')
    .where({category, user_id})
}

const addRecipe= (recipe) => {
  return db ('recipes')
  .insert(recipe)
}

function updateRecipe(changes, r_id) {
  return db("recipes")
    .where({ r_id })
    .update(changes)
}

function removeRecipe(r_id) {
  return db("recipes")
    .where({r_id})
    .del();
}

module.exports = {
  find,
  findRecipeByTitle,
  addRecipe,
  findRecipeByCategory,
  updateRecipe,
  removeRecipe
}

