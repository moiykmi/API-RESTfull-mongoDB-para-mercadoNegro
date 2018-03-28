'use strict'


var Usuario = require('../models/usuario');


function pruebas(req,res){
	res.status(200).send({
		menssage : 'Esta ruta es de prueba en mi api restfull con mongo y node'
	});
};



function saveUsuario(req,res){

	var usuario = new Usuario();
	var params = req.body;
	var params = JSON.parse(params.json);
	console.log(params);

	if(params.nombre){
		usuario.nombre= params.nombre;
		usuario.mail = params.mail;
		usuario.usuario = params.usuario;
		usuario.password = params.password;
		usuario.admin = params.admin;

		usuario.save((err, usuarioStrored)=>{
			if(err){
				res.status(500).send({
					menssage: 'Error en el servidor'
				});
			}else{
				if(usuarioStrored){
					res.status(200).send({
						status : 'success',
						code : 200,
						menssage : 'Cliente se creo correctamente'
					});
				}else{
						res.status(500).send({
						menssage: 'No se ha guardado el usuario'
					});
				}
			}
		})
	}else{
		res.status(200).send({
						menssage: 'El nombre de la usuario es obligatorio'
					});
	}

}


function getUsuarios(req, res){
	Usuario.find({}).exec((err, usuario)=>{
		if(err){
			res.status(500).send({
				menssage:'Error en el servidor'
			});
		}else{
			if(usuario){
				res.status(200).send({
					usuario
				});
			}else{
				res.status(404).send({
					menssage:'No hay usuarios'
				});
			}
		}
	});
}

/**
function getUsuario(req, res){

	var usuarioId = req.params.id;

	Usuario.findById(usuarioId).exec((err, usuario)=>{
		if(err){
			res.status(500).send({
				menssage:'Error en el servidor'
			});
		}else{
			if(usuario){
				res.status(200).send({
					usuario
				});
			}else{
				res.status(404).send({
					menssage:'No existe usuario'
				});
			}
		}
	});
}
**/

function getUsuario(req, res){



	var params = req.params;
	var nombre = params.id;
	
	Usuario.find({nombre : nombre}).exec((err, usuario)=>{
		if(err){
			res.status(500).send({
				menssage:'Error en el servidor',
				code : 500
			});			
		}else{
			if(usuario[0]){
				//console.log(usuario[0].id);
				res.status(200).send({
						status : 'success',
						code : 200, 
						usuario : usuario
					});
			}else{
				res.status(404).send({
					menssage:'No existe usuario',
					code : 404
				});
			}
		}
	});
}





function updateUsuario(req,res){
	var usuarioId = req.params.id;
	var update = req.body;


	Usuario.findByIdAndUpdate(usaurioId, update , {new :true},(err, usuarioUpdate)=>{
		if(err){
			res.status(500).send({
				menssage:'Error en el servidor'
			});
		}else{
			if(usuarioUpdate){
				res.status(200).send({
					usuario : usuarioUpdate
				});
			}else{
				res.status(404).send({
					menssage:'No existe usuario'
				});
			}
		}
	});
}


function deleteUsuario(req,res){
	var usuarioId = req.params.id;

	Usuario.findByIdAndRemove(usuarioId,(err,usuarioRemove)=>{
		if(err){
			res.status(500).send({
				menssage:'Error en el servidor'
			});
		}else{
			if(usuarioRemove){
				res.status(200).send({
					usuario : usuarioRemove
				});
			}else{
				res.status(404).send({
					menssage:'No existe la usuario'
				});
			}
		}
	});
}

module.exports={
	pruebas,
	saveUsuario,
	getUsuario,
	getUsuarios,
	updateUsuario,
	deleteUsuario
};