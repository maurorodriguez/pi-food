const { Router } = require('express');

const router = Router()

router.get('/', (req,res,next) => {
    res.send('ruta /recipes')
})

router.get('/:id', (req,res,next) => {
    res.send(`ruta /recipes/${req.params.id}`)
})

router.post('/', (req, res, next) => {
    res.send('ruta post de recipes')
})

module.exports = router