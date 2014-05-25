angular.module('budget.categories', [])
.controller('categoriesCtrl', function ($scope, transactions, categories) {
    categories.$bind($scope, 'categories');

    $scope.today = moment();

    var getMonths = function (date) {
        return [date, date.clone().subtract('months', 1), date.clone().subtract('months', 2)];
    };

    $scope.$watch(function () {
        return $scope.today.month();
    }, function () {
        $scope.months = getMonths($scope.today);
    });

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