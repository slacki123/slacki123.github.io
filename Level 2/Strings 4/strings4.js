function triple(input){
    
    var triples = 0;
    document.getElementById("triple").innerHTML = null;
    
    for(var i = 0; i<input.length; i++) {
        
        if(input.charAt(i)==input.charAt(i+1) && input.charAt(i+1)==input.charAt(i+2)){
            
            document.getElementById("triple").innerHTML += "triple " + input.charAt(i)+input.charAt(i+1)+input.charAt(i+2) + " detected<br\>";
            
        }
    }
    document.getElementById("number").innerHTML = "Number of detected triples: " + triples;
    
}