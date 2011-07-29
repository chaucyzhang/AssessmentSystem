$(document).ready(function(){
$(".button").button();
	$("#newProgramField").dialog({
		autoOpen:false,
		title:"Complete These Info",
		resizable:false,
		modal: true,
		width: 400,

	});
	$("#newCourseField").dialog({
		autoOpen:false,
		title:"Complete These Info",
		resizable:false,
		modal: true,
		width: 400,

	});
	
	
	$("#accountBox").dialog({
		autoOpen:false,
		title:"Open New Account",
		resizable:false,
		modal: true,

	});
	// get all programs
	getProgramTable()
	getSession();
	$("#loginBtn").click(function(){
		//login into the system
		$.post('/login',{uname:$("#username").val(),passwd:$("#password").val()},function(data){
			getSession();
		});
	});
	$("#logoutBtn").click(function(){
		$.post('/logout',function(data){
			  location.reload();
		});
	});
	
	//the system admin will use this function to open a new account for other faculty
	$("#openAccountLink").click(function(){
		$("#accountBox").dialog("open");
	});
	$("#openAccountSubmitBtn").click(function(){
		$.post('/openAccount',{username:$("#newUsername").val(),passwd:$("#newPassword").val(),usertype:$("#usertypeDropdown").val()},function(data){
			
		});
	});
		$("#addProgramLink").click(function(){
			$("#newProgramField").dialog("open");
		});
		$("#addCourseLink").click(function(){
			$("#newCourseField").dialog("open");
		});
		
		//add program
		$("#addProgramBtn").click(function(){
			$.post('/addProgram',{programName:$("#programName").val(),programDes:$("#programDes").val()},function(data){
				
				if(data=="added"){
					$("#newProgramField").dialog("close");
					$("#programDataTable").dataTable().fnAddData( [$("#programName").val() ] );
					$("#programDataTable").dataTable().fnUpdate();
					location.reload();
				}
			});
		});
		
		$("#addCourseBtn").click(function(){
		
			$.post('/addCourse',{courseName:$("#courseName").val(),courseDes:$("#courseDes").val()},function(data){
				
				if(data=="added"){
					
					$("#newCourseField").dialog("close");
					
					
				}
			});
		});
		
		$("#cancelAddProgramBtn").click(function(){
			$("#newProgramField").dialog("close");
		});
		$("#cancelAddCourseBtn").click(function(){
			$("#newCourseField").dialog("close");
		});
		
		

		
});

//pass the programID to the server side
function getSession(){
	$.post('/getSession',function(data){
		$("#greetingDiv").html("Welcome back,"+data.toString())
		if(data=="admin"){			
			$("#adminLinks").fadeIn();
			$("#loginPanel").hide();
			$("#logoutPanel").fadeIn();
		}
		else if(data=="faculty")
			{
			$("#loginPanel").hide();
			$("#logoutPanel").fadeIn();
			}
		else{
			$("#loginPanel").fadeIn();
			$("#adminLinks").hide();
			$("#logoutPanel").hide();
		}
		
	});
}
function getPrograms(){
var programs="";
$.getJSON('/getAllPrograms',function(data){
	for(i=0;i<data.length;i++){
		programs+="<tr><td><a href='/program' class='programLinks'>"+data[i]+"</a></td></tr>";
	//	$("#programsDiv").append("<a href='#'>"+data[i]+"</a><br />");
	}
	$("#programsTableTBody").html(programs);
	$("#programsDiv").show();
	//$(".programLinks").text().css("text-decoration","underline")
	$(".programLinks").click(function(){
		var pname=$(this).text();
		$.post('/storeProgramName',{name:pname});
	});
});

}
function getProgramTable(){
	$.getJSON('/getAllPrograms',function(data){
		var programs=new Array();
		for(i=0;i<data.length;i++){
			programs[i]=data[i];
		}
		$("#programDataTable").dataTable({
			"bJQueryUI": true,
			"sPaginationType": "full_numbers",
				"aaData": 
				          data,
				"aoColumns": [
							{ "sTitle": "Program Name" }		
						],
				"fnInitComplete": function () {
						var  that = this,
						nTrs = this.fnGetNodes();
						$('td', nTrs).click( function () {
//						that.fnFilter( this.innerHTML );
							var pname=$(this).text();
							$.post('/storeProgramName',{name:pname},function(){
								window.location.href='/program';
							});
							});
						}
		
		});
	

	});
	
}
		