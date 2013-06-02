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
  res.render('eligibility', { title: 'Eligibility' });
};

exports.calculator = function(req, res){
    res.render('calculator', { title: 'How much will I get?', studentId: req.params.studentId});
};
function calculateContributionForYears(years){
  var promiseContribution = 10000;
  var percent = parseFloat(years);
  return promiseContribution * percent;
}
exports.calculate = function(req, res){
  var tuition = parseFloat(req.body.tuition);
  var board = parseFloat(req.body.board);
  var books = parseFloat(req.body.books);
  var totalCost = tuition + board + books;
  var government = parseFloat(req.body.government);
  var institutional = parseFloat(req.body.institutional);
  var scholarship = parseFloat(req.body.scholarship);
  var totalAid = government + institutional + scholarship;
  var promiseContribution = calculateContributionForYears(req.body.years);
  var unmetNeed = totalCost - totalAid;
  console.log(unmetNeed - promiseContribution);
  if(unmetNeed === 0){
    promiseContribution = 0;
  }
  else if((unmetNeed - promiseContribution) < 1000 && (unmetNeed - promiseContribution) > 0){
    promiseContribution = 1000;
    unmetNeed -= 1000;
  }
  else if (promiseContribution > unmetNeed){
    promiseContribution = unmetNeed;
  }else{
    unmetNeed -= promiseContribution;
  }
  res.render('calculate', { title: 'Calculate Student Cost',
                            totalCost: totalCost,
                            promiseContribution: promiseContribution,
                            studentContribution: unmetNeed
                          });
};

exports.apply = function(req, res){
    res.render('apply', { title: 'Scholarship Application' });
};

