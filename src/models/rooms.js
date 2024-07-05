const mongoose = require('mongoose');

const Room = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    WB: [String],
    SB: [String],
    EB: [String]
  }, { timestamps: false , versionKey:false});

const Rooms = mongoose.model('rooms', Room);

module.exports = Rooms;