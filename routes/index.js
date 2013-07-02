
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
    try {
        SendMessage(req.body.phoneNumber, function(result){
          res.writeHead(200, {"Content-Type": "application/json"});
          res.end(JSON.stringify({"success": true}));
        });
    } catch (err) {
      console.log(err);
    }
  }, 5000);

};
exports.video = function(req, res){
    res.render("video");    
}

function SendMessage(phoneNumber, callback) {
  // Build the post string from an object
  var client = new twilio.RestClient(process.env.sid,
                                     process.env.secret);
  if (phoneNumber[0] !== "1"){
    phoneNumber = "1" + phoneNumber;
  }
  client.sendSms({
     to: '+'+phoneNumber,
     from: process.env.number,
     body: "Get yourself to school so you don't " +
           "miss out on Pittsburgh Promise!"
  }, function(err, responseData){
    console.log(err);
    callback(responseData);
  });
}
