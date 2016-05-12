/**
 * Created by amit on 11/5/16.
 */

var firstAssign = angular.module('firstAssign', []);

firstAssign.controller('firstAssignController', ['$scope', '$http', function ($scope, $http) {
    /*d3.json('/data.json', function (error, json){
        if (error) return console.warn(error);
        console.log(json);
        jsonData = json;
        chart(callsData);
    });*/

    $http.get('/data.json').then(function (res) {
        $scope.jsonData = res.data;
        $scope.objectKeys = Object.keys($scope.jsonData);
    });
    $scope.showGraph = function (data) {
        var graphData = data;
        chart(graphData)
    };
    // D3 Bubble Chart
    var chart = function (graphData) {

        var diameter = 500,
            format = d3.format(",d");

        var svg = d3.select('#graph').append('svg')
            .attr('width', diameter)
            .attr('height', diameter);

        var bubble = d3.layout.pack()
            .size([diameter, diameter])
            .value(function(d) {return d.size;})
            // .sort(function(a, b) {
            // 	return -(a.value - b.value)
            // })
            .padding(3);

        // generate data with calculated layout values
        var nodes = bubble.nodes(processData(graphData))
            .filter(function(d) { return !d.children; }); // filter out the outer bubble

        var vis = svg.selectAll('circle')
            .data(nodes);

        vis.enter().append('circle')
            .attr('transform', function(d) { return 'translate(' + d.x + ',' + d.y + ')'; })
            .attr('r', function(d) { return d.r; })
            .attr('class', function(d) { return d.className; });

        vis.append("title")
            .text(function(d) { return d.className + ": " + format(d.value); });

        /*vis.append("circle")
         .attr("r", function(d) { return d.r; })
         .style("fill", function(d) { return color(d.packageName); });*/

        vis.append("text")
            .attr("dy", ".3em")
            .style("text-anchor", "middle")
            .text(function(d) { return d.className.substring(0, d.r / 3); });
    };

    function processData(data) {
        var obj = $scope.jsonData[data];

        var newDataSet = [];

        for(var item in obj) {
            if (data == 'cost') {
                var splitDoller = obj[item].split('$');
                console.log(splitDoller);
                newDataSet.push({
                    name: item,
                    className: item.toLowerCase(),
                    size: splitDoller[1]
                });
            } else {
                newDataSet.push({
                    name: item,
                    className: item.toLowerCase(),
                    size: obj[item]
                });
            }
        }
        return {children: newDataSet};
    }
}]);