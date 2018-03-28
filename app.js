'use strict'


var express= require('express');
var bodyParser = require('body-parser');



var app = express();

//cargar rutas
var usuario_routes = require('./routes/usuario');
var producto_routes = require('./routes/producto');

//body-parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//configurar CORS

app.use(function(req, res, next) { //allow cross origin requests
        res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
        res.header("Access-Control-Allow-Origin", "http://localhost:3800");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header("Access-Control-Allow-Credentials", true);
        next();
});


//rutas base
app.use('/api',usuario_routes);
app.use('/api',producto_routes);  //midelware


module.exports = app;