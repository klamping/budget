angular.module('budget.bills', [])
.controller('billsCtrl', function ($scope, transactions, bills) {
    bills.$bind($scope, 'bills');

    $scope.months = ['2013-06', '2013-07', '2013-08'];
    $scope.transactions = transactions;
});