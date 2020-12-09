import React, {useState} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import {ListData} from './../widgets/ListData.js'


import './Admin.css';


//Local imports
import Navbar from './Navbar.js';

const Admin = () => {

    const [isLogged, setIsLogged] = useState(true);

    const handleSignIn = (e) => {
        e.prevent.default();
    };

    return (
        <Container fluid={true} className="admin">
            <Navbar page="admin"/>
            <Row>
                <Col>
                    
                    {isLogged ? <SignIn handleSignIn={handleSignIn}/> : <ListData isAdmin={true}/> }
                </Col>
            </Row>
        </Container>
    )
}

const SignIn = ({handleSignIn}) => {

    return(
        <div>
            <form className="admin__signIn" onSubmit={handleSignIn}>
                <h1>Connexion</h1>
                <label for="email">Email : </label>
                <input type="email" name="email" placeholder="Mail"/>
                <label for="password">Mot de passe : </label>
                <input type="password" name="password" placeholder="Mdp"/>
                <button type="submit">Connexion</button>
            </form>
        </div>
    )
    
}

export default Admin;
