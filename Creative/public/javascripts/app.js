angular.module('Creative', [])
.controller('MainCtrl', [
  '$scope', '$http', 
  function($scope, $http){
   // $scope.test = 'Hello world!';
    $scope.currentUser = '';
    $scope.currentUrl = '';    
    $scope.currentId = ''; 
    $scope.loginMessage = 'Log-in Credentials correct';
    $scope.CreateUser = function(user){
	return $http.post('/users', user).success(function(data){
          console.log('Added ' + data);
        });
    };

    $scope.SignUp = function(){
	var rN = $scope.registerName;
	var rP = $scope.registerPassword;
	var rU = $scope.registerUrl;
	if(rN==='' || rP==='') {return;}
	$scope.CreateUser({
	  UserName : rN,
	  Password : rP,
	  imageUrl : rU
	});
	$scope.registerName = '';
	$scope.registerPassword = '';
	$scope.registerUrl = '';
    };

    $scope.IdentifyUser = function(user){
	console.log("Identify Users " + user);
        return $http.get('/users/'+user.UserName, user).success(function(data){
	  console.log(data);
          if(data.length ===0) {alert("Invalid Username. Please register the user."); return;}
	  if(data[0].Password === user.Password) {
	    $scope.currentUser = data[0].UserName;
	    $scope.currentUrl = data[0].imageUrl;
	    $scope.currentId = data[0].id;
	    $scope.userName = '';
	    $scope.userPassword = '';
	    //navigate to member's pag
 	    //$http.post('/auth', data[0]).success(function(data){
	//	console.log('in');
	  //  });
	    console.log('after');
	  } else {
	    //Invalid password
	    alert("Invalid Password");
	  }
        });
	$location.path('home.html');
    };

    $scope.LogIn = function(){
	var uN = $scope.userName;
	var pass = $scope.userPassword;
	if(uN === '' || pass === '') {return;}
	$scope.IdentifyUser({
	  UserName : uN,
	  Password : pass,
	  imageUrl : ''
	});
    };

    $scope.Enter = function(){
	console.log('in Enter');
    }   

    $scope.ToLogIn = function(){
	console.log('in tologin');
    }

  }

]);
