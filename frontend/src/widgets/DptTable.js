import React, {PureComponent} from 'react';
import './DptTable.css';
// import { HorizontalBar } from '@reactchartjs/react-chart.js';
import {
  ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,} from 'recharts';

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

function DptTable({country}) {
    // buildDptTable(country);
    return (
        <div className="dpttable">
          {country.filter(depart => depart.code.includes('DEP')).map((dpt) => (
              <div>
              <h2 class="dpttable__name"> {dpt.nom}</h2>
            <ComposedChart  layout="vertical" fill="#000000"
                    width={450} height={200} data={buildDptTable(dpt)} 
                    stroke={'red'}
                    // style={{height: '40vh', width: '95%'}}
                    margin={{top: 20, right: 20, bottom: 20, left: 20,}}
                    >
                <CartesianGrid />
                <XAxis type="number" tick={{ fill: '#fff',}} />
                <YAxis dataKey="name" type="category" tick={{ fill: '#fff' }}   />
                <Tooltip />
                <Legend />
                <Bar dataKey="nombre" fill="#1B9CFC" stroke="#02487e" barSize={20}/>
                {/* <Area dataKey="amt" fill="#8884d8" stroke="#8884d8" /> */}
                {/* <Line dataKey="uv" stroke="#ff7300" /> */}
            </ComposedChart>
              {/* <h2 class="dpttable__name"> {dpt.nom}</h2>
                <tr>
                    <td> <h3 class="dpttable__hospit">Hospitalisations</h3> </td>
                    <td> <strong>{dpt.hospitalises}</strong> </td>
                </tr>
                <tr>
                    <td> <h3 class="dpttable__deces"> Décès</h3> </td>
                    <td> <strong>{dpt.deces}</strong> </td>
                </tr> */}
              </div>
        ))};
      </div>
    );
}

export default DptTable;