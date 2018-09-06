var mode = "planet";

var gravity = 0.4;
var yVelocity = 0;
var xVelocity = 0;
var magnetAccel = 0.001;
var damper = 0.02;


var xPos = 0;
var yPos = 0;

var anvilX = document.getElementById("anvil");
var anvilY = document.getElementById("anvil");

anvilX.style.left = "200px";
anvilY.style.top =  "200px";

var anvilPosX;
var anvilPosY;
var xDiffer;
var yDiffer;



function mousePosition(event){
	
	xPos = event.clientX;
	yPos = event.clientY;
	
	document.getElementById("para").innerHTML = xPos + " , " + yPos;
		
}


onload = function() {
	setInterval(attract, 16);
	
}

function weirdSmoothingFunction(){
	
	anvilPosY = anvilPosY + yVelocity; anvilPosY = anvilPosY + yVelocity;
	anvilPosX = anvilPosX + xVelocity; anvilPosX = anvilPosX + xVelocity;anvilPosY = anvilPosY + yVelocity; anvilPosY = anvilPosY + yVelocity;
	anvilPosX = anvilPosX + xVelocity; anvilPosX = anvilPosX + xVelocity;anvilPosY = anvilPosY + yVelocity; anvilPosY = anvilPosY + yVelocity;
	anvilPosX = anvilPosX + xVelocity; anvilPosX = anvilPosX + xVelocity;anvilPosY = anvilPosY + yVelocity; anvilPosY = anvilPosY + yVelocity;
	anvilPosX = anvilPosX + xVelocity; anvilPosX = anvilPosX + xVelocity;anvilPosY = anvilPosY + yVelocity; anvilPosY = anvilPosY + yVelocity;
	anvilPosX = anvilPosX + xVelocity; anvilPosX = anvilPosX + xVelocity;anvilPosY = anvilPosY + yVelocity; anvilPosY = anvilPosY + yVelocity;
	anvilPosX = anvilPosX + xVelocity; anvilPosX = anvilPosX + xVelocity;
	
}


function drawSpring(){

	document.getElementById("butt1").style.top = yPos + (1/8)*yDiffer + "px";
	document.getElementById("butt1").style.left = xPos + (1/8)*xDiffer + "px";
	
	document.getElementById("butt2").style.top = yPos + (2/8)*yDiffer + "px";
	document.getElementById("butt2").style.left = xPos + (2/8)*xDiffer + "px";
	
	document.getElementById("butt3").style.top = yPos + (3/8)*yDiffer + "px";
	document.getElementById("butt3").style.left = xPos + (3/8)*xDiffer + "px";
	
	document.getElementById("butt4").style.top = yPos + (4/8)*yDiffer + "px";
	document.getElementById("butt4").style.left = xPos + (4/8)*xDiffer + "px";

	document.getElementById("butt5").style.top = yPos + (5/8)*yDiffer + "px";
	document.getElementById("butt5").style.left = xPos + (5/8)*xDiffer + "px";

	document.getElementById("butt6").style.top = yPos + (6/8)*yDiffer + "px";
	document.getElementById("butt6").style.left = xPos + (6/8)*xDiffer + "px";
	
	document.getElementById("butt7").style.top = yPos + (7/8)*yDiffer + "px";
	document.getElementById("butt7").style.left = xPos + (7/8)*xDiffer + "px";


}

function planetMode(){
	
	xAcceleration = (xAcceleration/(Math.sqrt(yAcceleration**2+xAcceleration**2)));
	yAcceleration = (yAcceleration/(Math.sqrt(yAcceleration**2+xAcceleration**2)));
	magnetAccel = 0.01;
	gravity = 0;
	damper = 0.001;
}


function attract(){
	
	document.getElementById("magnetPic").hidden = false;
	
	 anvilPosX = parseInt(anvilX.style.left.substring(0, anvilX.style.left.length-2));
	 anvilPosY = parseInt(anvilY.style.top.substring(0, anvilY.style.top.length-2))
	

	 xDiffer = anvilPosX - xPos;
	 yDiffer = anvilPosY - yPos;
	
	yVelocity = yVelocity + gravity;
	
	//for some reason makes a difference?
	weirdSmoothingFunction();
	
	
	var yAcceleration = Math.abs(yDiffer);
	var xAcceleration = Math.abs(xDiffer);
	
	if(mode == "spring"){
		
	
	drawSpring();
		
	}
	

	xAcceleration = (xAcceleration/(Math.sqrt(yAcceleration**2+xAcceleration**2)));
	yAcceleration = (yAcceleration/(Math.sqrt(yAcceleration**2+xAcceleration**2)));
	magnetAccel = 0.01;
	gravity = 0;
	damper = 0.001;
		
	
	
	if(anvilPosY> 1500){
		anvilPosY = 0;
		anvilPosX = 200; 
		yVelocity = 0;
		xVelocity = 0;
	}
	
	

	if (yDiffer > 0) {
		yVelocity = yVelocity - magnetAccel * yAcceleration - yVelocity*damper;
		anvilPosY = anvilPosY + yVelocity;		
	}
	
	if (yDiffer < 0) {
		yVelocity = yVelocity + magnetAccel * yAcceleration - yVelocity*damper;
		anvilPosY = anvilPosY + yVelocity;		
	}
	
	if (xDiffer < 0){
		xVelocity = xVelocity + magnetAccel * xAcceleration - xVelocity*damper;
		anvilPosX = anvilPosX + xVelocity;
	}
	
	
	if (xDiffer > 0) {
		xVelocity = xVelocity - magnetAccel * xAcceleration - xVelocity*damper;
		anvilPosX = anvilPosX + xVelocity;
	}
	

	var changeX =  anvilPosX + "px";
	var changeY =  anvilPosY + "px";
	
	
	document.getElementById("anvil").style.left = changeX;
	document.getElementById("anvil").style.top = changeY;
	
		
	document.getElementById("magnetPic").style.left = xPos + "px";
	document.getElementById("magnetPic").style.top = yPos + "px";
	
	
	

}

