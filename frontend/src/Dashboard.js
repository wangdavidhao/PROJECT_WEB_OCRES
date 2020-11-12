import React from 'react';
import './Dashboard.css';
import {Container, Row, Col} from 'react-bootstrap';

//Local imports
import Navbar from './Navbar.js';

export const Dashboard = () => {
    return (
        <Container fluid={true} className="dashboard">
            <Navbar page="dashboard"/>
            <Row>
                <Col lg={3}>
                <h1>Cas et décès</h1>
                </Col>
                <Col lg={3}>
                <h1>Taux risques</h1>
                </Col>
                <Col lg={6}>
                <h1>Map</h1>
                </Col>
            </Row>
            <Row>
                <Col lg={6}>
                Graphique
                </Col>
                <Col lg={6}>
                <Row>
                    <Col lg={6}>
                    <h3>Histogrammes</h3>
                    </Col>
                </Row>
                <Row>
                    <Col lg={4}>
                    <h2>Camembert 1</h2>
                    </Col>
                    <Col lg={4}>
                    <h2>Camembert 1</h2>
                    </Col>
                    <Col lg={4}>
                    <h2>Camembert 1</h2>
                    </Col>
                </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default Dashboard;
