import axios from 'axios';
import {
  GET_RECIPES,
  SET_RECIPES_TO_RENDER,
  IS_LOADING,
  GET_DIETS,
  FILTER_BY_DIETS,
  RESET_RECIPES_TO_RENDER,
  SORT_BY_NAME,
  SORT_BY_HEALTHSCORE,
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
    dispatch({ type: GET_RECIPES, payload: value });
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
