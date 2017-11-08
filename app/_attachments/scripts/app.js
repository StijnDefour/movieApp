//'use strict'

angular.module('parkingApp', ['ngRoute'])

	.config(function($routeProvider) {
	    $routeProvider
	        .when('/', {
	            templateUrl: 'assets/view/home.html',
	            controller: 'homeCtrl'
	        });
	})
	
	.controller('homeCtrl', function($scope, acteurSrv) {
		
	    	$('#searchButton').on('click', function (e) {

	    		$scope.films = '';

	    		var acteur = $('#acteurText').val();
	    		
	    		acteurSrv.getFilms(acteur).then(function(data){
	    			
	    			var arr = data.data[0].filmography.actor;
	    			
	    			var arrTitles = [];
	    			for (i = 0; i < arr.length; i++) { 
	    				arrTitles[i] = arr[i].title;
	    			}
	    			console.log(arrTitles);
	    			$scope.films = JSON.stringify(arrTitles);
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
   
    /*.service('addressSrv', function($http, $q) {
    		this.getCoordinates = function(address) {
	    		var q = $q.defer();
	    		var url = 'http://nominatim.openstreetmap.org/search?q=' + encodeURIComponent(address) + '&format=json';

	    		$http.get(url)
	    			.then(function(data){
	    				q.resolve(data);
	    			}, function error(err) {
	    				q.reject(err);
	    			});
	    			
	    			return q.promise;
	    		};
    })
    
    .service('zoneSrv', function($http, $q) {
    		this.getZones = function() {
			var q = $q.defer();
			$http.get('http://datasets.antwerpen.be/v4/gis/paparkeertariefzones.json')
				.then(function(data, status, headers, config){
					q.resolve(data.data);
				}, function error(err) {
					q.reject(err);
	    			console.log("test");
				});
			
			return q.promise;
		};
		
		// http://alienryderflex.com/polygon/
		this.inPolygon = function(location, polyLoc){
			var lastPoint = polyLoc[polyLoc.length-1];
			var isInside = false;
			var x = location[0];

			for(var i = 0; i < polyLoc.length; i++){
				var point = polyLoc[i];
				var x1 = lastPoint[0];
				var x2 = point[0];
				var dx = x2 - x1;

				if(Math.abs(dx) > 180.0){
					if(x > 0){
						while(x1 < 0)
							x1 += 360;
						while(x2 < 0)
							x2 += 360;
					}
					else{
						while(x1 > 0)
							x1 -= 360;
						while(x2 > 0)
							x2 -= 360;
					}
					dx = x2 - x1;
				}

				if((x1 <= x && x2 > x) || (x1 >= x && x2 < x)){
					var grad = (point[1] - lastPoint[1]) / dx;
					var intersectAtLat = lastPoint[1] + ((x - x1) * grad);

					if(intersectAtLat > location[1])
						isInside = !isInside;
				}
				lastPoint = point;
			}
			return isInside;
		};
		
		this.getTariff = function(lng, lat, zones){
			console.log(zones.length);
			for(var i = 0; i < zones.length; i++) {
				console.log(i);
				var geo = JSON.parse(zones[i].geometry);
				var coordinates = geo.coordinates[0];
				if(this.inPolygon([lng, lat], coordinates)) {
	    			console.log(zones[i].tariefkleur);
					return zones[i].tariefkleur;
				}
			}
		};
    })*/
    
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