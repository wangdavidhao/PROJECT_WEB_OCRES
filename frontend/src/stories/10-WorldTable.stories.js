import React from 'react';
import WorldTable from '../widgets/WorldTable.js';

export default{
    title : 'WorldTable',
    component : WorldTable,
}

export const wordTable = () => <WorldTable countriesData={[{country : "France", cases : 23000, previous : "true"},
                                                            {country : "USA", cases : 1083000, previous : "false"},
                                                            {country : "India", cases : 800350, previous : "true"}]}>
                                </WorldTable>
