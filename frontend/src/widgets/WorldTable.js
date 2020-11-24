import React, {useState, useEffect} from 'react';
import {Container, Row, Col, Table} from 'react-bootstrap';
import * as GoIcons from 'react-icons/go';
import PropTypes from 'prop-types';

import './WorldTable.css';

export const WorldTable = ({countriesData}) => {

    return (
        <Container className="worldTable">
            <Row>
                <Col lg={12}>
                    <Table striped bordered hover>
                        <thead >
                            <tr>
                            <th><h6>Pays</h6></th>
                            <th><h6>Total Cas</h6></th>
                            </tr>
                        </thead>

                        <tbody>
                            {countriesData.map( (country) => (
                                <tr key={country.countryInfo.id}>
                                    <td >{country.country}</td>
                                    <td className="worldTable__cases">
                                            {country.cases}
                                        {country.previous === 'false'
                                        ? <GoIcons.GoTriangleDown size={20} className="worldTable__cases--down"/>
                                        : <GoIcons.GoTriangleUp size={20} className="worldTable__cases--up"/>
                                        }
                                        
                                    </td>
                                </tr>
                            ))}                           
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    )
}

WorldTable.propTypes = {
    countriesData : PropTypes.array.isRequired,
}

export default WorldTable;
