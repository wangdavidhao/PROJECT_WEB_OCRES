import React, {useState} from 'react'
import { Marker, Popup} from 'react-map-gl';
import PropTypes from 'prop-types';

const CountryMarker = ({countries,type}) => {

    const [popup, setPopup] = useState({});

    //Variable pour stocker la couleur
    let graphColor;
    let casesType = '';

    //S'il y a un bien un type passé en props
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
        <div>
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
                                    height: `${Math.sqrt(country[type])/100 * 2}px`,
                                    width: `${Math.sqrt(country[type])/100 * 2}px`,
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
            
        </div>
    )
}

CountryMarker.propTypes = {
    countries : PropTypes.array.isRequired,
    type : PropTypes.string.isRequired,
}

export default React.memo(CountryMarker);
