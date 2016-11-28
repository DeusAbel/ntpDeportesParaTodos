var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var usuarioSchema = new Schema({  
  nombre:   {type: String, required: true}, 
  correo:   {type: String, required: true, unique: true},
  password: {type: String, required: true},
  sexo:     {type: String, required: true},
  flag:     {type: String, required: true}  
}); 

var deporteSchema = new Schema({
  usuario:            {type: Schema.ObjectId, ref: 'usuario'},  
  nombre:             {type: String,  required: true},   
  descripcion:        {type: String,  required: true},
  reglas:             {type: String,  required: true},
  fecha_creacion:     {type: Date,    required: true},
  fecha_modificacion: {type: Date,    required: true},
  direccion:          {type: String,  required: true},
  categoria:          {type: String,  required: true},  
  flag:               {type: String,  required: true}  
});

var comentarioSchema = new Schema({  
  usuario:      {type: Schema.ObjectId, ref: 'usuario'},
  noticia:      {type: Schema.ObjectId, ref: 'noticia'}, 
  descripcion:  {type: String,  required: true},  
  fecha:        {type: Date,    required: true},  
  ranking:      {type: Number,  required: true},
  flag:         {type: String,  required: true}  
});

var noticiaSchema = new Schema({  
  usuario:      {type: Schema.ObjectId, ref: 'usuario'},
  titulo:       {type: String,  required: true}, 
  descripcion:  {type: String,  required: true},  
  fecha_hora:   {type: Date,    required: true},  
  ranking:      {type: Number,  required: true},
  flag:         {type: String,  required: true}  
});

var eventoSchema = new Schema({   
  usuario:      {type: Schema.ObjectId, ref: 'usuario'},
  titulo:       {type: String,    required: true},    
  descripcion:  {type: String,    required: true}, 
  fecha_hora:   {type: Date,      required: true},     
  ubicacion:    {type: [Number],  index: '2dsphere'},
  direccion:    {type: String,    required: true},
  categoria:    {type: String,    required: true},
  ranking:      {type: Number,    required: true},
  flag:         {type: String,    required: true}
});
 
var usuario       = mongoose.model('Usuario', usuarioSchema);
var deporte       = mongoose.model('Deporte', deporteSchema);
var comentario    = mongoose.model('Comentario', comentarioSchema);
var noticia       = mongoose.model('Noticia', noticiaSchema);
var evento        = mongoose.model('Evento', eventoSchema);

module.exports = usuario;
module.exports = deporte;
module.exports = comentario;
module.exports = noticia;
module.exports = evento;