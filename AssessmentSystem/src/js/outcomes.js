$(document).ready(function(){
	$("#addCourseField").dialog({
		autoOpen:false,
		title:"Select a Course",
		resizable:false,
		modal: true,
		width:300,
		height:120
	});
	$("#tabs").tabs();
	   $("#addCourseBtn").click(function(){
		   $("#addCourseField").dialog('open');
		   $("#cancelAddCourseBtn").click(function(){
			   $("#addCourseField").dialog('close');
		   });
	   });
	   $.getJSON('/program/outcomePage/getCourseList',function(data){
		   var Course=""
				for(i=0;i<data.length;i++){
					Course+="<option value="+data[i][0]+">"+data[i][1]+"</option>";
					   $("#courseOptions").html(Course);
				}
	   });
	                getOutcome();
	                
                    getCourses();
                   
	
	$("#submitCourseBtn").click(function(){
		$.post('/program/outcomePage/addCourseToProgramOutcome',{courseId:$("#courseOptions").val()},function(data){
			getCourses();
			$("#addCourseField").dialog('close');
		});
	});
	$(".button").button();
	$(".button").css("font-size","8pt");
	$(".button").css("width","110px");
});

function getCourses(){
	$.getJSON('/program/outcomePage/getOutcomeAndCourse',function(data){
		
		var iter=""
			if(data.length!=0)
			{	
				
				for(i=0;i<data.length;i++){
			iter+="<tr><td><a href='/program/course'>"+data[i].toString()+"</a></td><td class='rightButton'><input type='button' class='button deleteCourseBtn' value='Delete' /></td></tr>";
			   $("#courseTable").html(iter);
		}
			}
			else{ $("#courseTable").html("<tr><td>No Course</td></tr");}
		$(".deleteCourseBtn").button();
		$(".deleteCourseBtn").css("font-size","8pt");
		$(".deleteCourseBtn").css("width","90px");
		 $("#courseTable tr:odd").css("background", "#EAEBFF");
		 $("#courseTable tr:even").css("background", "#D3D6FF");
	//	 $(".outcomeLinks").css("text-decoration","underline");
	});
	
}

function getOutcome(){
	$.post('/program/outcomePage/getOutcome',function(data){
		$("#outcomeDiv").html(data);
	});
}