import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/MealScroller.module.css';

function MealScroller({
  day,
  meal,
  label,
  isSet,
  showTime,
  pickRandomMealName,
  setDayMeal,
}) {
  const namesPerS = 6;
  const msPerName = 1000 / namesPerS;
  const namesWrap = useRef(null);
  const [top, setTop] = useState(-200);
  const [names, setNames] = useState([]);

  useEffect(() => {
    const now = Date.now();
    const remainingMs = showTime - now;

    if (remainingMs > 0) {
      const nameCount = Math.ceil(remainingMs / msPerName);
      const vals = new Array(nameCount - 1).fill(0);
      const randomNames = vals.map(() => pickRandomMealName());
      const offset = -100 * (randomNames.length + 2);

      setNames([meal.name, ...randomNames, '']);
      setTop(offset);
      animate(offset, remainingMs);
    } else {
      setNames([meal.name]);
      setTop(0);
    }
  }, [showTime]);

  function animate(offset, time) {
    const offsetPerMs = offset / time;

    function updateTop() {
      const remainingMs = showTime - Date.now();

      if (remainingMs > 0) {
        const offset = Math.round(offsetPerMs * remainingMs);
        setTop(offset);
        window.requestAnimationFrame(updateTop);
      } else {
        setTop(0);
      }
    }
    window.requestAnimationFrame(updateTop);
  }

  function handleClick() {
    //??? check isSet and not scrolling, set or clear guid
    console.log('CLICK', meal.name, day, meal.guid, isSet);
    //setDayMeal(day, meal.guid);
  }

  function buildName() {
    const topStyle = { top: `${Math.round(top)}%` };
    return (
      <div
        className={styles.namesWrap}
        ref={namesWrap}
      >
        <div
          className={styles.names}
          style={topStyle}
        >
          {names.map((name, index) => (
            <div key={index} className={styles.name}> {/*eslint-disable-line react/no-array-index-key*/}
              {name}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.main} onClick={handleClick}>
      <div className={styles.label}>
        {label}
      </div>
      {buildName()}
    </div>
  );
}

MealScroller.propTypes = {
  day: PropTypes.number,
  meal: PropTypes.object,
  label: PropTypes.string,
  isSet: PropTypes.bool,
  showTime: PropTypes.number,
  pickRandomMealName: PropTypes.func,
  setDayMeal: PropTypes.func,
};

export default MealScroller;
