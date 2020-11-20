import React from 'react';
import {Container, Row, Col, Dropdown} from 'react-bootstrap';
import {
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core";

const DropdownCountry = ({countries}) => {
    return (
        <Container>
            <Row>
                <Col>
                    <FormControl>
                        <Select
                        variant="outlined"
                        >
                        <MenuItem value="world">World</MenuItem>
                        {countries.map((country) => (
                            <MenuItem value={country.countryInfo.iso2}>{country.country}</MenuItem>
                        ))}
                        </Select>
                    </FormControl>
                </Col>
            </Row>
        </Container>
    )
}

export default DropdownCountry;


