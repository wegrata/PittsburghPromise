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
function calculateContributionForYears(years){
  var promiseContribution = 10000;
  var percent = parseFloat(years);
  return promiseContribution * percent;
}
exports.calculate = function(req, res){
  console.log(req.body);
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
  console.log(promiseContribution);
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
  res.writeHead(200, {"Content-Type": "application/json"});
  res.write(JSON.stringify({
                            totalCost: totalCost,
                            promiseContribution: promiseContribution,
                            studentContribution: unmetNeed
                          }));
  res.end();
  // res.render('calculate', { title: 'Calculate Student Cost',
  //                           totalCost: totalCost,
  //                           promiseContribution: promiseContribution,
  //                           studentContribution: unmetNeed
  //                         });
};

exports.apply = function(req, res){
    res.render('apply', { title: 'Scholarship Application' });
};

