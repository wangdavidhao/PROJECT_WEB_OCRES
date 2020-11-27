import React from 'react';
import {Container, Row, Col, Table} from 'react-bootstrap';
import * as GoIcons from 'react-icons/go';
import PropTypes from 'prop-types';

import './WorldTable.css';

export const WorldTable = ({countriesData}) => {


    return (
        <Container fluid={true} className="worldTable">
            <Row>
                <Col lg={12} md={12} sm={12} xs={12} className="d-flex w-100">
                    <Table striped bordered hover responsive className="worldTable__table">
                        <thead >
                            <tr>
                                <th><span>Pays</span></th>
                                <th><span>Cas total</span></th>
                            </tr>
                        </thead>

                        <tbody >
                            {countriesData.map( (country) => (
                                <tr key={country.country}>
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
