var gravity = 0.5;
var yVelocity = 0;
var xVelocity = 0;
var magnetAccel = 0.001;
var damper = 0.01;


var xPos = 0;
var yPos = 0;

var anvilX = document.getElementById("anvil");
var anvilY = document.getElementById("anvil");

anvilX.style.left = "200px";
anvilY.style.top =  "200px";




function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve , ms));
}

//await sleep(time..)


function mousePosition(event){
	
	xPos = event.clientX;
	yPos = event.clientY;
	
	document.getElementById("para").innerHTML = xPos + " , " + yPos;
		
}


setInterval(attract, 10);


function attract(){
	
	document.getElementById("magnetPic").hidden = false;
	
	var anvilPosX = parseInt(anvilX.style.left.substring(0, anvilX.style.left.length-2));
	var anvilPosY = parseInt(anvilY.style.top.substring(0, anvilY.style.top.length-2))
	

	var xDiffer = anvilPosX - xPos;
	var yDiffer = anvilPosY - yPos;
	
//	gravity = 0;
	
	yVelocity = yVelocity + gravity;
	
	//for some reason the thing below makes a difference. Does it just smoothen things?
	anvilPosY = anvilPosY + yVelocity;
	anvilPosX = anvilPosX + xVelocity;
	
//	console.log(yVelocity);
	
	//slinglike
	var yAcceleration = Math.abs(yDiffer)
	var xAcceleration = Math.abs(xDiffer)
	
//	//planetLike
//	yAcceleration = Math.abs(1/(yDiffer+xDiffer))
//	xAcceleration = Math.abs(1/(yDiffer+xDiffer))
//	
	if(anvilPosY> 1500){
		anvilPosY = 0;
		anvilPosX = 200; 
		yVelocity = 0;
		xVelocity = 0;
	}
	
	

	if (yDiffer > 0) {
		yVelocity = yVelocity - magnetAccel* yAcceleration -yVelocity*damper;
		anvilPosY = anvilPosY + yVelocity;
		
	}
	
	if (yDiffer < 0) {
		yVelocity = yVelocity + magnetAccel*yAcceleration-yVelocity*damper;
		anvilPosY = anvilPosY + yVelocity;
		
	}
	
	if (xDiffer < 0){
		xVelocity = xVelocity + magnetAccel*xAcceleration-xVelocity*damper ;
		anvilPosX = anvilPosX + xVelocity;
	}
	
	
	if (xDiffer > 0) {
		xVelocity = xVelocity - magnetAccel*xAcceleration -xVelocity*damper;
		anvilPosX = anvilPosX + xVelocity;
	}
	
//	console.log(anvilPosY);
	
	/* MIND
	
	1/xDiffer is like planets
	xDiffer is like being attached to a sling
	
	should have had x and y for accelleration too
	
	*/
		
	
	

	var changeX =  anvilPosX + "px";
	var changeY =  anvilPosY + "px";
	
	
	document.getElementById("anvil").style.left = changeX;
	document.getElementById("anvil").style.top = changeY;
	
		
	document.getElementById("magnetPic").style.left = xPos + "px";
	document.getElementById("magnetPic").style.top = yPos + "px";
	
//	document.getElementById("butt").style.top = xDiffer/2 + "px";
//	console.log(document.getElementById("butt").style.top);


	

	
	
}

