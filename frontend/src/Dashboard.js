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
                {/*TableauCas*/}
                </Col>
                <Col lg={3}>
                <h1>Taux risques</h1>
                {/*TableauRisque*/}
                </Col>
                <Col lg={6}>
                {/*Map*/}
                    {/*TableauCas*/}
                    {/**Taux */}
                <h1>Map</h1>
                </Col>
            </Row>
            <Row>
                <Col lg={6}>
                {/**Graphe */}
                </Col>
                <Col lg={6}>
                <Row>
                    <Col lg={6}>
                    <h3>Histogrammes</h3>
                    {/**Histo */}
                    </Col>
                </Row>
                <Row>
                    {/**GraphesCircu */}
                    <Col lg={4}>
                    <h2>Camembert 1</h2>
                    {/**GrapheCircu */}
                    </Col>
                    <Col lg={4}>
                    <h2>Camembert 1</h2>
                    {/**GrapheCircu */}
                    </Col>
                    <Col lg={4}>
                    <h2>Camembert 1</h2>
                    {/**GrapheCircu */}
                    </Col>
                </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default Dashboard;
