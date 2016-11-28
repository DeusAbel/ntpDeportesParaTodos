var mongoose = require('mongoose');
var tusuarios = mongoose.model('Usuario');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};



//  console("esto se insertara: "+req.params.usuario+" "+req.query.email+" "+req.body.password);  

//Insertar Usuario
module.exports.usuariosCreate = function(req, res){
  //console.log(req.body.nombre+ "/"+ req.body.correo+"/"+req.body.password);  
  tusuarios.create(
    {
      nombre:   req.body.nombre,        
      correo:   req.body.correo,
      password: req.body.password,
      sexo:     req.body.sexo,
      flag:     'A'
    }, function(err, usuario){
      if (err){
        sendJSONresponse(res, 400, err);
      } else {
        sendJSONresponse(res, 201, usuario); 
      }
    }
  )
};

//Listar Usuarios
module.exports.usuariosList = function(req, res){
  console.log("Listando");
  if(req.params){
    tusuarios
      .find({flag:"A"}, function(err, usuarios){
        var usuarioMap = {};
        usuarios.forEach(function(usuario){
          usuarioMap[usuario._id] = usuario;
          console.log("Usuario:" +  usuario);
        });        
        sendJSONresponse(res, 201, usuarios);
      });
  }  
};

//Leer Usuario
module.exports.usuariosRead = function(req, res){
  if (req.params && req.params.usuario_id){
    console.log("codigo de usuario: " + req.params.usuario_id);
    tusuarios
      .findById(req.params.usuario_id)
      .exec(function(err, usuario){
        if(!usuario || usuario.flag == "E"){
          sendJSONresponse(res, 404, {
            "mensaje": "Usuario no encontrado" 
          });
          return;
        } else if (err){
          sendJSONresponse(es, 404, err);
          return;
        }
        sendJSONresponse(res, 200, usuario);
      });    
  }else{
    sendJSONresponse(res, 404, {
      "Mensaje": "Falta el Id del usuario en la solicitud"
    });
  }
};

//Modificar Usuario 
module.exports.usuariosUpdate = function(req, res){
  console.log("API UPDATE: " + req.params.usuario_id);
  if (!req.params.usuario_id){
    console.log("NO HAY:  " + req.params.usuario_id);
    sendJSONresponse(res404, {
      "Mensaje": "No encontrado, usuario_id requerido"
    });
    return;    
  }
  tusuarios
    .findById(req.params.usuario_id)    
    .select('-correo -flag')
    .exec(      
      function(err, usuario){        
        if (!usuario || usuario.flag == "E"){                    
          sendJSONresponse(res, 404, {
            "Mensaje": "Id de usuario no encontrado"
          });
          return;
        } else if (err){
          console.log("ERROR AQUI : " + err);
          sendJSONresponse(res, 404,err);
          return;          
        }

        
        usuario.nombre =    req.body.nombre;
        usuario.password =  req.body.password;
        usuario.sexo =      req.body.sexo;
        
        usuario.save(function(err, usuario){
          if (err){
            console.log("ERROR AQUI : " + err);
            sendJSONresponse (res, 404, err);
          } else {            
            sendJSONresponse(res,200, usuario);
          }
        });
      }
    );
};

//Eliminar Usuario
module.exports.usuariosDelete = function(req, res){
  if (!req.params.usuario_id){
    sendJSONresponse(res404, {
      "Mensaje": "No encontrado, usuario_id requerido"
    });
    return;    
  }
  tusuarios
    .findById(req.params.usuario_id)
    .select('-nombre -correo -password -sexo')
    .exec(
      function(err, usuario){
        if (!usuario || usuario.flag == "E"){
          sendJSONresponse(res, 404, {
            "Mensaje": "Id de usuario no encontrado"
          });
          return;
        } else if (err){
          sendJSONresponse(res, 404,err);
          return;          
        }
        usuario.flag =  "E";
        console.log("holasss " + usuario);
        usuario.save(function(err, usuario){
          if (err){            
                        
            sendJSONresponse (res, 404, err);
          } else {
            sendJSONresponse(res,200, usuario);
          }
        });
      }
    );
};