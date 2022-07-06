/* eslint-disable react/prop-types */
import React from 'react';
import styles from './DetailRecipeCard.module.css';

function DetailRecipeCard({ recipe }) {
  const { name, summary, image, diets, healthScore, instructions, dishTypes } =
    recipe;
  const defaultImage =
    'https://us.123rf.com/450wm/gioiak2/gioiak21708/gioiak2170800312/84667691-signo-de-interrogaci%C3%B3n-rojo-en-un-plato-sobre-fondo-negro-ilustraci%C3%B3n-3d.jpg';
  return (
    <div id={styles.recipeContainer}>
      <h1 id={styles.name}>{name || 'N/A'}</h1>
      <img src={image || defaultImage} alt={`${name}`} />
      <div id={styles.info}>
        <div id={styles.healthScore}>
          <span id={styles.heart} className={styles.red}>
            &hearts;
          </span>
          <h3>{healthScore || 'N/A'}</h3>
        </div>
        <h3 id={styles.summary}>{summary}</h3>
        <div id={styles.diets}>
          <h2>Diets:</h2>
          {diets &&
            diets.map((d, index) => (
              <h3 key={d.name || d}>
                {d.name || d} {index !== diets.length - 1 ? '-' : ''}
              </h3>
            ))}
        </div>
        <h2>Instructions:</h2>
        {instructions &&
          instructions.map((text, index) => (
            <h3 key={text}>{`${index + 1}: ${text}`}</h3>
          ))}
        <div id={styles.dishTypes}>
          {dishTypes &&
            dishTypes.map((dishType, index) => (
              <h3 key={dishType}>
                {dishType} {index !== dishTypes.length - 1 ? '- ' : ''}
              </h3>
            ))}
        </div>
      </div>
    </div>
  );
}

export default DetailRecipeCard;
