import React from 'react';
import CircularGraph from '../widgets/CircularGraph.js';

export default{
    title : 'CircularGraph',
    component : CircularGraph,
}

const today = new Date();
const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + (today.getDate() - 1);

export const circularGraphGender = () => 
<CircularGraph info={[{jour : `${date}`, sexe : "2", hosp : "40"},
                        {jour : `${date}`, sexe : "2", hosp : "40"},
                        {jour : `${date}`, sexe : "1", hosp : "40"}]}
                color={"#bff542"}
                type={"gender"}/>
export const circularGraphAge = () => 
<CircularGraph info = {[{jour : `${date}`, cl_age90 : '09', hosp : "20" },
                        {jour : `${date}`, cl_age90 : '19', hosp : "30"},
                        {jour : `${date}`, cl_age90 : '29', hosp : "40"},
                        {jour : `${date}`, cl_age90 : '39', hosp : "60"},
                        {jour : `${date}`, cl_age90 : '49', hosp : "80"},
                        {jour : `${date}`, cl_age90 : '59', hosp : "120"},
                        {jour : `${date}`, cl_age90 : '69', hosp : "170"},
                        {jour : `${date}`, cl_age90 : '79', hosp : "200"},
                        {jour : `${date}`, cl_age90 : '89', hosp : "180"},]}
                color={"#0022ff"}
                type={"age"}/>
export const circularGraphGeneralInfo = () => 
<CircularGraph info = {[{jour : `${date}`, incid_hosp : "200", incid_rea : "50", incid_dc : "30"},
                        {jour : `${date}`, incid_hosp : "100", incid_rea : "60", incid_dc : "20",},
                        {jour : `${date}`, incid_hosp : "60", incid_rea : "40", incid_dc : "10"},]}
                color={"#fa0400"}
                type={"generalInfo"}/>