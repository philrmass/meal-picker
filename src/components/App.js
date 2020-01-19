import React, { useEffect, useRef, useState } from 'react';
import Header from './Header';
import Meals from './Meals';
import Picker from './Picker';
import styles from '../styles/App.module.css';

function App() {
  const mainRef = useRef(null);
  const [showMeals, setShowMeals] = useState(false);

  useEffect(() => {
    setInterval(() => {
      const sec = Math.round((Date.now() / 1000) % 60);
      mainRef.current.style.setProperty('--page-offset', `${30 - sec}px`);
    }, 1000);
  }, []);

  return (
    <div className={styles.page}>
      <Header
        showMeals={setShowMeals}
      />
      <div className={styles.main} ref={mainRef}>
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
