import React from 'react';
import {Container, Row, Col, Nav} from 'react-bootstrap';

//Local imports
import Navbar from './Navbar.js';

const Admin = () => {
    return (
        <Container fluid={true} className="admin">
            <Navbar page="admin"/>
            <Row>
                <Col>
                    <h1>Page Admin</h1>
                </Col>
            </Row>
        </Container>
    )
}

export default Admin;
