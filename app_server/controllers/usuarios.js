var request = require('request');
var apiOptions = {
  server : "http://localhost:3000"
};

if (process.env.NODE_ENV ==='production'){
  apiOptions.server = "https://ntpdeporteparatodos.herokuapp.com"
}


var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};


var RegistrarUsuario = function (req, res, callback) {  
  var requestOptions, path;  
  path = "/api/usuarios";  
  postdata = {
    nombre:     req.body.nombre,
    correo:     req.body.correo,    
    password:   req.body.password,
    sexo:       req.body.sexo
  };
  requestOptions = {
    url : apiOptions.server + path,
    method : "post",
    json : postdata
  };
  //console.log("cuerpo a insertar" + req.body.nombre + req.body.correo);
  request(
    requestOptions,
    function(err, response, body) {
      var data = body;
      console.log(response.statusCode);
      if (response.statusCode === 201 || response.statusCode ===200){               
        //respuesta positiva
        callback(req, res, data);
        //res.redirect('http://google.com');
      } else {
        //respuesta negativa
        res.redirect('http://yahoo.com');
      }
    }
  );
};


var leerUsuario = function (req, res, callback) {  
  var requestOptions, path;  
  path = "/api/usuarios/"+req.params.usuario_id;  
  postdata = {
    usuario_id: req.params.usuario_id    
  };
  requestOptions = {
    url : apiOptions.server + path,
    method : "get",
    json : postdata
  };
  console.log("ruta: " + path);
  request(
    requestOptions,
    function(err, response, body) {
      var data = body;
      console.log("codigo de retorno: " + response.statusCode);
      if (response.statusCode === 201 || response.statusCode ===200){               
        //respuesta positiva
        console.log("corecto");
        callback(req, res, data);
        //res.redirect('http://google.com');
      } else {
        //respuesta negativa
        res.redirect('http://yahoo.com');
      }
    }
  );
};





module.exports.registrar = function(req, res) {
    console.log('AQUIIIIIII EN REGIISSSTRO');
    var usuario= req.body.correo;
    console.log(usuario);
    console.log('parametros3: ' + req.body.correo);
    RegistrarUsuario(req, res, function(req, res, responseData) {
      res.redirect('http://yahoo.com');
  });
};

module.exports.leer = function(req, res) {         
    console.log("toy aqui: ");   
    leerUsuario(req, res, function(req, res, responseData) {
      console.log(responseData);      
      //responseData contiene la informacion de retorno del api
      //sendJSONresponse es solo para mostrar como ha regresado
      sendJSONresponse(res, 201, responseData); 
  });
};
