import React, { Component } from 'react';

import { Card, Col, Row, Container } from 'react-bootstrap';

import styles from './AddressCard.module.css';

import _ from 'lodash';
import AddressForm from './AddressForm';

//Helpers for city and phone number
import { cityHelper, phoneHelper } from './helpers';

//Import AddressTabs
import AddressTabs from './AddressTabs';

export default class AddressCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // const FilterData = () =>{
    //   let filteredData;
    //   let priorityIndex = {true: 1, false: 2};
 
    //   if ( this.props.selectedTab ==='shipping'){
    //     filteredData = _.filter(this.state.data, { addressType: 'Shipping' })
    //   } else if (this.props.currentTab ==='billing'){
    //     filteredData = _.filter(this.state.data, { addressType: 'Billing' })
    //   }
    //   return filteredData.sort((a,b) => priorityIndex[a.primary] - priorityIndex[b.primary]);
    // };

    const contact = this.props; //set contact to a address.json contact at idx[0]

    let header; //initilize variables
    let footer;

    //conditional statement for factoring in header & footer
    if (contact.primary === 'true') {
      header = (
        <Card.Header className={styles.headertext}>
          Default {contact.addressType}
        </Card.Header>
      );
      footer = (
        <Card.Footer className={styles.footertext}>
          <Card.Link href="#">Edit</Card.Link>
        </Card.Footer>
      );
    } else {
      header = (
        <Card.Header className={styles.notheadertext}>
          <a href="">Set as Default {contact.addressType}</a>
        </Card.Header>
      );
      footer = (
        <Card.Footer className={styles.footertext}>
          <Card.Link href="#">Edit</Card.Link>
          <Card.Link href="#">Remove</Card.Link>
        </Card.Footer>
      );
    }

 {/* If the address is default only show edit button */}
 {!address.isPrimary ? (
  <button
    type="button"
    className="btn btn-link"
    onClick={() => onRemoveAddress(address.id)}
  >
    {stringConst.REMOVE}
  </button>
) : (
  " "
)}
    return (
   
      <Col xs={12} md={6} lg={4} xl={3} fluid="true" className={styles.cardwrapper}>
     
        <Card>
          {header}
          <Card.Body className={styles.cardbody} >
            <Card.Text className={styles.cardtext} >
              {contact.firstName}
              {' '}
              {contact.lastName}

              <br />
              {contact.addressLine[0]}
              {contact.addressLine[1]}
              <br />

              {cityHelper(contact.city)}

              <br />
              {phoneHelper(contact.phone1)}
              <br />
              {contact.email1}
            </Card.Text>
          </Card.Body>
          {footer}
        </Card>
        
      </Col>
      
  
        
    );
  }
}
