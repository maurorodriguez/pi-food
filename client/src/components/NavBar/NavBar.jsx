import React from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import styles from './NavBar.module.css';
import backImage from '../../images/back.png';

function Navbar() {
  const { pathname } = useLocation();
  const history = useHistory();

  const handleBack = () => {
    history.goBack();
  };

  return (
    <div id={styles.navbar}>
      <button id={styles.backBtn} type="button" onClick={handleBack}>
        <img src={backImage} alt="" />
      </button>
      {pathname === '/home' && <SearchBar />}
      {pathname !== '/recipe/create' && (
        <Link className={styles.createRecipeBtn} to="/recipe/create">
          CREATE
        </Link>
      )}
    </div>
  );
}

export default Navbar;
