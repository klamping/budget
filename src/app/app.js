angular.module('budget', ['ui.router'])
.config(function($stateProvider, $urlRouterProvider) {
    // For any unmatched url, redirect to /transactions
    $urlRouterProvider.otherwise('/overview');

    $stateProvider
        .state('overview', {
            url: '/overview',
            templateUrl: '/app/overview/overview.html'
        })
        .state('overview.transactions', {
            url: '/transactions',
            templateUrl: '/app/transactions/transactions.html',
            controller: function ($scope) {
                $scope.transactions = budgetJson.transactions;
            }
        })
        .state('overview.bills', {
            url: '/bills',
            templateUrl: '/app/bills/bills.html',
            controller: function ($scope) {
                $scope.bills = budgetJson.bills;
                $scope.months = ['2013-06', '2013-07', '2013-08'];
            }
        });
});