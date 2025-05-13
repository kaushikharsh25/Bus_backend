const axios = require('axios');
const captainModel = require('../models/captain.model');
const ORS_API = process.env.ORS_API;

module.exports.getAddressCoordinate = async (address) => {
    const url = `https://api.openrouteservice.org/geocode/search?api_key=${ORS_API}&text=${encodeURIComponent(address)}`;

    try {
        const response = await axios.get(url);
        if (response.data && response.data.features.length > 0) {
            const location = response.data.features[0].geometry.coordinates;
            return {
                lng: location[0],
                ltd: location[1]
            };
        } else {
            throw new Error('Unable to fetch coordinates');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};

module.exports.getDistanceTime = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error('Origin and destination are required');
    }

    // First, get coordinates for origin and destination
    const originCoords = await module.exports.getAddressCoordinate(origin);
    const destinationCoords = await module.exports.getAddressCoordinate(destination);

    const body = {
        coordinates: [
            [originCoords.lng, originCoords.ltd],
            [destinationCoords.lng, destinationCoords.ltd]
        ]
    };

    try {
        const response = await axios.post(
            'https://api.openrouteservice.org/v2/directions/driving-car',
            body,
            {
                headers: {
                    'Authorization': ORS_API,
                    'Content-Type': 'application/json'
                }
            }
        );

        const segment = response.data.features[0].properties.segments[0];

        return {
            distance: segment.distance, // in meters
            duration: segment.duration // in seconds
        };

    } catch (err) {
        console.error(err);
        throw new Error('Unable to fetch distance and time');
    }
};

module.exports.getAutoCompleteSuggestions = async (input) => {
    if (!input) {
        throw new Error('query is required');
    }

    const url = `https://api.openrouteservice.org/geocode/autocomplete?api_key=${ORS_API}&text=${encodeURIComponent(input)}`;

    try {
        const response = await axios.get(url);
        if (response.data && response.data.features.length > 0) {
            return response.data.features.map(f => f.properties.label).filter(Boolean);
        } else {
            throw new Error('Unable to fetch suggestions');
        }
    } catch (err) {
        console.error(err);
        throw err;
    }
};

module.exports.getCaptainsInTheRadius = async (ltd, lng, radius) => {
    // radius in km
    const captains = await captainModel.find({
        location: {
            $geoWithin: {
                $centerSphere: [[ltd, lng], radius / 6371]
            }
        }
    });

    return captains;
};
