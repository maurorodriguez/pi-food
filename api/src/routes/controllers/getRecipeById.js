const axios = require('axios');
require('dotenv').config();
const { API_KEY } = process.env;
const { Recipe, Diet } = require('../../db');

const getRecipeById = async (req, res, next) => {
  try {
    const idToSearch = req.params.id;
    let recipe = {};

    if (isNaN(idToSearch)) {
      recipe = await Recipe.findByPk(idToSearch, { include: Diet });
    } else {
      const rawData = await axios.get(
        `https://api.spoonacular.com/recipes/${idToSearch}/information?apiKey=${API_KEY}`
      );

      const {
        id,
        title,
        image,
        summary,
        diets,
        healthScore,
        analyzedInstructions,
      } = rawData.data;

      recipe = {
        id: id,
        name: title,
        image: image,
        diets: diets,
        healthScore: healthScore,
        summary: summary.replace(/(<([^>]+)>)/gi, ''),
        instructions: analyzedInstructions[0]
          ? analyzedInstructions[0].steps.map((step) => {
              return step.step;
            })
          : undefined,
      };
    }
    res.status(200).send(recipe);
  } catch (error) {
    next(error);
  }
};

module.exports = getRecipeById;
