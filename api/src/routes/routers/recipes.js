const { Router } = require('express');
const getRecipeByName = require('../controllers/getRecipeByName');
const gerAllRecipes = require('../controllers/getAllRecipes');
const postRecipe = require('../controllers/postRecipe');
const getAllRecipes = require('../controllers/getAllRecipes');
const getRecipeById = require('../controllers/getRecipeById');

const router = Router();

router.get('/', (req, res, next) => {
  const { name } = req.query;
  if (name) return getRecipeByName(req, res, next);

  return getAllRecipes(req, res, next);
});

router.get('/:id', getRecipeById);

router.post('/', postRecipe);

module.exports = router;
