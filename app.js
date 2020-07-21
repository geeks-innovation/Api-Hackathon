'use strict';
const express = require('express'); // app server
const fs = require('file-system'); // file system for loading JSON

let app = express();
app.use(express.static('./public')); // load UI from public folder

app.get('/api/transactionsDetail', function (req, res) {
  console.log("GET REQUEST RECEIVED ON PATH /api/transactions");
   var fs = require("fs");
	var text = fs.readFileSync("./transactions.csv");
	res.send(text);
});

app.get('/api/transactions', function (req, res) {
  console.log("GET REQUEST RECEIVED ON PATH /api/transactions");
   var fs = require("fs");
	var text = fs.readFileSync("./transactionsAgg.csv");
	res.send(text);
});

app.get('/api/ratings', function (req, res) {
  console.log("GET REQUEST RECEIVED ON PATH /api/ratings");
   var fs = require("fs");
	var text = fs.readFileSync("./ratings.csv");
	res.send(text);
});

app.get('/api/totalspend', function (req, res) {
  console.log("GET REQUEST RECEIVED ON PATH /api/totalspend");
   var fs = require("fs");
	var text = fs.readFileSync("./totalspend.csv");
	res.send(text);
});

app.get('/api/categoryAvgSpend', function (req, res) {
  console.log("GET REQUEST RECEIVED ON PATH /api/categoryAvgSpend");
   var fs = require("fs");
	var text = fs.readFileSync("./categoryAvgSpend.csv");
	res.send(text);
});

app.get('/api/steps', function (req, res) {
  console.log("GET REQUEST RECEIVED ON PATH /api/steps");
   var fs = require("fs");
	var text = fs.readFileSync("./steps.csv");
	res.send(text);
});

module.exports = app;