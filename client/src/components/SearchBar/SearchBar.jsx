import React from 'react';
import { useDispatch } from 'react-redux';
import { searchRecipes } from '../../redux/actions/actions';
import styles from './SearchBar.module.css';

function Search() {
  const dispatch = useDispatch();

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const value = document.querySelector(`#${styles.search}`)?.value;

    dispatch(searchRecipes(value));
  };

  return (
    <form id={styles.form} onSubmit={handleOnSubmit}>
      <input
        id={styles.search}
        autoComplete="off"
        type="text"
        name="searchRecipe"
        placeholder="Search Recipe"
      />
    </form>
  );
}

export default Search;
