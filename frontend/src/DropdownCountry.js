import React from 'react';
import {Container, Row, Col, Dropdown} from 'react-bootstrap';
import {
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core";

const DropdownCountry = ({countries, selectCountry, handleCountrySelect}) => {

    return (
        <Container>
            <Row>
                <Col lg={12}>
                    <FormControl>
                        <Select
                        variant="outlined"
                        value={selectCountry}
                        onChange={handleCountrySelect}
                        >
                        <MenuItem value="monde">Monde</MenuItem>
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


