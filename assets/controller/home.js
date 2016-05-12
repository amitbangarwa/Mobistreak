/**
 * Created by amit on 13/5/16.
 */


(function(){
    angular.module('home', [])
        .controller('homeController', ['$scope', '$location', function ($scope, $location) {
            $scope.go = function (path) {
                $location.path(path);
            }
        }]);
})();