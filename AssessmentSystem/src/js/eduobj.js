$(document).ready(function(){
	$("#tabs").tabs();
	getEduobj();
});

function getEduobj(){
	$.post('/program/eduobjPage/getEduobj',function(data){
		$("#eduobjDiv").html(data);
	});
}