/* eslint-disable no-param-reassign */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getDiets,
  filterByDiets,
  resetRecipesToRender,
} from '../../redux/actions/actions';
import styles from './FilterRecipes.module.css';

function FilterRecipes() {
  const dispatch = useDispatch();
  const { diets } = useSelector((state) => state);
  const handleDietsFilter = (target) => {
    const { value } = target;
    if (value !== '' && value !== 'reset') {
      target.value = '';
      return dispatch(filterByDiets(value));
    }

    return value === 'reset' ? dispatch(resetRecipesToRender()) : null;
  };

  useEffect(() => {
    if (!diets) {
      dispatch(getDiets());
    }
  }, [diets, dispatch]);

  return (
    <div id={styles.filterContainer}>
      <h2 id={styles.filterText}>Filter by diets</h2>
      <div id={styles.filterDiets}>
        <select
          name="filterDiets"
          id="filterDiets"
          onChange={(e) => {
            handleDietsFilter(e.target);
          }}
        >
          <option value="" />
          <option value="reset">Reset Filters</option>
          {diets &&
            diets.map((d) => (
              <option key={d.name} value={d.name}>
                {d.name}
              </option>
            ))}
        </select>
      </div>
    </div>
  );
}

export default FilterRecipes;
