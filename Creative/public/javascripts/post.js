//<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.2.19/angular.min.js"></script>
//<script src="//angular-ui.github.io/ui-router/release/angular-ui-router.js"></script>

angular.module('Creative', ['ui.router'])
  .factory('postFactory', [function(){
    var o = {
      posts: []
    };
    return o;
  }])

  .factory('userFactory', [function(){
    var name = 'Matt';

    var factory = {
      name: '',
      url: ''
    };
    //factory.getName = function() {
    //  return name;
    //}
    return factory;
  }])

  .config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
      url: '/home',
      templateUrl: '/home.html',
      controller: 'MainCtrl'
    })
      .state('posts', {
      url: '/posts/{id}',
      templateUrl: '/posts.html',
      controller: 'PostCtrl'
    })
	.state('login', {
	url: '/login',
	templateUrl: '/login.html',
	controller: 'LogInCtrl'
    })
;

    $urlRouterProvider.otherwise('login');
  }])

  .controller('PostCtrl', [
  '$scope',
  '$http',
  '$stateParams',
  'postFactory',
  'userFactory',
  function($scope, $http, $stateParams, postFactory, userFactory){
    $scope.post = postFactory.posts[$stateParams.id];
    $scope.addComment = function(){
      if($scope.body === '') { return; }
      var postJson = {
        body: $scope.body,
        upvotes: 0,
        user: userFactory.name,
        url: userFactory.url
      };
      
      $scope.body = '';
    };
    $scope.incrementUpvotes = function(comment){
      comment.upvotes += 1;
    };
  }])


  .controller('MainCtrl', [
  '$scope',
  '$http',
  'postFactory',
  'userFactory',
  function($scope, $http, postFactory, userFactory){

  $scope.user = userFactory.name;

  $scope.posts = postFactory.posts;

  $http.get('fbpost').success(function(data) {
     
    for (i = 0; i < data.length; i++) {
      $scope.posts.push(data[i]);
      }
  });
  
  
    //$scope.test = 'Hello world!';
     /*$scope.posts = [
       {title:'Post 1', upvotes:5},
       {title:'Post 2', upvotes:6},
       {title:'Post 3', upvotes:1},
       {title:'Post 4', upvotes:4},
       {title:'Post 5', upvotes:3} ]
   */
      $scope.addPost = function() {
       var postJson = {
         title: $scope.formContent,
         imageUrl:$scope.Url,
         upvotes: 0,
         comments: [],
         user: userFactory.name,
         avatarUrl: userFactory.url
       };
       $scope.posts.push(postJson);
       $http.post('fbpost', postJson).success(function(data) {
         console.log("Success");
       });  
         $scope.title='';
        //$scope.formContent='';
      };

	$scope.LogIn = function(userName){
		var user = userName;
		alert(userName);
	}

	$scope.toLogIn = function() {
		alert(user);
	}

       $scope.incrementUpvotes = function(post) {
         post.upvotes += 1;
       };

     }
]);
