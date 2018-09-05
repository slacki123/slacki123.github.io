
var yPos;
var xPos;
var rand;
var rand2;


function showCoords(event) {
	
	yPos = event.clientY;
	xPos = event.clientX;
	
//	document.getElementById("para").innerHTML = xPos + " , " + yPos;
	
	
}

function moveAway() {
	
	rand = Math.floor((Math.random() * 100) );
	rand2 = Math.floor((Math.random() * 200) + 1)
	
	document.getElementById("noButton").style.left = eval(xPos + rand) + "px" ;
	document.getElementById("noButton").style.top = eval(yPos + rand) + "px";
	
	if((xPos + rand > 350)){
		
	document.getElementById("noButton").style.left = rand2 + "px" ;
	document.getElementById("noButton").style.top = rand2 + "px";
	
		
	}
	
}

