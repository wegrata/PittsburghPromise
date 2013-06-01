var app = require("../app")
  , mongo = require("mongodb")
  , Connection = require("mongodb").Connection
  , Server = require("mongodb").Server;

/*
 * GET home page.
 */


exports.index = function(req, res){
  console.log(app.app.settings.dsn);
  res.render('index', { title: 'Express' });
};

exports.about = function(req, res){

};

