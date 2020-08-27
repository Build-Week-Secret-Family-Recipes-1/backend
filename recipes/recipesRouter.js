const router = require('express').Router()
const Recipes = require('./recipes-model')
const Users = require('../users/users-model.js');

router.get('/:id/recipes', (req, res) => {
  const {id} = req.params;
  const user_id = id;
  console.log(id)
  Users.findById(id)
  .then(user => {
    user ?
    Recipes.find(user_id)
      .then(recipe => {res.status(200).json(recipe), console.log('recipes', recipe)})
      .catch(err => {
        console.log(err.message, user_id);
        res.status(500).json({ error: 'There was an error reaching the database! Recipes' })
      }): null
    })
    .catch((err) => {
      console.log(err.message, err.response)
      res.status(500).json({ error: 'There was an error reaching the database!' })
    })
})

router.get('/:id/recipes/:title', (req, res) => {
  const { id, title } = req.params;
  const user_id = id;
  console.log('title', id, title)
  Users.findById(id)
  .then(user => {
    user ?
    Recipes.findRecipeByTitle(title, user_id)
      .then(recipe => res.status(200).json(recipe))
      .catch(err => {
        console.log(err.message);
        res.status(500).json({ error: 'There was an error reaching the database!' })
      }): null
    })
    .catch((err) => {
      console.log(err.message)
      res.status(500).json({ error: 'There was an error reaching the database!' })
    })
})

router.get('/:id/:category', (req, res) => {
  const { id, category } = req.params;
  const user_id = id;
  Users.findById(id)
  .then(user => {
    user ?
    Recipes.findRecipeByCategory(category, user_id)
      .then(recipe => res.status(200).json(recipe))
      .catch(err => {
        console.log(err.message);
        res.status(500).json({ error: 'There was an error reaching the database!' })
      }): null
    })
    .catch((err) => {
      console.log(err.message)
      res.status(500).json({ error: 'There was an error reaching the database!' })
    })
})

// ADDING A NEW RECIPE for user ID
router.post('/:id', (req, res) => {
  const user_id = req.params.id;
  const {title, source, ingredients, instructions,category, image} = req.body;
  const newRecipe = {
      title, source, ingredients, instructions, category, image,
      user_id
    }
  console.log(newRecipe);
  Users.findById(user_id)
  .then(user => {
    user ?
    Recipes.addRecipe(newRecipe)
      .then((post) => {
          res.status(201).json({ success: `The following has been added to the User with an ID of ${user_id}...`, newRecipe })
      })
      .catch((err) => {
        console.log(err.message)
        res.status(401).json({ error: 'Failed to post recipe'}, err.message)
      }):null
  })
  .catch((err) => {
    res.status(500).json({ error: 'There was an error reaching the database!' })
  })
})

router.put('/:id/update/:r_id', (req, res) => {
  const { id, r_id } = req.params;
  const changes = req.body;
  
  Users.findById(id)
  .then(user => {
    user ?
    Recipes.updateRecipe(changes, r_id)
      .then((post) => {
          res.status(201).json({ success: `The following has been updated to the User with an ID of ${id}...` })
      })
      .catch((err) => {
        console.log(err.message)
        res.status(401).json({ error: 'Failed to post recipe'})
      }):null
  })
  .catch((err) => {
    res.status(500).json({ error: 'There was an error reaching the database!' })
  })
})

router.delete('/:id/delete/:r_id', (req, res) => {
  const { id, r_id } = req.params;
  
  console.log('r_id', r_id);
  Users.findById(id)
  .then(user => {
    user ?
    Recipes.removeRecipe(r_id)
      .then(count => {
        if (count) {
          res.json({ removed: count });
        } else {
          res.status(404).json({ message: "Could not find user with given id" });
        }
      })
      .catch((err) => {
        console.log('delete', err.message)
        res.status(500).json({ error: 'Failed to delete recipe'})
      }):null
  })
  .catch((err) => {
    res.status(500).json({ error: 'There was an error reaching the database!' })
  })
})


module.exports = router