(function() {
    'use strict';

    angular
        .module('xyz-cv-ui.office')
        .controller('OfficeController', OfficeController);

        function OfficeController(OfficeModel, $routeParams, $scope, $rootScope, $timeout) {
            var vm = this;

            activate();

            vm.model = null;
            vm.myOptions = getOptions();
            vm.charts = [];
            vm.loadchart = false;

            $scope.$on('sail-resize', redraw, 100);

            $scope.$on('menuToggleFinished', function() {
                $scope.loadchart = false;
                $scope.$apply();
                $scope.loadchart = true;
                $scope.$apply();
            });

            //////////////

            function activate() {
                OfficeModel.get({_id: $routeParams.officeId})
                    .$promise.then(function(value) {
                        vm.charts = getCharts(value);
                        vm.loadchart = true;
                        vm.model = value;
                    });
            }

            function refresh() {
                /* */
            }

            function redraw(waitTime) {
                vm.loadchart = false;
                $timeout(function() {
                    vm.loadchart = true;
                }, waitTime);
            }

            function getOptions() {
                return {
                    // Chart.js options can go here.
                    // Sets the chart to be responsive
                    responsive: false,
                    ///Boolean - Whether grid lines are shown across the chart
                    scaleShowGridLines: true,
                    //String - Colour of the grid lines
                    scaleGridLineColor: 'rgba(0,50,100,.2)',
                    //Number - Width of the grid lines
                    scaleGridLineWidth: 1,
                    //Boolean - Whether the line is curved between points
                    bezierCurve: true,
                    //Number - Tension of the bezier curve between points
                    bezierCurveTension: 0.4,
                    //Boolean - Whether to show a dot for each point
                    pointDot: true,
                    //Number - Radius of each point dot in pixels
                    pointDotRadius: 3,
                    //Number - Pixel width of point dot stroke
                    pointDotStrokeWidth: 1,
                    //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
                    pointHitDetectionRadius: 20,
                    //Boolean - Whether to show a stroke for datasets
                    datasetStroke: true,
                    //Number - Pixel width of dataset stroke
                    datasetStrokeWidth: 2,
                    //Boolean - Whether to fill the dataset with a colour
                    datasetFill: true,
                    animationSteps: 15,
                    animationEasing: 'easeOutElastic',
                    // Function - on animation progress
                    onAnimationProgress: function() {},
                    // Function - on animation complete
                    onAnimationComplete: function() {},
                    //String - A legend template
                    legendTemplate: '<ul class="tc-chart-js-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].strokeColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'

                };
            }
        }

        function getCharts(office) {
            return [
            {
                type: 'radar',
                title: 'Programming skill balance per office',
                data: getRadarChartData(office)
            },
            {
                type: 'bar',
                title: 'Programming skills at Softhouse',
                data: getBarChartData(office)
            }];
        }

        function getBarChartData(office) {
            office.graphData.datasets.forEach(function(dataset) {
                dataset.fillColor = '#3D606E';
                dataset.strokeColor = '#3D606E';
                dataset.highlightFill = 'rgba(220,220,220,0.75)';
                dataset.highlightStroke = 'rgba(220,220,220,1)';
            });
            return office.graphData;
        }

        function getRadarChartData(office) {
            office.graphData.datasets.forEach(function(dataset) {
                dataset.fillColor = 'rgba(220,220,220,0.0)';
                dataset.strokeColor = '#008C9D';
                dataset.pointColor = '#02D0EA';
                dataset.pointStrokeColor = '#273135';
                dataset.pointHighlightFill = '#fff';
                dataset.pointHighlightStroke = 'rgba(220,220,220,1)';
            });

            return office.graphData;
        }
})();
