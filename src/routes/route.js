const express = require('express');
const router = express.Router();
const cnt = require('../controller/controller');

router.post('/functionup/colleges' , cnt.createClg )

module.exports = router;