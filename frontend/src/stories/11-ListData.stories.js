import React from 'react';
import ListData from '../widgets/ListData.js';

export default{
    title : 'Dashboard/ListData',
    component : ListData,
}

export const listDataUser = () => <ListData isAdmin={false}></ListData>
export const listDataAdmin = () => <ListData isAdmin={true}></ListData>