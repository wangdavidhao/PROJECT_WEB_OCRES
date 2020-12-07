const express = require('express');
const router = express.Router();
const userController = require('.././controllers/userController');
const UserModel = require('.././models/userModel');

const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/**
 * Schéma de validation de notre modèle User
 * Mail: string, required, type email
 * Mdp: string, require, minimum 6 caractères
 */
const schema = Joi.object({
    mail: Joi.string().required().email(),
    password: Joi.string().required().min(6),
    order: Joi.number().max(5),
  }
) 

//CRUD
router.get('/', async (req, res) => {
  //On cherche toutes les lignes de data dans la collection users
  UserModel.find((err, data) => {
        if(err){
            res.status(500).send(err);
        }else{
            res.status(200).send(data);
        }
    });
});

router.post('/register', async (req, res) => {

  const {error} = schema.validate(req.body); //On récupère l'attribut error dans l'objet de validation, data depuis le body

  if(error) return res.status(400).send(error.details[0].message); //Si erreur, on affiche message d'erreur de validation

  //Vérification mail
  const user = await UserModel.findOne({mail: req.body.mail}); //Cherche mail dans la bdd
  if(user) return res.status(400).send('Mail existe deja'); //Si existe déjà

  //Hachage mdp
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //Création de notre nouvelle objet où seul le mdp est modifié => hachage
  const userData = new UserModel({
    ...req.body,
    password: hashedPassword
  });

  try{
      const newUser = await userData.save(); //Save dans la bdd
      res.status(200).send(newUser);
  }catch(err){
      res.status(500).send(err);
  }

});

//Connexion user
router.post('/login', async (req, res) => {

    const {error} = schema.validate(req.body); //On récupère l'objet de validation, data depuis le body

    if(error) return res.status(400).send(error.details[0].message);

    //Vérification mail
    const user = await UserModel.findOne({mail: req.body.mail});
    if(!user) return res.status(400).send('Mail incorrect');

    //Vérification mdp
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send('Mdp incorrect');

    //Attribution d'un token
    const authToken = jwt.sign({_id: user._id}, process.env.AUTH_TOKEN);
    res.header('auth-token', authToken).send(authToken);
    

    res.status(200).send('Connexion réussie !');
    

});


module.exports = router;
