import React, { Component } from 'react';

import styles from './AddressSort.module.css';


import { Form,Col,Row, Button, Modal, Footer, Title, Header,Container} from 'react-bootstrap';

export default class AddressSort extends Component {
  constructor(props) {
    super(props);
      this.state= {
        addresses: [],

      }
    }
  render() {
    
    return (
      
      <div>
        <Row>
          <div className={styles.sortheader} as={Col} xs={12} md={6}>
            Sort By:
          </div>
          <Form.Group as={Col} xs={12} md={2}>
            <Form.Control as="select">
              <option>Most Recent</option>
              <option>First Name (A-Z)</option>
              <option>First Name (Z-A)</option>
              <option>Last Name (A-Z)</option>
              <option>Last Name (Z-A)</option>
              
            </Form.Control>
          </Form.Group>
          
         <p className={styles.sortfooter} > Showing 1-7 of {this.state.addresses.length} </p>
        
        </Row>
      </div>
  
    );
  }
}
