angular.module('budget.transactions', ['ngResource'])
.controller('transactionsCtrl', function ($scope, transactions, transactionsSvc) {
    $scope.transactions = transactions;
})
.service('transactionsSvc', function ($resource) {
    var transactions = $resource('/transactions/', null, {
        'get': {
            isArray: true
        }
    });

    return transactions;
});