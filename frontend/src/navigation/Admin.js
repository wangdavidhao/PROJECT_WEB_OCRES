import React, {useState, useEffect} from 'react';
import {Container, Row, Col, Modal, Button} from 'react-bootstrap';
import {ListData} from './../widgets/ListData.js'
import {FaUser} from 'react-icons/fa';

import axios from '../axios';


import './Admin.css';


//Local imports
import Navbar from './Navbar.js';

const Admin = () => {

    const [isLogged, setIsLogged] = useState(false);
    const [authToken, setAuthToken] = useState('');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSignIn = async (e) => {

        e.preventDefault();
        await axios.post('/user/login', {
            mail: email,
            password: password
        })
        .then((response) => {
            
            setAuthToken(response.data);
            setEmail('');
            setPassword('');
            sessionStorage.setItem("token", response.data);
            setIsLogged(true);
        })
        .catch((error) => {
            console.log('Erreur', error);
            handleShow();
        });
    };

    

    //Vérifie s'il y a un token dans le localeStorage
    const checkToken = () => {
        let token = sessionStorage.getItem("token");
        if(token === null) setIsLogged(false);
        else setIsLogged(true);
    }

    //On le vérifie à chaque fois que le state Token change
    useEffect(() => {
        checkToken();
    }, [authToken]);

    return (
        <Container fluid={true} className="admin">
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Erreur</Modal.Title>
                </Modal.Header>
                <Modal.Body>Utilisateur introuvable...</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Fermer
                </Button>
                </Modal.Footer>
            </Modal>
            <Navbar page="admin"/>
            <Row>
                <Col>
                    
                    {!isLogged ? 
                        <form className="admin__signIn" onSubmit={handleSignIn}>
                            <div className="d-flex align-items-center justify-content-center text-align-center"><h1>Connexion <FaUser/></h1></div>
                            <label htmlFor="email">Email : </label>
                            <input type="email" name="email" placeholder="Mail" value={email} onChange={(e) => setEmail(e.target.value)}/>
                            <label htmlFor="password">Mot de passe : </label>
                            <input type="password" name="password" placeholder="Mdp" value={password} onChange={(e) => setPassword(e.target.value)}/>
                            <button className="admin__connect" type="submit">Connexion</button>
                        </form> 
                    : <ListData isAdmin={true}/> }
                </Col>
            </Row>
        </Container>
    )
}



export default Admin;
