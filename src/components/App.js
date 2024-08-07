import { useRef, useState } from 'preact/hooks';
import { v4 as uuidv4 } from 'uuid';
import { saveData } from '../utilities/file';
import { useLocalStorage } from '../utilities/storage';
import mealPickerData from '../data/mealPicker.json';
import Header from './Header';
import Meals from './Meals';
import MealsModal from './MealsModal';
import Picker from './Picker';
import styles from '../styles/App.module.css';

function App() {
  const version = '1.0.0';
  const mainRef = useRef(null);
  const [meals, setMeals] = useLocalStorage('mealPickerMeals', mealPickerData.meals);
  const [favorites, setFavorites] = useLocalStorage('mealPickerFavorites', mealPickerData.favorites);
  const [dayMeals, setDayMeals] = useLocalStorage('mealPickerDayMeals', getDefaultDayMeals());
  const [startX, setStartX] = useState(null);
  const [showMeals, setShowMeals] = useState(false);
  const [modalDay, setModalDay] = useState(-1);

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
    setMeals((meals) => {
      return {
        ...meals,
        [meal.guid]: meal,
      };
    });
  }

  function removeMeal(guid) {
    setFavorites((favorites) => favorites.filter((f) => f !== guid));
    setDayMeals(getDefaultDayMeals());
    setMeals((meals) => Object.keys(meals).reduce((value, mealGuid) => {
      if (mealGuid !== guid) {
        value[mealGuid] = meals[mealGuid];
      }
      return value;
    }, {}));
  }

  function exportData() {
    const data = {
      meals,
      favorites,
    };
    saveData(data, 'mealPicker.json');
  }

  function getDefaultDayMeals() {
    const days = [6, 0, 1, 2, 3, 4, 5];
    return days.map((day) => ({
      day,
      guid: '',
      isSet: false,
      showTime: 0,
    }));
  }

  function pickRandomMeal(excluded = []) {
    const guids = Object.keys(meals).filter((guid) => !excluded.includes(guid));
    const index = Math.floor(guids.length * Math.random());
    return guids[index] || '';
  }

  function pickRandomMealName() {
    return meals[pickRandomMeal()].name;
  }

  function calcShowTime(now, index) {
    const msPerIndex = 400;
    const delay = (1 + index) * msPerIndex;
    return now + delay;
  }

  function clearDayMeals() {
    setDayMeals(getDefaultDayMeals());
  }

  function pickDayMeals() {
    const now = Date.now();
    let index = 0;
    setDayMeals((dayMeals) => {
      const used = dayMeals.reduce((used, dm) => dm.isSet ? [...used, dm.guid] : used, []);
      return dayMeals.map((dayMeal) => {
        if (dayMeal.isSet) {
          used.push(dayMeal.guid);
          return dayMeal;
        }
        const guid = pickRandomMeal(used);
        used.push(guid);
        const showTime = calcShowTime(now, index);
        index++;
        return {
          ...dayMeal,
          guid,
          showTime,
        };
      });
    });
  }

  function setDayMeal(day, isSet, mealGuid) {
    setDayMeals((dayMeals) => {
      const index = dayMeals.findIndex((dayMeal) => dayMeal.day === day);
      if (index < 0) {
        return dayMeals;
      }
      const lastDayMeal = dayMeals[index];
      const guid = mealGuid || lastDayMeal.guid;
      const dayMeal = {
        ...lastDayMeal,
        guid,
        isSet,
      };
      return [...dayMeals.slice(0, index), dayMeal, ...dayMeals.slice(index + 1)];
    });
  }

  function setFavorite(guid, isFavorite) {
    if (isFavorite) {
      setFavorites((favorites) => [...favorites, guid]);
    } else {
      setFavorites((favorites) => favorites.filter((f) => f !== guid));
    }
  }

  return (
    <div className={styles.page}>
      <Header
        version={version}
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
              favorites={favorites}
              pickDayMeals={pickDayMeals}
              clearDayMeals={clearDayMeals}
              setDayMeal={setDayMeal}
              openMealsModal={setModalDay}
              pickRandomMealName={pickRandomMealName}
            />
          )}
          {showMeals && (
            <Meals
              meals={meals}
              favorites={favorites}
              addMeal={addMeal}
              removeMeal={removeMeal}
              setFavorite={setFavorite}
              exportData={exportData}
            />
          )}
        </div>
        <div className={styles.right}>
        </div>
      </div>
      {modalDay >= 0 && (
        <MealsModal
          day={modalDay}
          meals={meals}
          setDayMeal={setDayMeal}
          close={() => setModalDay(-1)}
        />
      )}
    </div>
  );
}

export default App;
