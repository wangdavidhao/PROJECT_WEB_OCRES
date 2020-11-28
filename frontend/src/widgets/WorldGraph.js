import React from 'react';
import './WorldGraph.css';

import {AreaChart, 
    Area, 
    XAxis,
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    Legend, 
    ResponsiveContainer, 
    linearGradient} from 'recharts';
import {Container, Row, Col} from 'react-bootstrap';
import PropTypes from 'prop-types';

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
                casesType = 'retablis';
                break;
            case 'deaths':
                graphColor = '#eb3b5a';
                casesType = 'morts';
                break;
            default:
                break;
        }
    }

    const CustomTooltip = ({ active, payload, label }) => {
        if (active) {
            return (
            <div className="customTooltip">
                <p >{label} : <span className={`customTooltip__label ${casesType}`}>{payload[0].value}</span></p>
            </div>
            );
        }

        return null;
    };

    return (
        <Container>
            <Row>
                <Col lg={12} md={12} sm={12} className="worldGraph">
                    <h4 className="mb-3">Graphique des {casesType} pour {countrySelected.isWorld ? 'monde' : countrySelected.country}</h4>
                    {data?.length > 0 && (
                        <ResponsiveContainer width="100%" height={300}>
                            <AreaChart
                            data={data}
                            margin={{bottom:0, left:10,}}
                        >
                            <defs>
                                <linearGradient id="nbCas" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="25%" stopColor={graphColor} stopOpacity={0.9}/>
                                    <stop offset="95%" stopColor={graphColor} stopOpacity={0.3}/>
                                </linearGradient>
                            </defs>
                        <CartesianGrid strokeDasharray="4 4" />
                        <XAxis dataKey="date" />
                        <YAxis dataKey="nbCas"/>
                        <Tooltip  content={<CustomTooltip />}/>
                        <Legend payload={
                            [
                                { id: 'nbCas', value: casesType, type: 'square', color: graphColor},
                            ]
                        }
                        layout="horizontal" verticalAlign="bottom" align="center" 
                        />
                        <Area type="monotone" dataKey="nbCas" strokeWidth={1.5} stroke={graphColor} fillOpacity={1} fill="url(#nbCas)"/>
                    </AreaChart>
                    </ResponsiveContainer>
                    
                    )}
                    
                </Col>
            </Row>
        </Container>
    )
}

WorldGraph.propTypes = {
    countrySelected : PropTypes.object.isRequired,
    countryHistoric : PropTypes.object.isRequired,
    type : PropTypes.string.isRequired,
}

export default React.memo(WorldGraph);
