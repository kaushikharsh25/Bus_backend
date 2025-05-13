const rideModel = require('../models/ride.model');
const busModel = require('../models/bus.model');  // Assuming you have a bus model
const mapService = require('./maps.service');

module.exports.createRide = async ({
    user, pickup, destination, busId
}) => {
    if (!user || !pickup || !destination || !busId) {
        throw new Error('All fields are required');
    }

    // Create ride without fare and OTP
    const ride = new rideModel({
        user,
        pickup,
        destination,
        status: 'pending',
        busId
    });

    await ride.save();
    return ride;
}

module.exports.confirmRide = async ({
    rideId, busId
}) => {
    if (!rideId || !busId) {
        throw new Error('Ride ID and Bus ID are required');
    }

    // Confirm the ride and assign bus
    const ride = await rideModel.findByIdAndUpdate(rideId, {
        status: 'accepted',
        busId
    }, { new: true });

    if (!ride) {
        throw new Error('Ride not found');
    }

    return ride;
}

module.exports.startRide = async ({ rideId, busId }) => {
    if (!rideId || !busId) {
        throw new Error('Ride ID and Bus ID are required');
    }

    const ride = await rideModel.findOne({ _id: rideId, busId });
    if (!ride) {
        throw new Error('Ride not found');
    }

    if (ride.status !== 'accepted') {
        throw new Error('Ride not accepted');
    }

    ride.status = 'ongoing';
    await ride.save();

    return ride;
}

module.exports.endRide = async ({ rideId, busId }) => {
    if (!rideId || !busId) {
        throw new Error('Ride ID and Bus ID are required');
    }

    const ride = await rideModel.findOne({ _id: rideId, busId });
    if (!ride) {
        throw new Error('Ride not found');
    }

    if (ride.status !== 'ongoing') {
        throw new Error('Ride not ongoing');
    }

    ride.status = 'completed';
    await ride.save();

    return ride;
}

module.exports.cancelRide = async ({ rideId }) => {
    if (!rideId) {
        throw new Error('Ride ID is required');
    }

    const ride = await rideModel.findByIdAndUpdate(rideId, { status: 'cancelled' }, { new: true });
    if (!ride) {
        throw new Error('Ride not found');
    }

    return ride;
}

module.exports.trackBusLocation = async (busId) => {
    const bus = await busModel.findById(busId);
    if (!bus) {
        throw new Error('Bus not found');
    }

    return bus;
}

module.exports.viewAllRides = async (userId) => {
    const rides = await rideModel.find({ user: userId }).populate('busId');
    return rides;
}
