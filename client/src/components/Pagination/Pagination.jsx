/* eslint-disable no-unused-expressions */
/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import styles from './Pagination.module.css';

function Pagination({ currentPage, setCurrentPage, maxPages }) {
  const setPage = (page) => {
    setCurrentPage(page);
  };
  const [prevButton, setPrevButton] = useState(false);
  const [nextButton, setNextButton] = useState(false);
  const buttons = [];

  function scrollTop() {
    if (
      document.body.scrollTop > 200 ||
      document.documentElement.scrollTop > 200
    ) {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }
  }

  let firstButton = currentPage > 3 ? currentPage - 2 : 1;
  if (currentPage + 1 >= maxPages) firstButton = maxPages - 4;
  if (firstButton < 1) firstButton = 1;

  for (let i = firstButton; i <= maxPages && buttons.length < 5; i += 1) {
    buttons.push(
      <button
        key={i}
        className={`setButton btn${i} ${styles.paginationButton} ${
          i === currentPage ? styles.actualPage : ''
        }`}
        onClick={() => {
          setPage(i);
          scrollTop();
        }}
      >
        {i}
      </button>
    );
  }

  useEffect(() => {
    currentPage < 2 ? setPrevButton(false) : setPrevButton(true);
    currentPage >= maxPages ? setNextButton(false) : setNextButton(true);
  }, [currentPage, maxPages]);

  return (
    <div>
      {prevButton && (
        <button
          className={styles.paginationButton}
          onClick={() => {
            setPage(currentPage - 1);
          }}
        >
          &lt;
        </button>
      )}
      {buttons}
      {nextButton && (
        <button
          className={styles.paginationButton}
          onClick={() => {
            setPage(currentPage + 1);
          }}
        >
          &gt;
        </button>
      )}
    </div>
  );
}

export default Pagination;
