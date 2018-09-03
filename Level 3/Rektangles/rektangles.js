function rektangles(){
    
    var word = document.getElementById("inputField").value.toUpperCase();
    
    var output1 = "";
    var output2 = "";

    for(var i = 0; i < word.length; i++){

        if( i == 0){

            for(var j = 0; j < word.length; j++){
            output1 += word.charAt(j)+ " ";
            output2 += word.charAt(word.length - j -1) + " ";
            }
            
            document.getElementById("para").innerHTML = output1 +  "<br />";

            }   
            
            else if (i > 0 && i<(word.length-1)){
                
                var space = "&nbsp ";
                
                document.getElementById("para").innerHTML += word.charAt(i) + space.repeat(2*word.length - 4) + word.charAt(word.length-i-1) + "<br />";
      
            }
            
            else if (i == (word.length-1)) {
                           
                document.getElementById("para").innerHTML += output2;
            }     
        }
    }     


