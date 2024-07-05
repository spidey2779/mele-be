  const mongoose = require('mongoose');

  // Define your schemas and models
  const CSESchema = mongoose.Schema({
    // Define CSE schema fields
    year1: [String],
    year2: [String],
    year3: [String],
    year4: [String],
  },{versionKey:false});

  // const ECESchema = mongoose.Schema({
  //   // Define ECE schema fields
  //   year1: [String],
  //   year2: [String], 
  //   year3: [String],
  //   year4: [String],
  // });

  // Create models for each department
  const CSEModel = mongoose.model('CSE', CSESchema);
  // const ECEModel = mongoose.model('ECE', ECESchema);

  module.exports ={
      CSEModel,
      //ECEModel 
  }