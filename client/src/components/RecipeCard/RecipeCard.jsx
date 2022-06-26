/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './RecipeCard.module.css';
// import heartUrl from '../../images/heart.svg';
import heartUrl from '../../images/heart2.svg';

function RecipeCard({ id, name, diets, image, healthScore, steps }) {
  return (
    <Link id={styles.link} to={`/recipe/detail/${id}`}>
      <div className={styles.recipeContainer}>
        <div className={styles.imageContainer}>
          <img src={image} alt={name} />
        </div>
        <h2 id={styles.name}>{name}</h2>
        <div className={styles.dietsContainer}>
          {diets.map((d) => (
            <h3 className={styles.diets} key={d.name || d}>
              {d.name || d}
            </h3>
          ))}
        </div>
        <div id={styles.info}>
          <div className={styles.healthScore}>
            <img src={heartUrl} alt="" />
            <h3>{healthScore}</h3>
          </div>
          <h3>Steps: {steps || 'N/A'}</h3>
        </div>
      </div>
    </Link>
  );
}

export default RecipeCard;
