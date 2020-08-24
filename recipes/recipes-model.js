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

// ADDING A NEW RECIPE for user ID
// router.post('/user/:id', (req, res) => {
//   const user_id = req.params.id;
//   const {title, source, ingredients, instructions,category, image} = req.body;
//    const newRecipe = {
//       title, source, ingredients, instructions, category, image,
//        user_id
//    }
//   console.log(newRecipe);
//   Users.findById(user_id)
//   .then(user => {
//     user ?
//     Recipes.add(newRecipe)
//       .then((post) => {
//           res.status(201).json({ success: `The following has been added to the User with an ID of ${user_id}...`, newRecipe })
//        })
//          .catch((err) => {
//              res.status(401).json({ error: 'Failed to post recipe'})
//           }):null
//   })
//   .catch((err) => {
//       res.status(500).json({ error: 'There was an error reaching the database!' })
//                    })
// })
// const add= (recipe) => {
//   return db ('recipes')
//   .insert(recipe)
//   .then(ids => {
//     return findRecipeById(ids[0])
//   })
// }