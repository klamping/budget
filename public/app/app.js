angular.module('budget', ['firebase', 'ui.router', 'ui.bootstrap', 'budget.transactions', 'budget.bills', 'budget.categories'])
.config(function($stateProvider, $urlRouterProvider) {
    // For any unmatched url, redirect to /transactions
    $urlRouterProvider.otherwise('/overview');

    var fireRef = new Firebase('https://vinlam-budget.firebaseio.com');
    var auth = new FirebaseSimpleLogin(fireRef, function(error, user) {
        if (error) {
            // an error occurred while attempting login
            alert(error);
        } else if (user) {
            // user authenticated with Firebase

        } else {
            auth.login('github', {
                rememberMe: true,
            });
        }
    });

    $stateProvider
        .state('overview', {
            url: '/overview',
            templateUrl: '/app/overview/overview.html',
            resolve: {
                transactions: function ($firebase) {
                    return $firebase(fireRef.child('transactions'));
                },
                categories: function ($firebase) {
                    return $firebase(fireRef.child('categories'));
                },
                bills: function ($firebase) {
                    return $firebase(fireRef.child('bills'));
                }
            }
        })
        .state('overview.transactions', {
            url: '/transactions',
            templateUrl: '/app/transactions/transactions.html',
            controller: 'transactionsCtrl'
        })
        .state('overview.bills', {
            url: '/bills',
            templateUrl: '/app/bills/bills.html',
            controller: 'billsCtrl'
        })
        .state('overview.categories', {
            url: '/categories',
            templateUrl: '/app/categories/categories.html',
            controller: 'categoriesCtrl'
        });
})
.value('accounts', ['K7CC', 'K8CC', 'Check']);