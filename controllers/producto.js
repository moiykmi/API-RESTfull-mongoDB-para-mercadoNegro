'use strict'


var Producto = require('../models/producto');
var Image = require('../models/image');
var path = require('path');


function pruebas(req,res){
	res.status(200).send({
		menssage : 'Esta ruta es de prueba en mi api restfull con mongo y node'
	});
};




function saveProducto(req,res){
	console.log('aca');
	var producto = new Producto();
	var params = req.body;
	console.log(params);
	var params = JSON.parse(params.json);
	console.log(params);
	console.log(params.nombre);
	
	if(params.nombre){
		producto.nombre= params.nombre;
		producto.marca = params.marca;
		producto.color = params.color;
		producto.imagen = params.imagen;
		


		producto.save((err, productoStrored)=>{
			if(err){
				res.status(500).send({
					menssage: 'Error en el servidor'
				});
			}else{
				if(productoStrored){
					res.status(200).send({
						status : 'success',
						code : 200,
						menssage : 'Producto se creo correctamente'
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
    
    //uploadImage(req,res);
}



function getProductos(req, res){
	Producto.find({}).exec((err, producto)=>{
		if(err){
			res.status(500).send({
				menssage:'Error en el servidor'
			});
		}else{
			if(producto){
				res.status(200).send({
					status : 'success',
					code : 200,
					data : producto
				});
			}else{
				res.status(404).send({
					menssage:'No hay usuarios'
				});
			}
		}
	});
}



function deleteProducto(req,res){
	var productoId = req.params.id;

	console.log(productoId);
	
	Producto.findByIdAndRemove(productoId,(err,productoRemove)=>{
		if(err){
			console.log(1);
			res.status(500).send({
				menssage:'Error en el servidor'
			});
		}else{
			if(productoRemove){
				console.log(2);
				res.status(200).send({
					status : 'success',
					code : 200,
					menssage : 'el producto no se ha eliminado',
					producto : productoRemove
				});
			}else{
				console.log(3);
				res.status(404).send({
					status : 'error',
					code : 404,
					menssage:'el producto no se ha eliminado'
				});
			}
		}
	});
}


function getProducto(req, res){

	var params = req.params;
	var nombre = params.id;


	Producto.find({_id : nombre}).exec((err, producto)=>{
		if(err){
			res.status(500).send({
				menssage:'Error en el servidor',
				code : 500
			});			
		}else{
			if(producto){
				//console.log(producto);
				res.status(200).send({
						status : 'success',
						code : 200, 
						producto : producto
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


function updateProducto(req,res){
	var productoId = req.params.id;
	var update =req.body;

	var params = JSON.parse(update.json);
	console.log(params);
	

	Producto.findByIdAndUpdate(productoId, params , {new :true},(err, productoUpdate)=>{
		if(err){
			console.log(1);
			res.status(500).send({
				menssage:'Error en el servidor'
			});
		}else{
			if(productoUpdate){
				console.log(2);
				console.log(productoUpdate);
				res.status(200).send({
					status : 'success',
					code : 200, 
					producto : productoUpdate
				});
			}else{
				console.log(3);
				res.status(404).send({
					menssage:'No existe usuario'
				});
			}
		}
	});
}



function uploadImage(req,res){
	var imageId = req.params.id;
	var file_name='No subido...';
	console.log(req.params);
	console.log(imageId);
	console.log(1);
	if(req.files){
		var file_path = req.files.imagen.path;
		var file_split = file_path.split('\\');
		var file_name = file_split[1];
		console.log(file_path);
		console.log(file_split);
		console.log(file_name);
		res.status(200).send({filename : file_name});

		/**Producto.findByIdAndUpdate(imageId, {imagen : file_name},(err,imageUpdate) =>{
			console.log(imageUpdate);
			console.log(1);
			if(err){
				console.log(2);
				res.status(500).send({menssage : 'Error en la petición'});
			}else{
				console.log(3);
				if(!imageUpdate){
					console.log(4);
					res.status(400).send({menssage : 'No se ha actualizado la imagen !!'});
				}else{
					console.log(5);
					res.status(200).send({image : imageUpdate});
				}
			}
		});**/
	
	}else{
		res.status(200).send({menssage: 'No has subido ninguna imagen!!'});
	}
} 



function getImagen(req, res){

	var params = req.params;
	var nombre = params.id;


	Producto.find({_id : nombre}).exec((err, producto)=>{
		if(err){
			res.status(500).send({
				menssage:'Error en el servidor',
				code : 500
			});			
		}else{
			if(producto){
				console.log(producto[0].imagen);
				res.status(200).send({
						status : 'success',
						code : 200, 
						producto : producto[0].imagen
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

function getImagenFile(req,res){
	var imagenFile = req.params.imageFile;
	console.log(imagenFile);
	res.sendFile(path.resolve('./recursos/'+imagenFile));
}


module.exports={
	pruebas,
	saveProducto,
	getProductos,
	deleteProducto,
	getProducto,
	updateProducto,
	uploadImage,
	getImagen,
	getImagenFile
	

};