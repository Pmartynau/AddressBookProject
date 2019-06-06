import React, { Component } from 'react';
import { Form, Pagination, Col, Row } from 'react-bootstrap';
import _ from "lodash";
import styles from './AddressPagination.module.css';

export default class AddressPagination extends Component {
  render() {
    let active = 1;
    let items = [];

    for (let number = 1; number <= 2; number++) {
      items.push(
        <Pagination.Item key={number} active={number === active}>
          {number}
        </Pagination.Item>
      );
    }

    const paginationbasic = (
      <div>
      
     
        <Pagination className={styles.paginationstyle} size="" >
      
          {items}
        <Pagination.Next />    
        </Pagination>
      
    
      </div>
    );
    return paginationbasic;
  }
}
