import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/Header.module.css';

function Header({ showMeals }) {
  return (
    <div className={styles.main}>
      <button className={styles.link} onClick={() => showMeals(true)}>
        Meal
      </button>
      <button className={styles.link} onClick={() => showMeals(false)}>
        Picker
      </button>
    </div>
  );
}

Header.propTypes = {
  showMeals: PropTypes.func,
};

export default Header;
