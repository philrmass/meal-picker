import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/Meals.module.css';

function Meals({
  meals,
  favorites,
  addMeal,
  removeMeal,
  setFavorite,
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
    const sorted = Object.values(meals).sort((a, b) => a.name.localeCompare(b.name));
    return sorted.map((meal) => {
      const isFavorite = favorites.includes(meal.guid);
      const mealStyle = `${styles.meal} ${isFavorite ? styles.favorite : ''}`;
      return (
        <div
          key={meal.guid}
          className={mealStyle}
          onClick={() => setFavorite(meal.guid, !isFavorite)}
        >
          {meal.name}
          <button
            className={styles.removeButton}
            onClick={() => removeMeal(meal.guid)}
          >
            X
          </button>
        </div>
      );
    });
  }

  return (
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
  );
}

Meals.propTypes = {
  meals: PropTypes.object,
  favorites: PropTypes.arrayOf(PropTypes.string),
  addMeal: PropTypes.func,
  removeMeal: PropTypes.func,
  setFavorite: PropTypes.func,
  exportData: PropTypes.func,
};

export default Meals;
