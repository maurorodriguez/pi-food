import React from 'react';
import NavBar from '../NavBar/NavBar';
import Recipes from '../Recipes/Recipes';
import styles from './MainRoute.module.css';

function MainRoute() {
  return (
    <div id={styles.container}>
      <div id={styles.navbar}>
        <NavBar />
      </div>
      <div id={styles.recipes}>
        <Recipes />
      </div>
    </div>
  );
}

export default MainRoute;
