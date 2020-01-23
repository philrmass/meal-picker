import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/MealScroller.module.css';
//??? rename showTime to index

function MealScroller({
  meal,
  label,
  showTime,
  pickRandomMealName,
}) {
  const namesPerS = 6;
  const msPerName = 1000 / namesPerS;
  const namesWrap = useRef(null);
  const [top, setTop] = useState(-200);
  const [names, setNames] = useState([]);

  useEffect(() => {
    const now = Date.now();
    const isActive = showTime > now;
    if (isActive) {
      const diff = showTime - now;
      const nameCount = Math.ceil(diff / msPerName);
      const vals = new Array(nameCount - 1).fill(0);
      const randomNames = vals.map(() => pickRandomMealName());
      const offset = -100 * (randomNames.length + 2);
      console.log(label.slice(0,3), 'NAMES', offset, nameCount);

      setNames([meal.name, ...randomNames, '']);
      setTop(offset);
      animate(offset, diff);
    } else {
      console.log(label.slice(0,3), 'NAME');
      setNames([meal.name]);
      setTop(0);
    }
  }, [showTime]);

  function animate(offset, time) {
    const offsetPerMs = offset / time;

    function updateTop(timestamp) {
      const now = Date.now();
      const isActive = showTime > now;

      if (isActive) {
        const remaining = showTime - now;
        const offset = Math.round(offsetPerMs * remaining);
        setTop(offset);

        //??? setTop():
        window.requestAnimationFrame(updateTop);
      } else {
        setTop(0);
      }
    }
    window.requestAnimationFrame(updateTop);
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
    <div className={styles.main}>
      <div className={styles.label}>
        {label}
      </div>
      {buildName()}
    </div>
  );
}

MealScroller.propTypes = {
  meal: PropTypes.object,
  label: PropTypes.string,
  showTime: PropTypes.number,
  pickRandomMealName: PropTypes.func,
};

export default MealScroller;
