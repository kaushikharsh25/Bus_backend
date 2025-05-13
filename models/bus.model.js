const mongoose = require('mongoose');

const busSchema = new mongoose.Schema({
  number: { type: String, required: true },
  route: { type: String, required: true },
  status: { type: String, enum: ['available', 'on-trip', 'maintenance'], default: 'available' }
}, { timestamps: true });

module.exports = mongoose.model('Bus', busSchema);
