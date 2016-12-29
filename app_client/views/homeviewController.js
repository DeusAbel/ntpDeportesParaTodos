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


    app.controller('homeCtrl', function(){
      
      //console.log("homectrl");

      var h1 = this;
      h1.pageHeader = {
        title: 'Hola Angularoso'      
      };
      h1.message = "Efectivo Angu";

    });
})();