import React from 'react';
import './WorldGraph.css';

import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts';

import {Container, Row, Col} from 'react-bootstrap';

/**
 * Fonction qui va retourner un array de data composé de la date + du nb de cas sous forme d'objet
 * @param {Object} country 
 * @param {Object} historic 
 * @param {String} type 
 */
const fillData = (historic,type) => {

    //Array de data vide au début
    let dataArray = [];
    let previous = 0;
    let cpt=0;

    //Parcourt de chaque date
    for(let i in historic[type]){
        //Création d'un objet temporaire
        const obj = {
            date:i,
            nbCas:historic[type][i] - previous,
        }
        previous = historic[type][i];
        if(cpt > 0) {
            dataArray.push(obj); //Push dans l'array qu'on va return
        }
        
        cpt++;
    }

    return dataArray;
}



const WorldGraph = ({countrySelected, countryHistoric, type}) => {

    let data = [];

    //Si c monde ou pas
    if(countrySelected.isWorld){
        //Traitement monde
        data = fillData(countryHistoric,type);

    }else{
        //Traitement pays
        data = fillData(countryHistoric, type);
    }

    let graphColor;

    if(type){
        switch(type){
            case 'cases':
                graphColor = '#f7b731';
                break;
            case 'recovered':
                graphColor = '#26de81';
                break;
            case 'deaths':
                graphColor = '#eb3b5a';
                break;
            default:
                break;
        }
    }

    return (
        <Container>
            <Row>
                <Col lg={12}>
                    <h2>Graphique des {type} pour {countrySelected.isWorld ? 'monde' : countrySelected.country}</h2>
                    {data?.length > 0 && (
                     <AreaChart
                        width={600}
                        height={400}
                        data={data}

                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis dataKey="nbCas" />
                        <Tooltip />
                        <Area type="monotone" dataKey="nbCas" stroke={graphColor} fill={graphColor} />
                    </AreaChart>
                    )}
                    
                </Col>
            </Row>
        </Container>
    )
}

export default WorldGraph;
