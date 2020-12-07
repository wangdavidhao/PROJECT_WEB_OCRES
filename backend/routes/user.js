const express = require('express');
const router = express.Router();
const userController = require('.././controllers/userController');
const UserModel = require('.././models/userModel');


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

router.post('/', (req, res) => {
  const userData = req.body;

  const newUser = new UserModel(userData);
  
  //On l'insert dans la bdd
  newUser.save((err, data) => {
    if(err){
      res.status(500).send(err);
    }else{
      res.status(200).send(newUser);
    }
  })
})

module.exports = router;
