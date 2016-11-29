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


var registrarUsuario = function (req, res, callback) {  
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


var modificarUsuario = function (req, res, callback) {  
  var requestOptions, path;  
  path = "/api/usuarios/"+req.params.usuario_id;  
  postdata = {
    usuario_id: req.params.usuario_id,
    nombre:     req.body.nombre,        
    password:   req.body.password,
    sexo:       req.body.sexo
  };
  requestOptions = {
    url : apiOptions.server + path,
    method : "put",
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



var eliminarUsuario = function (req, res, callback) {  
  var requestOptions, path;  
  path = "/api/usuarios/"+req.params.usuario_id;  
  postdata = {
    usuario_id: req.params.usuario_id,
  };
  requestOptions = {
    url : apiOptions.server + path,
    method : "delete",
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
        callback(req, res, data);
      }
    }
  );
};

var listarUsuarios = function (req, res, callback) {  
  var requestOptions, path;  
  path = "/api/usuarios";  
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
        callback(req, res, data);
      }
    }
  );
};


module.exports.registrar = function(req, res) {
        
    registrarUsuario(req, res, function(req, res, responseData) {
      //res.redirect('http://yahoo.com'); este metodo redirecciona a otra web
      sendJSONresponse(res, 201, responseData); 
  });
};

module.exports.leer = function(req, res) {         
       
    leerUsuario(req, res, function(req, res, responseData) {
            
      //responseData contiene la informacion de retorno del api
      //sendJSONresponse es solo para mostrar como ha regresado
      sendJSONresponse(res, 201, responseData); 
  });
};

module.exports.modificar = function(req, res) {
        
    modificarUsuario(req, res, function(req, res, responseData) {
      //res.redirect('http://yahoo.com'); este metodo redirecciona a otra web
      sendJSONresponse(res, 201, responseData); 
  });
};

module.exports.eliminar = function(req, res) {
    console.log('AQUIIIIIII EN REGIISSSTRO');    
    eliminarUsuario(req, res, function(req, res, responseData) {
      //res.redirect('http://yahoo.com'); este metodo redirecciona a otra web
      sendJSONresponse(res, 201, responseData); 
  });
};

module.exports.listar = function(req, res) {
    console.log('AQUIIIIIII EN REGIISSSTRO');    
    listarUsuarios(req, res, function(req, res, responseData) {
      //res.redirect('http://yahoo.com'); este metodo redirecciona a otra web
      sendJSONresponse(res, 201, responseData); 
  });
};