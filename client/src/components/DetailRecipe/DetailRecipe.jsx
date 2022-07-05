import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getRecipeById, clearRecipeDetail } from '../../redux/actions/actions';
import Loader from '../Loader/Loader';
import DetailRecipeCard from '../DetailRecipeCard/DetailRecipeCard';
import Navbar from '../NavBar/NavBar';
import styles from './DetailRecipe.module.css';

function DetailRecipe() {
  const dispatch = useDispatch();
  const { recipeDetail } = useSelector((state) => state);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getRecipeById(id));

    return () => {
      dispatch(clearRecipeDetail());
    };
  }, [dispatch, id]);

  return (
    <div id={styles.detailRecipe}>
      <div id={styles.navbar}>
        <Navbar />
      </div>
      <div id={styles.detailRecipeCard}>
        {recipeDetail ? <DetailRecipeCard recipe={recipeDetail} /> : <Loader />}
      </div>
    </div>
  );
}

export default DetailRecipe;
