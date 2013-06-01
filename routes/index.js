
/*
 * GET home page.
 */


exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};
exports.app_form = function(req, res){
  res.render('app_form', { title: 'Express' });
};
exports.about = function(req, res){
	res.render("about", {title: "Express"});
}