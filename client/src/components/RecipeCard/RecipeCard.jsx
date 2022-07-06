/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './RecipeCard.module.css';

function RecipeCard({ id, name, diets, image, dishTypes, healthScore, steps }) {
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
            <span id={styles.heart} className={styles.red}>
              &hearts;
            </span>
            <h3>{healthScore || 'N/A'}</h3>
          </div>
          <div id={styles.dishTypes}>
            {dishTypes &&
              dishTypes.map((dishType, index) => (
                <span key={dishType}>
                  {dishType} {index !== dishTypes.length - 1 ? '- ' : ''}
                </span>
              ))}
          </div>
          <h3>Steps: {steps || 'N/A'}</h3>
        </div>
      </div>
    </Link>
  );
}

export default RecipeCard;
