(function() {
    'use strict';

    angular
        .module('xyz-cv-ui.feed')
        .controller('FeedController', FeedController);

    function FeedController($timeout, $rootScope, $scope, FeedModel, API_URL, session) {
        var vm = this;
        window.vm5 = vm;

        vm.API_URL = API_URL;

        vm.latestUsers = [];
        vm.latestSkills = [];
        vm.charts = [];

        vm.options = getOptions();
        vm.pieOptions = getPieOptions();
        vm.loadchart = false;
        vm.activated = false;

        session.isLoaded()
            .then(activate);

        $scope.$on('sail-resize', redraw, 100);

        $scope.$on('menuToggleFinished', function() {
            $scope.loadchart = false;
            $scope.$apply();
            $scope.loadchart = true;
            $scope.$apply();
        });

        //////////////

        function activate() {
            FeedModel.get().$promise
                .then(function(model) {
                    setLatestUsers(model);
                    setLatestSkills(model);
                    vm.charts = getCharts(model);
                    vm.loadchart = true;
                    vm.activated = true;
                    redraw();
                });
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

        function getPieOptions() {
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
                legendTemplate: '<ul class="tc-chart-js-legend"><% for (var i=0; i<segments.length; i++){%><li><span style="background-color:<%=segments[i].fillColor%>"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>'
            };
        }

        function getCharts(model) {
            return [
            {
                type: 'bar',
                title: 'Programming skills at Softhouse',
                data: getBarChartData(model)
            },
            {
                type: 'pie',
                title: 'Ratio of users per office at Softhouse',
                data: getPieChartData(model)
            }];
        }

        function getBarChartData(model) {
            model.views.mostRepresentedSkillsView.skillFrequencyGraph.datasets.forEach(function(dataset) {
                dataset.fillColor = '#3D606E';
                dataset.strokeColor = '#3D606E';
                dataset.highlightFill = 'rgba(220,220,220,0.75)';
                dataset.highlightStroke = 'rgba(220,220,220,1)';
            });
            return model.views.mostRepresentedSkillsView.skillFrequencyGraph;
        }

        function getPieChartData(model) {
            var colors = [
                {color: '#2D628F', highlight: 'rgba(220,220,220,0.75)'},
                {color: '#4495DB', highlight: 'rgba(220,220,220,0.75)'},
                {color: '#8F7B2C', highlight: 'rgba(220,220,220,0.75)'},
                {color: '#DBA444', highlight: 'rgba(220,220,220,0.75)'},
                {color: '#707070', highlight: 'rgba(220,220,220,0.75)'},
                {color: '#8F8F8F', highlight: 'rgba(220,220,220,0.75)'},
                {color: '#000000', highlight: '#rgba(220,220,220,0.75)'}
            ];

            for (var i = model.views.officePopulationView.userOfficeFrequencyGraph.length - 1; i >= 0; i--) {
                model.views.officePopulationView.userOfficeFrequencyGraph[i].color = colors[i].color;
                model.views.officePopulationView.userOfficeFrequencyGraph[i].highlight = colors[i].highlight;
            };
            return model.views.officePopulationView.userOfficeFrequencyGraph;
        }

        function setLatestUsers(model) {
            vm.latestUsers = model.latest.users;
        }

        function setLatestSkills(model) {
            vm.latestSkills = model.latest.skills;
        }

        $scope.$on('sail-resize', redraw, 100);

        function redraw(waitTime) {
            vm.loadchart = false;
            $timeout(function() {
                vm.loadchart = true;
            }, waitTime);
        }

        vm.piechartdata =

        vm.newsArticles = [{
            title: 'Sydost hires 4 junior developers',
            teaser: 'Softhouse Sydost has hired four new junior developers following a summer project resulting in three successful in-house projects, one of which was awarded with the prestigious',
            date: 'Oct. 15, 2015'
        }, {
            title: 'Sail has been released',
            teaser: 'The crack team of prodigiously gifted developers in the Karlskrona office working on Sail have released the first stable version of their notorious application monitoring software.',
            date: 'Aug. 3, 2015'
        }, {
            title: 'Softhouse ranked #1 in ICT magazine',
            teaser: 'An ICT magazine in Sweden has ranked Softhouse #1 employer in the ICT sector. This comes as no surprise since Softhouse has ranked #1 for every year the past decade. Bengt Gustavsson, CEO of Sydost, says: ',
            date: 'Sep. 7, 2015'
        }];


        $scope.$on('menuToggleFinished', function() {
            $scope.loadchart = false;
            $scope.$apply();
            $scope.loadchart = true;
            $scope.$apply();
        });

    }
})();
