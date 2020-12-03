import React from 'react';
import {Link} from 'react-router-dom';
import {Button} from 'react-bootstrap';

const Error = () => {
    return (
        <div className="d-flex align-items-center flex-column">
            <h1>Erreur 404</h1>
            <Link to="/">
                <Button>Retour page accueil</Button>
            </Link>
            
        </div>
    )
}

export default Error;
