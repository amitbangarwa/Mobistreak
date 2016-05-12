/**
 * Created by amit on 11/5/16.
 */

angular.module('myApp', ['ngMaterial', 'ngRoute', 'firstAssign', 'secondAssign', 'thirdAssign', 'home'])
    .controller('AppCtrl', ['$scope', '$location', function($scope, $location) {
        $scope.go = function (path) {
            $location.path(path);
        }
    }])
    .config(['$routeProvider', '$mdThemingProvider', function($routeProvider, $mdThemingProvider) {
        $routeProvider
            .when('/home', {
                templateUrl: '/html/home.html',
                controller: 'homeController'
            })
            .when('/firstAssign', {
                templateUrl: '/html/firstAssign.html',
                controller: 'firstAssignController'
            })
            .when('/secondAssign', {
                templateUrl: '/html/firstAssign.html',
                controller: 'secondAssignController'
            })
            .when('/thirdAssign', {
                templateUrl: '/html/thirdAssign.html',
                controller: 'thirdAssignController'
            }).otherwise({
                redirectTo: '/home'
            });
        $mdThemingProvider.theme('default')
            .primaryPalette('teal')
            .accentPalette('blue');
    }]);