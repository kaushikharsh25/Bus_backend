const userModel = require('../models/user.model');
const captainModel = require('../models/captain.model');
const busModel = require('../models/bus.model'); // Assuming you have a bus model
const jwt = require('jsonwebtoken');
const blackListTokenModel = require('../models/blackListToken.model');

// Common authentication function
const authenticate = (model, role) => {
    return async (req, res, next) => {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: `Unauthorized - Token missing for ${role}` });
        }

        try {
            // Check if token is blacklisted
            const isBlacklisted = await blackListTokenModel.findOne({ token });
            if (isBlacklisted) {
                return res.status(401).json({ message: `Unauthorized - Token blacklisted for ${role}` });
            }

            // Verify JWT
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const entity = await model.findById(decoded._id);

            if (!entity) {
                return res.status(401).json({ message: `Unauthorized - ${role} not found` });
            }

            req[role] = entity;
            next();
        } catch (err) {
            console.error(`${role} auth error:`, err.message);
            return res.status(401).json({ message: `Unauthorized - Invalid token for ${role}` });
        }
    };
};

// Middleware for authenticating users
module.exports.authUser = authenticate(userModel, 'user');

// Middleware for authenticating captains
module.exports.authCaptain = authenticate(captainModel, 'captain');

// Middleware for authenticating bus staff (if needed)
module.exports.authBusStaff = authenticate(busModel, 'busStaff');
