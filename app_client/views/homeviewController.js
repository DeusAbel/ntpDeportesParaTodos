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
        //console.log("constante "+noticia.titulo);                  
      };
                  
      h1.usuario_id = angular.element('#id_user');
      
      usuario.usuario_id=h1.usuario_id[0].value;
      console.log("holitas: "+usuario.usuario_id);

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

      c1.comentarios=[];

      $http.get('/api/comentariosN/'+noticia.id)
        .then(function (data) {
            c1.comentarios = data.data;          
            console.log(data.data)
            //console.log("comentarios del user: "+c1.comentarios[0].usuario.nombre);                  
        }, function(data) {          
            console.log("error: " + data);
      });           
      
      
        //console.log("resultado: " + c1.usuario[0].nombre);
        //return c1.usuario[0].nombre;
      
      
    
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
        usuario_id : 0
    });


})();