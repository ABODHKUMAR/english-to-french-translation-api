const express = require('express');
const router = express.Router();
const traslateController = require('../controllers/traslateController');

router.post('/translate', traslateController);



module.exports = router;
