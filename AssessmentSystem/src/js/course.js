$(document).ready(function(){
	$("#newOutcomeField").dialog({
		autoOpen:false,
		title:"Add New Course Outcome",
		resizable:false,
		modal: true,
		width:300
	});
	$("#tabs").tabs();
	$(".button").button();
	$("#addCourseOutcomeBtn").click(function(){
		$("#newOutcomeField").dialog("open");
	});
});