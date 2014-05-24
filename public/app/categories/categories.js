angular.module('budget.categories', [])
.controller('categoriesCtrl', function ($scope, transactions, categories) {
    categories.$bind($scope, 'categories');

    var today = moment();

    $scope.months = [today, today.clone().subtract('months', 1), today.clone().subtract('months', 2)];
    $scope.transactions = transactions;

    $scope.calcSpending = function (name, month) {
        var monthlyTransactions = _.filter($scope.transactions, function (transaction) {
            if (month.month() == moment(transaction.date).month() && transaction.category === name) {
                return true;
            } else {
                return false;
            }
        });

        return _.reduce(monthlyTransactions, function(sum, transaction) {
            return sum + parseInt(transaction.amount, 10);
        }, 0);
    };

    $scope.addCategory = function () {
        categories.$add({
            name: $scope.catName,
            savings: []
        });
    };
});