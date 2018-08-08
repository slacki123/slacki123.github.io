function Person(name, age, occupation){
    this.name = name;
    this.age = age;
    this.occupation = occupation;
}

var person = new Person("John", 21, "Programmer");


function insertForm(){
    
    document.getElementById("btn").disabled=true;
    
    var nameText = document.createTextNode("Name: ");
    var ageText = document.createTextNode("Age: ");
    var occupationText = document.createTextNode("Occupation: ");
    
    var para1 = document.createElement("p");
    var para2 = document.createElement("p");
    var para3 = document.createElement("p");
    
    var name = document.createElement("input");
    name.setAttribute("id", "name1");
    var age = document.createElement("input");
    age.setAttribute("id", "age1");
    var occupation = document.createElement("input");
    occupation.setAttribute("id", "occupation1");
    
    para1.appendChild(nameText);
    para1.appendChild(name);
    
    para2.appendChild(ageText);
    para2.appendChild(age);
    
    para3.appendChild(occupationText);
    para3.appendChild(occupation);
    
    document.body.appendChild(para1);
    document.body.appendChild(para2);
    document.body.appendChild(para3);
    
    var butt = document.createElement("button");
    var buttText = document.createTextNode("Submit/Edit");
    butt.appendChild(buttText);
    document.body.appendChild(butt);
    
    butt.addEventListener("click", submitButton); 
    

}

var person2;

function submitButton(){
        
  var name1 = document.getElementById("name1").value;
  var age1 = document.getElementById("age1").value;
  var occupation1 = document.getElementById("occupation1").value;
  
  person2 = new Person(name1, age1, occupation1);
  
  document.getElementById("person").innerHTML = "Name: "+ person2.name + ", age: " + person2.age + ", occupation: " + person2.occupation;
    
 document.getElementById("changes").innerHTML = "Change the values and click \"Submit/Edit\" to apply changes to the object!";
}


    
    
    









