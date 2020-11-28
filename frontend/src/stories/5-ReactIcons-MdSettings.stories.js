import React from 'react';
import {MdSettings} from 'react-icons/md';

export default{
    title : 'Navbar/Container/Row/Col/MdSettings',
    component : MdSettings,
}

export const mdSettings = () => <MdSettings className={'settings' ? 'navbar__row--icon active' : 'navbar__row--icon'} ></MdSettings>