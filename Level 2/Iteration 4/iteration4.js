function divide(input) {
    
    document.getElementById("hey").innerHTML = input + ", ";
    
    var divisible = input;
    var iterations = 0;
    
    while(divisible != 1){
    
    if(divisible % 3 >= 2 && divisible % 3 != 0){
        divisible++;
    }
    else if (divisible % 3 <= 2 && divisible % 3 != 0){
        divisible--;
    }
    
    divisible = divisible/3;
        
    document.getElementById("res").innerHTML = "The process went as follows: <br\>";

    var currentResult = document.createElement("a");
    var divis = document.createTextNode(divisible + ", ");
    currentResult.appendChild(divis);
         
    document.getElementById("hey").innerHTML += currentResult.innerHTML;
                
    iterations++;
        
    }
    
    document.getElementById("result").innerHTML = "Number of iterations: " + iterations;
    
      
}