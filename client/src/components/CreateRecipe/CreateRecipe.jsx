/* eslint-disable no-param-reassign */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDiets } from '../../redux/actions/actions';
import styles from './CreateRecipe.module.css';

function CreateRecipe() {
  const dispatch = useDispatch();
  const { diets } = useSelector((state) => state);

  const handleOnSubmit = (e) => {
    e.preventDefault();
  };

  const [nameForm, setNameForm] = useState(undefined);
  const [summaryForm, setSummaryForm] = useState(undefined);
  const [healthScoreForm, setHealthScoreForm] = useState(undefined);
  const [instructionsForm, setInstructionsForm] = useState([]);
  const [dietsForm, setDietsForm] = useState([]);
  const [submitBtnDisabled, setSubmitBtnDisabled] = useState(true);

  useEffect(() => {
    if (!diets) {
      dispatch(getDiets());
    }
  });

  const colorOk = '#49ca45';
  const colorWrong = '#fd8585';

  function handleOk(target) {
    target.parentNode.querySelector('small').style.color = colorOk;
  }

  function handleWrong(target) {
    target.parentNode.querySelector('small').style.color = colorWrong;
  }

  const validateName = (e) => {
    const { value } = e.target;

    if (typeof value === 'string' && value.length > 0) {
      setNameForm(value.trim());
      handleOk(e.target);
    } else {
      setNameForm(undefined);
      handleWrong(e.target);
    }
  };

  const validateSummary = (e) => {
    const { value } = e.target;
    const valueLength = value.trim().split(' ').length;
    if (typeof value === 'string' && valueLength > 4 && valueLength < 301) {
      setSummaryForm(value.trim());
      handleOk(e.target);
    } else {
      setSummaryForm(undefined);
      handleWrong(e.target);
    }
  };

  const validateHealthscore = (e) => {
    const { value } = e.target;

    if (!Number.isNaN(value) && value % 1 === 0 && value > 0 && value < 101) {
      setHealthScoreForm(value);
      handleOk(e.target);
    } else {
      setHealthScoreForm(undefined);
      handleWrong(e.target);
    }
  };

  const handleInstructions = (e) => {
    if (e.key === 'Enter') {
      setInstructionsForm(instructionsForm.concat(e.target.value.trim()));
      e.target.value = '';
      if (instructionsForm.length > 0) {
        handleOk(e.target);
      } else {
        handleWrong(e.target);
      }
    }
  };

  const handleDeleteInstruction = (e, index) => {
    e.preventDefault();
    setInstructionsForm(instructionsForm.filter((ins, i) => i !== index));
    if (instructionsForm.length > 0) {
      handleOk(e.target);
    } else {
      handleWrong(e.target);
    }
  };

  const dietsForCheck = [];

  const handleDiets = (e) => {
    const { value } = e.target;
    const diet = diets?.find((d) => d.name === value);

    if (typeof diet.name === 'string' && !dietsForm.find((d) => d === value)) {
      setDietsForm(dietsForm.concat(value));
    }
  };

  return (
    <div id={styles.createRecipe}>
      <h1 id={styles.title}>Create a Recipe</h1>
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
          <small>It cant be empty</small>
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
          <small>Betwen 5 and 300 words</small>
        </label>

        <label htmlFor={styles.healthScore}>
          <div className={styles.labelTitle}>HealthScore:</div>
          <input
            type="number"
            autoComplete="off"
            id={styles.healthScore}
            onChange={validateHealthscore}
          />
          <small>Integer Between 1 and 100</small>
        </label>

        <label htmlFor={styles.instructions}>
          <div className={styles.labelTitle}>Instructions:</div>
          <input
            type="text"
            autoComplete="off"
            id={styles.instructions}
            onKeyDown={handleInstructions}
          />
          <small>At least 2 instructions</small>
          <div id={styles.instructionsList}>
            {instructionsForm.map((ins, index) => (
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

        <label htmlFor={styles.diets}>
          <div className={styles.labelTitle}>Diets:</div>
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
            {dietsForm?.map((d) => (
              <div key={d}>{d}</div>
            ))}
          </div>
        </label>

        <button type="submit" disabled={submitBtnDisabled}>
          CREATE RECIPE
        </button>
      </form>
    </div>
  );
}

export default CreateRecipe;
