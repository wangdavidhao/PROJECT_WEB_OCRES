import React, {useState, useEffect} from 'react'
import './Map.css';
import {Container, Row, Col} from 'react-bootstrap';
import 'mapbox-gl/dist/mapbox-gl.css';

import ReactMapGL, {FlyToInterpolator, Marker, Popup} from 'react-map-gl';


import PropTypes from 'prop-types';


const Map = ({lat, long, zoom, countries, type}) => {

    const [viewport, setViewport] = useState({
        latitude:lat,
        longitude:long,
        zoom:zoom,
        transitionDuration: 5000,
        transitionInterpolator: new FlyToInterpolator(),
    });

    const [popup, setPopup] = useState({});

    //On change le viewport à chaque appel car initialState considéré comme valeur initial constructeur
    useEffect(() => {
        setViewport({...viewport,latitude:lat, longitude:long, zoom:zoom})
    },[lat,long,zoom]);

    //Variable pour stocker la couleur
    let graphColor;
    let casesType = '';

    //S'il y a un bien un ype passé en props
    if(type){
        switch(type){
            case 'cases':
                graphColor = '#f7b731';
                casesType = 'cas';
                break;
            case 'recovered':
                graphColor = '#26de81';
                casesType = 'rétablis';
                break;
            case 'deaths':
                graphColor = '#eb3b5a';
                casesType = 'morts';
                break;
            default:
                break;
        }
    }

    return (
        <Container>
            <Row>
                <Col lg={12} md={12} sm={12} xs={12}>
                    <ReactMapGL
                        {...viewport}
                        width="100%"
                        height='320px'
                        mapStyle="mapbox://styles/david-wang00/ckhwnvcth01e019pk719mtl54"
                        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                        onViewportChange={nextViewport => setViewport(nextViewport)}
                    >
                        {countries.map((country) => (
                            <React.Fragment key={country.country}>
                            <Marker  latitude={country.countryInfo.lat} longitude={country.countryInfo.long}>
                                <div 
                                onClick={() => setPopup({
                                    [country.country]:true,
                                })}
                                >
                                    <svg  
                                    className="map__circle"
                                    style={{
                                            height: `${Math.sqrt(country[type])/100 * (viewport.zoom)+5}px`,
                                            width: `${Math.sqrt(country[type])/100 * (viewport.zoom)+5}px`,
                                    }}
                                        
                                    fill={graphColor}
                                    viewBox="0 0 24 24" 
                                    stroke={graphColor} 
                                    fillOpacity="0.4"
                                    strokeWidth="2" 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round"
                                    >
                                        <circle className="map__circle" cx="12" cy="12" r="10">
                                        </circle>
                                    </svg>
                                </div>
                                
                            </Marker>
                            { popup[country.country] ? ( <Popup
                                className="map__popupContainer"
                                latitude={country.countryInfo.lat} 
                                longitude={country.countryInfo.long}
                                closeButton={true}
                                closeOnClick={false}
                                onClose={() => setPopup({})}
                                anchor="top" 
                                >
                                <div className="map__popup">
                                    <span>{country.country}</span>
                                    <img src={country.countryInfo.flag} width="80px" height="50px"></img>
                                    <span>{casesType} : {country[type]}</span>
                                </div>
                                
                            </Popup>) : ''}
                            
                            </React.Fragment>
                        ))}
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

export default Map;
