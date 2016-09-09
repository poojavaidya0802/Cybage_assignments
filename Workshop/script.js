var myapp = angular.module("Myapp",['ngRoute']);
		myapp.config(function($routeProvider){
			$routeProvider
			.when("/",{
				templateUrl:"main.html",
				controller:"library"	
			})
			.when("/new_book",{
				templateUrl:"new_book.html"		
			})
			.when("/new_author",{
				templateUrl:"new_author.html",
				controller:"author_controller"	
			});
		});
		
		myapp.controller('library',['$scope','$rootScope','$http',function($scope,$rootScope,$http){
			$http({
				method: 'GET',
				url: 'http://172.27.12.104:3000/book/list'
			}).then(function successCallback(response) {
				console.log(response.data);
				$scope.names = response.data;
			}, function errorCallback(response) {
   
			});

			$http({
				method: 'GET',
				url: 'http://172.27.12.104:3000/author/list'
			}).then(function successCallback(response) {
				console.log(response.data);
				$rootScope.names = response.data;
			}, function errorCallback(response) {
   
			});		
		}]);
		
		myapp.filter('urlencode', function() {
			return function(input) {
				return window.encodeURIComponent(input);
			}
		});
		
		myapp.controller('author_controller',['$location','$scope','$rootScope','$http',function($location,$scope,$rootScope,$http){
			var author_name = $location.search();
			if(author_name.name==undefined){
				$scope.add_view=1;
				$scope.edit_view=0;
				console.log(author_name.name);
			}
			else{
				$scope.edit_view=1;
				$scope.add_view=0;
				console.log(author_name.name);
			}
			
			/*for(var i in $rootScope.names){
				if(author_name.name===$rootScope.names[i].name){
					$scope.newAuthor=$rootScope.names[i];
				}
			}*/
			//console.log($scope.newAuthor);
			
			$http({
				method: 'Post',
				url: 'http://172.27.12.104:3000/author/byname',
				data:{
					name:author_name.name
				}
			}).then(function successCallback(response) {
				console.log(response.data);
				$scope.newAuthor = response.data;
			}, function errorCallback(response) {
				console.log(response.data);
			});	
			
			$scope.func_save=function(){
				var arr=['javascript','python'];
				var data= $.param({
						"name": $scope.emp_name,
						"empid": $scope.empid,
						"email": $scope.email,
						"skills": arr,
						"department": $scope.dept,
						"website": $scope.website	
					});
				var config={
					headers :{
						'Content-Type':'application/x-www-form-urlencoded'
					}
				}
				$http.post('http://172.27.12.104:3000/author/new',data,config)
				.success(function(data,status,headers,config){
					console.log(data);
				})
				.error(function(data,status,headers,config){
					console.log("error");
				})
				console.log($scope.one);
			}
			$scope.edit_clicked=1;
			$scope.func_edit=function(){
				$scope.edit_clicked =0;
			}
			$scope.func_edit_save=function(){
				console.log("Hello")
				var arr=['javascript','python'];	
				
				var data= $.param({
					"name": $scope.emp_name,
					"empid": $scope.empid,
					"email": $scope.email,
					"skills": arr,
					"department": $scope.dept,
					"website": $scope.website	
				});
					
				var config={
					headers :{
						'Content-Type':'application/x-www-form-urlencoded'
					}
				}
				$http.put('http://172.27.12.104:3000/author/update',data,config)
				.success(function(data,status,headers,config){
					console.log(data);
				})
				.error(function(data,status,headers,config){
					console.log("error");
				})	
			}
			
			$scope.func_delete=function(){
				//console.log($scope.newAuthor.empid);
				$http({
					method: 'Delete',
					url: 'http://172.27.12.104:3000/author/remove',
					data:{
						empid:$scope.newAuthor.empid
					}
				}).then(function successCallback(response) {
					console.log(response.data);
				}, function errorCallback(response) {
					console.log(response.data);
				});	
			}
		}])
		