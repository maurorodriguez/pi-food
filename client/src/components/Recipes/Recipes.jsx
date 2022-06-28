import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Recipes.module.css';
import { getRecipes, setLoading } from '../../redux/actions/actions';
import RecipeCard from '../RecipeCard/RecipeCard';
import Loader from '../Loader/Loader';
import Pagination from '../Pagination/Pagination';
import FilterRecipes from '../FilterRecipes/FilterRecipes';

function Recipes() {
  const dispatch = useDispatch();
  const { recipes, recipesToRender, isLoading } = useSelector((state) => state);
  const [currentPage, setCurrentPage] = useState(1);
  const maxPerPage = 9;
  const maxPages = Math.ceil(recipesToRender.length / maxPerPage);

  const defaultImage =
    'https://us.123rf.com/450wm/gioiak2/gioiak21708/gioiak2170800312/84667691-signo-de-interrogaci%C3%B3n-rojo-en-un-plato-sobre-fondo-negro-ilustraci%C3%B3n-3d.jpg';

  useEffect(() => {
    if (!recipes) {
      dispatch(setLoading(true));
      dispatch(getRecipes());
    }
    setCurrentPage(1);
  }, [dispatch, recipes, recipesToRender]);

  return (
    <div id={styles.container}>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        maxPages={maxPages}
      />
      <div id={styles.filters}>
        <FilterRecipes />
      </div>
      <div id={styles.recipesContainer}>
        {isLoading ? (
          <Loader />
        ) : (
          recipesToRender
            .slice(maxPerPage * (currentPage - 1), maxPerPage * currentPage)
            .map((r) => (
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
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        maxPages={maxPages}
      />
    </div>
  );
}

export default Recipes;
