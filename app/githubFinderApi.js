/**
 * Created by amit on 12/5/16.
 */

var Promise = require('bluebird');

module.exports = function (app, restClient) {

    app.post('/githubFinder', function (req, res) {
        console.log(req.body);
        var data = req.body;
        var fullDetail = {};
        var getGithubUserDetail = function () {
            new Promise(function (resolve, reject) {
                var args = {
                    headers: {
                        'User-Agent': 'amithealthist',
                        'Content-Type': 'application/json'
                    }
                };
                restClient.post('https://api.github.com/users/robin850', args, function (response) {
                    console.log('r', response);

                    if (response.hasOwnProperty('message') && response.message == 'Not Found') {
                        res.json({message: 'notFound'});
                    } else {
                        var basic = {};
                        basic.login = response.login;
                        basic.avatar_url = response.avatar_url;
                        basic.followers = response.followers;
                        basic.name = response.name;
                        resolve(basic);
                    }
                });
            }).then(function (basic) {
                fullDetail.basic = basic;
                getClosedIssues();
            }).catch(function () {
                res.json({message: 'error'});
            });
        };
        var getClosedIssues = function () {
            new Promise(function (resolve, reject) {
                restClient.get('https://api.github.com/repos/' + data.userName + '/' + data.repoName + '/issues?state=closed',
                    function (response) {
                        if (response.hasOwnProperty('message') && response.message == 'Not Found') {
                            res.json({message: 'notFound'});
                        } else {
                            resolve(response);
                        }
                    });
            }).then(function (issues) {
                fullDetail.issues = issues;
                res.json({message: 'success', data: fullDetail});
            }).catch(function () {
                res.json({message: 'error'});
            });
        };
        getGithubUserDetail();
    });


};