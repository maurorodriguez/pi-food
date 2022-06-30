/* eslint-disable no-param-reassign */
/* eslint-disable react/prop-types */
import React from 'react';
import { useDispatch } from 'react-redux';
import styles from './SortBy.module.css';
import {
  sortByName,
  sortByHealthScore,
  resetRecipesToRender,
} from '../../redux/actions/actions';

function SortBy({ setCurrentPage }) {
  const dispatch = useDispatch();

  const setPage = () => {
    setCurrentPage(1);
  };

  const handleOption = (target) => {
    const { value } = target;
    target.value = '';
    setPage(1);

    switch (value) {
      case 'nameAZ':
        return dispatch(sortByName(1));

      case 'nameZA':
        return dispatch(sortByName(-1));

      case 'bestHealthScores':
        return dispatch(sortByHealthScore(1));

      case 'worstHealthScores':
        return dispatch(sortByHealthScore(-1));

      default:
        return dispatch(resetRecipesToRender());
    }
  };

  return (
    <div id={styles.sortByContainer}>
      <h2 id={styles.sortByText}>Sort by:</h2>
      <div id={styles.sortDiets}>
        <select
          name="sortByDiets"
          id="sortByDiets"
          onChange={(e) => handleOption(e.target)}
        >
          <option value="" />
          <option value="reset">Reset Filters</option>
          <option value="nameAZ">Name A-Z</option>
          <option value="nameZA">Name Z-A</option>
          <option value="bestHealthScores">Best HealthScores</option>
          <option value="worstHealthScores">Worst HealthScores</option>
        </select>
      </div>
    </div>
  );
}

export default SortBy;
