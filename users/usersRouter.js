const router = require("express").Router();
const Recipes = require('../recipes/recipes-model.js');
const Users = require("./users-model.js");
const validate = require("../api/validate.js");

router.use("/:id", validate.user);

router.get("/", (req, res, next) => {
  Users.findAll()
    .then(users => res.status(200).json(users))
    .catch(err => next({ code: 500, message: "Error retrieving users", err }));
}); 

router.get("/:id", (req, res, next) => {
  const user = req.user;
  res.status(200).json(user);
});

router.get('/:id/receipts', (req, res) => {
  const user_id = req.params.id;
  Users.findById(user_id)
  .then(user => {
    user ?
    Recipes.find()
      .then(recipe => res.status(200).json(recipe))
      .catch(err => {
        console.log(err.message);
        res.status(500).json({ error: 'There was an error reaching the database!' })
      }): null
    })
    .catch((err) => {
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
        res.status(401).json({ error: 'Failed to post recipe'})
      }):null
  })
  .catch((err) => {
    res.status(500).json({ error: 'There was an error reaching the database!' })
  })
})


// Validate user before put and delete, only allow logged on user to edit or delete
// Can only edit or delete their own data/account

router.put("/:id", validate.loggedon, (req, res, next) => {
  const { id } = req.params;
  const changes = req.body;
  changes.id = id;

  Users.update(changes, id)
    .then(updated => {
      res.status(200).json(updated);
    })
    .catch(err => next({ code: 500, message: "Error updating user data", err }));
});

router.delete("/:id", validate.loggedon, (req, res, next) => {
  const { id } = req.params;

  Users.remove(id)
    .then(() => res.status(204).end())
    .catch(err => next({ code: 500, message: "Error removing user data", err }));
});

module.exports = router;