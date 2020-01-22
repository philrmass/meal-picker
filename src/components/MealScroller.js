import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/MealScroller.module.css';

function MealScroller({
  meals,
  meal,
  label,
  showTime,
  pickRandomMealName,
}) {
  const namesWrap = useRef(null);
  const [top, setTop] = useState(-20);
  const [names, setNames] = useState([]);

  useEffect(() => {
    const now = Date.now();
    if (showTime > now) {
      const timePerName = 700;
      const diff = showTime - now;
      const nameCount = Math.ceil(diff / timePerName);
      const vals = new Array(nameCount).fill(0);
      const randomNames = vals.map(() => pickRandomMealName());
      setNames([meal.name, ...randomNames]);
      console.log(label, 'ymin', getYMin());
      /*
      const yMin = getYMin();
      if (top < yMin) {
        setTop(yMin);
      }
      */
    } else {
      setNames([meal.name]);
    }
  }, [showTime]);

  useEffect(() => {
    console.log(label, 'YMIN', getYMin());
  }, [namesWrap.current]);

  function buildName() {
    /*
    setTop((top) => {
    });
    */

    return (
      <div
        className={styles.namesWrap}
        ref={namesWrap}
      >
        <div
          className={styles.names}
          style={{ top }}
        >
          {names.map((name, index) => (
            <div key={index} className={styles.name}>
              {name}
            </div>
          ))}
        </div>
      </div>
    );
    /*
    if (names.length > 0) {
      return (
        <div className={styles.listWrap}>
          <div className={styles.list}>
            {names.map((name, index) => (
              <div
                key={index}
                className={styles.name}
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      );
    }
    return (
      <div className={styles.nameWrap}>
        <div className={styles.name}>
          {meal.name}
        </div>
      </div>
    );
    */
  }

  function getYMin() {
    if (namesWrap.current) {
      return namesWrap.current.clientHeight - namesWrap.current.scrollHeight;
    }
    return 0;
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
