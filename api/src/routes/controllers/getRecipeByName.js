const axios = require('axios')
require('dotenv').config();
const {API_KEY} = process.env;
const {Recipe, Diet} = require('../../db');
const {Op} = require('sequelize');

const getRecipeByName = async(req,res,next) => {
    try {
        const {name} = req.query;
        const rawData = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&number=2&apiKey=${API_KEY}`)
        const apiSearch = rawData.data.results.map(recipe => {
            if(recipe.title.toLowerCase().match(name)){
                return {
                    id: recipe.id,
                    name: recipe.title,
                    image: recipe.image,
                    diets: recipe.diets,
                }
            }
        })
        console.log(apiSearch)

        const recipesFromDb = await Recipe.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${name}%`
                }
            },
            include: Diet
        })
    
        res.send(recipesFromDb.concat(apiSearch))
    } catch (error) {
        next(error)
    }
}

module.exports = getRecipeByName;