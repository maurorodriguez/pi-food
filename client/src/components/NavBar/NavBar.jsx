import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import styles from './NavBar.module.css';

function Navbar() {
  return (
    <div id={styles.navbar}>
      <SearchBar />
      <Link className={styles.createRecipe} to="/recipe/create">
        CREATE
      </Link>
    </div>
  );
}

export default Navbar;
