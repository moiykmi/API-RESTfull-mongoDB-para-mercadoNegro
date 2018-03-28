'use strict'


var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var imageSchema = Schema({
	id:Number,
	nombre: String
});

module.exports = mongoose.model('Image', imageSchema);

