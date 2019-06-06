import React, { Component } from 'react';
import {Card, Col} from 'react-bootstrap';
import contact from './address.json';

const CreateData =() => {
    const data ={ ...contact };
    let table= [];
}

for(leti=0; i <data.contact.length; i++) {
    let children= [];
    const contact= data.contact[i];

    const items = {...contact}
    children.push(
        <Col>
        {items.lastName} {items.sfirstName}
        <br/>
        {items.addressLine[0]} 
        <br/>
        {items.addressLine[1]} 
        <br/>
        {items.city} {items.state} {items.zipcode}
        <br/>
        {items.phone1} 
        <br/>
        {items.email1}
        <br/>
        <br/>
        
        </Col>
    );
    //Creates the parent and adds the children to parent
    table.push(<td>{children}</td>);
let x ={...table};
return table;

}
