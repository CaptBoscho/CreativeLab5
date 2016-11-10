angular.module('Creative', [])
.controller('MainCtrl', [
  '$scope', '$http', 
  function($scope, $http){
   // $scope.test = 'Hello world!';
    $scope.loginMessage = 'Please Try Again' ;
    $scope.entryUrl = '#';
    $scope.currentId = {'curId' : ''};
    $scope.currentImg;
    $scope.currentName;
    $http.get('/current', $scope.currentId).success(function(data){
	console.log(data);
	console.log(data.length);
	if(data.length > 0) {
	  $scope.currentName = data[0].UserName;
	  $scope.currentImg = data[0].imageUrl;
	}
    });

    $scope.CreateUser = function(user){
	$http.get('/users/'+user.UserName, user).success(function(data){
	  if(data.length > 0) {
	    $scope.entryUrl = '#';
	    return;
	  }
	});
	console.log('test3');
	return $http.post('/users', user).success(function(data){
          console.log('Added ' + data);
	  $scope.entryUrl = 'home.html';
        });
    };

    $scope.SignUpHover = function() {
	var user = {UserName :  $scope.registerName,
	  Password : $scope.registerPassword,
	  imageUrl : $scope.registerUrl
	};
	$http.get('/users/'+$scope.registerName, user).success(function(data){
          if(data.length > 0) {
            $scope.entryUrl = '#';
            return;
          }
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
    };

    $scope.IdentifyUser = function(user){
	console.log("Identify Users " + user);
        return $http.get('/users/'+user.UserName, user).success(function(data){
	  console.log(data);
          if(data.length ===0) {
	    $scope.entryUrl = '#';
	    return;i
	  }
	  if(data[0].Password === user.Password) {
	    $scope.currentUser = data[0].UserName;
	    $scope.currentUrl = data[0].imageUrl;
	    $scope.currentId = data[0]._id;
	    console.log('test1 '+ data[0]._id);
	    var id = {'curId' : data[0]._id};
	    $http.post('/current', id).success(function(da){
	      console.log('finished');
	    });
	    console.log('test2');
	    $scope.userName = '';
	    $scope.userPassword = '';
	    //navigate to member's page
	    $scope.entryUrl = 'home.html';
	  } else {
	    //Invalid password
	    $scope.entryUrl = '#';
	  }
        });
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

   $scope.CheckErrors = function(){
	if($scope.entryUrl === '#'){
	  alert("Invalid Username or Password");
	}
   };

   $scope.RegistrationError = function(){
	if($scope.entryUrl === '#'){
	  alert("Username already in use.");
	}
   };

  }
]);
