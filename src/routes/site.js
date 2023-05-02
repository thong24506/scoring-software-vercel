const express = require('express');
const router = express.Router();
const siteController = require('../app/controllers/SiteController');

router.get('/:userId', siteController.show);

module.exports = router;