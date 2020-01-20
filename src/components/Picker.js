import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import MealScroller from './MealScroller';
import styles from '../styles/Picker.module.css';

function Picker({
  meals,
  dayMeals,
  addDayMeal,
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
    return dayMeals.map((dayMeal) => {
      const label = days[dayMeal.day];
      const meal = meals[dayMeal.guid] || {};
      return (
        <MealScroller
          key={dayMeal.day}
          meals={meals}
          meal={meal}
          label={label}
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
  meals: PropTypes.object,
  dayMeals: PropTypes.arrayOf(PropTypes.object),
  addDayMeal: PropTypes.func,
};

export default Picker;
