import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/MealScroller.module.css';

function MealScroller({
  meals,
  meal,
  label,
  showTime,
  pickRandomMealName,
}) {
  const [names, setNames] = useState([]);

  useEffect(() => {
    const now = Date.now();
    if (showTime > now) {
      const timePerName = 150;
      const diff = showTime - now;
      const nameCount = Math.ceil(diff / timePerName);
      const vals = new Array(nameCount).fill(0);
      const randomNames = vals.map(() => pickRandomMealName());
      setNames([meal.name, ...randomNames]);
    }
  }, [showTime]);

  function buildName() {
    if (names.length > 0) {
      return (
        <div className={styles.names}>
          {names.map((name, index) => (<div key={index}>{name}</div>))}
        </div>
      );
    }
    return (
      <div className={styles.name}>
        {meal.name}
      </div>
    );
  }

  return (
    <div className={styles.main}>
      <div className={styles.label}>
        {label}
      </div>
      {buildName()}
    </div>
  );
}

MealScroller.propTypes = {
  meals: PropTypes.object,
  meal: PropTypes.object,
  label: PropTypes.string,
  showTime: PropTypes.number,
  pickRandomMealName: PropTypes.func,
};

export default MealScroller;
