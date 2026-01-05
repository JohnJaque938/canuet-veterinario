const mongoose = require('mongoose');

const RolSchema = new mongoose.Schema({
  name: String
});

module.exports = mongoose.model('Rol', RolSchema);