import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import {ListData} from './../widgets/ListData.js'

//Local imports
import Navbar from './Navbar.js';

const Admin = () => {
    return (
        <Container fluid={true} className="admin">
            <Navbar page="admin"/>
            <Row>
                <Col>
                    <h1>Page Admin</h1>
                    <ListData isAdmin={true}/>
                </Col>
            </Row>
        </Container>
    )
}

export default Admin;
