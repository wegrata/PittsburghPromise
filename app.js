
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , admin = require("./routes/admin")
  , student = require("./routes/student")
  , http = require('http')
  , mongodb = require("mongodb")
  , Connection = require("mongodb").Connection
  , Server = require("mongodb").Server
  , path = require('path');


var app = express();
module.exports.App = app;
// all environments
app.set("dsn", process.env.MONGOHQ_URL || "mongodb://localhost/pghpromise");
app.set("collection", "student");
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get("/about", routes.about);
app.get('/users', user.list);

app.get("/apply", student.apply);
app.get("/calculator/:studentId", student.calculator);
app.post("/calculator/:studentId", student.calculator);
app.get("/eligibility/:studentId", student.eligibility);

app.get("/admin", admin.admin);
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

