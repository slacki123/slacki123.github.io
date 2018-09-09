var mode = "planet";

//document.body.requestPointerLock();

var attractor = document.getElementById("magnetPic");
var attracted = document.getElementById("anvil");

var gravity = 0.0;

var magnetAccel = 0.0;
var damper = 0.0;


var xPos = 0;
var yPos = 0;

var anvilX = document.getElementById("anvil");
var anvilY = document.getElementById("anvil");

anvilX.style.left = "200px";
anvilY.style.top =  "200px";

var anvilPosX = 200.0;
var anvilPosY = 200.0;
var xDiffer = 1.0;
var yDiffer = 1.0;


var yVelocity = 0.0;
var xVelocity = 0.0;

var xAcceleration = 0.0;
var yAcceleration = 0.0;

var yTempFloat = 200.0;
var xTempFloat = 200.0;


var radius = Math.sqrt(xDiffer ** 2 + yDiffer ** 2);

var xDir = 1.0;
var yDir = 1.0;

var attractorSize = 50;



function mousePosition(event){
	
	xPos = parseFloat(event.clientX);
	yPos = parseFloat(event.clientY);
		
}


onload = function() {
	setInterval(attract, 5);
	
}

//function weirdSmoothingFunction(){
	
//	anvilPosY = anvilPosY + yVelocity; anvilPosY = anvilPosY + yVelocity;
//	anvilPosX = anvilPosX + xVelocity; anvilPosX = anvilPosX + xVelocity;anvilPosY = anvilPosY + yVelocity; anvilPosY = anvilPosY + yVelocity;
//	anvilPosX = anvilPosX + xVelocity; anvilPosX = anvilPosX + xVelocity;anvilPosY = anvilPosY + yVelocity; anvilPosY = anvilPosY + yVelocity;
//	anvilPosX = anvilPosX + xVelocity; anvilPosX = anvilPosX + xVelocity;anvilPosY = anvilPosY + yVelocity; anvilPosY = anvilPosY + yVelocity;
//	anvilPosX = anvilPosX + xVelocity; anvilPosX = anvilPosX + xVelocity;anvilPosY = anvilPosY + yVelocity; anvilPosY = anvilPosY + yVelocity;
//	anvilPosX = anvilPosX + xVelocity; anvilPosX = anvilPosX + xVelocity;anvilPosY = anvilPosY + yVelocity; anvilPosY = anvilPosY + yVelocity;
//	anvilPosX = anvilPosX + xVelocity; anvilPosX = anvilPosX + xVelocity;
	
//}

function drawSpring() {
  
      document.getElementById("butt1").style.top = yPos - (1/ 8) * yDiffer + "px";
      document.getElementById("butt1").style.left = xPos - (1 / 8) * xDiffer + "px";

	document.getElementById("butt2").style.top = yPos - (2/8)*yDiffer + "px";
	document.getElementById("butt2").style.left = xPos - (2/8)*xDiffer + "px";
	
	document.getElementById("butt3").style.top = yPos - (3/8)*yDiffer + "px";
	document.getElementById("butt3").style.left = xPos - (3/8)*xDiffer + "px";
	
	document.getElementById("butt4").style.top = yPos -(4/8)*yDiffer + "px";
	document.getElementById("butt4").style.left = xPos - (4/8)*xDiffer + "px";

	document.getElementById("butt5").style.top = yPos - (5/8)*yDiffer + "px";
	document.getElementById("butt5").style.left = xPos - (5/8)*xDiffer + "px";

	document.getElementById("butt6").style.top = yPos - (6/8)*yDiffer + "px";
	document.getElementById("butt6").style.left = xPos - (6/8)*xDiffer + "px";
	
	document.getElementById("butt7").style.top = yPos - (7/8)*yDiffer + "px";
	document.getElementById("butt7").style.left = xPos - (7/8)*xDiffer + "px";


}

function springMode() {
    mode = "spring";
    document.getElementById("magnetPic").src = "magnet.png";
    document.getElementById("anvil").src = "anvil.jpeg";
    xAcceleration = xDiffer;
    yAcceleration = yDiffer;
    magnetAccel = 0.001;
    gravity = 0.3;
    damper = 0.005;
    attractorSize = 0;
    document.getElementById("anvil").style.width = "50px";
    //comment
}

function planetMode() {
    mode = "planet";
    document.getElementById("magnetPic").src = "planet.jpeg";
    document.getElementById("anvil").src = "moon.jpeg";
    

    attractorSize = 37;
    document.getElementById("anvil").style.width = "25px";
    xAcceleration = (xDiffer) / radius ** 3;
    yAcceleration = (yDiffer) / radius ** 3;
    magnetAccel = 200;
    gravity = 0;
    damper = 0;
}

function debug() {

    this.debug = function () {
        console.log("accel: " + xAcceleration, yAcceleration);
        console.log("mouse ", xPos, yPos);
        console.log("radius", radius);
        console.log("anvil: ", anvilPosX, anvilPosY);
        console.log("velo: " + yVelocity, xVelocity);
        console.log("Dir ", yDir, xDir);
    }
}



function attract() {

  
	
	document.getElementById("magnetPic").hidden = false;
	
	anvilPosX = parseInt(anvilX.style.left.substring(0, anvilX.style.left.length-2));
    anvilPosY = parseInt(anvilY.style.top.substring(0, anvilY.style.top.length - 2));
	

	xDiffer = xPos - anvilPosX;
    yDiffer = yPos - anvilPosY;

    if (xDiffer !== 0 || yDiffer !== 0) {
        radius = Math.sqrt(xDiffer ** 2 + yDiffer ** 2);
    }
 
    (xDiffer >= 0) ? xDir = 1 : xDir = -1;
    (yDiffer >= 0) ? yDir = 1 : yDir = -1;

    //if (xDiffer !== 0 && yDiffer !== 0) {
    //    xDir = xDiffer / Math.abs(xDiffer);
    //    yDir = yDiffer / Math.abs(yDiffer);
    //}
	
	if(mode === "spring"){	
        springMode();
	    drawSpring();	
	}
   
    else if (mode === "planet") {
        planetMode();
    }

    yVelocity = yVelocity + magnetAccel * yAcceleration - yVelocity * damper;
    yVelocity = yVelocity + gravity;
    yTempFloat = yTempFloat + yVelocity;
    anvilPosY = yTempFloat;		

    xVelocity = xVelocity + magnetAccel * xAcceleration - xVelocity * damper;
    xTempFloat = xTempFloat + xVelocity;
    anvilPosX = xTempFloat;

    (radius >= 0 && radius < attractorSize) ? yVelocity = 0 : yVelocity = yVelocity;
    (radius >= 0 && radius < attractorSize) ? xVelocity = 0 : xVelocity = xVelocity;
    (radius >= 0 && radius < attractorSize) ? attracted.hidden = true : attracted.hidden = false;
 

    document.getElementById("anvil").style.left = anvilPosX + "px";
    document.getElementById("anvil").style.top = anvilPosY + "px";
	
	document.getElementById("magnetPic").style.left = xPos -12 + "px";
    document.getElementById("magnetPic").style.top = yPos -12 + "px";

    //debug();

    console.log(radius);
	
	

}

