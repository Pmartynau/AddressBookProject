import React, { Component } from 'react';
import { Col, Nav, Row, Tab } from 'react-bootstrap';
import AddressCard from './AddressCard';
import styles from './AddressTabs.module.css';






export default class AddressTabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'shipping' //set selected tab state to shipping
    };
  }

  componentDidUpdate() {
    console.log(this.state.selectedTab);
  }
  render() {
    return (
     
        <Tab.Container
          defaultActiveKey={this.state.selectedTab}
          onSelect={selectedTab => this.setState({ selectedTab })}
        >
          <Nav variant="tabs" className={styles.tabswrapper}>
            <Col xs={12} sm={12} md={3} lg={3} className={styles.tabsizing}>
              <Nav.Item>
                <Nav.Link eventKey="shipping">Shipping</Nav.Link>
                
              </Nav.Item>
            </Col>
            <Col xs={12} sm={12} md={3} lg={3} className={styles.tabsizing}>
              <Nav.Item>
                <Nav.Link eventKey="billing">Billing</Nav.Link>
              </Nav.Item>
            </Col>
          </Nav>
         
           {/* <Tab.Content>
      <Tab.Pane eventKey="shipping">
        <AddressCard selectedTab={this.state.selectedTab} {...contact} />
      </Tab.Pane>
      <Tab.Pane eventKey="billing">
        <AddressCard selectedTab={this.state.selectedTab} {...contact} />
      </Tab.Pane>
    </Tab.Content>  */}
        </Tab.Container>
        
      
    );
  }
}

