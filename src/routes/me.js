const express = require('express');
const router = express.Router();
const meController = require('../app/controllers/MeController');

router.get('/show/:userId', meController.show);

module.exports = router;