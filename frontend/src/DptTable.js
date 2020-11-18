import React from 'react';
import './DptTable.css';
// import { HorizontalBar } from '@reactchartjs/react-chart.js';

function DptTable({country}) {
    return (
        <div className="dpttable">
          {country.map((dpt) => (
              <table>
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