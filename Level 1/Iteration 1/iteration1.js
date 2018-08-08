function iterate(){
    for(i = 1; i<=10; i++){
        var paragraph = document.createElement("p");
        var currentValue = document.createTextNode(i);
        paragraph.appendChild(currentValue);
        document.body.appendChild(paragraph);
        
     }
}