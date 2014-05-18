/* jshint node:true */
var livereload = require('express-livereload');

var fs = require('fs');
var jf = require('jsonfile');

var express = require('express');
var app = express();

var csv = require('csv');

var transactionsFile = './server/data/transactions.json';

app.use(express.static('public'));
app.use(express.bodyParser());

app.get('/transactions', function(req, res) {
    jf.readFile(transactionsFile, function (err, data) {
        res.send(data);
    });
});

app.post('/transactions', function(req, res) {
    var importFile = req.files.newTransactions;

    // read the file
    csv()
    .from.path(importFile.path, {
        delimiter: ','
    })
    .to.array(function (importedData){
        jf.readFile(transactionsFile, function (err, data) {
            var allData = data.concat(importedData);

            jf.writeFile(transactionsFile, allData, function () {
                res.send(allData);
            });
        });
        // remove first two columns
    }, {
        columns: ['posted', 'blank', 'date', 'blank', 'name', 'category', 'amount']
    });
});

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});

livereload(app, {
    'watchDir': process.cwd() + '/public'
});