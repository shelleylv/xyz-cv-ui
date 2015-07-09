(function() {
    'use strict';

    angular
        .module('xyz-cv-ui.dashboard')
        .controller('DashboardController', DashboardController);

    function DashboardController($timeout, $rootScope, $scope) {
        var vm = this;

        //DEBUGGING
        window.vm = vm;
        window.scope = $scope;

        $scope.$on('sail-resize', redraw, 100);

        function redraw(waitTime) {
            vm.loadchart = false;
            $timeout(function() {
                vm.loadchart = true;
            }, waitTime);
        }

        $timeout(function() {
            vm.loadchart = true;
        }, 300);

        // Chart.js Data
        vm.data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [{
                label: 'Lines of code written',
                fillColor: 'rgba(220,220,220,0.0)',
                strokeColor: '#008C9D',
                pointColor: '#02D0EA',
                pointStrokeColor: '#273135',
                pointHighlightFill: '#fff',
                pointHighlightStroke: 'rgba(220,220,220,1)',
                data: [15, 35, 46, 57, 61, 64, 66]
            }]
        };

        vm.radardata = {
            labels: ['C++', 'Java EE', 'Python', 'HTML5', '.NET', 'Haskell', 'COBOL'],
            datasets: [{
                label: 'Karlskrona',
                fillColor: 'rgba(220,220,220,0.2)',
                strokeColor: 'rgba(220,220,220,1)',
                pointColor: 'rgba(220,220,220,1)',
                pointStrokeColor: '#fff',
                pointHighlightFill: '#fff',
                pointHighlightStroke: 'rgba(220,220,220,1)',
                data: [65, 59, 90, 81, 56, 55, 40]
            }, {
                label: 'Malmö',
                fillColor: 'rgba(151,187,205,0.2)',
                strokeColor: 'rgba(151,187,205,1)',
                pointColor: 'rgba(151,187,205,1)',
                pointStrokeColor: '#fff',
                pointHighlightFill: '#fff',
                pointHighlightStroke: 'rgba(151,187,205,1)',
                data: [28, 48, 40, 19, 96, 27, 100]
            }]
        };

        vm.barchartdata = {
            labels: ['C++', 'Java EE', 'Python', 'C#', 'Haskell', 'Perl', 'Ruby'],
            datasets: [{
                label: 'Karlskrona',
                fillColor: '#3D606E',
                strokeColor: '#3D606E',
                highlightFill: 'rgba(220,220,220,0.75)',
                highlightStroke: 'rgba(220,220,220,1)',
                data: [65, 59, 80, 81, 56, 55, 40]
            }]
        };

        vm.piechartdata = [{
            value: 300,
            color: '#F7464A',
            highlight: '#FF5A5E',
            label: 'Red'
        }, {
            value: 50,
            color: '#46BFBD',
            highlight: '#5AD3D1',
            label: 'Green'
        }, {
            value: 100,
            color: '#FDB45C',
            highlight: '#FFC870',
            label: 'Yellow'
        }];

        vm.charts = [{
            type: 'line',
            title: 'Pies per month',
            data: vm.data
        },
        {
            type: 'radar',
            title: 'Programming skill balance per office',
            data: vm.radardata
        },
        {
            type: 'bar',
            title: 'Programming skills in Softhouse',
            data: vm.barchartdata
        },
        {
            type: 'pie',
            title: 'Ratio of job titles in Softhouse',
            data: vm.piechartdata
        }];

        vm.myOptions = {
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

        vm.piechartOptions = {
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

        vm.newFaces = [{
            name: 'Gustav Pihl Bohlin',
            skills: ['C++', 'Python', 'HTML5', 'CSS', 'Angular'],
            office: 'Karlskrona',
            title: 'System developer',
            img: 'gustavpihl.jpeg'
        }, {
            name: 'Rasmus Letterkrantz',
            skills: ['Ruby', 'Angular', 'HTML5', 'Haskell', 'Hockey'],
            office: 'Karlskrona',
            title: 'System developer',
            img: 'rasmusletterkrantz106.jpeg'
        }];

        $scope.$on('menuToggleFinished', function() {
            $scope.loadchart = false;
            $scope.$apply();
            $scope.loadchart = true;
            $scope.$apply();
        });

        //////////////

        function refresh() {
            /* */
        }
    }
})();
