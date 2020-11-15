import React from 'react';
import './Navbar.css';

import {Container, Row, Col} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

//Icons
import {FaUser, FaEdit } from 'react-icons/fa';
import {RiAppsFill} from 'react-icons/ri';
import {MdSettings} from 'react-icons/md';


//Composant Navbar servant la navigation entre les pages
export const Navbar = ({page}) => {

    const history = useHistory();

    //Fonction redirect qui prend en param le endPoint de l'URL et on l'ajoute à history
    const redirect = path => {
        history.push(path);
    }

    return (
        <Container fluid={true} className="navbar">
            <Row className="w-100 navbar__row">
                <Col lg={3} className="navbar__row--name">
                    <span>COVID DASHBOARD 2020 UTC/GMT +1</span>
                </Col>
                <Col lg={6} className="navbar__row--icons">
                    <RiAppsFill className={page === 'dashboard' ? 'navbar__row--icon active' : 'navbar__row--icon'} onClick={() => redirect("./")}></RiAppsFill>
                    <FaEdit className={page === 'edit' ? 'navbar__row--icon active' : 'navbar__row--icon'} onClick={() => redirect("./edit")}></FaEdit>
                    <FaUser className={page === 'admin' ? 'navbar__row--icon active' : 'navbar__row--icon'} onClick={() => redirect("./admin")}></FaUser>
                    <MdSettings className={page === 'settings' ? 'navbar__row--icon active' : 'navbar__row--icon'} onClick={() => redirect("./settings")}></MdSettings>
                </Col>
                <Col lg={3} className="navbar__row--authors">
                    <span> SADOUN Benjmain WANG David - &copy; 2020</span>
                </Col>
            </Row>
        </Container>
    )
}

export default Navbar;
