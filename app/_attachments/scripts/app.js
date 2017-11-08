//'use strict'

angular.module('parkingApp', ['ngRoute'])

	.config(function($routeProvider) {
	    $routeProvider
	        .when('/', {
	            templateUrl: 'assets/view/home.html',
	            controller: 'homeCtrl'
	        });
	})
	
	.controller('homeCtrl', function($scope, acteurSrv, saveSrv) {
		
	    	$('#searchButton').on('click', function (e) {

	    		$scope.films = '';

	    		var acteur = $('#acteurText').val();
	    		
	    		acteurSrv.getFilms(acteur).then(function(data){
	    			
	    			var arr = data.data[0].filmography.actor;
	    			
	    			var arrTitles = [];
	    			for (i = 0; i < arr.length; i++) { 
	    				arrTitles[i] = arr[i].title;
	    			}
	    			$scope.films = JSON.stringify(arrTitles);
	    			
	    			saveSrv.setObject(acteur, arrTitles);
	    		});
	    	});
    })
    
    .service('acteurSrv', function($http, $q) {
    		this.getFilms = function(acteur) {
	    		var q = $q.defer();
	    		var url = 'http://theimdbapi.org/api/find/person?name=' + acteur;

	    		$http.get(url)
	    			.then(function(data){
	    				q.resolve(data);
	    			}, function error(err) {
	    				q.reject(err);
	    			});
	    			
	    			return q.promise;
	    		};
    })
   
    .service('saveSrv', function($window, $http){
		  this.setObject = function(key, value){
			  $window.localStorage[key] = JSON.stringify(value);
			  //Save in CouchDB
			  //$http.put('../../' + key, value);
		  };
		  
		  this.getObject = function(key){
			  return JSON.parse($window.localStorage[key] || '{}');
		  };
	});