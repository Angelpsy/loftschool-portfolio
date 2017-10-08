const express = require('express');
const router = express.Router();

const ctrlMenu = require('../controllers/api/menu');

/* GET home page. */
router.get('/menu', ctrlMenu.getPage);

module.exports = router;
