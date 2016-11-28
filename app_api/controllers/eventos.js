var mongoose = require('mongoose');
var teventos = mongoose.model('Evento');


var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};


//  console("esto se insertara: "+req.params.evento+" "+req.query.email+" "+req.body.password);  

//Insertar Evento
module.exports.eventosCreate = function(req, res){
    
  teventos.create(
    {
      usuario:      req.body.usuario_id,  
      titulo:       req.body.titulo,        
      descripcion:  req.body.descripcion,
      fecha_hora:   req.body.fecha_hora,
      ubicacion:    req.body.ubicacion,
      direccion:    req.body.direccion,
      categoria:    req.body.categoria,
      ranking:      req.body.ranking,
      flag:         'A'
    }, function(err, evento){
      if (err){
        sendJSONresponse(res, 400, err);
      } else {
        sendJSONresponse(res, 201, evento); 
      }
    }
  )
};

//Listar Eventos
module.exports.eventosList = function(req, res){
  console.log("Listando");
  if(req.params){
    teventos
      .find({flag:"A"}, function(err, eventos){
        var eventoMap = {};
        eventos.forEach(function(evento){
          eventoMap[evento._id] = evento;
          console.log("Evento:" +  evento);
        });        
        sendJSONresponse(res, 201, eventos);
      });
  }  
};

//Leer Evento
module.exports.eventosRead = function(req, res){
  if (req.params && req.params.evento_id){
    teventos
      .findById(req.params.evento_id)
      .exec(function(err, evento){
        if(!evento || evento.flag == "E"){
          sendJSONresponse(res, 404, {
            "mensaje": "Evento no encontrado" 
          });
          return;
        } else if (err){
          sendJSONresponse(es, 404, err);
          return;
        }
        sendJSONresponse(res, 200, evento);
      });    
  }else{
    sendJSONresponse(res, 404, {
      "Mensaje": "Falta el Id del evento en la solicitud"
    });
  }
};

//Modificar Evento 
module.exports.eventosUpdate = function(req, res){
  console.log("API UPDATE: " + req.params.evento_id);
  if (!req.params.evento_id){
    console.log("NO HAY:  " + req.params.evento_id);
    sendJSONresponse(res404, {
      "Mensaje": "No encontrado, evento_id requerido"
    });
    return;    
  }      
  teventos
    .findById(req.params.evento_id)    
    .select('-usuario -titulo -fecha_hora -ubicacion -direccion -categoria -flag')
    .exec(      
      function(err, evento){        
        if (!evento || evento.flag == "E"){                    
          sendJSONresponse(res, 404, {
            "Mensaje": "Id de evento no encontrado"
          });
          return;
        } else if (err){
          console.log("ERROR AQUI : " + err);
          sendJSONresponse(res, 404,err);
          return;          
        }

        evento.descripcion=  req.body.descripcion;      
        evento.ranking=      req.body.ranking;                
        
        evento.save(function(err, evento){
          if (err){
            console.log("ERROR AQUI : " + err);
            sendJSONresponse (res, 404, err);
          } else {            
            sendJSONresponse(res,200, evento);
          }
        });
      }
    );
};

//Eliminar Evento
module.exports.eventosDelete = function(req, res){
  if (!req.params.evento_id){
    sendJSONresponse(res404, {
      "Mensaje": "No encontrado, evento_id requerido"
    });
    return;    
  }
  teventos
    .findById(req.params.evento_id)
    .select('-usuario -titulo -descripcion -fecha_hora -ubicacion -direccion -categoria -ranking')
    .exec(
      function(err, evento){
        if (!evento || evento.flag == "E"){
          sendJSONresponse(res, 404, {
            "Mensaje": "Id de evento no encontrado"
          });
          return;
        } else if (err){
          sendJSONresponse(res, 404,err);
          return;          
        }
        evento.flag =  "E";
        console.log("holasss " + evento);
        evento.save(function(err, evento){
          if (err){            
                        
            sendJSONresponse (res, 404, err);
          } else {
            sendJSONresponse(res,200, evento);
          }
        });
      }
    );
};  