(function(){
    var app = angular.module('homeApp',[]);
    app.controller('homeCtrl2', function(){
      
      //console.log("homectrl2");

      var h2 = this;
      h2.pageHeader = {
        title: 'Hola Angularoso222'      
      };
      h2.message = "Efectivo Angu2222";

    });


    app.controller('homeCtrl', ['$http','noticia','noticias','usuario', function($http, noticia, noticias, usuario){
      var h1 = this;
      h1.pageHeader = {
        title: 'Hola Angularoso'      
      };
      h1.message = "Efectivo Angu";      

      h1.noticias=[];

      $http.get('/api/lastnoticias')
      .then(function (data) {
          h1.noticias = data.data;
          noticias.listaNoticias = data.data;
          console.log(noticias.listaNoticias)
      }, function(data) {          
          console.log("error: " + data);
      });           
      
      h1.SelectNoticia = function(id){
        noticia.id = h1.noticias[id]._id
        noticia.titulo = h1.noticias[id].titulo;
        noticia.descripcion = h1.noticias[id].descripcion;
        noticia.ranking = h1.noticias[id].ranking*5/10;
        noticia.fecha_hora = h1.noticias[id].fecha_hora;
        location.href='#noticia';
        console.log("constante "+noticia.id);                  
      };
                  
      h1.usuario_id = angular.element('#id_user');
      h1.usuario_nombre = angular.element('#usuario_name');
      //console.log(angular.element('#usuario_name')[0].textContent);
      usuario.usuario_nombre =h1.usuario_nombre[0].textContent;
      usuario.usuario_id=h1.usuario_id[0].value;
      console.log("holitas: "+usuario.usuario_id+"//"+usuario.usuario_nombre);

    }]);

    app.controller('noticiaCtrl', function(noticia){
      console.log("controalnfo la noticia: "+ noticia.titulo);
      var n1 = this;
      n1.datos = noticia;
    });

    app.controller('noticiasCtrl',['noticia','noticias', function(noticia,noticias){
      
      var ns = this;
      ns.datos = noticias.listaNoticias;
      ns.SelectNoticia = function(id){      
        console.log('id: ' + id);      
        noticia.id = ns.datos[id]._id;
        noticia.titulo = ns.datos[id].titulo;
        noticia.descripcion = ns.datos[id].descripcion;
        noticia.ranking = ns.datos[id].ranking*5/10;
        noticia.fecha_hora = ns.datos[id].fecha_hora;        
        location.href='#noticia';
      }; 

    }]);

    app.controller('comentNoticiasCtrl', ['$http','noticia','usuario', function($http, noticia,usuario){
      var c1 = this;
      
      c1.usuario_id=usuario.usuario_id;
      c1.usuario_nombre=usuario.usuario_nombre;
    
      c1.comentarioNuevo = {};
      c1.comentarioNuevo.nombre = c1.usuario_nombre;
      c1.comentarioNuevo.usuario_id = usuario.usuario_id;
      c1.comentarioNuevo.noticia_id = noticia.id;
      c1.comentarioNuevo.descripcion = 'gege';
      c1.comentarioNuevo.ranking = 1;

      c1.comentarios=[];

      console.log(noticia.id);
      $http.get('/api/comentariosN/'+noticia.id)
        .then(function (data) {
            c1.comentarios = data.data;          
            console.log(data.data)
            //console.log("comentarios del user: "+c1.comentarios[0].usuario.nombre);                  
        }, function(data) {          
            console.log("error: " + data);
      });           
      


      c1.getComentarios=function(){
        $http.get('/api/comentariosN/'+noticia.id)
          .then(function (data) {
              c1.comentarios = data.data;          
              console.log(data.data)
              //console.log("comentarios del user: "+c1.comentarios[0].usuario.nombre);                  
          }, function(data) {          
              console.log("error: " + data);
        });
      }

      c1.getComentarios();

      
        //console.log("resultado: " + c1.usuario[0].nombre);
        //return c1.usuario[0].nombre;
      c1.comentarioInsert=function(){
        $http.post('/api/comentarios/',c1.comentarioNuevo)
          .then(function (data) {
              //c1.comentarioNuevo={};          
              h1.getComentarios();
              console.log(data.data)
              //console.log("comentarios del user: "+c1.comentarios[0].usuario.nombre);                  
          }, function(data) {          
              console.log("error: " + data);
        });
        console.log(c1.comentarioNuevo);
        location.href='#noticia';
      };
      
    
    }]);
                  




    app.value('noticia',{
        id: 0,
        titulo : 'nada',
        descripcion : 'nada',
        ranking : 0,
        fecha_hora : '22'
    });

    app.value('noticias',{
        listaNoticias : []
    });

    app.value('usuario',{
        usuario_id : 0,
        usuario_nombre: 'nombre'
    });


})();