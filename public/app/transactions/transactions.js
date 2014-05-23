angular.module('budget.transactions', [])
.controller('transactionsCtrl', function ($scope, transactions, accounts, categories) {
    transactions.$bind($scope, 'transactions');
    $scope.categories = categories;

    $scope.accounts = accounts;
});