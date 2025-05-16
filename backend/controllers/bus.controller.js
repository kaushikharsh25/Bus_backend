const Bus = require('../models/bus.model');

exports.createBus = async (req, res) => {
  try {
    const { number, route, status } = req.body;
    const bus = new Bus({ number, route, status });
    await bus.save();
    res.status(201).json({ message: 'Bus created successfully', bus });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create bus', details: err.message });
  }
};

exports.getAllBuses = async (req, res) => {
  try {
    const buses = await Bus.find();
    res.status(200).json(buses);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch buses' });
  }
};
