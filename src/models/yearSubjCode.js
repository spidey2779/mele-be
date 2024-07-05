const mongoose = require('mongoose');

const YearDataSchema = new mongoose.Schema({
    CSE1: {
      type: [String],
      default: null,
    },
    CSE2: {
      type: [String],
      default: null,
    },
    CSE3: {
      type: [String],
      default: null,
    },
    CSE4: {
      type: [String],
      default: null,
    },

    // ECE1: {
    //   type: [String],
    //   default: null,
    // },
    // ECE2: {
    //   type: [String],
    //   default: null,
    // }

},{versionKey:false});

const YearData = mongoose.model('YearData', YearDataSchema);

module.exports = YearData;
