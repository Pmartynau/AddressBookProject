import { Col, Row, Card, Tab, Modal, Container } from "react-bootstrap";
import React from "react";

import AddressForm from "./AddressForm";
import styles from "./AddressDisplay.module.css";
import AddressTabs from "./AddressTabs";
import contact from './address.json'; //import json file
import AddressCard from './AddressCard';
import _ from 'lodash';


import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default class AddressDisplay extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     addresses: [],

  //   }
  // }

  // componentDidMount() {
  //   fetch('http://localhost:3001/wcs/resources/store/1/person/@self/contact?addressType=ShippingAndBilling')
  //     .then(response => response.json())
  //     .then((result) => {
  //       result.contact.splice(result.contact.length - 1, 1);

  //       this.setState({ addresses: result.contact });


  //     }
  //     )
  // }

  render() {
    // const FilterData = () => {
    //   let filteredData;
    //   let priorityIndex = { true: 1, false: 2 };

    //   if (this.props.currentTab === 'shipping') {
    //     filteredData = _.filter(this.state.addresses, { addressType: 'Shipping' })
    //   } else if (this.props.currentTab === 'billing') {
    //     filteredData = _.filter(this.state.addresses, { addressType: 'Billing' })
    //   }
    //   return filteredData.sort((a, b) => priorityIndex[a.primary] - priorityIndex[b.primary]);
    // };


    return (

      <div>
        <Col className={styles.addNewAddress}>
          <Card className={styles.cardStyles}>
            <Card.Body className={styles.cardCentering}>
              <FontAwesomeIcon icon={faPlus} className={styles.iconstyling} size="md" />

              <AddressForm />
            </Card.Body>
          </Card>

        </Col>
      </div>

    );
  }
}
