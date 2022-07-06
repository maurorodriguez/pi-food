import axios from 'axios';
import {
  GET_RECIPES,
  SET_RECIPES_TO_RENDER,
  IS_LOADING,
  GET_DIETS,
  GET_RECIPE_BY_ID,
  CLEAR_RECIPE_DETAIL,
  FILTER_BY_DIETS,
  RESET_RECIPES_TO_RENDER,
  SORT_BY_NAME,
  SORT_BY_HEALTHSCORE,
  CREATE_RECIPE,
} from './actionTypes';

export function getRecipes() {
  return async (dispatch) => {
    const recipes = await axios.get('http://192.168.1.110:3001/recipes');
    dispatch({ type: GET_RECIPES, payload: recipes.data });
    dispatch({ type: SET_RECIPES_TO_RENDER, payload: recipes.data });
  };
}

export function setRecipesToRender(value) {
  return (dispatch) => {
    dispatch({ type: SET_RECIPES_TO_RENDER, payload: value });
  };
}

export function searchRecipes(name) {
  return async (dispatch) => {
    const recipes = await axios.get(
      `http://192.168.1.110:3001/recipes?name=${name}`
    );
    dispatch({ type: SET_RECIPES_TO_RENDER, payload: recipes.data });
  };
}

export function getDiets() {
  return async (dispatch) => {
    const diets = await axios.get('http://192.168.1.110:3001/diets');
    dispatch({ type: GET_DIETS, payload: diets.data });
  };
}

export function getRecipeById(id) {
  return async (dispatch) => {
    const recipe = await axios.get(`http://192.168.1.110:3001/recipes/${id}`);
    dispatch({ type: GET_RECIPE_BY_ID, payload: recipe.data });
  };
}

export function clearRecipeDetail() {
  return (dispatch) => {
    dispatch({ type: CLEAR_RECIPE_DETAIL, payload: null });
  };
}

export function filterByDiets(value) {
  return async (dispatch) => {
    dispatch({ type: FILTER_BY_DIETS, payload: value });
  };
}

export function resetRecipesToRender() {
  return (dispatch) => {
    dispatch({ type: RESET_RECIPES_TO_RENDER, payload: null });
  };
}

export function sortByName(sort) {
  return (dispatch) => {
    dispatch({ type: SORT_BY_NAME, payload: sort });
  };
}

export function sortByHealthScore(sort) {
  return (dispatch) => {
    dispatch({ type: SORT_BY_HEALTHSCORE, payload: sort });
  };
}

export function setLoading(value) {
  return (dispatch) => {
    dispatch({ type: IS_LOADING, payload: value });
  };
}

export function createRecipe(recipe) {
  return async (dispatch) => {
    try {
      const { name, summary, healthScore, instructions, diets } = recipe;
      const createdRecipe = await axios.post(
        'http://192.168.1.110:3001/recipes',
        {
          name,
          summary,
          healthScore: healthScore.length ? healthScore : null,
          instructions: instructions.length ? instructions : null,
          diets: diets.length ? diets : null,
        }
      );
      dispatch({ type: CREATE_RECIPE, payload: createdRecipe });
      return {
        status: createdRecipe.status,
      };
    } catch (error) {
      return {
        status: 500,
        error: error.response.data,
      };
    }
  };
}
