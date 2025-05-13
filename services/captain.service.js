const captainModel = require('../models/captain.model');

module.exports.createCaptain = async ({
    fullname,
    email,
    password,
    vehicle,
    status = 'inactive',  // Default to inactive if not provided
    location = { ltd: 0, lng: 0 }  // Default coordinates if not provided
}) => {
    // Basic required field validation
    if (
        !fullname?.firstname ||
        !email ||
        !password ||
        !vehicle?.color ||
        !vehicle?.plate ||
        !vehicle?.capacity ||
        !vehicle?.vehicleType
    ) {
        throw new Error('All required fields must be provided');
    }

    const captain = await captainModel.create({
        fullname: {
            firstname: fullname.firstname,
            lastname: fullname.lastname || ''
        },
        email,
        password,
        status,
        vehicle: {
            color: vehicle.color,
            plate: vehicle.plate,
            capacity: vehicle.capacity,
            vehicleType: vehicle.vehicleType,
            routeId: vehicle.routeId || ''
        },
        location: {
            ltd: location.ltd || 0,
            lng: location.lng || 0
        }
    });

    return captain;
};
