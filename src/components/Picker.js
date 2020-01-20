import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import MealScroller from './MealScroller';
import styles from '../styles/Picker.module.css';

function Picker({
  meals,
  dayMeals,
  addDayMeal,
}) {
  function buildDays() {
    return dayMeals.map((dayMeal) => {
      //options = {};
      //const label = 
      //new Date().getLocaleDateString();
      const meal = { name: 'yo' };
      return (
        <MealScroller
          key={dayMeal.day}
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
  meals: PropTypes.arrayOf(PropTypes.object),
  dayMeals: PropTypes.arrayOf(PropTypes.object),
  addDayMeal: PropTypes.func,
};

export default Picker;
