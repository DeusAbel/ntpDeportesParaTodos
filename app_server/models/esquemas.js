var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var usuarioSchema = new mongoose.Schema({ 
  Nombres: String, 
  Apellidos: String, 
  Contraseña: String,
  email: String,
  Ubicación: {type: Number, index: '2dsphere'}
}); 

var eventoSchema = new mongoose.Schema({   
  Nombre: String, 
  Fecha: String, 
  Categoria: String,
  Ubicacion: {type: Number, index: '2dsphere'},
  usuario_own_id: {type: Schema.ObjectId, ref: 'usuario'}
});

var contactoSchema = new mongoose.Schema({
	usuario_own_id: {type: Schema.ObjectId, ref: 'usuario'},
	usuario_frd_id: {type: Schema.ObjectId, ref: 'usuario'}   
}); 
var evento_asistencia_Schema = new mongoose.Schema({
  usuario_id: {type: Schema.ObjectId, ref: 'usuario'},
  evento_id: {type: Schema.ObjectId, ref: 'evento'}  
}); 

var usuario = mongoose.model('usuario', usuarioSchema); 
var evento = mongoose.model('evento', eventoSchema);
var contacto = mongoose.model('contacto', contactoSchema);
var evento_asistencia = mongoose.model('evento_asistencia', evento_asistencia_Schema);