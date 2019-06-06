import React from 'react';
import { Button, Pagination } from 'react-bootstrap';
import _ from 'lodash';
import styles from './CostcoPagination.module.css';
import { Container } from 'react-bootstrap';

//Scroll to top button
// import BackToTop from "react-back-to-top";
import { Col, Row } from 'react-bootstrap';

export const CostcoPagination = ({
  itemsCount,
  pageSize,
  onPageChange,
  currentPage,
  maxLink,
  onHandleNext,
  onHandlePrevious
}) => {
  const median = Math.ceil(Number(maxLink) / 2);
  const pagesCount = Math.ceil(Number(itemsCount) / Number(pageSize));
  let startPage = '';
  let endPage = '';

  if (pagesCount === 1) {
    return null;
  }

  if (currentPage <= median || pagesCount <= maxLink) {
    startPage = 1;
    endPage = pagesCount <= maxLink ? pagesCount : maxLink;
  } else {
    const calculatedEndPage = currentPage + (median - 1);
    endPage = calculatedEndPage <= pagesCount ? calculatedEndPage : pagesCount;
    startPage = endPage - (maxLink - 1);
  }
  const pageRange = _.range(startPage, endPage + 1);

  return (
    <Container>
      <div className={styles.costcoPagination}>
        <hr />
        <div>
          <Pagination size="sm">
            {currentPage > 1 ? (
              <Pagination.Item className={styles['previous-styling']}>
                <Button
                  type="button"
                  onClick={() => onHandlePrevious('Previous')}
                >
                  &lt;
                </Button>
              </Pagination.Item>
            ) : null}
            {pageRange.map(page => (
              <Pagination.Item
                key={page}
                active={page === currentPage}
                className={
                  currentPage === page
                    ? [
                        styles['pagination-style-active'],
                        styles['pagination-style']
                      ].join(' ')
                    : styles['pagination-style']
                }
              >
                <Button
                  type="button"
                  className={
                    currentPage === page
                      ? styles['button-style-active']
                      : styles['button-style']
                  }
                  onClick={() => onPageChange(page)}
                >
                  {page}
                </Button>
              </Pagination.Item>
            ))}
            {currentPage !== pagesCount && pagesCount > 0 ? (
              <Pagination.Item className={styles['next-styling']}>
                <Button type="button" onClick={() => onHandleNext('Next')}>
                  &gt;
                </Button>
              </Pagination.Item>
            ) : null}
            <Container>
              <button
                className="btn btn-link col-md-5"
                onClick={() => window.scrollTo(0, 0)}
              >
                Back To Top
              </button>
            </Container>
          </Pagination>
        </div>
        <hr />
      </div>
    </Container>
  );
};
