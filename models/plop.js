const mongoose = require('mongoose');

const PlopSchema = new mongoose(Schema({
  username: {
    type: String
  },
  plebCount: {
    type: Number
  }
}))

const Plop = mongoose.model('Plop', PlopSchema);

module.exports = Plop;
