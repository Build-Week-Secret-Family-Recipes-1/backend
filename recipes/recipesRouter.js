const router = require('express').Router()
const Recipes = require('./recipes-model')

router.get('/', async (req, res, next) => {
  try {
    const recipes = await Recipes.find()
    res.json(recipes)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const recipe = await Recipes.findById(req.params.id)
    res.json(recipe)
  } catch (error) {
    next(error)
  }
})

module.exports = router