import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/Header.module.css';

function Header({
  version,
  showMeals,
}) {
  return (
    <div className={styles.main}>
      <button className={styles.link} onClick={() => showMeals(true)}>
        Meal
      </button>
      <button className={styles.link} onClick={() => showMeals(false)}>
        Picker
      </button>
      <div className={styles.versionBox}>
        <span className={styles.version}>v{version}</span>
      </div>
    </div>
  );
}

Header.propTypes = {
  version: PropTypes.string,
  showMeals: PropTypes.func,
};

export default Header;
