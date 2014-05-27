/* jshint node:true */
var livereload = require('express-livereload');

var express = require('express');
var app = express();

var csv = require('csv');
var _ = require('lodash');

var Firebase = require('firebase');
var fireRef = new Firebase('https://vinlam-budget.firebaseio.com/');

app.use(express.static('public'));
app.use(express.bodyParser());

app.post('/transactions', function(req, res) {
    var account = req.param('account');

    var importFile = req.files.newTransactions;

    // read the file
    csv()
    .from.path(importFile.path, {
        delimiter: ','
    })
    .to.array(function (importedData){
        var transactions = fireRef.child('transactions');
        _.each(importedData, function (data) {
            delete data.blankA;
            delete data.blankB;
            delete data.posted;
            data.account = account;
            transactions.push(data);
        });

        res.send(200);
    }, {
        columns: ['posted', 'blankA', 'date', 'blankB', 'name', 'category', 'amount']
    });
});

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});

livereload(app, {
    'watchDir': process.cwd() + '/public'
});