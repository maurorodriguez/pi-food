import React from 'react';
import {Link} from 'react-router-dom';
import styles from './LandingPage.module.css';

function LandingPage() {
  return (
    <div id={styles.container}>
      <Link className={styles.button} to="home"> ENTER TO PI-FOOD</Link>
    </div>
  )
}

export default LandingPage