import React from 'react';
import './Edit.css';

import {Container, Row, Col} from 'react-bootstrap';

//Local imports
import Navbar from './Navbar.js';

const Edit = () => {
    return (
        <Container fluid={true} className="edit">
            <Navbar page="edit"/>
            <Row>
                <Col>
                    <h1>Page Edit</h1>
                </Col>
            </Row>
        </Container>
    )
}

export default Edit;
