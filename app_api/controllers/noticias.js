var mongoose = require('mongoose');
var tnoticias = mongoose.model('Noticia');


var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};



//  console("esto se insertara: "+req.params.noticia+" "+req.query.email+" "+req.body.password);  

//Insertar Noticia
module.exports.noticiasCreate = function(req, res){
    
  tnoticias.create(
    {
      usuario:      req.body.usuario_id,  
      titulo:       req.body.titulo,        
      descripcion:  req.body.descripcion,
      fecha_hora:   req.body.fecha_hora,
      ranking:      req.body.ranking,
      flag:     'A'
    }, function(err, noticia){
      if (err){
        sendJSONresponse(res, 400, err);
      } else {
        sendJSONresponse(res, 201, noticia); 
      }
    }
  )
};

//Listar Noticias
module.exports.noticiasList = function(req, res){
  console.log("Listando");
  if(req.params){
    tnoticias
      .find({flag:"A"}, function(err, noticias){
        var noticiaMap = {};
        noticias.forEach(function(noticia){
          noticiaMap[noticia._id] = noticia;
          console.log("Noticia:" +  noticia);
        });        
        sendJSONresponse(res, 201, noticias);
      });
  }  
};

//Leer Noticia
module.exports.noticiasRead = function(req, res){
  if (req.params && req.params.noticia_id){
    tnoticias
      .findById(req.params.noticia_id)
      .exec(function(err, noticia){
        if(!noticia || noticia.flag == "E"){
          sendJSONresponse(res, 404, {
            "mensaje": "Noticia no encontrado" 
          });
          return;
        } else if (err){
          sendJSONresponse(es, 404, err);
          return;
        }
        sendJSONresponse(res, 200, noticia);
      });    
  }else{
    sendJSONresponse(res, 404, {
      "Mensaje": "Falta el Id del noticia en la solicitud"
    });
  }
};

//Modificar Noticia 
module.exports.noticiasUpdate = function(req, res){
  console.log("API UPDATE: " + req.params.noticia_id);
  if (!req.params.noticia_id){
    console.log("NO HAY:  " + req.params.noticia_id);
    sendJSONresponse(res404, {
      "Mensaje": "No encontrado, noticia_id requerido"
    });
    return;    
  }
  tnoticias
    .findById(req.params.noticia_id)    
    .select('-usuario -titulo -fecha_hora -flag')
    .exec(      
      function(err, noticia){        
        if (!noticia || noticia.flag == "E"){                    
          sendJSONresponse(res, 404, {
            "Mensaje": "Id de noticia no encontrado"
          });
          return;
        } else if (err){
          console.log("ERROR AQUI : " + err);
          sendJSONresponse(res, 404,err);
          return;          
        }

              
        noticia.descripcion=  req.body.descripcion;      
        noticia.ranking=      req.body.ranking;                
        
        noticia.save(function(err, noticia){
          if (err){
            console.log("ERROR AQUI : " + err);
            sendJSONresponse (res, 404, err);
          } else {            
            sendJSONresponse(res,200, noticia);
          }
        });
      }
    );
};

//Eliminar Noticia
module.exports.noticiasDelete = function(req, res){
  if (!req.params.noticia_id){
    sendJSONresponse(res404, {
      "Mensaje": "No encontrado, noticia_id requerido"
    });
    return;    
  }
  tnoticias
    .findById(req.params.noticia_id)
    .select('-usuario -titulo -descripcion -fecha_hora -ranking -flag')
    .exec(
      function(err, noticia){
        if (!noticia || noticia.flag == "E"){
          sendJSONresponse(res, 404, {
            "Mensaje": "Id de noticia no encontrado"
          });
          return;
        } else if (err){
          sendJSONresponse(res, 404,err);
          return;          
        }
        noticia.flag =  "E";
        console.log("holasss " + noticia);
        noticia.save(function(err, noticia){
          if (err){            
                        
            sendJSONresponse (res, 404, err);
          } else {
            sendJSONresponse(res,200, noticia);
          }
        });
      }
    );
};  