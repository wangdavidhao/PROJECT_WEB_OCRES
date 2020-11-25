import React from 'react';
import './DptTable.css';
import {
  ComposedChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,} from 'recharts';
import {Container, Row, Col} from 'react-bootstrap';

import PropTypes from 'prop-types';

const buildDptTable = (d) => {
        const inf = [
            {name: 'Hospit.', nombre: 0,},
            {name: 'Décès', nombre: 0,},
          ];
        if (d.code.includes('DEP')) {
            inf[0].nombre = d.hospitalises;
            inf[1].nombre = d.deces;
      }
      return inf;  
  };

const coloredLegendText = (value, entry) => {  
  return <span style={{ color : "#fff" }}>{value}</span>;
}

function DptTable({country}) {
    return (
        <Container className="dpttable">
          <Row>
            <Col lg={12}>
              {country.filter(depart => depart.code.includes('DEP')).map((dpt) => (
                <>
                    <h2 className="dpttable__name"> {dpt.nom}</h2>
                    <ComposedChart  layout="vertical" fill="#000000"
                        width={450} height={200} data={buildDptTable(dpt)} 
                        stroke={'red'}
                        margin={{top: 20, right: 20, bottom: 20, left: 20,}}
                    >
                      <CartesianGrid />
                      <XAxis type="number" tick={{ fill: '#fff',}} />
                      <YAxis dataKey="name" type="category" tick={{ fill: '#fff' }}   />
                      <Tooltip />
                      <Legend formatter={coloredLegendText}/>
                      <Bar dataKey="nombre" fill="#1B9CFC" stroke="#02487e" barSize={20}/>
                    </ComposedChart>
                </>
              ))};

            </Col>
          </Row>
      </Container>
    );
}

DptTable.propTypes = {
  country : PropTypes.array.isRequired,
}

export default DptTable;