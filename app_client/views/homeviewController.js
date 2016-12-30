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


    app.controller('homeCtrl', ['$http','noticia','noticias', function($http, noticia, noticias){
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
        noticia.titulo = h1.noticias[id].titulo;
        noticia.descripcion = h1.noticias[id].descripcion;
        noticia.ranking = h1.noticias[id].ranking*5/10;
        noticia.fecha_hora = h1.noticias[id].fecha_hora;
        location.href='#noticia';
        //console.log("constante "+noticia.titulo);                  
      };
                  

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


    app.value('noticia',{
        titulo : 'nada',
        descripcion : 'nada',
        ranking : 0,
        fecha_hora : '22'
    });

    app.value('noticias',{
        listaNoticias : []
    });




})();