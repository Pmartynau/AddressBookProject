import React, { Component } from 'react';

import contact from './address.json'; //import json file
import styles from './AddressContainer.module.css';
import AddressForm from './AddressForm';
import AddressTabs from './AddressTabs';
import AddressSort from './AddressSort';
import AddressCard from './AddressCard';
import AddressPagination from './AddressPagination.jsx';
import { Container, Row, Col, Form, Modal } from 'react-bootstrap';
import AddressDisplay from './AddressDisplay.jsx';

export default class AddressContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addresses: [],

    }
  }
  componentDidMount() {
    fetch('http://localhost:3001/wcs/resources/store/1/person/@self/contact')

      // fetch('http://localhost:3001/wcs/resources/store/1/person/@self/contact?addressType=Shipping')

      .then(response => response.json())
      .then(
        (result) => {

          this.setState({ addresses: result.contact });


        }
      )
  }


  render() {
    return (
      <div>

        <h2> Address Book</h2>
        <AddressTabs />
        <br />
        <AddressSort />
        <hr />

        <Row xs={12} sm={8} md={6} lg={4} xl={3} className={styles.newAddressFormatting} >


          <AddressDisplay />
          {/* <AddressCard {...contact}/>
          <AddressCard {...contact}/>
          <AddressCard {...contact}/>
          <AddressCard {...contact}/> */}


          {this.state.addresses.map((address, index) => (
            <AddressCard key={index} {...address} />
          ))}


        </Row>

        <hr />
        <AddressPagination />
        <hr />
      </div>

    );
  }
}

