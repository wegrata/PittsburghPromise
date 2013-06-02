function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
function calculateContributionForYears(years){
  var promiseContribution = 10000;
  var percent = parseFloat(years);
  return promiseContribution * percent;
}
function calculate(data){
  var tuition = parseFloat(data.tuition);
  var board = parseFloat(data.board);
  var books = parseFloat(data.books);
  var totalCost = tuition + board + books;
  var government = parseFloat(data.government);
  var institutional = parseFloat(data.institutional);
  var scholarship = parseFloat(data.scholarship);
  var totalAid = government + institutional + scholarship;
  var promiseContribution = calculateContributionForYears(data.years);
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
  return {
            totalCost: totalCost,
            promiseContribution: promiseContribution,
            studentContribution: unmetNeed
          };
}
$(document).ready(function(){
	var textFields = $(":text");
	$("#submit").click(function(){
		console.log($("#years").val());
		var result = calculate(
		{
			tuition: $("#tuition").val(),
			board: $("#board").val(),
			books: $("#books").val(),
			government: $("#government").val(),
			institutional: $("#institutional").val(),
			scholarship: $("#scholarship").val(),
			years: $("#years").val()
		});
		$("#total").html(result.totalCost);
		$("#give").html(result.promiseContribution);
		$("#owe").html(result.studentContribution);
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

