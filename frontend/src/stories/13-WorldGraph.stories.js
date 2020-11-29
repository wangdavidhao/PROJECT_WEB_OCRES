import React from 'react';
import WorldGraph from '../widgets/WorldGraph.js';

export default{
    title : 'Dashboard/WorldGraph',
    component : WorldGraph,
}

export const worldGraphCases = () => 
<WorldGraph countrySelected={{isWorld : true}}
                countryHistoric={{cases : {"11/23/20": 59171092,
                                            "11/24/20": 59759508,
                                            "11/25/20": 60392453,
                                            "11/26/20": 60973650,
                                            "11/27/20": 61645535,},
                                 deaths : {"11/23/20": 1396467,
                                            "11/24/20": 1409252,
                                            "11/25/20": 1421308,
                                            "11/26/20": 1432047,
                                            "11/27/20": 1442664,},
                                recovered : {"11/23/20": 37622120,
                                                "11/24/20": 37989670,
                                                "11/25/20": 38422834,
                                                "11/26/20": 38784141,
                                                "11/27/20": 39155054},}}
                type={"cases"}/>

export const worldGraphRecovered = () => 
<WorldGraph countrySelected={{isWorld : true}}
                countryHistoric={{cases : {"11/23/20": 59171092,
                                            "11/24/20": 59759508,
                                            "11/25/20": 60392453,
                                            "11/26/20": 60973650,
                                            "11/27/20": 61645535,},
                                 deaths : {"11/23/20": 1396467,
                                            "11/24/20": 1409252,
                                            "11/25/20": 1421308,
                                            "11/26/20": 1432047,
                                            "11/27/20": 1442664,},
                                recovered : {"11/23/20": 37622120,
                                                "11/24/20": 37989670,
                                                "11/25/20": 38422834,
                                                "11/26/20": 38784141,
                                                "11/27/20": 39155054},}}
                type={"recovered"}/>

export const worldGraphDeaths = () => 
<WorldGraph countrySelected={{isWorld : true}}
                countryHistoric={{cases : {"11/23/20": 59171092,
                                            "11/24/20": 59759508,
                                            "11/25/20": 60392453,
                                            "11/26/20": 60973650,
                                            "11/27/20": 61645535,},
                                 deaths : {"11/23/20": 1396467,
                                            "11/24/20": 1409252,
                                            "11/25/20": 1421308,
                                            "11/26/20": 1432047,
                                            "11/27/20": 1442664,},
                                recovered : {"11/23/20": 37622120,
                                                "11/24/20": 37989670,
                                                "11/25/20": 38422834,
                                                "11/26/20": 38784141,
                                                "11/27/20": 39155054},}}
                type={"deaths"}/>