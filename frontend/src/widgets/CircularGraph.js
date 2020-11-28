import React, {useState} from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Tooltip} from 'recharts';
import {hexToHSL, harmonize} from '../util.js' ;

import PropTypes from 'prop-types';

import './CircularGraph.css';

//Tableau de data qui passer dans la piechart
let data = [];

/**
 * Fonction qui va dessiner les formes
 * @param {*} props 
 */
const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const {cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
    fill, payload, percent, value,
    } = props;


    return (
    <g>
        <text className="circuTextCenter" x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>{payload.name} : {`(${(percent * 100).toFixed(2)}%)`}</text>
        <Sector
            cx={cx}
            cy={cy}
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            startAngle={startAngle}
            endAngle={endAngle}
            fill={fill}
        />
        <Sector
            cx={cx}
            cy={cy}
            startAngle={startAngle}
            endAngle={endAngle}
            innerRadius={outerRadius + 6}
            outerRadius={outerRadius + 10}
            fill={fill}
        />
    </g>
    );
};


const CircularGraph = ({info, color, type}) => {

    //Transfrome en HSL
    const colorHSL = hexToHSL(color);

    //String du type : gender, age, generalInfo
    let infoType;

    //Hover d'un secteur du pieChart
    const [active, setActive] = useState(0);
    const onPieEnter = (data, index) => {
        setActive(index);
    };

    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + (today.getDate() - 1);
    
    let male = 0;
    let female = 0;

    let age1_9 = 0;
    let age9_19 = 0;
    let age19_29 = 0;
    let age29_39 = 0;
    let age39_49 = 0;
    let age49_59 = 0;
    let age59_69 = 0;
    let age69_79 = 0;
    let age79_89 = 0;
    let age90_ = 0;

    let newHospit = 0;
    let newRea = 0;
    let newDeaths = 0;

    switch (type) {
        case 'gender':
            infoType = 'genre';
            info.filter(gender => ((gender.jour === date) && (gender.sexe !== "0") ))
                .forEach((gdr) => (gdr.sexe === "1" ? male += parseInt(gdr.hosp) : female += parseInt(gdr.hosp)));

            const buildGender = (d) => {
                const inf = [
                    { name : 'H', value: male, },
                    { name : 'F', value: female,},
                ];
                return inf;  
            };
            data = buildGender(info);
            break;
        case 'age':
            infoType = 'age';
            info.filter(age => ((age.jour === date)))
                .forEach((a) => {
                    switch (a.cl_age90){
                            case '09':
                                age1_9 += parseInt(a.hosp);
                                break;
                            case '19':
                                age9_19 += parseInt(a.hosp);
                                break;
                            case '29':
                                age19_29 += parseInt(a.hosp);
                                break;
                            case '39':
                                age29_39 += parseInt(a.hosp);
                                break;
                            case '49':
                                age39_49 += parseInt(a.hosp);
                                break;
                            case '59':
                                age49_59 += parseInt(a.hosp);
                                break;
                            case '69':
                                age59_69 += parseInt(a.hosp);
                                break;
                            case '79':
                                age69_79 += parseInt(a.hosp);
                                break;
                            case '89':
                                age79_89 += parseInt(a.hosp);
                                break;
                            case '90':
                                age90_ += parseInt(a.hosp);
                                break;
                            default:
                                break;
                        };
                })
                
                const buildAge = (d) => {
                const inf = [
                    { name : '1-9 ', value: age1_9,},
                    { name : '10-19 ', value: age9_19, },
                    { name : '20-29 ', value: age19_29,},
                    { name : '29-39 ', value: age29_39, },
                    { name : '39-49 ', value: age39_49,},
                    { name : '49-59 ', value: age49_59, },
                    { name : '59-69 ', value: age59_69,},
                    { name : '69-79 ', value: age69_79, },
                    { name : '79-89 ', value: age79_89,},
                    { name : '>90 ans', value: age90_, },
                ];
                return inf; 
            };
            data = buildAge(info);
            break;
            case 'generalInfo':
            infoType = 'general';
            info.filter(generalInfo => ((generalInfo.jour === date)))
                .forEach((genInfo) => {

                    newHospit += parseInt(genInfo.incid_hosp);
                    newRea += parseInt(genInfo.incid_rea);
                    newDeaths += parseInt(genInfo.incid_dc);
            })

            const buildGraph = (d) => {
                const inf = [
                    { name : 'Hospit.', value: newHospit, },
                    { name : 'Rea ', value: newRea,},
                    { name : 'Morts', value: newDeaths, },
                ];
                return inf; 
            };
            data = buildGraph(info);
            break;
        default:
            console.log(`Erreur graphe circulaire`);  
            break;
    }

    const CustomTooltip = ({ active, payload, label }) => {
        if (active) {
            return (
            <div className="customTooltip">
                <p >{payload[0].name} : {payload[0].value}</p>
            </div>
            );
        }

        return null;
    };

    return (
        <Container fluid={true} className="circularGraph">
            <Row>
                <Col lg={12}>
                    <ResponsiveContainer width="100%" aspect={1}>
                        <PieChart
                            padding={2}
                        >
                            <defs>
                                <linearGradient id="value" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={colorHSL} stopOpacity={0.8} />
                                    <stop offset="95%" stopColor={colorHSL} stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <Pie
                                isAnimationActive = {true}
                                activeIndex={active}
                                activeShape={renderActiveShape}
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius="45%"
                                outerRadius="65%"
                                fill="url(#value)"
                                dataKey="value"
                                onMouseEnter={onPieEnter}
                            >
                            {   
                                data.map((entry, index) => <Cell key={index} fill={harmonize(colorHSL)[index % harmonize(colorHSL).length]}/>)
                            }
                            </Pie>
                        <Tooltip content={<CustomTooltip/>}/>
                        </PieChart>
                    </ResponsiveContainer>
                    <h6 className="text-align-center">{infoType.toUpperCase()}</h6>
                </Col> 
            </Row>
        </Container>
    );
}

CircularGraph.propTypes = {
    info : PropTypes.array.isRequired,
    color : PropTypes.string,
    type : PropTypes.string,
}

export default React.memo(CircularGraph);