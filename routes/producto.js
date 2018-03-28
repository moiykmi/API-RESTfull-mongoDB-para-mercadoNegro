'use strict'

var express = require('express');
var ProductoController = require('../controllers/producto');
var upload= require('../index.js');


var api = express.Router();


var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({uploadDir:'./recursos'});


api.get('/pruebas',ProductoController.pruebas);
api.post('/producto',ProductoController.saveProducto);
api.get('/productos',ProductoController.getProductos);
api.get('/producto/:id',ProductoController.getProducto);
api.delete('/producto/:id',ProductoController.deleteProducto);
api.put('/producto/:id',ProductoController.updateProducto);
api.post('/upload-file', multipartMiddleware, ProductoController.uploadImage);
api.get('/imagen/:id',ProductoController.getImagen);
api.get('/get-imagen/:imageFile', multipartMiddleware, ProductoController.getImagenFile);





module.exports = api;
