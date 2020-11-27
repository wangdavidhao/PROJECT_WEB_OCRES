import React,{useState, useEffect} from 'react';
import './Navbar.css';

import {Container, Row, Col} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import * as MdIcons from 'react-icons/md';

//Icons
import {FaUser, FaEdit } from 'react-icons/fa';
import {RiAppsFill} from 'react-icons/ri';
import {MdSettings} from 'react-icons/md';

export const Backdrop = ({hideSidebar}) => {
  return <div className="backdrop" onClick={hideSidebar}></div>
}

//Composant Navbar servant la navigation entre les pages
export const Navbar = ({page}) => {

    const history = useHistory();

    //Fonction redirect qui prend en param le endPoint de l'URL et on l'ajoute à history
    const redirect = path => {
        history.push(path);
    }

    const [openSidebar, setOpenSidebar] = useState(false);
    const [timeStamp, setTimeStamp] = useState(Date.now());
    const [time, setTime] = useState(new Date(timeStamp).toUTCString());

    const showSidebar = () => setOpenSidebar(prev => !prev);

    useEffect(() => {
        let time = setTimeout(() => {
            setTimeStamp(Date.now());
            setTime(new Date(timeStamp).toISOString());
        }, 1000);
        return () => clearTimeout(time);
    });

    return (
        <Container fluid={true} className="sidebar">
            {openSidebar ? <Backdrop hideSidebar={showSidebar}/> : ''}
            <nav className={openSidebar ? 'navbar__sidebar active' : 'navbar__sidebar'}>
                <MdIcons.MdClose size={24} onClick={showSidebar}/>
                <ul className="navbar__sidebar--menu">
                    <div className="sidebar__row--iconDiv" onClick={() => redirect("./")}>
                        <RiAppsFill className={page === 'dashboard' ? 'navbar__row--icon active' : 'navbar__row--icon'} ></RiAppsFill>
                        <span className={page === 'dashboard' ? 'navbar__row--icon active' : 'navbar__row--icon'}>Dashboard</span>
                    </div>
                    <div className="sidebar__row--iconDiv" onClick={() => redirect("./edit")}>
                        <FaEdit className={page === 'edit' ? 'navbar__row--icon active' : 'navbar__row--icon'} ></FaEdit>
                        <span className={page === 'edit' ? 'navbar__row--icon active' : 'navbar__row--icon'}>Modifier</span>
                        
                    </div>
                    <div className="sidebar__row--iconDiv" onClick={() => redirect("./admin")}>
                        <FaUser className={page === 'admin' ? 'navbar__row--icon active' : 'navbar__row--icon'} ></FaUser>
                        <span className={page === 'admin' ? 'navbar__row--icon active' : 'navbar__row--icon'}>Admin</span>
                        
                    </div>
                    <div className="sidebar__row--iconDiv" onClick={() => redirect("./settings")}>
                        <MdSettings className={page === 'settings' ? 'navbar__row--icon active' : 'navbar__row--icon'} ></MdSettings>
                        <span className={page === 'settings' ? 'navbar__row--icon active' : 'navbar__row--icon'}>Réglages</span>
                        
                    </div>
                </ul>
            </nav>
            <Container fluid={true} className="navbar">
            
            <Row className="w-100 navbar__row">
                <Col lg={3} className="navbar__row--name d-none d-lg-block">
                    <span>COVID DASHBOARD {time}</span>
                </Col>
                <Col sm={12} xs={12} className="navbar__burger">
                    <button className="navbar__burger--button" onClick={showSidebar} >
                        <FiIcons.FiMenu size={24}/>
                    </button>
                </Col>
                <Col lg={6} className="navbar__row--icons ">
                    <div className="navbar__row--iconDiv" onClick={() => redirect("./")}>
                        <RiAppsFill className={page === 'dashboard' ? 'navbar__row--icon active' : 'navbar__row--icon'} fontSize={20}></RiAppsFill>
                        <span className={page === 'dashboard' ? 'navbar__row--iconText active' : 'navbar__row--iconText'}>Dashboard</span>
                    </div>
                    <div className="navbar__row--iconDiv" onClick={() => redirect("./edit")}>
                        <FaEdit className={page === 'edit' ? 'navbar__row--icon active' : 'navbar__row--icon'} fontSize={20}></FaEdit>
                        <span className={page === 'edit' ? 'navbar__row--iconText active' : 'navbar__row--iconText'}>Modifier</span>
                        
                    </div>
                    <div className="navbar__row--iconDiv" onClick={() => redirect("./admin")}>
                        <FaUser className={page === 'admin' ? 'navbar__row--icon active' : 'navbar__row--icon'} fontSize={20}></FaUser>
                        <span className={page === 'admin' ? 'navbar__row--iconText active' : 'navbar__row--iconText'}>Admin</span>
                        
                    </div>
                    <div className="navbar__row--iconDiv" onClick={() => redirect("./settings")}>
                        <MdSettings className={page === 'settings' ? 'navbar__row--icon active' : 'navbar__row--icon'} fontSize={20}></MdSettings>
                        <span className={page === 'settings' ? 'navbar__row--iconText active' : 'navbar__row--iconText'}>Réglages</span>
                        
                    </div>

                </Col>
                <Col lg={3} className="navbar__row--authors d-none d-lg-block">
                    <span> SADOUN Benjamin WANG David - &copy; 2020</span>
                </Col>
            </Row>
        </Container>
        </Container>
        
    )
}

export default Navbar;
