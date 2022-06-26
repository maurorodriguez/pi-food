import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Recipes.module.css';
import { getRecipes } from '../../redux/actions/actions';
import RecipeCard from '../RecipeCard/RecipeCard';

function Recipes() {
  const dispatch = useDispatch();
  const { recipes, isLoading, recipesToRender } = useSelector((state) => state);
  const defaultImage =
    'https://us.123rf.com/450wm/gioiak2/gioiak21708/gioiak2170800312/84667691-signo-de-interrogaci%C3%B3n-rojo-en-un-plato-sobre-fondo-negro-ilustraci%C3%B3n-3d.jpg';

  useEffect(() => {
    if (recipes.length < 1) {
      dispatch(getRecipes());
    }
  }, [dispatch, recipes, recipesToRender]);

  return (
    <div className={styles.container}>
      {isLoading ? (
        <div>Aca no hay nada maestro</div>
      ) : (
        recipesToRender.map((r) => (
          <RecipeCard
            key={r.id}
            id={r.id}
            name={r.name}
            image={r.image || defaultImage}
            diets={r.diets}
            healthScore={r.healthScore}
            steps={r.instructions ? r.instructions.length : r.steps}
          />
        ))
      )}
    </div>
  );
}

export default Recipes;
