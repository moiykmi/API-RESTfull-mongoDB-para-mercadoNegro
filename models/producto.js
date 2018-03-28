'use strict'


var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var productoSchema = Schema({
	id:Number,
	nombre : String,
	marca: String,
	color: String,
	imagen: String
});

module.exports = mongoose.model('Producto', productoSchema);

