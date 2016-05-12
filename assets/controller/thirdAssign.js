/**
 * Created by amit on 12/5/16.
 */

var thirdAssign = angular.module('thirdAssign', []);

thirdAssign.controller('thirdAssignController', ['$scope', '$http', '$mdToast', function ($scope, $http, $mdToast) {
    $scope.github = {};
    $scope.showResult = false;
    $scope.finder = function () {
        if (Object.keys($scope.github).length > 1) {
            var fullDetail = {};
            getGithubUserDetail($scope.github.userName, function (respData) {
                fullDetail.basic = respData;
                checkForRepo($scope.github.userName, $scope.github.repoName, function (respData) {
                    getClosedIssues($scope.github.userName, $scope.github.repoName, function (respData) {
                        fullDetail.issues = respData;
                        $scope.details = fullDetail;
                        $scope.showResult = true;

                    });
                });
            });
        } else {
            $mdToast.show(
                $mdToast.simple()
                    .textContent('Please Enter UserName and RepoName')
                    .position('bottom', 'left')
                    .hideDelay(3000)
            );
        }
    };
    var getGithubUserDetail = function (userName, callback) {
        $http.get('https://api.github.com/users/' + userName).then(function successCallback(res) {
            var response = res.data,
                basic = {};
            basic.login = response.login;
            basic.avatar_url = response.avatar_url;
            basic.followers = response.followers;
            basic.name = response.name;
            callback(basic);
        }, function errorCallback(res){
            $mdToast.show(
                $mdToast.simple()
                    .textContent('UserName not found')
                    .position('bottom', 'left')
                    .hideDelay(3000)
            );
        });
    };
    var getClosedIssues = function (userName, repoName, callback) {
        $http.get('https://api.github.com/repos/' + userName + '/' + repoName + '/issues?state=closed')
            .then(function successCallback(res) {
                var response = res.data;
                callback(response);
            }, function errorCallback(res){
                $mdToast.show(
                    $mdToast.simple()
                        .textContent(repoName + ' Not found')
                        .position('bottom', 'left')
                        .hideDelay(3000)
                );
            }
        );
    };
    var checkForRepo = function (userName, repoName, callback) {
        $http.get('https://api.github.com/repos/' + userName + '/' + repoName).then(function successCallback(res) {
            callback();
        }, function errorCallback(res){
            $mdToast.show(
                $mdToast.simple()
                    .textContent(userName + ' don\'t have ' + repoName + ' Repo in his github.')
                    .position('bottom', 'left')
                    .hideDelay(4000)
            );
        });
    };
}]);