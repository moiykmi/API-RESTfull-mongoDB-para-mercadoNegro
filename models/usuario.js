'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var usuarioSchema = Schema({
	nombre : String,
	mail: String,
	usuario: String,
	password: String,
	admin: Boolean
});

module.exports = mongoose.model('Usuario', usuarioSchema);

