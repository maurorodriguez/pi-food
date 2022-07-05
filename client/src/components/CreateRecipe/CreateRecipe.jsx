/* eslint-disable no-param-reassign */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDiets, createRecipe } from '../../redux/actions/actions';
import DetailRecipeCard from '../DetailRecipeCard/DetailRecipeCard';
import styles from './CreateRecipe.module.css';

function CreateRecipe() {
  const dispatch = useDispatch();
  const { diets } = useSelector((state) => state);
  const [submitBtnDisabled, setSubmitBtnDisabled] = useState(true);

  const [form, setForm] = useState({
    name: '',
    summary: '',
    healthScore: '',
    instructions: [],
    diets: [],
  });

  const [error, setError] = useState({
    name: true,
    summary: true,
    healthScore: false,
    instructions: false,
    diets: true,
  });

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (!submitBtnDisabled) {
      dispatch(createRecipe(form));
    }
  };

  useEffect(() => {
    if (!diets) {
      dispatch(getDiets());
    }
  }, [diets, dispatch]);

  useEffect(() => {
    if (
      error.name ||
      error.summary ||
      error.healthScore ||
      error.instructions ||
      error.diets
    ) {
      setSubmitBtnDisabled(true);
    } else {
      setSubmitBtnDisabled(false);
    }
  }, [error]);

  const colorOk = '#49ca45';
  const colorWrong = '#fd8585';
  const colorReset = '#383838';

  function handleColor(target, color) {
    target.parentNode.querySelector('small').style.color = color;
  }

  function validateName(e) {
    const { value } = e.target;

    handleColor(e.target, colorWrong);
    setForm({ ...form, name: value });

    if (value.trim() === '') {
      return setError({ ...error, name: 'Please fill the name input' });
    }

    handleColor(e.target, colorOk);
    return setError({ ...error, name: '' });
  }

  function validateSummary(e) {
    const { value } = e.target;
    const valueLength = value.trim().split(' ').length;

    setForm({ ...form, summary: e.target.value });
    handleColor(e.target, colorWrong);

    if (valueLength < 5 || valueLength > 300) {
      return setError({
        ...error,
        summary: true,
      });
    }

    handleColor(e.target, colorOk);
    return setError({ ...error, summary: false });
  }

  function validateHealthscore(e) {
    const value = e.target.value.trim();
    handleColor(e.target, colorWrong);
    setForm({ ...form, healthScore: value });

    if (value === '') {
      return handleColor(e.target, colorReset);
    }

    if (Number.isNaN(value) || value % 1) {
      return setError({
        ...error,
        healthScore: true,
      });
    }

    if (value < 1 || value > 100) {
      return setError({
        ...error,
        healthScore: true,
      });
    }

    handleColor(e.target, colorOk);
    return setError({ ...error, healthScore: false });
  }

  function handleInstructions(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      const value = e.target.value.trim();

      if (value === '') {
        return null;
      }

      setForm({
        ...form,
        instructions: form.instructions.concat(value),
      });

      e.target.value = '';

      if (form.instructions.length === 0) {
        setError({
          ...error,
          instructions: true,
        });
        return handleColor(e.target, colorWrong);
      }

      if (form.instructions.length > 0) {
        setError({
          ...error,
          instructions: false,
        });
        return handleColor(e.target, colorOk);
      }
    }
    return null;
  }

  function handleDeleteInstruction(e, index) {
    e.preventDefault();
    setForm({
      ...form,
      instructions: form.instructions.filter((ins, i) => i !== index),
    });
    const label = e.target.parentNode.parentNode.parentNode;

    if (form.instructions.length === 1) {
      setError({ ...error, instructions: false });
      return handleColor(label, colorReset);
    }

    if (form.instructions.length > 2) {
      setError({
        ...error,
        instructions: false,
      });
      return handleColor(label, colorOk);
    }

    setError({ ...error, instructions: true });
    return handleColor(label, colorWrong);
  }

  function handleDiets(e) {
    const { value } = e.target;
    const diet = diets?.find((d) => d.name === value);
    e.target.value = '';

    if (!form.diets.find((d) => d === value)) {
      if (typeof diet.name === 'string') {
        handleColor(e.target, colorOk);
        setError({ ...error, diets: false });
        return setForm({
          ...form,
          diets: form.diets.concat(value),
        });
      }
    } else {
      return null;
    }

    handleColor(e.target, colorOk);
    return setError({ ...error, diets: true });
  }

  const handleRemoveDiets = (e, diet) => {
    e.preventDefault();
    const label = e.target.parentNode.parentNode.parentNode;

    setForm({
      ...form,
      diets: form.diets.filter((d) => d !== diet),
    });

    if (form.diets.length === 1) {
      handleColor(label, colorWrong);
      return setError({ ...error, diets: true });
    }

    handleColor(label, colorOk);
    return setError({ ...error, diets: false });
  };

  return (
    <div id={styles.createRecipe}>
      <h1 id={styles.title}>Create a Recipe</h1>
      <div id={styles.formAndRecipe}>
        <form id={styles.recipeForm} action="" onSubmit={handleOnSubmit}>
          <label htmlFor={styles.name}>
            <div className={styles.labelTitle}>
              Name: <span>*</span>
            </div>
            <input
              type="text"
              autoComplete="off"
              id={styles.name}
              onChange={validateName}
            />
            <small className={error.name ? 'statusWrong' : 'statusOk'}>
              It cant be empty
            </small>
          </label>

          <label htmlFor={styles.healthScore}>
            <div className={styles.labelTitle}>HealthScore:</div>
            <input
              type="number"
              autoComplete="off"
              id={styles.healthScore}
              onChange={(e) => {
                validateHealthscore(e);
              }}
            />
            <small className={error.healthScore ? 'statusWrong' : 'statusOk'}>
              Integer Between 1 and 100
            </small>
          </label>

          <label htmlFor={styles.summary}>
            <div className={styles.labelTitle}>
              Summary: <span>*</span>
            </div>
            <textarea
              rows="10"
              autoComplete="off"
              id={styles.summary}
              onChange={validateSummary}
            />
            <small className={error.summary ? 'statusWrong' : 'statusOk'}>
              Betwen 5 and 300 words
            </small>
          </label>

          <label htmlFor={styles.diets}>
            <div className={styles.labelTitle}>
              Diets: <span>*</span>
            </div>
            <select name="diets" id="diets" onChange={handleDiets}>
              <option value="none" />
              {diets?.map((d) => (
                <option value={d.name} key={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
            <small>At least 1 type of diet</small>
            <div id={styles.dietsList}>
              {form.diets?.map((d) => (
                <div key={d} className={styles.listItem}>
                  {d}
                  <button
                    type="button"
                    onClick={(e) => handleRemoveDiets(e, d)}
                  >
                    <div>+</div>
                  </button>
                </div>
              ))}
            </div>
          </label>

          <label htmlFor={styles.instructions}>
            <div className={styles.labelTitle}>Instructions:</div>
            <input
              type="text"
              autoComplete="off"
              id={styles.instructions}
              onKeyDown={handleInstructions}
            />
            <small className={error.name ? 'statusWrong' : 'statusOk'}>
              At least 2 instructions
            </small>
            <div id={styles.instructionsList}>
              {form.instructions?.map((ins, index) => (
                <div className={styles.instructionItem} key={index}>
                  {index + 1}: {ins}
                  <button
                    type="button"
                    onClick={(e) => {
                      handleDeleteInstruction(e, index);
                    }}
                  >
                    <div>+</div>
                  </button>
                </div>
              ))}
            </div>
          </label>
        </form>
        <div id={styles.recipeCard}>
          <DetailRecipeCard recipe={form} />
        </div>
      </div>
      <button
        id={styles.submitBtn}
        type="submit"
        onSubmit={handleOnSubmit}
        disabled={submitBtnDisabled}
      >
        CREATE RECIPE
      </button>
    </div>
  );
}

export default CreateRecipe;
