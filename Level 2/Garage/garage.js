'use strict';

var cars = [{name:"Mazda", year:"1994"}, {name:"Ford", year:"2000"}, {name:"Vauxhall", year:"2000", faults:"Has no engine"}];
var carsIn = [];
var carsOut = [];

var currentCar;


function checkIn(){
    
carsIn.push(currentCar);
console.log(currentCar.name);
        
}

function checkOut() {


carsOut.push(currentCar);

if(carsIn.includes(currentCar)){
    
var index = carsIn.indexOf(currentCar);
carsIn.splice(index,1);
    
}
    else{
         document.getElementById("car").innerHTML = "Car doesn't exist";
    }
        
}


function printContents(){
   var car;
   var output;
    
    document.getElementById("para").innerHTML = "";

   for(var i = 0; i<carsIn.length; i++){
       car = carsIn[i];
       output = car.name + ", " + car.year + "</br>";
       document.getElementById("para").innerHTML += output;
   }
   
}


function findCar(){
    
    var input = document.getElementById("inputField").value;
    
    var target = cars.filter(a => Object.values(a).find(b => b.toLowerCase()===input.toLowerCase()));
    

  
//   target = JSON.stringify(target);
    
    console.log(target.length);
    
    target = target[0];
    
    if(target==undefined){
        
        document.getElementById("car").innerHTML = "Car doesn't exist";
        
            }
    else{
        
        var faults = ", faults: " + target.faults;
        
        if(target.faults==undefined){
            faults = "";
        }
        
        document.getElementById("car").innerHTML = target.name.toUpperCase() + ", year: " + target.year + faults;
        currentCar = target;
        
     }
    
}

