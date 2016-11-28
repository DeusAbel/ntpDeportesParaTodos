var mongoose = require('mongoose');
var tdeportes = mongoose.model('Deporte');


var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};


//  console("esto se insertara: "+req.params.deporte+" "+req.query.email+" "+req.body.password);  

//Insertar Deporte
module.exports.deportesCreate = function(req, res){
  console.log(req.body.usuario_id);  
  tdeportes.create(
    {
      usuario:            req.body.usuario_id,
      nombre:             req.body.nombre,        
      descripcion:        req.body.descripcion,
      reglas:             req.body.reglas,
      fecha_creacion:     req.body.fecha_creacion,
      fecha_modificacion: req.body.fecha_modificacion,
      direccion:          req.body.direccion,
      categoria:          req.body.categoria,
      flag:     'A'
    }, function(err, deporte){
      if (err){
        sendJSONresponse(res, 400, err);
      } else {
        sendJSONresponse(res, 201, deporte); 
      }
    }
  )
};

//Listar Deportes
module.exports.deportesList = function(req, res){
  console.log("Listando");
  if(req.params){
    tdeportes
      .find({flag:"A"}, function(err, deportes){
        var deporteMap = {};        
        deportes.forEach(function(deporte){
          deporteMap[deporte._id] = deporte;
          console.log("Deporte:" +  deporte);
        });        
        sendJSONresponse(res, 201, deportes);
      });
  }  
};

//Leer Deporte
module.exports.deportesRead = function(req, res){
  if (req.params && req.params.deporte_id){
    tdeportes
      .findById(req.params.deporte_id)
      .exec(function(err, deporte){
        if(!deporte || deporte.flag == "E"){
          sendJSONresponse(res, 404, {
            "mensaje": "Deporte no encontrado" 
          });
          return;
        } else if (err){
          sendJSONresponse(es, 404, err);
          return;
        }
        sendJSONresponse(res, 200, deporte);
      });    
  }else{
    sendJSONresponse(res, 404, {
      "Mensaje": "Falta el Id del deporte en la solicitud"
    });
  }
};

//Modificar Deporte 
module.exports.deportesUpdate = function(req, res){
  console.log("API UPDATE: " + req.params.deporte_id);
  if (!req.params.deporte_id){
    console.log("NO HAY:  " + req.params.deporte_id);
    sendJSONresponse(res404, {
      "Mensaje": "No encontrado, deporte_id requerido"
    });
    return;    
  }      

  tdeportes
    .findById(req.params.deporte_id)    
    .select('-usuario -nombre -descripcion -fecha_creacion -fecha_modificacion -direccion -categoria -flag')
    .exec(      
      function(err, deporte){        
        if (!deporte || deporte.flag == "E"){                    
          sendJSONresponse(res, 404, {
            "Mensaje": "Id de deporte no encontrado"
          });
          return;
        } else if (err){
          console.log("ERROR AQUI : " + err);
          sendJSONresponse(res, 404,err);
          return;          
        }

        deporte.reglas = req.body.reglas;
                
        deporte.save(function(err, deporte){
          if (err){
            console.log("ERROR AQUI : " + err);
            sendJSONresponse (res, 404, err);
          } else {            
            sendJSONresponse(res,200, deporte);
          }
        });
      }
    );
};

//Eliminar Deporte
module.exports.deportesDelete = function(req, res){
  if (!req.params.deporte_id){
    sendJSONresponse(res404, {
      "Mensaje": "No encontrado, deporte_id requerido"
    });
    return;    
  }
  tdeportes
    .findById(req.params.deporte_id)
    .select('-usuario -nombre -descripcion -reglas -fecha_creacion -fecha_modificacion -direccion -categoria')
    .exec(
      function(err, deporte){
        if (!deporte || deporte.flag == "E"){
          sendJSONresponse(res, 404, {
            "Mensaje": "Id de deporte no encontrado"
          });
          return;
        } else if (err){
          sendJSONresponse(res, 404,err);
          return;          
        }
        deporte.flag =  "E";
        console.log("holasss " + deporte);
        deporte.save(function(err, deporte){
          if (err){            
                        
            sendJSONresponse (res, 404, err);
          } else {
            sendJSONresponse(res,200, deporte);
          }
        });
      }
    );
};