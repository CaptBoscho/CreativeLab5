angular.module('Creative', [])
.controller('MainCtrl', [
  '$scope',
  function($scope){
    $scope.test = 'Hello world!';
    console.log("hello bro");
 
    $scope.SignUp = function(){
	var rN = $scope.registerName;
	console.log(rN);
    };
  }

]);
