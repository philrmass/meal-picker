import React, { useRef, useState } from 'react';
import Header from './Header';
import Meals from './Meals';
import Picker from './Picker';
import styles from '../styles/App.module.css';

function App() {
  const mainRef = useRef(null);
  const [showMeals, setShowMeals] = useState(false);
  const [startX, setStartX] = useState(null);

  function handleStart(event) {
    const x = getX(event);
    setStartX(x);
  }

  function handleMove(event) {
    handleSwipe(getX(event) - startX);
  }

  function handleEnd() {
    setOffset(0);
  }

  function handleSwipe(delta) {
    const deadZone = 20;
    const swipeChange = 140;
    const absDelta = Math.abs(delta);
    const swipe = absDelta > deadZone ? absDelta : 0;
    const isRight = delta > 0;
    if (isRight && !showMeals) {
      setOffset(swipe);
      if (swipe > swipeChange) {
        setShowMeals(true);
        setOffset(0);
      }
    }
    if (!isRight && showMeals) {
      setOffset(-swipe);
      if (swipe > swipeChange) {
        setShowMeals(false);
        setOffset(0);
      }
    }
  }

  function getX(event) {
    return event.touches[0].clientX;
  }

  function setOffset(swipe) {
    const scaled = 0.3 * swipe;
    const clipped = Math.max(-30, Math.min(30, scaled));
    mainRef.current.style.setProperty('--page-offset', `${Math.round(clipped)}px`);
  }

  return (
    <div className={styles.page}>
      <Header
        showMeals={setShowMeals}
      />
      <div 
        ref={mainRef}
        className={styles.main}
        onTouchStart={handleStart}
        onTouchMove={handleMove}
        onTouchEnd={handleEnd}
      >
        <div className={styles.left}>
        </div>
        <div className={styles.content}>
          {!showMeals && (
            <Picker />
          )}
          {showMeals && (
            <Meals
              close={() => setShowMeals(false)}
            />
          )}
        </div>
        <div className={styles.right}>
        </div>
      </div>
    </div>
  );
}

export default App;
