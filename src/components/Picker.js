import React from 'react';
import PropTypes from 'prop-types';
import MealScroller from './MealScroller';
import styles from '../styles/Picker.module.css';

function Picker({
  dayMeals,
  addDayMeal,
}) {
  const dayLabels = [
    'Saturday',
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
  ];

  function buildDays() {
    return dayMeals.map((meal) => {
      //const label = dayLabels[index];
      return (
        <MealScroller
          key={meal.name}
          meal={meal}
        />
      );
    });
  }

  return (
    <div className={styles.main}>
      {buildDays()}
    </div>
  );
}

Picker.propTypes = {
  dayMeals: PropTypes.arrayOf(PropTypes.string),
  addDayMeal: PropTypes.func,
};

export default Picker;
