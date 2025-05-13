const express = require('express');
const router = express.Router();
const busController = require('../controllers/bus.controller');

router.post('/create', busController.createBus);
router.get('/view-all', busController.getAllBuses);

module.exports = router;
