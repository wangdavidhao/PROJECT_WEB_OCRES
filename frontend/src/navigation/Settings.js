import React from 'react';
import './Settings.css';

import {Container, Row, Col} from 'react-bootstrap';

//Local imports
import Navbar from './Navbar.js';

export const Settings = () => {
    return (
        <Container fluid={true} className="settings">
            <Navbar page="settings"/>
            <Row>
                <Col>
                    <h1>Page Settings</h1>
                </Col>
            </Row>
        </Container>
    )
}

export default Settings;
