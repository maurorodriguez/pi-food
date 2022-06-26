/* eslint-disable default-param-last */
import {
  GET_RECIPES,
  IS_LOADING,
  SET_RECIPES_TO_RENDER,
} from '../actions/actionTypes';

const initialState = {
  isLoading: undefined,
  recipes: [],
  filteredRecipes: {},
  recipesToRender: [],
  diets: {},
  page: 1,
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_RECIPES:
      return {
        ...state,
        recipes: payload,
      };

    case SET_RECIPES_TO_RENDER:
      return {
        ...state,
        recipesToRender: payload,
      };

    case IS_LOADING:
      return {
        ...state,
        isLoading: payload,
      };

    default:
      return state;
  }
}
