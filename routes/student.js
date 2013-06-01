var app = require("../app")
  , mongo = require("mongodb")
  , Connect = require("mongodb").Connection
  , Db = require("mongodb").Db
  , Server = require("mongodb").Server;

exports.eligibility = function(req, res){
    var dsn = app.App.settings.dsn;
    var c = app.App.settings.collection;
    Db.connect(dsn, function(err, db){
        if (err){
            console.log(err);
            res.render("eligibility", {title: "Eligibility", error:"Invalid Student"});
        }else{
            var collection = db.collection(c);
            collection.findOne({"studentId": req.params.studentId},
                               {raw: true}, function(err, item){
                if(err || !item){
                    res.render('eligibility', {title: "Eligibility", error: "Invalid Student"});
                }else{
                    console.log(item);
                    res.render('eligibility', { title: 'Eligibility' , student: item});
                }
            });
        }
    });
};

exports.calculator = function(req, res){
    res.render('calculator', { title: 'Express' });
};

exports.apply = function(req, res){
    res.render('apply', { title: 'Express' });
};

