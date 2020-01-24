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
    return dayMeals.map((dayMeal) => {
      const label = days[dayMeal.day];
      const meal = meals[dayMeal.guid] || {};
      return (
        <MealScroller
          key={dayMeal.day}
          day={dayMeal.day}
          meal={meal}
          label={label}
          isSet={dayMeal.isSet}
          showTime={dayMeal.showTime}
          pickRandomMealName={pickRandomMealName}
          setDayMeal={setDayMeal}
        />
      );
    });
  }

  return (
    <div className={styles.main}>
      {buildDays()}
      <div className={styles.buttonRow}>
        <button onClick={clearDayMeals} >
          Clear
        </button>
        <button
          className={styles.rollButton}
          onClick={pickDayMeals}
        >
          Roll
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
