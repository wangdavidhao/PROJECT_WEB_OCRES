const jwt = require('jsonwebtoken');
require('dotenv').config();

/**
 * Fonction qui va vérifier l'authorisation d'accès d'un user en fonction du token dans le header
 */
const userAuth = (req, res, next) => {

    const authToken = req.header('auth-token'); //On get le auth-token depuis le header
    if(!authToken) return res.status(403).send('Access denied'); //Si token non renseigné, alors accès refusé

    try{
        jwt.verify(authToken, process.env.AUTH_TOKEN); //On vérifie le token
        next(); //On passe au prochain middleware
    }catch(err){
        res.status(403).send('Auth token non valide'); //Si token incorrect alors erreur
    }
}

module.exports = userAuth;