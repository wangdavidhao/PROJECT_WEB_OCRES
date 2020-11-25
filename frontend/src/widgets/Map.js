import React, {useState} from 'react'
import './Map.css';
// import {Map as WorldMap, MapContainer, Marker, Popup, TileLayer} from 'react-leaflet';
import {Container, Row, Col} from 'react-bootstrap';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import ReactMapGL from 'react-map-gl';



// const WorldMap = ReactMapboxGl({
//     accessToken:'pk.eyJ1IjoiZGF2aWQtd2FuZzAwIiwiYSI6ImNraHdjNWhtODA4cjUycHRoaTk1MHA2YmoifQ.OdJ4_4OuO3m38R6hkxaDGQ',
//     mapStyle:'mapbox://styles/david-wang00/ckhwggb7k0tgk19ns5w6y9zj6',
// });

const Map = () => {

    const [viewport, setViewport] = useState({
        width:'100%',
        height:'320px',
        latitude:37.6,
        longitude:-95.665,
        zoom:1
    });

    return (
        <Container>
            <Row>
                <Col lg={12}>
                    <ReactMapGL
                        {...viewport}
                        mapStyle="mapbox://styles/david-wang00/ckhwnvcth01e019pk719mtl54"
                        mapboxApiAccessToken="pk.eyJ1IjoiZGF2aWQtd2FuZzAwIiwiYSI6ImNraHdjNWhtODA4cjUycHRoaTk1MHA2YmoifQ.OdJ4_4OuO3m38R6hkxaDGQ"
                        onViewportChange={setViewport}
                    />
                </Col>
            </Row>
        </Container>
        
    )
}

export default Map;
