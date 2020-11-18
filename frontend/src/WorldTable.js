import React, {useState, useEffect} from 'react';
import {Container, Row, Col, Table} from 'react-bootstrap';
import * as GoIcons from 'react-icons/go';

import './WorldTable.css';

export const WorldTable = ({countriesData}) => {

    const [countries, setCountries] = useState([]);
    /**
     * Fonction qui va trier le nombre de cas total par pays dans l'odre décroissant
     */
    const sortCasesDsc = (countriesTable) => {
        let sortedTable = countriesTable;
        return sortedTable.sort((countryA, countryB) => countryA.cases > countryB.cases ? -1 : 1  );
    }

    useEffect(() => {
        sortCasesDsc(countriesData);
        setCountries(countriesData);
    },[countriesData]);

    
    return (
        <Container className="worldTable">
            <Row>
                <Col>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                            <th>Pays</th>
                            <th>Nombre Cas Total Enregistrés</th>
                            </tr>
                        </thead>

                        <tbody>
                            {countries.map( (country) => (
                                <tr key={country.countryInfo.id}>
                                    <td ><strong >{country.country}</strong></td>
                                    <td className="worldTable__cases">
                                        <strong >
                                            {country.cases}
                                        </strong>
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

export default WorldTable;
