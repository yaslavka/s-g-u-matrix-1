import React, { useState, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';

import arrowLeft from 'static/icons/angle-left.svg';
import arrowRight from 'static/icons/angle-right.svg';
import styles from './SuperStars.module.scss';

function SuperStarPagination({ items, currentId }) {
  const history = useHistory();
  const [currentPage, setCurrentPage] = useState(1);

  const pager = useMemo(() => {
    let end = 5;
    let begin = 0;
    if (currentPage > 3) {
      begin = currentPage - 3;
      end = currentPage + 2;
    }

    if (items.length > 4 && currentPage > items.length - 3) {
      begin = items.length - 5;
      end = items.length;
    }

    return [...items].slice(begin, end);
  }, [currentPage, items]);

  const changePage = page => {
    const elem = items.find(e => e.page === page);
    if (elem) {
      history.push(`/super-star-table/${elem.value}`);
    }

    setCurrentPage(page);
  };

  return (
    <div className={styles.navigation}>
      <div
        className={`${currentPage === 1 ? styles.disabled : undefined} ${
          styles.sideArrow
        }`}
        onClick={() => changePage(1)}
      >
        <img src={arrowLeft} className={styles.arrowLeft} alt="Arrow left" />
      </div>
      <div
        className={`${currentPage === 1 && styles.disabled} ${styles.arrow}`}
        onClick={() => {
          changePage(currentPage - 1 > 1 ? currentPage - 1 : 1);
        }}
      >
        <img src={arrowLeft} className={styles.arrowLeft} alt="Arrow left" />
      </div>
      {!isEmpty(items) &&
        pager.map((elem, i) => {
          return (
            <div
              key={i.toString()}
              className={currentPage === elem.page ? styles.active : undefined}
              onClick={() => changePage(elem.page)}
            >
              {elem.page}
            </div>
          );
        })}
      <div
        className={`${
          currentPage === items.length ? styles.disabled : undefined
        } ${styles.arrow}`}
        onClick={() => changePage(currentPage + 1)}
      >
        <img src={arrowRight} className={styles.arrowRight} alt="Arrow right" />
      </div>
      <div
        className={`${currentPage === items.length && styles.disabled} ${
          styles.sideArrow
        }`}
        onClick={() => changePage(items.length)}
      >
        <img src={arrowRight} className={styles.arrowRight} alt="Arrow right" />
      </div>
    </div>
  );
}

export default SuperStarPagination;
