import React from 'react';
import Navbar from '../navigation/Navbar.js';

export default{
    title : 'Navbar',
    component : Navbar,
}

export const navbar1 = () => <Navbar page="dashboard"></Navbar>
export const navbar2 = () => <Navbar page="edit"></Navbar>
export const navbar3 = () => <Navbar page="admin"></Navbar>
export const navbar4 = () => <Navbar page="settings"></Navbar>