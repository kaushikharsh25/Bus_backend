const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service');
const blackListTokenModel = require('../models/blackListToken.model');
const { validationResult } = require('express-validator');

// Register captain
module.exports.registerCaptain = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password, vehicle, location } = req.body;

    const isCaptainAlreadyExist = await captainModel.findOne({ email });
    if (isCaptainAlreadyExist) {
      return res.status(400).json({ message: 'Captain already exists' });
    }

    const hashedPassword = await captainModel.hashPassword(password);

    const captain = await captainService.createCaptain({
      email,
      password: hashedPassword,
      fullname: {
        firstname: fullname.firstname,
        lastname: fullname.lastname,
      },
      vehicle: {
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType,
        routeId: vehicle.routeId || null, // Optional
      },
      location: {
        ltd: location?.ltd || 0,
        lng: location?.lng || 0,
      },
    });

    const token = captain.generateAuthToken();
    res.status(201).json({ token, captain });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Login captain
module.exports.loginCaptain = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const captain = await captainModel.findOne({ email }).select('+password');

    if (!captain || !(await captain.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = captain.generateAuthToken();
    res.cookie('token', token);
    res.status(200).json({ token, captain });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Login failed' });
  }
};

// Get profile
module.exports.getCaptainProfile = async (req, res, next) => {
  res.status(200).json({ captain: req.captain });
};

// Logout captain
module.exports.logoutCaptain = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (token) {
      await blackListTokenModel.create({ token });
    }
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Logout failed' });
  }
};

// Update captain location
module.exports.updateCaptainLocation = async (req, res, next) => {
  try {
    const { ltd, lng } = req.body;

    if (typeof ltd !== 'number' || typeof lng !== 'number') {
      return res.status(400).json({ message: 'Invalid location coordinates' });
    }

    req.captain.location = { ltd, lng };
    await req.captain.save();

    res.status(200).json({ message: 'Location updated successfully', location: req.captain.location });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update location' });
  }
};

// Update captain status (active/inactive)
module.exports.updateCaptainStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    if (!['active', 'inactive'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    req.captain.status = status;
    await req.captain.save();

    res.status(200).json({ message: 'Status updated successfully', status });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update status' });
  }
};
