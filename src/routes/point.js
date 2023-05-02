const express = require('express');
const router = express.Router();
const pointController = require('../app/controllers/PointController');

router.get('/:MMH/edit/:userId', pointController.edit);
router.get('/create/:userId', pointController.create);
router.put('/store/:userId', pointController.store);
router.put('/:_id/:userId', pointController.update);
router.delete('/:_id/:userId', pointController.delete);

module.exports = router;