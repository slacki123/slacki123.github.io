function fizzBuzz() {
    
    for(i=1; i<=100;i++){
        
        var output = "";
        
        if(i%3==0){
            output += "Fizz";
        }
    
        if(i%5==0){
            output += "Buzz";
        }
       
        if(output== ""){
            output = i;
        }
        
        document.write(output+", ");
    }
    
    
}

function additionalFizzBuzz(maxNumber, word1, word2) {
    
     for(i=1; i<=maxNumber;i++){
        
        var output = "";
        
        if(i%3==0){
            output += word1;
        }
    
        if(i%5==0){
            output += word2;
        }
       
        if(output== ""){
            output = i;
        }
        
        document.write(output+", ");
    }
    
}

