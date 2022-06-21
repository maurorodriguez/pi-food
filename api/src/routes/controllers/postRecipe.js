const {Recipe, Diet} = require('../../db');

const postRecipe = async(req, res, next) => {
    try {
        const {name, summary, healthScore, instructions, diets} = req.body;

        const recipe = await Recipe.create({
            name,
            summary,
            healthScore,
            instructions,
        });

        if(diets){
            const dietsSearch = await Diet.findAll({
                where: {
                    name: diets
                }
            })

            await recipe.setDiets(dietsSearch)
        }

        res.status(201).send('Recipe have been successfully created')
    } catch (error) {
        next(error);
    }
}

module.exports = postRecipe