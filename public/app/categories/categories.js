angular.module('budget.categories', ['firebase'])
.controller('categoriesCtrl', function ($scope, transactions, categories) {
    $scope.categories = categories;

    var groupTransactionsByMonth = function (transactions, category) {
        byCats[category] = _.groupBy(transactions, function (transaction) {
            return moment(transaction.date).startOf('month').unix();
        });
    };

    var byCats = _.groupBy(transactions, 'category');

    var transByMonth = _.each(byCats, groupTransactionsByMonth);

    var getMonths = function (date) {
        var numMonths = 5;
        var months = [];

        while (numMonths--) {
            months.push(date.clone().subtract('months', numMonths));
        }

        return months.reverse();
    };

    $scope.startMonth = moment().startOf('month');
    $scope.$watch(function () {
        return $scope.startMonth.unix();
    }, function () {
        $scope.months = getMonths($scope.startMonth);
    });

    $scope.calcSpending = function (category, month) {
        // if no transactions for this category, just return 0;
        if (_.isUndefined(transByMonth[category])) {
            return 0;
        }

        var monthlyTransactions = transByMonth[category][month.unix()];

        // TODO store this in the array so it doesn't have to get re-calced for total monthly spending
        var totalSpending = _.reduce(monthlyTransactions, function(sum, transaction) {
            return sum + parseInt(transaction.amount);
        }, 0);

        return totalSpending;
    };

    $scope.addCategory = function () {
        categories.$add({
            name: $scope.catName,
            savings: []
        });
    };
});