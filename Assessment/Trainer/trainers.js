'use strict';

function submit() {
	
	var submit = document.getElementById("input");
	
	console.log(submit.value);
	
}

function search() {
    
    var input = document.getElementById("input").value;
	var exist = true;
	
	if(input == ""){
		return;
	}
	   
    var requestData = data;
	   	
	var target = requestData.members;
	
	for(var i = 0; i< target.length; i++){
		
		if(target[i].name.toLowerCase() == input.toLowerCase()){			
			target = target[i];
		}
		
		
	}


    let para = document.getElementsByTagName('pre')[0];
    
    if(!para){
    para = document.createElement("pre");
    }
    
    para.textContent =  JSON.stringify(target, null, 2);
    
    var paragraph = document.getElementById('para');
    
    document.getElementById('para').appendChild(para);
    


    
}

function skillSearch() {
	
	var input = document.getElementById("input2").value;
	
	if(input == ""){
		return;
	}
	   
    var requestData = data;
	  	
	var target = requestData.members;
	


	for(var i = 0; i< target.length; i++){
							
		for(var j = 0; j < target[i].skills.length; j++){

			if(target[i].skills[j].toLowerCase() == input.toLowerCase()){
				
				target = target[i];
				
			}		
			
		}
	
	}
	
	
	
	
    let para = document.getElementsByTagName('pre')[0];
    
    if(!para){
    para = document.createElement("pre");
    }
    
    para.textContent =  JSON.stringify(target, null, 2);
    
    var paragraph = document.getElementById('para');
    
    document.getElementById('para').appendChild(para);
    

}