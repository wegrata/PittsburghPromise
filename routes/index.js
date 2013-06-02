
/*
 * GET home page.
 */


exports.index = function(req, res){
  res.render('index', { title: 'PGH Promise' });
};
exports.about = function(req, res){
	res.render("about");
};