'use strict';
// Mongoose schema or collection model
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Schema = new Schema({

  name: { type: String, Required:  'Task name cannot be left blank.' },
  
  priority:    { type: String,     Required:  'Task priority cannot be left blank.'},

  dueDate:    { type: String,     Required:  'Task due date cannot be left blank.'}

});

module.exports = mongoose.model('Tasks', Schema);