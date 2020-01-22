import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import MealScroller from './MealScroller';
import styles from '../styles/Picker.module.css';

function Picker({
  meals,
  dayMeals,
  pickDayMeals,
  clearDayMeals,
  setDayMeal,
  pickRandomMealName,
}) {
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  function buildDays() {
    //??? remove slice
    return dayMeals.slice(0, 3).map((dayMeal) => {
      const label = days[dayMeal.day];
      const meal = meals[dayMeal.guid] || {};
      return (
        <MealScroller
          key={dayMeal.day}
          meals={meals}
          meal={meal}
          label={label}
          showTime={dayMeal.showTime}
          pickRandomMealName={pickRandomMealName}
        />
      );
    });
  }

  return (
    <div className={styles.main}>
      <div className={styles.row}>
        <button
          className={styles.rollButton}
          onClick={pickDayMeals}
        >
          Roll
        </button>
      </div>
      {buildDays()}
      <div className={styles.row}>
        <button onClick={clearDayMeals} >
          Clear
        </button>
      </div>
    </div>
  );
}

Picker.propTypes = {
  meals: PropTypes.object,
  dayMeals: PropTypes.arrayOf(PropTypes.object),
  pickDayMeals: PropTypes.func,
  clearDayMeals: PropTypes.func,
  setDayMeal: PropTypes.func,
  pickRandomMealName: PropTypes.func,
};

export default Picker;