import React from 'react'
import './Map.css';
import {Map as WorldMap, MapContainer, Marker, Popup, TileLayer} from 'react-leaflet';
import {Container, Row, Col} from 'react-bootstrap';

const Map = () => {
    return (
        <Container>
            <Row>
                <Col lg={12}>
                    <MapContainer className="map" center={[51.505, -0.09]} zoom={3} scrollWheelZoom={false}>
                        <TileLayer
                        className="map__tilelayer"
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        />
                    </MapContainer>
                </Col>
            </Row>
        </Container>
        
    )
}

export default Map;
