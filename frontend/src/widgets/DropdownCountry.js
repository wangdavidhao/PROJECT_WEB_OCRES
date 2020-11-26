import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import {
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core";
import PropTypes from 'prop-types';

const DropdownCountry = ({countries, selectCountry, handleCountrySelect}) => {

    return (
        <Container>
            <Row>
                <Col lg={12} className="d-flex justify-content-center">
                    <FormControl>
                        <Select
                        variant="outlined"
                        value={selectCountry}
                        onChange={handleCountrySelect}
                        >
                        <MenuItem value="monde">Monde</MenuItem>
                        {countries.map((country) => (
                            <MenuItem key={country.country} value={country.countryInfo.iso2}>{country.country}</MenuItem>
                        ))}
                        </Select>
                    </FormControl>
                </Col>
            </Row>
        </Container>
    )
}

DropdownCountry.propTypes = {
    countries : PropTypes.array,
    selectCountry : PropTypes.string,
    handleCountrySelect : PropTypes.func,
}

export default DropdownCountry;


