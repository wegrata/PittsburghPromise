var app = require("../app")
  , mongo = require("mongodb")
  , Connect = require("mongodb").Connection
  , Db = require("mongodb").Db
  , Server = require("mongodb").Server;

exports.eligibility = function(req, res){
  res.render('eligibility', { title: 'Eligibility' });
};

exports.calculator = function(req, res){
    res.render('calculator', { title: 'How much will I get?', studentId: req.params.studentId});
};
exports.apply = function(req, res){
    res.render('apply', { title: 'Scholarship Application' });
};

