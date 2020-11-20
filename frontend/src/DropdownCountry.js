import React from 'react';
import {Container, Row, Col, Dropdown} from 'react-bootstrap';


const DropdownCountry = ({countries}) => {

    return (
        <Container>
            <Row>
                <Col>
                    <Dropdown  >
                        <Dropdown.Toggle variant="secondary" id="dropdown-basic"  >
                            
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {countries.map((country) => (
                                <Dropdown.Item>{country.country}</Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
            </Row>
        </Container>
    )
}

export default DropdownCountry;


