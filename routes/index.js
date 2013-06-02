
var twilio = require("twilio");
/*
 * GET home page.
 */


exports.index = function(req, res){
  res.render('index', { title: 'PGH Promise' });
};
exports.about = function(req, res){
    res.render("about");
};
exports.subscribe = function(req, res){
    res.render("subscribe");
};
exports.subscribeToAlert = function(req, res){
  setTimeout(function(){
    SendMessage(req.body.phoneNumber, function(result){
      res.render("subscribed", result);
    });
  }, 5000);

};

function SendMessage(phoneNumber, callback) {
  // Build the post string from an object
  var client = new twilio.RestClient("AC629eef76b6354f1f459e6c1b7e34c1bd",
                                 "925c200da23c92aefbc0dc741a03a9ae");
  if (!phoneNumber[0] !== "1"){
    phoneNumber = "1" + phoneNumber;
  }
  client.sendSms({
     to: '+'+phoneNumber,
     from: '+17245364880',
     body: "Get your ass to school so you don't miss out on Pittsburgh Promise"
  }, function(err, responseData){
    callback(responseData);
    console.log(err);
    console.log(responseData);
  });
}