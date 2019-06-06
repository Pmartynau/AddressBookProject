import React from 'react';
import { sorts } from '../../Assets/addressSort';
import * as stringConst from '../../Assets/stringConstant/stringConstant';
import styles from './AddressSort.module.css';
import PropTypes from 'prop-types';

import { Col, Row, Container } from 'react-bootstrap';
/**
 * sort by dropdown
 *
 * @param {props} {
 *   onChangeSortCriteria,
 *   totalCount,
 *   pageSize,
 *   currentPage
 * }
 * @returns JSX element to display the sort by dropdown and the showing result count
 */
export const AddressSort = ({
  onChangeSortCriteria,
  totalCount,
  pageSize,
  currentPage
}) => {
  //calculate the start item number and end item number
  //and total items to be displayed in "showing result" section
  const startItemNumber = (currentPage - 1) * pageSize + 1;
  let endItemNumber = startItemNumber + pageSize - 1;
  if (totalCount < endItemNumber) {
    endItemNumber = totalCount;
  }
  //Showing result of number of address cards on the page
  const showingResult = `Showing result ${startItemNumber} - ${endItemNumber} of ${totalCount}`;

  return (
    <>
      <Container>
        <Row>
          <div className={['d-lg-none col', styles.showingResult].join(' ')}>
            {totalCount > 0 ? showingResult : ''}
          </div>
        </Row>

        <Row>
          <Col lg={0} className={styles.sortlabel}>
            {/* Title for the Sort By:  */}
            <label htmlFor="sort_by">{stringConst.SORT_BY}</label>
          </Col>
          <div className={['col', styles['sort-container']].join(' ')}>
            <div>
              <select
                id="sort_by"
                name="sortBy"
                className={styles['styleselect']}
                onChange={e => onChangeSortCriteria(e.target.value)}
              >
                {sorts.map((sort, index) => (
                  <option key={index} value={JSON.stringify(sort.value)}>
                    {sort.displayName}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* If address count > 0 show result */}
          <div className="d-none d-lg-block text-right col">
            {totalCount > 0 ? showingResult : ''}
          </div>
        </Row>
      </Container>
      {/*  */}
      <hr />
    </>
  );
};

//Proptypes for the addresss sort module
AddressSort.propTypes = {
  onChangeSortCriteria: PropTypes.func.isRequired,
  totalCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired
};
