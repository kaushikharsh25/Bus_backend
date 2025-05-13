const express = require('express');
const router = express.Router();
const rideController = require('../controllers/ride.controller');
const { body, query } = require('express-validator');
const authMiddleware = require('../middlewares/auth.middleware');
router.post('/create',
    body('pickup').isObject().notEmpty().withMessage('Pickup should be an object with lat and lng'),
    body('destination').isObject().notEmpty().withMessage('Destination should be an object with lat and lng'),
    body('busId').isMongoId().notEmpty().withMessage('Bus ID must be a valid MongoDB ObjectId'),
    authMiddleware.authUser,
    rideController.createRide
);
router.get('/get-fare',
    query('pickup').isString().notEmpty(),
    query('destination').isString().notEmpty(),
    rideController.getFare // This can be removed if it's no longer needed.
);

router.post('/confirm',
    body('rideId').isMongoId().notEmpty(),
    body('busId').isMongoId().notEmpty(),
    authMiddleware.authCaptain,
    rideController.confirmRide
);

router.post('/start',
    query('rideId').isMongoId().notEmpty(),
    query('busId').isMongoId().notEmpty(),
    authMiddleware.authCaptain,
    rideController.startRide
);

router.post('/end',
    body('rideId').isMongoId().notEmpty(),
    body('busId').isMongoId().notEmpty(),
    authMiddleware.authCaptain,
    rideController.endRide
);

router.post('/cancel',
    body('rideId').isMongoId().notEmpty(),
    rideController.cancelRide
);

router.get('/track-bus-location',
    query('busId').isMongoId().notEmpty(),
    rideController.trackBusLocation
);

router.get('/view-all-rides/:userId',
    rideController.viewAllRides
);

module.exports = router;
