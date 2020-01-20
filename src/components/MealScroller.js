import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/MealScroller.module.css';

function MealScroller({
  meals,
  label,
  meal,
}) {
  return (
    <div className={styles.main}>
      <div className={styles.label}>
        {label}
      </div>
      {meal.name}
    </div>
  );
}

MealScroller.propTypes = {
  meals: PropTypes.object,
  meal: PropTypes.object,
  label: PropTypes.string,
};

export default MealScroller;
