/* eslint-disable default-param-last */
import {
  GET_RECIPES,
  IS_LOADING,
  SET_RECIPES_TO_RENDER,
  GET_DIETS,
  FILTER_BY_DIETS,
  RESET_RECIPES_TO_RENDER,
} from '../actions/actionTypes';

const initialState = {
  isLoading: undefined,
  recipes: undefined,
  filteredRecipes: {},
  recipesToRender: [],
  diets: undefined,
  page: 1,
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_RECIPES:
      return {
        ...state,
        recipes: payload,
        isLoading: false,
      };

    case SET_RECIPES_TO_RENDER:
      return {
        ...state,
        recipesToRender: payload,
        isLoading: false,
      };

    case GET_DIETS:
      return {
        ...state,
        diets: payload,
      };

    case FILTER_BY_DIETS:
      return {
        ...state,
        recipesToRender: state.recipes.filter((r) =>
          r.diets.find((d) => (d.name || d) === payload)
        ),
      };

    case RESET_RECIPES_TO_RENDER:
      return {
        ...state,
        recipesToRender: state.recipes,
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
