import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import './Frequences.css';

import PropTypes from 'prop-types';

const Frequences = ({countrySelected}) => {
    return (
        <Container fluid={true}>
            <Row>
                <Col lg={12} md={12} className="frequences">
                    <span>Cas pour 1 million: </span>
                    <span className="frequences__info">{countrySelected.casesPerOneMillion} prs</span>
                    <span>Mort(s) pour 1 million: </span>
                    <span className="frequences__info">{countrySelected.deathsPerOneMillion} prs </span>
                    <span>Rétabli(s) pour 1 million: </span>
                    <span className="frequences__info">{countrySelected.recoveredPerOneMillion} prs</span>
                    {!countrySelected.isWorld && (
                        <div className="frequences">
                            <span>Un cas tous les:</span>
                            <span className="frequences__info">{countrySelected.oneCasePerPeople} prs</span>
                            <span>Un mort tous les:</span>
                            <span className="frequences__info">{countrySelected.oneDeathPerPeople} prs</span>
                            <span>Un test tous les:</span>
                            <span className="frequences__info">{countrySelected.oneTestPerPeople} prs</span>
                        </div>
                        
                    )}
                </Col>
            </Row>
        </Container>
    )
}

Frequences.propTypes = {
    countrySelected : PropTypes.object.isRequired,
}

export default React.memo(Frequences);
