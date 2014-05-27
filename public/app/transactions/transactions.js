angular.module('budget.transactions', [])
.controller('transactionsCtrl', function ($scope, transactions, accounts, categories) {
    transactions.$bind($scope, 'transactions');
    $scope.categories = categories;

    $scope.accounts = accounts;

    $scope.reverse = true;
    $scope.predicate = 'date';

    $scope.sortCol = function (predicate) {
        if ($scope.predicate == predicate) {
            $scope.reverse = !$scope.reverse;
        } else {
            $scope.predicate = predicate;
            $scope.reverse = false;
        }
    };

    var today = moment();

    var getStartDate = function (days) {
        return moment(today).subtract('days', days);
    };

    // show that last 30 days by default
    $scope.startDate = getStartDate(30);
    $scope.endDate = today;

    $scope.setRange = function (range) {
        if (!_.isNumber(range)) {
            $scope.startDate = moment(today).startOf(range);
        } else {
            $scope.startDate = getStartDate(range);
        }
    };

    $scope.inRange = function (transaction) {
        var date = moment(transaction.date);

        // Make sure date is after start date and before end date
        return date.isAfter($scope.startDate) && date.isBefore($scope.endDate);
    };
});