
command = document.getElementById("command");
port = document.getElementById("port");
profile = document.getElementById("profile");

function addProfileOptions(){
	for (var index in config){
		var option = document.createElement("option");
		option.text = index;
		option.value = index;
		profile.add(option);
	}
	
}




function generateCommand(){
if(port.value.trim()== ""){
	alert("Port cannot  be empty");
}else{
var commit = "\ncommit confirm 2 \ncommit \n";
	var cli ="";
	

	if(port.value.includes("[")){
		//port value is range of ports
		defaultInterface.forEach(function(item, index){
			cli += "wildcard range " + item.replace("{{port}}",port.value) + "\n";
		});
		config[profile.value].forEach(function(item, index){
			cli +="wildcard range " + item.replace("{{port}}",port.value) + "\n";
		});
	
	}else{
		//its a single port.
		defaultInterface.forEach(function(item, index){
			cli += item.replace("{{port}}",port.value) + "\n";
		});
		config[profile.value].forEach(function(item, index){
			//console.log(item);
			cli += item.replace("{{port}}",port.value) + "\n";
		});
	}
	cli +="\n \n";
	command.value = cli + command.value.replace(commit,"") + commit;
}}






//handle copy to clipboard function
function copyToClicpboard(){
	command.setSelectionRange(0,999999);
	command.select();
	document.execCommand("copy");
}
function clearCommand(){
	command.value = '';
}

//after the page is loaded add profile options to select object
window.onload = addProfileOptions;
