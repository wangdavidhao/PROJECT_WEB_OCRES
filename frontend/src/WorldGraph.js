import React from 'react';
import './WorldGraph.css';

import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';
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
    //Nb de cas jour précedent
    let previous = 0;
    //Booleen pour déterminer si c'est le premier jour car pas de previous
    let bool = true;
    //Variable pour stocker le nombre de cas
    let cas;

    //Parcourt de chaque date
    for(let i in historic[type]){
        //Création d'un objet temporaire
        
        //Si nombre de cas égal au jour précedent ( week end, retard...)
        if(historic[type][i] - previous === 0){
            //Si il y a eu une variation de cas
            if(dataArray.length > 0){
                cas = dataArray[dataArray.length-1].nbCas;  //On prend le dernier objet dans l'array et on get son nb de cas
            }else
                cas = 0; //Sinon pas de variation donc = 0
            
        }else if(historic[type][i] - previous < 0){
            cas = 0; //Erreur de données
        }else{
            cas = historic[type][i] - previous; //Sinon on fait la différence pour obtenir le nombre de cas maj
        }
        const obj = {
            date:i,
            nbCas:cas,
        }
        previous = historic[type][i];
        //On ne push pas le premier jour car pas de previous
        if(!bool) {
            dataArray.push(obj); //Push dans l'array qu'on va return
        }
        
        bool = false;
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

    //Variable pour stocker la couleur
    let graphColor;

    //S'il y a un bien un ype passé en props
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
