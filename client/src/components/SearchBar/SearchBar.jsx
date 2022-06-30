/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  searchRecipes,
  resetRecipesToRender,
  setLoading,
} from '../../redux/actions/actions';
import styles from './SearchBar.module.css';

function Search() {
  const dispatch = useDispatch();
  const [resetBtnDisabled, setResetBtnDisabled] = useState(true);
  const resetSearch = () => {
    document.querySelector(`#${styles.search}`).value = '';
    dispatch(resetRecipesToRender());
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setResetBtnDisabled(false);
    const value = document.querySelector(`#${styles.search}`)?.value.trim();

    dispatch(setLoading(true));
    dispatch(searchRecipes(value));
  };

  return (
    <form id={styles.form} onSubmit={(e) => handleOnSubmit(e)}>
      <input
        id={styles.search}
        autoComplete="off"
        type="text"
        name="searchRecipe"
        placeholder="Search Recipe"
      />
      <button
        type="reset"
        disabled={resetBtnDisabled}
        id={styles.deleteSearch}
        onClick={() => {
          resetSearch();
          setResetBtnDisabled(true);
        }}
      >
        <span>+</span>
      </button>
    </form>
  );
}

export default Search;
