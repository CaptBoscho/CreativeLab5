angular.module('Creative', [])
.controller('MainCtrl', [
  '$scope', '$http',
  function($scope, $http){
   // $scope.test = 'Hello world!';
    $scope.currentUser = '';
    $scope.currentUrl = '';    
    
    $scope.CreateUser = function(user){
	return $http.post('/users', user).success(function(data){
          console.log('Added ' + data);
        });
    };

    $scope.SignUp = function(){
	var rN = $scope.registerName;
	var rP = $scope.registerPassword;
	var rU = $scope.registerURL;
	if(rN==='' || rP==='') {return;}
	$scope.CreateUser({
	  UserName : rN,
	  Password : rP,
	  Url : rU
	});
	$scope.registerName = '';
	$scope.registerPassword = '';
	$scope.registerURL = '';
    };

    $scope.IdentifyUser = function(user){
        return $http.get('/users', user).success(function(data){
	  $scope.currentUser = data.UserName;
	  $scope.currentUrl = data.Url;
	  console.log($scope.currentUser + ' ' + $scope.currentUrl);
        });
    };

    $scope.LogIn = function(){
	var uN = $scope.userName;
	var pass = $scope.userPassword;
	if(uN === '' || pass === '') {return;}
	$scope.IdentifyUser({
	  UserName : uN,
	  Password : pass,
	  Url : ''
	});
    };
  }

]);
