import React, { useState } from 'react';
import Header from './Header';
import Meals from './Meals';
import Picker from './Picker';
import styles from '../styles/App.module.css';

function App() {
  const [showMeals, setShowMeals] = useState(false);

  return (
    <div className={styles.page}>
      <Header
        showMeals={setShowMeals}
      />
      <div className={styles.main}>
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
