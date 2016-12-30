(function(){  
  var ntpDeporteApp = angular.module('ntpdeporteparatodosApp', ['ngRoute','homeApp']);  

	ntpDeporteApp.config(['$locationProvider', function($locationProvider) {
		$locationProvider.hashPrefix('');
	}]);

  console.log("estuve aqui en router");
  ntpDeporteApp.config(function($routeProvider) {    
    console.log("estuve aqui en router22");
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'homeCtrl', 
        controllerAs: 'h1'
      })

      .when('/home2', {
        templateUrl: 'views/home2.html',
        controller: 'homeCtrl2',        
        controllerAs: 'h2'
      })

      .when('/noticia', {
        templateUrl:'views/noticia.html',
        controller: 'noticiaCtrl',        
        controllerAs: 'n1'       
      })
      

      .otherwise({
        redirectTo: '/'
      });
  });



})();
