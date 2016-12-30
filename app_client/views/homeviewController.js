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


    app.controller('homeCtrl', ['$http','noticia', function($http,noticia){
      //console.log("homectrl");

      var h1 = this;
      h1.pageHeader = {
        title: 'Hola Angularoso'      
      };
      h1.message = "Efectivo Angu";      

      h1.noticias=[];
      /*h1.noticias = [
        {titulo: 'Tormenta causada por el fenomeno del niño', rating: 2, descripcion: 'cuerpo del fenomeno del niño'},
        {titulo: 'El virus de papiloma humano ataca de nuevo', rating: 7, descripcion: 'cuerpo del papiloma humano|'},
        {titulo: 'El virus de la caca ataca de nuevo', rating: 23, descripcion: 'cuerpo del virus d ela caca'}
      ];*/    


      $http.get('/api/lastnoticias')
      .then(function (data) {
          h1.noticias = data.data;
          console.log(data.data)
      }, function(data) {
          
          console.log("error: " + data);
      });

      
      
      h1.SelectNoticia = function(id){
        noticia.titulo = h1.noticias[id].titulo;
        noticia.descripcion = h1.noticias[id].descripcion;
        noticia.ranking = h1.noticias[id].ranking*5/10;
        noticia.fecha_hora = h1.noticias[id].fecha_hora;

        console.log("constante "+noticia.titulo);                  
      }
    }]);

    app.controller('noticiaCtrl', function(noticia){
      console.log("controalnfo la noticia: "+ noticia.titulo);
      var n1 = this;
      n1.datos = noticia;
            
    });


    app.value('noticia',{
        titulo : 'nada',
        descripcion : 'nada',
        ranking : 0,
        fecha_hora : '22'
    });




})();