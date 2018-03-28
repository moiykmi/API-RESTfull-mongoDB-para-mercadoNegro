'use strict'

var express = require('express');
var UsuarioController = require('../controllers/usuario');


var api = express.Router();


api.get('/pruebas',UsuarioController.pruebas);
api.post('/usuario',UsuarioController.saveUsuario);
api.get('/usuarios',UsuarioController.getUsuarios);
api.get('/usuario/:id',UsuarioController.getUsuario);
api.put('/usuario/:id',UsuarioController.updateUsuario);
api.delete('/usaurio/:id',UsuarioController.deleteUsuario);


module.exports = api;