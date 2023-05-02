const express = require('express');
const router = express.Router();
const loginController = require('../app/controllers/LoginController');

router.put('/login', loginController.login);
router.patch('/logout/:userId', loginController.logout);
router.get('/', loginController.show);

module.exports = router;