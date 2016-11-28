var request = require('request');
var apiOptions = {
  server : "http://localhost:3000"
};

if (process.env.NODE_ENV ==='production'){
  apiOptions.server = "https://ntpdeporteparatodos.herokuapp.com"
}

var renderDetailPage = function (req, res, locDetail) {
  res.render('index', {
    title: "logeo exitoso"
  });
};


var getUserInfo = function (req, res, callback) {
  console.log(req.body.usuario);
  var requestOptions, path;
  console.log("antes de path");
  path = "/api/usuarios/" + req.body.usuario;
  console.log(path);
  postdata = {
    usuario: req.body.usuario,
    nombre: req.body.nombre,
    email: req.body.email,
    password: req.body.password
  };
  requestOptions = {
    url : apiOptions.server + path,
    method : "GET",
    json : postdata
  };
  console.log("cuerpo");
  request(
    requestOptions,
    function(err, response, body) {
      var data = body;
      console.log(response.statusCode);
      if (response.statusCode === 200) {
        console.log('bien');        
        //callback(req, res, data);
        res.redirect('/index2');        
      } else {
        console.log('mal');
        res.redirect('/error');
      }
    }
  );
};


var RegistrarUsuario = function (req, res, callback) {  
  var requestOptions, path;  
  path = "/api/usuarios";  
  postdata = {
    nombre:     req.body.nombre,
    correo:     req.body.correo,    
    password:   req.body.password,
    sexo:       req.body.sexo,
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
      if (response.statusCode === 201) {               
        //respuesta positiva
        //callback(req, res, data);
        res.redirect('http://google.com');
      } else {
        res.redirect('http://yahoo.com');
      }
    }
  );
};




module.exports.login = function(req, res){
    console.log('hola estuve aqui2');
    var usuario= req.body.usuario;
    console.log(usuario);
    console.log('parametros2: ' + req.body.usuario);
    getUserInfo(req, res, function(req, res, responseData) {
    renderDetailPage(req, res, responseData);
  });
};

module.exports.registro = function(req, res) {
    console.log('AQUIIIIIII EN REGIISSSTRO');
    var usuario= req.body.correo;
    console.log(usuario);
    console.log('parametros3: ' + req.body.correo);
    RegistrarUsuario(req, res, function(req, res, responseData) {
    renderDetailPage(req, res, responseData);
  });
};