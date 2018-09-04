function rektangles(){
    
    var word = document.getElementById("inputField").value.toUpperCase();
	var height = 1;
	var width = document.getElementById("slider1").value;
	document.getElementById("sliderValue1").innerHTML = "Value: " + width;
    
 
	var space = "&nbsp";

    for(var i = 0; i < word.length; i++){

			if( i == 0){
			
				
		        var output1 = "";
			    var output2 = "";
			
				for(var j = 0; j < word.length; j++){

				output1 += word.charAt(j+1)+ " ";						
				output2 += word.charAt(word.length - j - 2) + " ";
				}

				var A = output1;
				var B = output1 + output2;

				var topText = word.charAt(0) + " " + B.repeat((width - width % 2)/2) + A.repeat(width % 2) + "<br />";

				document.getElementById("para").innerHTML = topText
			
			}   
            
            else if (i > 0 && i < (word.length-1)){  
				
				var first = word.charAt(i) + space.repeat(2*word.length-3) + word.charAt(word.length-i-1);
				var firstSpaced = space.repeat(2*word.length-3) + word.charAt(i);
				var second = space.repeat(2*word.length-3) + word.charAt(word.length-i-1);
				
				var numb;
				
				if(width % 2 == 0){
					numb = 1;
				}
				
				var box = firstSpaced + second;
				
				var middleText = first + box.repeat((width - 1)/2) + firstSpaced.repeat(numb) + "<br />"; 
				
				document.getElementById("para").innerHTML += middleText;
							
			      
            }
            
            else if (i == (word.length-1)) {
				
				var temp1 = "";
				var temp2 = "";
				
				for(var j = 0; j < word.length; j++){
			
				temp1 += word.charAt(word.length - j - 2)+ " ";
				temp2 += word.charAt(j+1) + " ";
					
				}
				
				var A = temp1;
				var B = temp1 + temp2;
                           
                var bottomText = word.charAt(word.length - 1) + " " + B.repeat((width - width % 2)/2) + A.repeat(width % 2) + "<br />";
				
				document.getElementById("para").innerHTML += bottomText;
            }     
        }
    } 

function heightInput(){
	
    var word = document.getElementById("inputField").value.toUpperCase();
	var height = document.getElementById("slider2").value;
	document.getElementById("sliderValue2").innerHTML = "Value: " + height;
	var width = document.getElementById("slider1").value; 
	var space = "&nbsp";
	var middleText= "";
	var topText="";
	
	for (var h = 0; h < height-1; h++){ //this bit adds height
	
	for(var i = 0; i < word.length; i++){
		
		if (i > 0 && i < (word.length-1)){  
				
				var first = word.charAt(i) + space.repeat(2*word.length-3) + word.charAt(word.length-i-1);
				var firstSpaced = space.repeat(2*word.length-3) + word.charAt(i);
				var second = space.repeat(2*word.length-3) + word.charAt(word.length-i-1);
				
				var numb;
				
				if(width % 2 == 0){
					numb = 1;
				}
				
				var box = firstSpaced + second;
			
				middleText = first + box.repeat((width - 1)/2) + firstSpaced.repeat(numb) + "<br />";
				
				document.getElementById("para").innerHTML += middleText

		}
		
		  else if (i == (word.length-1)) {
				
				var output1 = "";
			    var output2 = "";
			
				for(var j = 0; j < word.length; j++){

				output1 += word.charAt(j+1)+ " ";						
				output2 += word.charAt(word.length - j - 2) + " ";
				}

				var A = output1;
				var B = output1 + output2;

				topText = word.charAt(0) + " " + B.repeat((width - width % 2)/2) + A.repeat(width % 2) + "<br />";
			  
			  	document.getElementById("para").innerHTML += topText;
		  			
         }  
		
	}
		
	}
	
}

slider.oninput = rektangles(); 
