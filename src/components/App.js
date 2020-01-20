import React, { useEffect, useRef, useState } from 'react';
import uuidv4 from 'uuid/v4';
import { saveData } from '../utilities/file';
import { useLocalStorage } from '../utilities/storage';
import mealPickerData from '../data/mealPicker.json';
import Header from './Header';
import Meals from './Meals';
import Picker from './Picker';
import styles from '../styles/App.module.css';

function App() {
  const mainRef = useRef(null);
  const [meals, setMeals] = useLocalStorage('mealPickerMeals', mealPickerData.meals);
  const [favorites, setFavorites] = useLocalStorage('mealPickerFavorites', mealPickerData.favorites);
  const [dayMeals, setDayMeals] = useLocalStorage('mealPickerDayMeals', getDefaultDayMeals());
  const [startX, setStartX] = useState(null);
  const [showMeals, setShowMeals] = useState(false);

  useEffect(() => {
    console.log('START', '\n meals', meals, '\n favs', favorites, '\n days', dayMeals, '\n data', mealPickerData);
  }, []);

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

  function addMeal(name) {
    const meal = {
      name,
      guid: uuidv4(),
    };
    console.log('ADD-MEAL', meal.name, meal.guid);
    setMeals((meals) => {
      return {
        ...meals,
        [meal.guid]: meal,
      };
    });
  }

  function removeMeal(guid) {
    console.log('REM-MEAL', guid);
    setMeals((meals) => meals.filter((meal) => meal.guid !== guid));
  }

  function exportData() {
    const data = {
      meals,
      favorites,
    };
    saveData(data, 'mealPicker.json');
  }

  function getDefaultDayMeals() {
    //??? remove default
    return [
      { day: 6, guid: 'f686936c-d0c5-4fd3-aa50-a0206470f325' },
      { day: 0, guid: '' },
      { day: 1, guid: '' },
      { day: 2, guid: '' },
      { day: 3, guid: '' },
      { day: 4, guid: '' },
      { day: 5, guid: '' },
    ];
  }

  function setDayMeal(day, guid) {
    console.log('SET-DAY-MEAL', day, guid);
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
            <Picker
              meals={meals}
              dayMeals={dayMeals}
              setDayMeal={setDayMeal}
            />
          )}
          {showMeals && (
            <Meals
              meals={meals}
              favorites={favorites}
              addMeal={addMeal}
              removeMeal={removeMeal}
              exportData={exportData}
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
