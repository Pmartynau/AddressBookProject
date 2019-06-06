import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Form, Col, Button } from 'react-bootstrap';
import MaterialOutlineInput from '../MaterialOutlineInput/MaterialOutlineInput.jsx';

class StaticAddressForm extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false
    };
  }

  render() {
    return (
      <div>
        <Form>
          <Form.Row>
            <Form.Group as={Col} xs={12} sm={6}>
              <MaterialOutlineInput
                controlId="firstName"
                label="First Name"
                defaultValue="Kurt"
              />
            </Form.Group>

            <Form.Group as={Col} xs={12} sm={6}>
              <MaterialOutlineInput
                controlId="Last Name"
                label="Last Name"
                defaultValue="Medley"
              />
            </Form.Group>
          </Form.Row>
          <Form.Group>
            <MaterialOutlineInput
              controlId="companyName"
              label="Company Name (optional)"
              defaultValue="Epic Company Name"
            />
          </Form.Group>
          <Form.Group>
            <MaterialOutlineInput
              controlId="address1"
              label="Street Address"
              defaultValue="123 Developer Street"
            />
          </Form.Group>

          <Form.Group>
            <MaterialOutlineInput
              controlId="address2"
              label="Apt., Suite, Unit, Etc. (optional)"
              defaultValue="Apt. 101"
            />
          </Form.Group>

          <Form.Row>
            <Form.Group as={Col} xs={12} sm={6}>
              <MaterialOutlineInput
                controlId="zip"
                label="Zip Code"
                defaultValue="98027"
              />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} xs={12} sm={6}>
              <MaterialOutlineInput
                controlId="city"
                label="City"
                defaultValue="Issaquah"
              />
            </Form.Group>

            <Form.Group as={Col} xs={12} sm={6} controlId="formGridState">
              <Form.Label style={{ display: 'none' }}>State</Form.Label>
              <Form.Control as="select">
                <option>State</option>
                <option>WA</option>
                <option>OR</option>
                <option>CA</option>
              </Form.Control>
            </Form.Group>
          </Form.Row>

          <Form.Group>
            <MaterialOutlineInput
              controlId="phone"
              label="Phone"
              defaultValue="2061234567"
              type="tel"
            />
          </Form.Group>

          <Form.Group>
            <MaterialOutlineInput
              controlId="email"
              label="Email"
              defaultValue="kurt@costco.com"
              type="email"
            />
          </Form.Group>

          <Form.Group id="formGridCheckbox">
            <Form.Check custom type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

StaticAddressForm.propTypes = {
  // bla: PropTypes.string,
};

StaticAddressForm.defaultProps = {
  // bla: 'test',
};

export default StaticAddressForm;
