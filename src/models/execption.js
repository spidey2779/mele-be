const mongoose = require('mongoose');

const execptionSchema = new mongoose.Schema({
  code1: [String],
  code2: [String],
});

const execptionModel = mongoose.model('exection', execptionSchema); 

module.exports = {execptionModel};
