angular.module('budget.transactions', [])
.controller('transactionsCtrl', function ($scope, transactions, accounts, categories, $filter) {
    transactions.$bind($scope, 'transactions');
    $scope.categories = categories;

    $scope.accounts = accounts;
});