const { Router } = require('express');
const getRecipeByName = require('../controllers/getRecipeByName')
const postRecipe = require('../controllers/postRecipe');

const router = Router()

router.get('/', getRecipeByName)

router.get('/:id', (req,res,next) => {
    res.send(`ruta /recipes/${req.params.id}`)
})

router.post('/', postRecipe);

module.exports = router