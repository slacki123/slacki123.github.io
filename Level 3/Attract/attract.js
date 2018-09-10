var mode = "planet";



//document.body.requestPointerLock();

var attractor = document.getElementById("magnetPic");
var attracted = document.getElementById("anvil");

var attractorHeight;
var attractorWidth;

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
	
	xPos = parseFloat(event.clientX - 20);
	yPos = parseFloat(event.clientY - 50);
		
}


onload = function() {
	setInterval(attract, 5);
	
}
var increment = 0;
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
    document.getElementById("butt7").style.left = xPos - (7 / 8) * xDiffer + "px";

    document.getElementById("butt8").style.top = yPos  + "px";
    document.getElementById("butt8").style.left = xPos + "px";

}

function springMode() {
    document.getElementById("planetMode").hidden = true;

    document.getElementById("springMode").hidden = false;
    document.getElementById("dots").hidden = false;

    document.getElementById("magnetPic").hidden = true;


    mode = "spring";
    document.getElementById("magnetPic").src = "magnet.png";
    document.getElementById("anvil").src = "anvil.jpeg";
    xAcceleration = xDiffer;
    yAcceleration = yDiffer;

    magnetAccel = parseFloat(document.getElementById("elasticity").value);
    gravity = parseFloat(document.getElementById("springGravity").value);
    damper = parseFloat(document.getElementById("damping").value);

    attractorSize = 0;
    document.getElementById("anvil").style.width = "50px";
    //comment
}

function planetMode() {
    mode = "planet";
    document.getElementById("magnetPic").src = "planet.jpeg";
    document.getElementById("anvil").src = "moon.jpeg";

    document.getElementById("springMode").hidden = true;
    document.getElementById("dots").hidden = true;

    document.getElementById("planetMode").hidden = false;
   
    attractorSize = document.getElementById("attractorSize").value;

    //height and width (diameter) is 2*radius - diameter of the moon
    attractorHeight = 2*attractorSize - 25;
    attractorWidth = 2*attractorSize - 25;

    document.getElementById("magnetPic").style.height = attractorHeight + "px";
    document.getElementById("magnetPic").style.width = attractorWidth + "px";

    document.getElementById("anvil").style.width = "25px";
    xAcceleration = (xDiffer) / radius ** 3;
    yAcceleration = (yDiffer) / radius ** 3;
    magnetAccel = parseFloat(document.getElementById("pull").value);
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
	
	anvilPosX = parseFloat(anvilX.style.left.substring(0, anvilX.style.left.length-2));
    anvilPosY = parseFloat(anvilY.style.top.substring(0, anvilY.style.top.length - 2));
	

	xDiffer = xPos - anvilPosX;
    yDiffer = yPos - anvilPosY;

    radius = Math.sqrt(xDiffer ** 2 + yDiffer ** 2);
	
	if(mode === "spring"){	
        springMode();
	    drawSpring();	
	}
   
    else if (mode === "planet") {
        planetMode();
    }

    yVelocity = yVelocity + magnetAccel * yAcceleration - yVelocity * damper;
    yVelocity = yVelocity + gravity;

    xVelocity = xVelocity + magnetAccel * xAcceleration - xVelocity * damper;

    void ((radius >= 0 && radius < attractorSize) && (yVelocity = 0));
    void ((radius >= 0 && radius < attractorSize) && (xVelocity = 0));

    (radius >= 0 && radius < attractorSize) ? attracted.hidden = true : attracted.hidden = false;

    yTempFloat = yTempFloat + yVelocity;
    xTempFloat = xTempFloat + xVelocity;

    //if the below makes no sense, use 12 instead
    //var attractorOffset = parseFloat(document.getElementById("anvil").style.width.substring(0, document.getElementById("anvil").style.width.length - 2));

    document.getElementById("anvil").style.left = xTempFloat + "px";
    document.getElementById("anvil").style.top = yTempFloat + "px";

    //difference in position from cursor is attractor diameter - radius
	
	document.getElementById("magnetPic").style.left = xPos - (attractorWidth - attractorSize) + "px";
    document.getElementById("magnetPic").style.top = yPos - (attractorHeight - attractorSize) + "px";

    //debug();

    console.log(radius);
	
	

}

