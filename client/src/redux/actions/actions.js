import axios from 'axios';
import { GET_RECIPES, SET_RECIPES_TO_RENDER } from './actionTypes';

export function getRecipes() {
  return async (dispatch) => {
    // dispatch({ type: IS_LOADING, payload: true });
    const recipes = await axios.get('http://192.168.1.110:3001/recipes');
    dispatch({ type: GET_RECIPES, payload: recipes.data });
    dispatch({ type: SET_RECIPES_TO_RENDER, payload: recipes.data });
    // dispatch({ type: IS_LOADING, payload: false });
  };
}

export function setRecipesToRender(value) {
  return (dispatch) => {
    dispatch({ type: GET_RECIPES, payload: value });
  };
}

export function searchRecipes(name) {
  return async (dispatch) => {
    // dispatch({ type: IS_LOADING, payload: true })
    const recipes = await axios.get(
      `http://192.168.1.110:3001/recipes?name=${name}`
    );
    await dispatch({ type: SET_RECIPES_TO_RENDER, payload: recipes.data });
    // dispatch({ type: IS_LOADING, payload: false })
  };
}
