import { useState } from 'preact/hooks';
import PropTypes from 'prop-types';
import MealScroller from './MealScroller';
import styles from '../styles/Picker.module.css';

function Picker({
  meals,
  dayMeals,
  favorites,
  pickDayMeals,
  clearDayMeals,
  setDayMeal,
  openMealsModal,
  pickRandomMealName,
}) {
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const [selected, setSelected] = useState('');

  function toggleFavorite(guid) {
    setSelected((selected) => selected === guid ? '' : guid);
  }

  function buildDays() {
    return dayMeals.map((dayMeal) => {
      const label = days[dayMeal.day];
      const meal = meals[dayMeal.guid] || {};
      return (
        <MealScroller
          key={dayMeal.day}
          day={dayMeal.day}
          meal={meal}
          label={label}
          isSet={dayMeal.isSet}
          selected={selected}
          showTime={dayMeal.showTime}
          pickRandomMealName={pickRandomMealName}
          setDayMeal={setDayMeal}
          openMealsModal={openMealsModal}
          clearSelected={() => setSelected('')}
        />
      );
    });
  }

  function buildFavorites() {
    return favorites.map((guid) => {
      const isSelected = guid === selected;
      const favoriteStyle = `${styles.favorite} ${isSelected ? styles.selected : ''}`;
      return (
        <div
          key={guid}
          className={favoriteStyle}
          onClick={() => toggleFavorite(guid)}
        >
          {meals[guid].name}
        </div>
      );
    });
  }

  return (
    <div className={styles.main}>
      <div>
        {buildDays()}
        <div className={styles.buttonRow}>
          <button onClick={clearDayMeals} >
            Clear
          </button>
          <button
            className={styles.rollButton}
            onClick={pickDayMeals}
          >
            Roll
          </button>
        </div>
      </div>
      <div className={styles.favoritesTitle}>Favorites</div>
      <div className={styles.favorites}>
        {buildFavorites()}
      </div>
    </div>
  );
}

Picker.propTypes = {
  meals: PropTypes.object,
  dayMeals: PropTypes.arrayOf(PropTypes.object),
  favorites: PropTypes.arrayOf(PropTypes.string),
  pickDayMeals: PropTypes.func,
  clearDayMeals: PropTypes.func,
  setDayMeal: PropTypes.func,
  openMealsModal: PropTypes.func,
  pickRandomMealName: PropTypes.func,
};

export default Picker;
