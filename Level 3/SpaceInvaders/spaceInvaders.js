var gunPosX = 300;
var gunPosY = 300;

var shipMoveSpeed = 5;
var bulletMoveSpeed = 10;

var ship = document.getElementById("ship");
var bullet = document.getElementById("bullet");
var enemy = document.getElementById("enemy");

var bulletPosY = gunPosY - 30;

ship.style.top = gunPosY + "px";
ship.style.left = gunPosX + "px";

enemy.style.top = "0px";
enemy.style.left = "200px";

var enemyX = 0;
var enemyY = 0;
	
var bulletX = 300;
var bulletY = bulletPosY;

var direction = "right";
var increment = 0;


onkeypress = function keyReader() {
	
	if(event.keyCode == 97){	
		gunPosX = gunPosX - shipMoveSpeed;	
	}
	
	if(event.key == 'd'){	
		gunPosX = gunPosX + shipMoveSpeed; 		
	}
	
	if(event.keyCode == 32){
		createBullet();
	}
	
	ship.style.left = gunPosX + "px";	
}

function enemyMove() {

	if(direction == "right"){

		increment = increment + 5;
		
		enemy.style.left = increment + "px";
			
			if(increment > 300){
				direction = "fish";
			}
		
	}
	
	else {
		
		increment = increment - 5;
		
		enemy.style.left = increment + "px";
		
			if(increment == 0) {
				direction = "right";
			}	
	}
		
	
}

function collision() {
	
	enemyX = parseInt(enemy.style.left.substring(0, enemy.style.left.length-2));
	enemyY = parseInt(enemy.style.top.substring(0, enemy.style.top.length-2));
	
	bulletX = parseInt(bullet.style.left.substring(0, bullet.style.left.length-2));
	bulletY = bulletPosY;
	
	if(Math.abs(enemyX - bulletX) < 50 && Math.abs(enemyY - bulletY) < 50) {
		
		enemy.hidden = true;
		
	}
	
}


function bulletMove(){
		
		collision();
	
		bulletPosY = bulletPosY - bulletMoveSpeed;	
		bullet.style.top = bulletPosY + "px";
//		console.log(enemyX, enemyY, bulletX, bulletY);
		
		if(bullet.style.top == "0px"){	
			bullet.hidden = true;
			bulletPosY = gunPosY - 30;
		}
	}
		

function createBullet(){
	
		
		bullet.style.left = gunPosX + 20 + "px";
		bullet.style.top = gunPosY - 30 + "px";
		bullet.hidden = false;
		bulletPosY = gunPosY - 30;	
}


var x = function game() {
	
	enemyMove();
	
	if(bullet.hidden == false) {
		bulletMove();
	}
		
//	console.log(enemy.style.left);
}


onload	= function()	{
	window.setInterval(x, 5);
}





//space is key code 32