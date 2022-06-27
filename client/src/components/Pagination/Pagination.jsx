/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import styles from './Pagination.module.css';

function Pagination({ currentPage, setCurrentPage, maxPages }) {
  const setPage = (page) => {
    setCurrentPage(page);
  };

  function scrollTop() {
    if (
      document.body.scrollTop > 200 ||
      document.documentElement.scrollTop > 200
    ) {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }
  }

  const [prevButton, setPrevButton] = useState(false);
  const [nextButton, setNextButton] = useState(false);

  let firstButton = currentPage > 3 ? currentPage - 2 : 1;
  if (currentPage + 1 >= maxPages) firstButton = maxPages - 4;
  if (firstButton < 1) firstButton = 1;

  const buttons = [];
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
    // eslint-disable-next-line no-unused-expressions
    currentPage < 2 ? setPrevButton(true) : setPrevButton(false);
    // eslint-disable-next-line no-unused-expressions
    currentPage >= maxPages ? setNextButton(true) : setNextButton(false);
  }, [currentPage, maxPages]);

  return (
    <div>
      <button
        className={styles.paginationButton}
        disabled={prevButton}
        onClick={() => {
          setPage(currentPage - 1);
        }}
      >
        &lt;
      </button>
      {buttons}
      <button
        className={styles.paginationButton}
        disabled={nextButton}
        onClick={() => {
          setPage(currentPage + 1);
        }}
      >
        &gt;
      </button>
    </div>
  );
}

export default Pagination;
