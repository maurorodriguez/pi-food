/* eslint-disable default-param-last */
import {
  GET_RECIPES,
  IS_LOADING,
  SET_RECIPES_TO_RENDER,
  GET_DIETS,
  FILTER_BY_DIETS,
  RESET_RECIPES_TO_RENDER,
  SORT_BY_NAME,
  SORT_BY_HEALTHSCORE,
} from '../actions/actionTypes';

const initialState = {
  isLoading: undefined,
  recipes: undefined,
  filteredRecipes: undefined,
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
        filteredRecipes: state.recipesToRender.filter((r) =>
          r.diets.find((d) => (d.name || d) === payload)
        ),
      };

    case RESET_RECIPES_TO_RENDER:
      return {
        ...state,
        filteredRecipes: undefined,
        recipesToRender: state.recipes,
      };

    case IS_LOADING:
      return {
        ...state,
        isLoading: payload,
      };

    case SORT_BY_NAME:
      if (state.filteredRecipes) {
        return {
          ...state,
          filteredRecipes: state.filteredRecipes.sort((recipeA, recipeB) =>
            recipeA.name > recipeB.name ? payload : payload * -1
          ),
        };
      }
      return {
        ...state,
        recipesToRender: state.recipesToRender.sort((recipeA, recipeB) =>
          recipeA.name > recipeB.name ? payload : payload * -1
        ),
      };

    case SORT_BY_HEALTHSCORE:
      if (state.filteredRecipes) {
        return {
          ...state,
          filteredRecipes: state.filteredRecipes.sort((recipeA, recipeB) =>
            recipeA.healthScore > recipeB.healthScore ? payload * -1 : payload
          ),
        };
      }
      return {
        ...state,
        recipesToRender: state.recipesToRender.sort((recipeA, recipeB) =>
          recipeA.healthScore > recipeB.healthScore ? payload * -1 : payload
        ),
      };

    default:
      return state;
  }
}
