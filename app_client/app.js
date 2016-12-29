(function(){  
  var ntpDeporteApp = angular.module('ntpdeporteparatodosApp', ['ngRoute','homeApp']);  

	ntpDeporteApp.config(['$locationProvider', function($locationProvider) {
		$locationProvider.hashPrefix('');
	}]);

  console.log("estuve aqui en router");
  ntpDeporteApp.config(function($routeProvider) {    
    console.log("estuve aqui en router22");
    $routeProvider
      .when('/home', {
        templateUrl: 'views/home.html',
        controller: 'homeCtrl', 
        controllerAs: 'h1'
      })

      .when('/home2', {
        templateUrl: 'views/home2.html',
        controller: 'homeCtrl2',        
        controllerAs: 'h2'
      })

      .otherwise({
        redirectTo: '/'
      });
  });


//home

/*  ntpDeporteApp.controller('homeCtrl2', function(){
    alert("holass222");
    console.log("homectrl2");

    var h1 = this;
    h1.pageHeader = {
      title: 'Hola Angularoso222'      
    };
    h1.message = "Efectivo Angu2222";

  });


  ntpDeporteApp.controller('homeCtrl', function(){
    alert("holass");
    console.log("homectrl");

    var h2 = this;
    h2.pageHeader = {
      title: 'Hola Angularoso'      
    };
    h2.message = "Efectivo Angu";

  });*/



})();

  