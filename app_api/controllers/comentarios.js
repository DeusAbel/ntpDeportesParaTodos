var mongoose = require('mongoose');
var tcomentarios = mongoose.model('Comentario');


var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};


//  console("esto se insertara: "+req.params.comentario+" "+req.query.email+" "+req.body.password);  

//Insertar Comentario
module.exports.comentariosCreate = function(req, res){
  console.log(req.body.usuario_id); 
  tcomentarios.create(
    {
      usuario:      req.body.usuario_id,
      noticia:      req.body.noticia_id,        
      descripcion:  req.body.descripcion,      
      fecha:        req.body.fecha,      
      ranking:      req.body.ranking,
      flag:     'A'
    }, function(err, comentario){
      if (err){
        sendJSONresponse(res, 400, err);
      } else {
        sendJSONresponse(res, 201, comentario); 
      }
    }
  )
};

//Listar Comentarios
module.exports.comentariosList = function(req, res){
  console.log("Listando");
  if(req.params){
    tcomentarios
      .find({flag:"A"}, function(err, comentarios){
        var comentarioMap = {};
        comentarios.forEach(function(comentario){
          comentarioMap[comentario._id] = comentario;
          console.log("Comentario:" +  comentario);
        });        
        sendJSONresponse(res, 201, comentarios);
      });
  }  
};

//Leer Comentario
module.exports.comentariosRead = function(req, res){
  if (req.params && req.params.comentario_id){
    tcomentarios
      .findById(req.params.comentario_id)
      .exec(function(err, comentario){
        if(!comentario || comentario.flag == "E"){
          sendJSONresponse(res, 404, {
            "mensaje": "Comentario no encontrado" 
          });
          return;
        } else if (err){
          sendJSONresponse(es, 404, err);
          return;
        }
        sendJSONresponse(res, 200, comentario);
      });    
  }else{
    sendJSONresponse(res, 404, {
      "Mensaje": "Falta el Id del comentario en la solicitud"
    });
  }
};

//Modificar Comentario 
module.exports.comentariosUpdate = function(req, res){
  console.log("API UPDATE: " + req.params.comentario_id);
  if (!req.params.comentario_id){
    console.log("NO HAY:  " + req.params.comentario_id);
    sendJSONresponse(res404, {
      "Mensaje": "No encontrado, comentario_id requerido"
    });
    return;    
  }          

  tcomentarios
    .findById(req.params.comentario_id)    
    .select('-usuario -noticia -fecha -flag')
    .exec(      
      function(err, comentario){        
        if (!comentario || comentario.flag == "E"){                    
          sendJSONresponse(res, 404, {
            "Mensaje": "Id de comentario no encontrado"
          });
          return;
        } else if (err){
          console.log("ERROR AQUI : " + err);
          sendJSONresponse(res, 404,err);
          return;          
        }

        
        comentario.descripcion =    req.body.descripcion;                  
        comentario.ranking =        req.body.ranking;
                
        comentario.save(function(err, comentario){
          if (err){
            console.log("ERROR AQUI : " + err);
            sendJSONresponse (res, 404, err);
          } else {            
            sendJSONresponse(res,200, comentario);
          }
        });
      }
    );
};

//Eliminar Comentario
module.exports.comentariosDelete = function(req, res){
  if (!req.params.comentario_id){
    sendJSONresponse(res404, {
      "Mensaje": "No encontrado, comentario_id requerido"
    });
    return;    
  }
  tcomentarios
    .findById(req.params.comentario_id)
    .select('-usuario -noticia -descripcion -fecha -ranking')
    .exec(
      function(err, comentario){
        if (!comentario || comentario.flag == "E"){
          sendJSONresponse(res, 404, {
            "Mensaje": "Id de comentario no encontrado"
          });
          return;
        } else if (err){
          sendJSONresponse(res, 404,err);
          return;          
        }
        comentario.flag =  "E";
        console.log("holasss " + comentario);
        comentario.save(function(err, comentario){
          if (err){            
                        
            sendJSONresponse (res, 404, err);
          } else {
            sendJSONresponse(res,200, comentario);
          }
        });
      }
    );
};