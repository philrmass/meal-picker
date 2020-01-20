import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/Meals.module.css';

function Meals({
  meals,
  favorites,
  addMeal,
  removeMeal,
  exportData,
}) {
  const [name, setName] = useState('');

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function buildMeals() {
    return meals.map((meal) => {
      return (
        <div
          key={meal.guid}
          className={styles.meal}
        >
          {meal.name}
          <button
            className={styles.removeButton}
            onClick={() => removeMeal(meal.guid)}>X</button>
        </div>
      );
    });
  }

  return (
    <Fragment>
      <div className={styles.main}>
        <div className={styles.addRow}>
          <input
            type='text'
            className={styles.textInput}
            value={name}
            onChange={handleNameChange}
          />
          <button onClick={() => addMeal(name)}>Add</button>
        </div>
        <div className={styles.mealsBox}>
          <div className={styles.meals}>
            {buildMeals()}
          </div>
        </div>
        <div className={styles.buttonRow}>
          <button onClick={exportData}>Export</button>
        </div>
      </div>
    </Fragment>
  );
}

Meals.propTypes = {
  meals: PropTypes.arrayOf(PropTypes.object),
  favorites: PropTypes.arrayOf(PropTypes.string),
  addMeal: PropTypes.func,
  removeMeal: PropTypes.func,
  exportData: PropTypes.func,
};

export default Meals;
