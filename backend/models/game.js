const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  name: { type: String, required: true },
  website: { type: String, required: true },
  type: { type: String, required: true },
  releaseDate: { type: Date, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  votes: { type: Number, default: 0 },
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' }
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
