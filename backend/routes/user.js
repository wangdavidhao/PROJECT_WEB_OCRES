const express = require('express');
const router = express.Router();

//CRUD
router.get('/', (req, res) => {
  res.send('get method');
});

router.post('/', (req, res) => {
  res.send('post method');
})

module.exports = router;
