import PropTypes from 'prop-types';
import styles from '../styles/MealsModal.module.css';

function MealsModal({
  day,
  meals,
  setDayMeal,
  close,
}) {
  function handleClick(guid) {
    setDayMeal(day, true, guid);
    close();
  }

  function buildMeals() {
    const sorted = Object.values(meals).sort((a, b) => a.name.localeCompare(b.name));
    return sorted.map((meal) => (
      <div
        key={meal.guid}
        className={styles.meal}
        onClick={() => handleClick(meal.guid)}
      >
        {meal.name}
      </div>
    ));
  }

  return (
    <div className={styles.main}>
      <div className={styles.modal}>
        <div className={styles.meals}>
          {buildMeals()}
        </div>
        <div className={styles.buttonRow}>
          <button onClick={close}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

MealsModal.propTypes = {
  day: PropTypes.number,
  meals: PropTypes.object,
  setDayMeal: PropTypes.func,
  close: PropTypes.func,
};

export default MealsModal;
