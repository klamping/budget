angular.module('budget.categories', [])
.controller('categoriesCtrl', function ($scope, transactions, categories) {
    categories.$bind($scope, 'categories');

    $scope.months = ['2013-06', '2013-07', '2013-08'];
    $scope.transactions = transactions;

    $scope.addCategory = function () {
        categories.$add({
            name: $scope.catName,
            savings: []
        });
    };
});