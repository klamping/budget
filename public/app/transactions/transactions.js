angular.module('budget.transactions', [])
.controller('transactionsCtrl', function ($scope, transactions, categories) {
    $scope.transactions = transactions;
    $scope.categories = categories;

    $scope.reverse = true;
    $scope.predicate = 'date';
    $scope.showReviewed = true;

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
    $scope.endDate = moment(today);

    $scope.setRange = function (range, direction) {
        if (!_.isNumber(range)) {
            // if a 'month' or 'year', we go to the start of it
            $scope.startDate = $scope.startDate.startOf(range);

            if (_.isNumber(direction)) {
                var method = direction > 0 ? 'add' : 'subtract';

                $scope.startDate[method](range, 1);
            }

            $scope.endDate = moment($scope.startDate).endOf(range);
        } else {
            $scope.startDate = getStartDate(range);
        }
    };

    $scope.inRange = function (transaction) {
        var date = moment(transaction.date);

        // Make sure date is after start date and before end date
        return date.isAfter($scope.startDate) && date.isBefore($scope.endDate);
    };

    $scope.deleteTransaction = function (transaction) {
        if (confirm('Delete?')) {
            transactions.$remove(transaction.$id);
        }
    };

    // $scope.importTransactions = function () {
    //     var importFile = req.files.newTransactions;

    //     // read the file
    //     csv()
    //     .from.path(importFile.path, {
    //         delimiter: ','
    //     })
    //     .to.array(function (importedData){
    //         var transactions = fireRef.child('transactions');
    //         _.each(importedData, function (data) {
    //             delete data.blankA;
    //             delete data.blankB;
    //             delete data.posted;
    //             data.account = account;
    //             transactions.push(data);
    //         });

    //         res.send(200);
    //     }, {
    //         columns: ['posted', 'blankA', 'date', 'blankB', 'name', 'category', 'amount']
    //     });
    // };
});