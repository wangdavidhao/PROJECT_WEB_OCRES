import React, {PureComponent} from 'react';
import './DptTable.css';
// import { HorizontalBar } from '@reactchartjs/react-chart.js';
import {
  ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,} from 'recharts';

const data = [
  {name: 'Hospitalisations', donnee: 590,},
  {name: 'Décès', donnee: 868,},
];

// data[1].name = 'Hospitalisations';
// data[1].donnee = {dpt.hospitalises};
// data[2].name = 'Décès';
// data[2].donnee = {dpt.deces};

const buildDptTable = (d) => {
    // d.forEach ((dep) => {
        console.log(d);
        const inf = [
            {name: 'Hospitalisations', donnee: 0,},
            {name: 'Décès', donnee: 0,},
          ];
        if (d.code.includes('DEP')) {
            inf[0].donnee = d.hospitalises;
            inf[1].donnee = d.deces;
            console.log(inf);
      }
      return inf;  
    // })
  };

function DptTable({country}) {
    // buildDptTable(country);
    return (
        <div className="dpttable">
          {country.filter(depart => depart.code.includes('DEP')).map((dpt) => (
              <table>
            <ComposedChart layout="vertical" width={500} height={400} data={buildDptTable(dpt)} 
                    margin={{top: 20, right: 20, bottom: 20, left: 20,}}>
                <CartesianGrid stroke="#f5f5f5" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" />
                <Tooltip />
                <Legend />
                <Area dataKey="amt" fill="#8884d8" stroke="#8884d8" />
                <Bar dataKey="donnee" barSize={20} fill="#413ea0" />
                <Line dataKey="uv" stroke="#ff7300" />
            </ComposedChart>
              <h2 class="dpttable__name"> {dpt.nom}</h2>
                <tr>
                    <td> <h3 class="dpttable__hospit">Hospitalisations</h3> </td>
                    <td> <strong>{dpt.hospitalises}</strong> </td>
                </tr>
                <tr>
                    <td> <h3 class="dpttable__deces"> Décès</h3> </td>
                    <td> <strong>{dpt.deces}</strong> </td>
                </tr>
              </table>
        ))};
      </div>
    );
}

export default DptTable;