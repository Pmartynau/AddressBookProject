import React, { Component } from 'react';

import { Card,Form, Col, Button, Modal, Row } from 'react-bootstrap';

import styles from './AddressForm.module.css';

export default class AddressForm extends Component {
  constructor(props, context) {
    //constructor for form events
    super(props, context);

    this.handleShow = this.handleShow.bind(this); //bind the buttons
    this.handleClose = this.handleClose.bind(this);

    this.state = { //sets the state as false
      show: false
    };
  }

  handleClose() {
    this.setState({ show: false }); //handle method
  }

  handleShow() {
    this.setState({ show: true }); //handle method
  }
  render() {
    return (
           
      <div>
        
          <h6 onClick={this.handleShow}>Add New Address</h6>
   
        <Modal show={this.state.show} onHide={this.handleClose}>
        
          <Modal.Header closeButton className={styles.modalheader}>
            <Modal.Title>
              <h4>Add New Address</h4>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form className="address-form ctHidden">
              <Form.Row>
                <Form.Group as={Col} xs={12} md={6}>
                  <Form.Label for="firstID">First Name</Form.Label>
                  <Form.Control required type="text" />
                </Form.Group>
                <Form.Group as={Col} xs={12} md={6}>
                  <Form.Label for="lastID">Last Name</Form.Label>
                  <Form.Control required type="text" />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} xs={12}>
                  <Form.Label for="CompanyID">
                    Company Name (optional)
                  </Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} xs={12} md={6} controlId="selectCountry">
                  <Form.Label>Country</Form.Label>
                  <Form.Control as="select">
                    <option>Choose...</option>
                    <option>United States</option>
                    <option>Canada</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group as={Col} xs={12}>
                  <Form.Label for="streetAddressID">Street Address</Form.Label>
                  <Form.Control type="text" required />
                </Form.Group>
                <Form.Group as={Col} xs={12}>
                  <Form.Label for="AptId">
                    Apt., Suite, Unit, Etc. (optional)
                  </Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} xs={12} md={6}>
                  <Form.Label for="cityId">City</Form.Label>
                  <Form.Control type="text" required />
                </Form.Group>

                {/* Form for State selector */}
                <Form.Group as={Col} xs={12} md={6}>
                  <Form.Label for="stateID">State</Form.Label>
                  <Form.Control as="select">
                    <option>Alabama</option>
                    <option value="AK">Alaska</option>
                    <option value="AZ">Arizona</option>
                    <option value="AR">Arkansas</option>
                    <option value="CA">California</option>
                    <option value="CO">Colorado</option>
                    <option value="CT">Connecticut</option>
                    <option value="DE">Delaware</option>
                    <option value="DC">District Of Columbia</option>
                    <option value="FL">Florida</option>
                    <option value="GA">Georgia</option>
                    <option value="HI">Hawaii</option>
                    <option value="ID">Idaho</option>
                    <option value="IL">Illinois</option>
                    <option value="IN">Indiana</option>
                    <option value="IA">Iowa</option>
                    <option value="KS">Kansas</option>
                    <option value="KY">Kentucky</option>
                    <option value="LA">Louisiana</option>
                    <option value="ME">Maine</option>
                    <option value="MD">Maryland</option>
                    <option value="MA">Massachusetts</option>
                    <option value="MI">Michigan</option>
                    <option value="MN">Minnesota</option>
                    <option value="MS">Mississippi</option>
                    <option value="MO">Missouri</option>
                    <option value="MT">Montana</option>
                    <option value="NE">Nebraska</option>
                    <option value="NV">Nevada</option>
                    <option value="NH">New Hampshire</option>
                    <option value="NJ">New Jersey</option>
                    <option value="NM">New Mexico</option>
                    <option value="NY">New York</option>
                    <option value="NC">North Carolina</option>
                    <option value="ND">North Dakota</option>
                    <option value="OH">Ohio</option>
                    <option value="OK">Oklahoma</option>
                    <option value="OR">Oregon</option>
                    <option value="PA">Pennsylvania</option>
                    <option value="RI">Rhode Island</option>
                    <option value="SC">South Carolina</option>
                    <option value="SD">South Dakota</option>
                    <option value="TN">Tennessee</option>
                    <option value="TX">Texas</option>
                    <option value="UT">Utah</option>
                    <option value="VT">Vermont</option>
                    <option value="VA">Virginia</option>
                    <option value="WA">Washington</option>
                    <option value="WV">West Virginia</option>
                    <option value="WI">Wisconsin</option>
                    <option value="WY">Wyoming</option>
                  </Form.Control>
                </Form.Group>
              </Form.Row>
              <div className="row">
                <div className="form-group col-xs-12 col-md-6">
                  <label for="phoneId">Phone</label>
                  <input
                    class="form-control"
                    type="tel"
                    name="phone"
                    required
                    id="phoneId"
                    maxlength="12"
                  />
                </div>
              </div>
              <div className="form-group col-xs-12">
                <label for="emailId">Email Address</label>
                <input
                  className="form-control"
                  type="text"
                  name="email"
                  required
                  id="emailId"
                  maxLength="254"
                />
              </div>
            </Form>
          </Modal.Body>
          <Modal.Footer className={styles.modalFooter}>
            <Row className={styles.footerRow}>
              <Col xs={12} md={6}>
                <Button
                  type="button"
                  className={styles.cancelbutton}
                  alt="Cancel"
                  onClick={this.handleClose}
                >
                  {' '}
                  Cancel
                </Button>
              </Col>
              <Col xs={12} md={6}>
                <Button
                  type="button"
                  className={styles.savebutton}
                  alt="Save"
                  onClick={this.handleClose}
                >
                  {' '}
                  Save Address
                </Button>
              </Col>
              <Col className={styles.footerText}>
                <Row>
                  <Col xs={12}>
                    <span>
                      {' '}
                      Changes made here to your shipping or billing address will
                      not update the address associated with your membership.
                    </span>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Modal.Footer>
          </Modal>
        
      </div>
    
    );
  }
}
