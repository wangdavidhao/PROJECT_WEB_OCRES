import React from 'react';
import {FaUser} from 'react-icons/fa';

export default{
    title : 'Navbar/Container/Row/Col/FaUser',
    component : FaUser,
}

export const faUser = () => <FaUser className={'admin' ? 'navbar__row--icon active' : 'navbar__row--icon'}></FaUser>
