angular.module('budget', ['firebase', 'ui.router', 'budget.transactions', 'budget.bills', 'budget.categories'])
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
            controller: 'transactionsCtrl',
            resolve: {
                transactions: function ($firebase) {
                    var fireRef = new Firebase('https://vinlam-budget.firebaseio.com/transactions');
                    return $firebase(fireRef);
                },
                categories: function ($firebase) {
                    var fireRef = new Firebase('https://vinlam-budget.firebaseio.com/categories');
                    return $firebase(fireRef);
                }
            }
        })
        .state('overview.bills', {
            url: '/bills',
            templateUrl: '/app/bills/bills.html',
            controller: 'billsCtrl',
            resolve: {
                transactions: function ($firebase) {
                    var fireRef = new Firebase('https://vinlam-budget.firebaseio.com/transactions');
                    return $firebase(fireRef);
                },
                bills: function ($firebase) {
                    var fireRef = new Firebase('https://vinlam-budget.firebaseio.com/bills');
                    return $firebase(fireRef);
                }
            }
        })
        .state('overview.categories', {
            url: '/categories',
            templateUrl: '/app/categories/categories.html',
            controller: 'categoriesCtrl',
            resolve: {
                transactions: function ($firebase) {
                    var fireRef = new Firebase('https://vinlam-budget.firebaseio.com/transactions');
                    return $firebase(fireRef);
                },
                categories: function ($firebase) {
                    var fireRef = new Firebase('https://vinlam-budget.firebaseio.com/categories');
                    return $firebase(fireRef);
                }
            }
        });
})
.value('accounts', ['K7CC', 'K8CC', 'Check']);