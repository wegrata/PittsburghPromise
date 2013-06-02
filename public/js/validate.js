function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
$(document).ready(function(){
	var textFields = $(":text");
	$("#submit").click(function(){
		console.log($("#years").val());
		$.post("/calculate",
		{
			tuition: $("#tuition").val(),
			board: $("#board").val(),
			books: $("#books").val(),
			government: $("#government").val(),
			institutional: $("#institutional").val(),
			scholarship: $("#scholarship").val(),
			years: $("#years").val()
		}
		).done(function(data){
			$("#total").html(data.totalCost);
			$("#give").html(data.promiseContribution);
			$("#owe").html(data.studentContribution);
		});
	});
	textFields.bind("keyup", function(e){
		$("#submit").attr("disabled", null);
		textFields.each(function(){
			console.log($(this).val());
			if(!isNumber($(this).val())){
				$("#submit").attr("disabled", "disbled");
				$(this).parent().addClass("error");
			}else{
				$(this).parent().removeClass("error");
			}
		});

	});
});

