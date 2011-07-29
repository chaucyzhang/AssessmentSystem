$(document).ready(function(){

	$("#newOutcomeField").dialog({
		autoOpen:false,
		title:"Add New Program Outcome",
		resizable:false,
		modal: true
	});
	$("#newEduObjField").dialog({
		autoOpen:false,
		title:"Add New Program Educational Objective",
		resizable:false,
		modal: true
	});
	$("#newCourseField").dialog({
		autoOpen:false,
		title:"Enter Course Name ",
		resizable:false,
		modal: true,
		height:160
	});
	$("#tabs").tabs();
    getContent();
    getCourses();



   $("#addProgramOutcomeBtn").click(function(){
	   $("#newOutcomeField").dialog('open');
	   $("#cancelAddOutcomeBtn").click(function(){
		   $("#newOutcomeField").dialog('close');
	   });
   
   });
   $("#addCourseBtn").click(function(){
	   $("#newCourseField").dialog('open');
	   $("#cancelAddCourseBtn").click(function(){
		   $("#newCourseField").dialog('close');
	   });
   });
   $("#submitOutcomeBtn").click(function(){
		  $.post('/program/addOutcome',{outcome:$("#newOutcomeContent").val(),name:$("#newOutcomeName").val()},function(data){
			  if(data=="added"){
				  $("#newOutcomeName").val("");	
				  $("#newOutcomeContent").val("");				  
				  $("#newOutcomeField").dialog('close');
				  getOutcomeData();
				  
			  }
		  });		  
		  
	   });
   $.getJSON("getFullCourses",function(data){

var courses=""
for(i=0;i<data.length;i++){
	courses+="<option id="+data[i][0]+">"+data[i][1]+"</option>";	
}
$("#newCourseContent").html(courses);
$("#submitCourseBtn").click(function(){

	  $.post('/program/addCourseToProgram',{courseName:$("#newCourseContent").val()},function(data){
		  if(data=="suc"){
			  
			  $("#newCourseContent").val("");				  
			  $("#newCourseField").dialog('close');
			  getCourses();
		  }
	  });		  
	  
 });
   });

   
   $("#addProgramEduObjBtn").click(function(){
	   $("#newEduObjField").dialog('open');
	   $("#cancelAddEduObjBtn").click(function(){
		   $("#newEduObjField").dialog('close');
		  
	   });

   });
   $("#submitEduObjBtn").click(function(){
		  $.post('/program/addEduObj',{EduObj:$("#newEduObjContent").val(),name:$("#newEduObjName").val()},function(data){
			  
				  $("#newEduObjField").dialog('close');
				  $("#newEduObjName").val("");	
				  $("#newEduObjContent").val("");
				  getEduobjData();
		  }); 
	   });
  
	$(".button").button();
	$(".button").css("font-size","8pt");
	$(".button").css("width","120px");
});
function getOutcomeData(){
	  $.getJSON('/program/getProgramDetail',function(data){
		   var iter="";
		   if(data['programoutcome'].length!=0){
		   for(i=0;i<data['programoutcome'].length;i++)
		   {
			   
	iter+="<tr><td><a class='outcomeLinks' id="+data['outcomeid'][i]+" href='/program/outcomePage'>"+data['programoutcome'][i].toString()+"</a></td><td class='rightButton'><input type='button' class='deleteBtn deleteOcBtn' value='Delete' /></td></tr>";
		   $("#programOCTable").html(iter);					   
		   }
		 
		   $(".outcomeLinks").click(function(){
		    	var outcomeid=$(this).attr('id');
		    	$.post('/program/storeOutcomeId',{outcomeId:outcomeid})
		    });
		   $("#programOCTable tr:even").css("background", "#EAEBFF");
		   $("#programOCTable tr:odd").css("background", "#D3D6FF");
		   $(".outcomeLinks").css("text-decoration","underline");
		   $(".deleteBtn").button();
		   $(".deleteBtn").css("font-size","8pt");
			$(".deleteBtn").css("width","70px");
		   $(".deleteOcBtn").click(function(){
			   var $outcomeid=$(this).parent().parent().children().children().attr('id')
				 $.post('/program/deleteProgramOutcome',{outcomeid:$outcomeid},function(data){
					 getOutcomeData();
				 });
			  });
		   }
		   else{
			   $("#programOCTable").html("<tr><td>The Program doesn't have any outcomes</td></tr>");	
			   $("#programOCTable tr:even").css("background", "#EAEBFF");
			   $("#programOCTable tr:odd").css("background", "#D3D6FF");
		   }
			   });
	
	
}

function getEduobjData(){
	  $.getJSON('/program/getProgramDetail',function(data){
		   var iter="";
		   if(data['programeduobj'].length!=0){
		   for(i=0;i<data['programeduobj'].length;i++)
		   {
			   
	iter+="<tr><td><a class='eduobjLinks' id="+data['eduobjid'][i]+" href='/program/eduobjPage'>"+data['programeduobj'][i].toString()+"</a></td><td class='rightButton'><input type='button' class='deleteBtn deleteEduobjBtn' id="+data['eduobjid'][i]+" value='Delete' /></td></tr>";
		   $("#programEduObjTable").html(iter);					   
		   }
		 
		   $(".eduobjLinks").click(function(){
		    	var eduobjid=$(this).attr('id');
		    	$.post('/program/storeEduobjId',{eduobjId:eduobjid})
		    });
		   $("#programEduObjTable tr:even").css("background", "#EAEBFF");
		   $("#programEduObjTable tr:odd").css("background", "#D3D6FF");
		   $(".eduobjLinks").css("text-decoration","underline");
		   $(".deleteBtn").button();
		   $(".deleteBtn").css("font-size","8pt");
			$(".deleteBtn").css("width","70px");
			 $(".deleteEduobjBtn").click(function(){
				   var $eduobjid=$(this).attr('id');
				  
					 $.post('/program/deleteProgramEduobj',{eduobjid:$eduobjid},function(data){
						getEduobjData();
					 });
				  });
		   }
		   else{
			   $("#programEduObjTable").html("<tr><td>The Program doesn't have any Objectives</td></tr>");	
			   $("#programEduObjTable tr:even").css("background", "#EAEBFF");
			   $("#programEduObjTable tr:odd").css("background", "#D3D6FF");
		   }
			   });
}


function getContent(){
	   $.getJSON('/program/getProgramDetail',function(data){
	
		   $("#programNameDiv").html(data['programname']);
		   $("#programDesDiv").html(data['programdes'].toString());
		   var iter="";
		   var iterObj="";
		   if(data['programoutcome'].length!=0)
			   {
		   for(i=0;i<data['programoutcome'].length;i++)
		   {
			  
			   iter+="<tr><td><a class='outcomeLinks' id="+data['outcomeid'][i]+" href='/program/outcomePage'>"+data['programoutcome'][i].toString()+"</a></td><td class='rightButton'><input type='button' id="+data['outcomeid'][i]+" class='deleteBtn deleteOcBtn' value='Delete' /></td></tr>";
		   $("#programOCTable").html(iter);
		   }
		   }
		   else{
			   $("#programOCTable").html("<tr><td>The Program doesn't have any outcomes</td></tr>");	
			   $("#programOCTable tr:even").css("background","#EAEBFF");
			   $("#programOCTable tr:odd").css("background","#D3D6FF");
		   }
		   for(i=0;i<data['programeduobj'].length;i++)
			   {
			   
			   iterObj+="<tr><td><a class='eduobjLinks' id="+data['eduobjid'][i]+" href='/program/eduobjPage'>"+data['programeduobj'][i].toString()+"</a></td><td class='rightButton'><input type='button' class='deleteBtn deleteEduobjBtn' id="+data['eduobjid'][i]+" value='Delete' /></td></tr>";
		   $("#programEduObjTable").html(iterObj);
			   }
		   $(".deleteBtn").button();
		   $(".deleteBtn").css("font-size","8pt");
			$(".deleteBtn").css("width","70px");

		    $(".outcomeLinks").click(function(){
		    	var outcomeid=$(this).attr('id');
		    	$.post('/program/storeOutcomeId',{outcomeId:outcomeid})
		    });
		    
		    $(".eduobjLinks").click(function(){
		    	var eduobjid=$(this).attr('id');
		    	$.post('/program/storeEduobjId',{eduobjId:eduobjid})
		    	
		    });
		    
			   $(".deleteOcBtn").click(function(){
				   
				   var $outcomeid=$(this).parent().parent().children().children().attr('id');
					 $.post('/program/deleteProgramOutcome',{outcomeid:$outcomeid},function(data){
						
						getOutcomeData();
					 });
				
				  });
		    
                  $(".deleteEduobjBtn").click(function(){
				   
				   var $eduobjid=$(this).attr('id');
                     
					 $.post('/program/deleteProgramEduobj',{eduobjid:$eduobjid},function(data){
						getEduobjData();
					 });
				
				  });
		   $("#programOCTable tr:even").css("background","#EAEBFF");
		   $("#programOCTable tr:odd").css("background","#D3D6FF");
		   $("#programEduObjTable tr:even").css("background","#EAEBFF");
		   $("#programEduObjTable tr:odd").css("background","#D3D6FF");
		   $(".outcomeLinks").css("text-decoration","underline");
			   });
	
}

function getCourses(){
	$.getJSON('/program/getCourses',function(data){
		if(data.length!=0){
		var courses="";
		for(i=0;i<data.length;i++){
			courses+="<tr><td><a href='/program/course' class='courseLinks' id="+data[i][0]+">"+data[i][1]+"</a></td><td class='rightButton'><input type='button' class='deleteCourseBtn' id="+data[i][0]+" value='Delete' /></td></tr>";
		}
		$("#coursesTable").html(courses);
		
		 $("#coursesTable tr:even").css("background","#EAEBFF");
		   $("#coursesTable tr:odd").css("background","#D3D6FF");
		   $(".deleteCourseBtn").button();
		   $(".deleteCourseBtn").click(function(){
			   var $courseid=$(this).attr('id');
			 
			   $.post('/program/deleteCourseOfProgram',{courseid:$courseid},function(data){
				   getCourses(); 
			   });
		   });
		   
		}
		else{
			$("#coursesTable").html("<tr><td>No Course Included</td></tr>");
			$("#coursesTable tr:even").css("background","#EAEBFF");
			   $("#coursesTable tr:odd").css("background","#D3D6FF");
		}
	});
	
	
	
}