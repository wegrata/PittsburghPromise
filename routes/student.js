var app = require("../app")
  , mongo = require("mongodb")
  , Connect = require("mongodb").Connection
  , Db = require("mongodb").Db
  , Server = require("mongodb").Server;

function getStudentData(studentId, callback){
    var dsn = app.App.settings.dsn;
    var c = app.App.settings.collection;
    Db.connect(dsn, function(err, db){
        if (err){
          callback(err, null);
        }else{
            var collection = db.collection(c);
            collection.findOne({"studentId": studentId},
                               {raw: true}, function(err, item){
                if(err || !item){
                  callback("InvalidStudent", null);
                }else{
                    callback(null, item);
                }
            });
        }
    });
}

exports.eligibility = function(req, res){
  StudentData(req.params.studentId, function(err, item){
    if(err){
        res.render("eligibility", {title: "Eligibility", error:"Invalid Student"});
    }else{
      res.render('eligibility', { title: 'Eligibility' , student: item});
    }
  });
};

exports.calculator = function(req, res){
    res.render('calculator', { title: 'Calculate Student Cost', studentId: req.params.studentId});
};

exports.calculate = function(req, res){
  res.render('calculate', { title: 'Calculate Student Cost', promiseContribution: 1000, studentContribution: 0});
};

exports.apply = function(req, res){
    res.render('apply', { title: 'Express' });
};

