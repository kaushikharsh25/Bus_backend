const rideService = require('../services/ride.service');
const { validationResult } = require('express-validator');
const rideModel = require('../models/ride.model');
const busModel = require('../models/bus.model'); // Assuming a bus model exists
const { sendMessageToSocketId } = require('../socket');

module.exports.createRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { userId, pickup, destination, busId } = req.body;

    try {
        // Creating ride without fare and OTP
        const ride = await rideService.createRide({ user: req.user._id, pickup, destination, busId });
        res.status(201).json(ride);

        // Send notifications to available captains (buses)
        const captainsInRadius = await mapService.getCaptainsInTheRadius(pickupCoordinates.ltd, pickupCoordinates.lng, 2);

        // Sending the ride details to all captains within the radius
        captainsInRadius.map(captain => {
            sendMessageToSocketId(captain.socketId, {
                event: 'new-ride',
                data: ride
            });
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err.message });
    }
};

module.exports.getFare = async (req, res) => {
    // Fare calculation removed for the college bus system
    return res.status(400).json({ message: 'Fare calculation is not needed for college rides.' });
};

module.exports.confirmRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId, busId } = req.body;

    try {
        // Confirming the ride and assigning the bus
        const ride = await rideService.confirmRide({ rideId, busId });

        // Notify student about the confirmed ride
        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-confirmed',
            data: ride
        });

        return res.status(200).json(ride);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err.message });
    }
};

module.exports.startRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId, busId } = req.query;

    try {
        // Starting the ride
        const ride = await rideService.startRide({ rideId, busId });

        // Notify student about the started ride
        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-started',
            data: ride
        });

        return res.status(200).json(ride);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

module.exports.endRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId, busId } = req.body;

    try {
        // Ending the ride
        const ride = await rideService.endRide({ rideId, busId });

        // Notify student about the ended ride
        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-ended',
            data: ride
        });

        return res.status(200).json(ride);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

module.exports.cancelRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;

    try {
        // Canceling the ride
        const ride = await rideService.cancelRide({ rideId });

        // Notify student about the canceled ride
        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-canceled',
            data: ride
        });

        return res.status(200).json(ride);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

module.exports.trackBusLocation = async (req, res) => {
    const { busId } = req.query;

    try {
        const bus = await rideService.trackBusLocation(busId);

        if (!bus) {
            return res.status(404).json({ message: 'Bus not found' });
        }

        return res.status(200).json(bus.location);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

module.exports.viewAllRides = async (req, res) => {
    const { userId } = req.params;

    try {
        const rides = await rideService.viewAllRides(userId);
        return res.status(200).json(rides);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};
