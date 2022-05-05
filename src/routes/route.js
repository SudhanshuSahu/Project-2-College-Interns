const express = require('express');
const router = express.Router();
const cnt = require('../controller/controller');

router.post('/functionup/colleges' , cnt.createClg)
router.post('/functionup/interns' , cnt.createIntern)
router.get('/functionup/collegeDetails' ,cnt.getClg)

module.exports = router;