(function() {
    'use strict';

    angular
        .module('xyz-cv-ui.dashboard')
        .controller('DashboardController', DashboardController);

        function DashboardController(DashboardModel, $filter, $timeout, $q, $rootScope, AmCharts) {
            var vm = this;
            window.vm = vm;

            vm.activated = false;

            activate();

            //////////////

            function activate() {
                DashboardModel.get()
                    .$promise.then(function(model) {
                        vm.activated = true;
                });
            }

            vm.chart = {
                'type': 'serial',
                'rotate': true,
                'categoryField': 'category',
                'colors': [
                    '#52A9E2',
                    '#4088B1',
                    '#367096',
                    '#2D5D7C',
                    '#1e5368',
                ],
                'categoryAxis': {
                    'gridPosition': 'start',
                    'gridAlpha': 0
                },
                'trendLines': [],
                'graphs': [
                    {
                        'balloonText': '[[title]] of [[category]]:[[value]]',
                        'fillAlphas': 1,
                        'id': 'AmGraph-1',
                        'title': 'Level 1',
                        'type': 'column',
                        'valueField': 'column-1'
                    },
                    {
                        'balloonText': '[[title]] of [[category]]:[[value]]',
                        'fillAlphas': 1,
                        'id': 'AmGraph-2',
                        'title': 'Level 2',
                        'type': 'column',
                        'valueField': 'column-2'
                    },
                    {
                        'balloonText': '[[title]] of [[category]]:[[value]]',
                        'fillAlphas': 1,
                        'id': 'AmGraph-3',
                        'title': 'Level 3',
                        'type': 'column',
                        'valueField': 'column-3'
                    },
                    {
                        'balloonText': '[[title]] of [[category]]:[[value]]',
                        'fillAlphas': 1,
                        'id': 'AmGraph-4',
                        'title': 'Level 4',
                        'type': 'column',
                        'valueField': 'column-4'
                    },
                    {
                        'balloonText': '[[title]] of [[category]]:[[value]]',
                        'fillAlphas': 1,
                        'id': 'AmGraph-5',
                        'title': 'Level 5',
                        'type': 'column',
                        'valueField': 'column-5'
                    }
                ],
                'guides': [],
                'valueAxes': [
                    {
                        'id': 'ValueAxis-1',
                        'stackType': 'regular',
                        'title': 'Persons',
                        'gridAlpha': 0
                    }
                ],
                'allLabels': [],
                'balloon': {},
                'legend': {
                    'useGraphSettings': true
                },
                'titles': [
                    {
                        'id': 'Title-1',
                        'size': 15,
                        'text': 'Programming languages'
                    }
                ],
                'dataProvider': [
                    {
                        'category': 'Java',
                        'column-1': 1,
                        'column-2': 2,
                        'column-3': 6,
                        'column-4': 5,
                        'column-5': 3
                    },
                    {
                        'category': 'JavaScript',
                        'column-1': 2,
                        'column-2': 4,
                        'column-3': 5,
                        'column-4': 4,
                        'column-5': 3
                    },
                    {
                        'category': 'C++',
                        'column-1': 5,
                        'column-2': 4,
                        'column-3': 3,
                        'column-4': 2,
                        'column-5': 1
                    },
                    {
                        'category': 'C',
                        'column-1': 4,
                        'column-2': 4,
                        'column-3': 3,
                        'column-4': 2,
                        'column-5': 1
                    },
                    {
                        'category': 'C#',
                        'column-1': 2,
                        'column-2': 4,
                        'column-3': 2,
                        'column-4': 3,
                        'column-5': 2
                    },
                    {
                        'category': 'Python',
                        'column-1': 5,
                        'column-2': 4,
                        'column-3': 3,
                        'column-4': 2,
                        'column-5': 3
                    },
                    {
                        'category': 'Ruby',
                        'column-1': 2,
                        'column-2': 2,
                        'column-3': 3,
                        'column-4': 1,
                        'column-5': 0
                    }
                ]
            };

            vm.chart2 = {
                'type': 'serial',
                'rotate': true,
                'categoryField': 'category',
                'colors': [
                    '#52A9E2',
                    '#4088B1',
                    '#367096',
                    '#2D5D7C',
                    '#1e5368',
                ],
                'categoryAxis': {
                    'gridPosition': 'start',
                    'gridAlpha': 0
                },
                'trendLines': [],
                'graphs': [
                    {
                        'balloonText': '[[title]] of [[category]]:[[value]]',
                        'fillAlphas': 1,
                        'id': 'AmGraph-1',
                        'title': 'Level 1',
                        'type': 'column',
                        'valueField': 'column-1'
                    },
                    {
                        'balloonText': '[[title]] of [[category]]:[[value]]',
                        'fillAlphas': 1,
                        'id': 'AmGraph-2',
                        'title': 'Level 2',
                        'type': 'column',
                        'valueField': 'column-2'
                    },
                    {
                        'balloonText': '[[title]] of [[category]]:[[value]]',
                        'fillAlphas': 1,
                        'id': 'AmGraph-3',
                        'title': 'Level 3',
                        'type': 'column',
                        'valueField': 'column-3'
                    },
                    {
                        'balloonText': '[[title]] of [[category]]:[[value]]',
                        'fillAlphas': 1,
                        'id': 'AmGraph-4',
                        'title': 'Level 4',
                        'type': 'column',
                        'valueField': 'column-4'
                    },
                    {
                        'balloonText': '[[title]] of [[category]]:[[value]]',
                        'fillAlphas': 1,
                        'id': 'AmGraph-5',
                        'title': 'Level 5',
                        'type': 'column',
                        'valueField': 'column-5'
                    }
                ],
                'guides': [],
                'valueAxes': [
                    {
                        'id': 'ValueAxis-1',
                        'stackType': 'regular',
                        'title': 'Persons',
                        'gridAlpha': 0
                    }
                ],
                'allLabels': [],
                'balloon': {},
                'legend': {
                    'useGraphSettings': true
                },
                'titles': [
                    {
                        'id': 'Title-1',
                        'size': 15,
                        'text': 'Soft skills'
                    }
                ],
                'dataProvider': [
                    {
                        'category': 'Web Frontend',
                        'column-1': 1,
                        'column-2': 2,
                        'column-3': 6,
                        'column-4': 5,
                        'column-5': 3
                    },
                    {
                        'category': 'Web Backend',
                        'column-1': 2,
                        'column-2': 4,
                        'column-3': 5,
                        'column-4': 4,
                        'column-5': 3
                    },
                    {
                        'category': 'Fullstack',
                        'column-1': 5,
                        'column-2': 4,
                        'column-3': 3,
                        'column-4': 2,
                        'column-5': 1
                    },
                    {
                        'category': 'Embedded',
                        'column-1': 4,
                        'column-2': 4,
                        'column-3': 3,
                        'column-4': 2,
                        'column-5': 1
                    },
                    {
                        'category': 'Desktop apps',
                        'column-1': 3,
                        'column-2': 4,
                        'column-3': 2,
                        'column-4': 3,
                        'column-5': 2
                    },
                    {
                        'category': 'Enterprise  Server',
                        'column-1': 6,
                        'column-2': 2,
                        'column-3': 3,
                        'column-4': 1,
                        'column-5': 0
                    },
                    {
                        'category': 'Mobila Apps',
                        'column-1': 5,
                        'column-2': 2,
                        'column-3': 3,
                        'column-4': 1,
                        'column-5': 0
                    },
                    {
                        'category': 'Radio- kommunikation',
                        'column-1': 4,
                        'column-2': 2,
                        'column-3': 3,
                        'column-4': 1,
                        'column-5': 0
                    },
                    {
                        'category': 'BI/CRM',
                        'column-1': 2,
                        'column-2': 2,
                        'column-3': 3,
                        'column-4': 1,
                        'column-5': 0
                    },
                    {
                        'category': 'Tester',
                        'column-1': 5,
                        'column-2': 2,
                        'column-3': 3,
                        'column-4': 1,
                        'column-5': 0
                    },
                    {
                        'category': 'Test automation',
                        'column-1': 1,
                        'column-2': 2,
                        'column-3': 3,
                        'column-4': 1,
                        'column-5': 0
                    },
                    {
                        'category': 'Continuous Delivery',
                        'column-1': 0,
                        'column-2': 2,
                        'column-3': 3,
                        'column-4': 1,
                        'column-5': 0
                    },
                    {
                        'category': 'Test Manager',
                        'column-1': 1,
                        'column-2': 2,
                        'column-3': 3,
                        'column-4': 1,
                        'column-5': 0
                    },
                    {
                        'category': 'Release Manager',
                        'column-1': 0,
                        'column-2': 2,
                        'column-3': 3,
                        'column-4': 1,
                        'column-5': 0
                    },
                    {
                        'category': 'Business Analyst',
                        'column-1': 8,
                        'column-2': 2,
                        'column-3': 3,
                        'column-4': 1,
                        'column-5': 0
                    },
                    {
                        'category': 'Configuration Manager',
                        'column-1': 2,
                        'column-2': 2,
                        'column-3': 3,
                        'column-4': 1,
                        'column-5': 0
                    },
                    {
                        'category': 'Project Manager',
                        'column-1': 2,
                        'column-2': 6,
                        'column-3': 3,
                        'column-4': 1,
                        'column-5': 0
                    },
                    {
                        'category': 'Scrum Master',
                        'column-1': 7,
                        'column-2': 2,
                        'column-3': 3,
                        'column-4': 1,
                        'column-5': 0
                    },
                    {
                        'category': 'Line Manager',
                        'column-1': 5,
                        'column-2': 1,
                        'column-3': 3,
                        'column-4': 1,
                        'column-5': 2
                    },
                    {
                        'category': 'Product owner',
                        'column-1': 6,
                        'column-2': 2,
                        'column-3': 1,
                        'column-4': 1,
                        'column-5': 0
                    },
                    {
                        'category': 'Agile coach',
                        'column-1': 6,
                        'column-2': 1,
                        'column-3': 5,
                        'column-4': 1,
                        'column-5': 0
                    },
                    {
                        'category': 'Management coach',
                        'column-1': 7,
                        'column-2': 3,
                        'column-3': 3,
                        'column-4': 1,
                        'column-5': 0
                    },
                    {
                        'category': 'Business Innovation',
                        'column-1': 2,
                        'column-2': 2,
                        'column-3': 5,
                        'column-4': 1,
                        'column-5': 2
                    },
                    {
                        'category': 'Scaling agile',
                        'column-1': 2,
                        'column-2': 1,
                        'column-3': 2,
                        'column-4': 1,
                        'column-5': 0
                    }
                ]
            };



            AmCharts.makeChart('programming-skills', vm.chart);
            AmCharts.makeChart('soft-skills', vm.chart2);

        }
})();
