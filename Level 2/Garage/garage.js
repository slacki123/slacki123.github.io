'use strict';

var cars = [{name:"Mazda", year:"1994", mileage:"340000"}, 
            {name:"Ford", year:"2000", mileage:"100"}, 
            {name:"Vauxhall", year:"2000", mileage:"10000", faults:"Has no engine"}];

var carsIn = [];
var carsOut = [];

var currentCar;


function checkIn(){

if(carsIn.includes(currentCar)){
    document.getElementById("para").innerHTML = "You have already checked in this car";
}
    
else{
carsIn.push(currentCar);
console.log(currentCar.name);
document.getElementById("para").innerHTML = "The car " + currentCar.name + " has been checked in";
    
}
        
}

function checkOut() {


carsOut.push(currentCar);

if(carsIn.includes(currentCar)){
    
var index = carsIn.indexOf(currentCar);
carsIn.splice(index,1);
document.getElementById("para").innerHTML = "The car " + currentCar.name + " has been checked out";
    
}
    else{
         document.getElementById("para").innerHTML = "The car has already been checked out";
    }
        
}


function printContents(){


       
   var car;
   var output;
    
   document.getElementById("para").innerHTML = "";

   for(var i = 0; i < carsIn.length; i++){
       car = carsIn[i];
       output = car.name + ", " + car.year + "</br>";
       document.getElementById("para").innerHTML += output;
   }
    
   if (carsIn.length == 0){
       document.getElementById("para").innerHTML = "There are no cars in the garage";
       
   }
 
}


function findCar(){
    
    var input = document.getElementById("inputField").value;
    
    var target = cars.filter(a => Object.values(a).find(b => b.toLowerCase()===input.toLowerCase()));
    
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

function calculateBill(){
      
    if(currentCar){
    
    var miles = currentCar.mileage;
    var year = currentCar.year;
        
    var price = (0.01*year**2)/(miles) +1000;
        price = price.toFixed(2);
        
    document.getElementById("bill").innerHTML = "The " + currentCar.name + " car costs &pound" + price;
    }
    
    else {
        document.getElementById("bill").innerHTML = "No car has been selected to calculate";
    }
    
}

window.onload = function() {
  document.getElementById("inputField").focus();
};



