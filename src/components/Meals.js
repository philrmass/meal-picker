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

  function handleSubmit(event) {
    event.preventDefault();
    handleAdd();
  }

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleAdd() {
    addMeal(name);
    setName('');
  }

  function buildMeals() {
    return Object.values(meals).map((meal) => {
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
          <form onSubmit={handleSubmit}>
            <input
              type='text'
              className={styles.textInput}
              value={name}
              onChange={handleNameChange}
            />
          </form>
          <button onClick={handleAdd}>Add</button>
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
  meals: PropTypes.object,
  favorites: PropTypes.arrayOf(PropTypes.string),
  addMeal: PropTypes.func,
  removeMeal: PropTypes.func,
  exportData: PropTypes.func,
};

export default Meals;
