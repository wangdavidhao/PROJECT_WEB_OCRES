import React, {useState} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import {ListData} from './../widgets/ListData.js'

import axios from '../axios';


import './Admin.css';


//Local imports
import Navbar from './Navbar.js';

const Admin = () => {

    const [isLogged, setIsLogged] = useState(true);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = async (e) => {
        e.preventDefault();
        await axios.post('/user/login', {
            mail: email,
            password: password
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });

    };

    return (
        <Container fluid={true} className="admin">
            <Navbar page="admin"/>
            <Row>
                <Col>
                    
                    {isLogged ? 
                        <form className="admin__signIn" onSubmit={handleSignIn}>
                            <h1>Connexion</h1>
                            <label for="email">Email : </label>
                            <input type="email" name="email" placeholder="Mail" value={email} onChange={(e) => setEmail(e.target.value)}/>
                            <label for="password">Mot de passe : </label>
                            <input type="password" name="password" placeholder="Mdp" value={password} onChange={(e) => setPassword(e.target.value)}/>
                            <button type="submit">Connexion</button>
                        </form> 
                    : <ListData isAdmin={true}/> }
                </Col>
            </Row>
        </Container>
    )
}



export default Admin;
