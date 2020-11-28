import React from 'react';
import {RiAppsFill} from 'react-icons/ri';

export default{
    title : 'Navbar/Container/Row/Col/RiAppsFill',
    component : RiAppsFill,
}

export const riAppsFill = () => <RiAppsFill className={'dashboard' ? 'navbar__row--icon active' : 'navbar__row--icon'} ></RiAppsFill>
