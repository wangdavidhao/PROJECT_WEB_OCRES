import React, {useState, useEffect} from 'react'
import './Map.css';
import {Container, Row, Col} from 'react-bootstrap';

import CountryMarker from './CountryMarker.js';

import ReactMapGL, {FlyToInterpolator, Marker, Popup} from 'react-map-gl';

import PropTypes from 'prop-types';

const Map = ({lat, long, zoom, countries, type}) => {

    const [viewport, setViewport] = useState({
        latitude:lat,
        longitude:long,
        zoom:zoom,
        transitionDuration: 4000,
        transitionInterpolator: new FlyToInterpolator(),
    });

    //On change le viewport à chaque appel car initialState considéré comme valeur initial constructeur
    useEffect(() => {
        setViewport({...viewport,latitude:lat, longitude:long, zoom:zoom})
    },[lat,long,zoom]);

    return (
        <Container>
            <Row>
                <Col lg={12} md={12} sm={12} xs={12}>
                    <ReactMapGL
                        className="map"
                        {...viewport}
                        width="100%"
                        height='45vh'
                        mapStyle="mapbox://styles/david-wang00/ckhwnvcth01e019pk719mtl54"
                        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                        onViewportChange={nextViewport => setViewport(nextViewport)}
                    >
                        <CountryMarker countries={countries} type={type}/>
                    </ReactMapGL>
                </Col>
            </Row>
        </Container>
        
    )
}

Map.propTypes = {
    lat : PropTypes.number.isRequired,
    long : PropTypes.number.isRequired,
    zoom : PropTypes.number.isRequired,
    countries : PropTypes.array.isRequired,
    type : PropTypes.string.isRequired,
}

export default React.memo(Map);
