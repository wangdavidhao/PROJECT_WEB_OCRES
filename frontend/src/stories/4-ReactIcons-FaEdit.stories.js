import React from 'react';
import {FaEdit} from 'react-icons/fa';

export default{
    title : 'Navbar/Container/Row/Col/FaEdit',
    component : FaEdit,
}

export const faEdit = () => <FaEdit className={'edit' ? 'navbar__row--icon active' : 'navbar__row--icon'}></FaEdit>
