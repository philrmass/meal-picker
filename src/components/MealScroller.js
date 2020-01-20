import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/MealScroller.module.css';

function MealScroller({ meal }) {
  return (
    <div className={styles.main}>
      {`${meal.name}`}
    </div>
  );
}

MealScroller.propTypes = {
  meal: PropTypes.object,
};

export default MealScroller;
