function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
$(document).ready(function(){
	console.log("got here");
	var textFields = $(":text");
	textFields.bind("keyup", function(e){
		$("#submit").attr("disabled", null);
		textFields.each(function(){
			if(!isNumber($(this).val())){
				$("#submit").attr("disabled", "disbled");
				$(this).parent().addClass("error");
			}else{
				$(this).parent().removeClass("error");
			}
		});

	});
});