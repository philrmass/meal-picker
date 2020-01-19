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
        {!showMeals && (
          <Picker />
        )}
        {showMeals && (
          <Meals
            close={() => setShowMeals(false)}
          />
        )}
      </div>
    </div>
  );
}

export default App;
