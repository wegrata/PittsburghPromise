var app = require("../app").App;

exports.eligibility = function(req, res){
	console.log(app);
    res.render('eligibility', { title: 'Express' });
};

exports.calculator = function(req, res){
    res.render('calculator', { title: 'Express' });
};

exports.apply = function(req, res){
    res.render('apply', { title: 'Express' });
};

