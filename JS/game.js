//************* Globale Variablen (Config) ***************//
//Window
var canvas, ctx;
var gameWidth = 1200;
var gameHeight = 700;

//character
var charX = 120;
var charY = 130;
var charWidth = 160;
var	charHeight = 160;

var charPictureIds = ['char1', 'char2'];
var currentPictureIdx = 0;
var movementspeed = 250;

//move Options
var ground = charY;		//save the null point of the ground
var jumpHigh = 250;		//high from the ground
var jumpSpeed = 15;		//lower = faster
var jumping;			//jumping Intervall ID
var goingDown = false;		

//************* Initialierung ******************//
function init(){
	console.log("init called");
	canvas = document.getElementById("mycanvas");
	canvas.style.border = "1px solid grey";
	ctx = canvas.getContext("2d");

	setInterval(draw, 40);
	setInterval(changePlayerPicture, movementspeed);
}

function draw(){
	ctx.clearRect(0,0,gameWidth,gameHeight)
	var floor = drawRect(0,gameHeight*0.8,gameWidth,gameHeight*0.2, "green")   					//floor
	drawRect(0,0,gameWidth,gameHeight*0.8, "lightblue")	       									//Background
	ctx.drawImage(player, gameWidth*0.5-(charX/2),gameHeight*0.8-charY, charWidth, charHeight);		//character Image
	ctx.drawImage()
}

//*************** Functions ******************//
function drawRect(rx, ry, rw, rh, rstyle = "#0000FF"){
	ctx.fillStyle = rstyle
	ctx.fillRect(rx, ry, rw, rh);
}

function jump(){
	if(charY < jumpHigh && !goingDown){
		charY += 6
	}else {
		goingDown = true;
		if(charY == ground){
			goingDown = false;
			clearInterval(jumping);
		}else{
			charY -= 6
		}
	}
}

function changePlayerPicture(){
	
	if(charPictureIds[currentPictureIdx] == charPictureIds[charPictureIds.length - 1]){
		currentPictureIdx = 0;
	}else{
		currentPictureIdx++;
	}
	player = document.getElementById(charPictureIds[currentPictureIdx]);
	console.log(charPictureIds[currentPictureIdx]);
}

/*function goLeft(){
	charX += 10
}

function goRight(){
	charX -= 10
}*/

//************** Event Functions *************//
//Key-Events: Every key has one keyCode. 
//Find Out KeyCode Here  ->  https://keycode.info

function keyDown(event){
	switch (event.keyCode) {
	  case 37:
	    // Left-Arrow Pressed
	    //goLeft();
	    break;
	  case 38:
	    // Up-Arrow Pressed
	    if(charY == ground) jumping = setInterval(jump, jumpSpeed)
	    break;
	  case 39:
	    // Right-Arrow Pressed
	    //goRight();
	    break;
	  case 40:
	    // Down-Arrow Pressed
	    break;
	  default:
	    //otherKey Pressed
	    break;
	}
}

//Event Listener
document.addEventListener("keydown", keyDown, false);
document.addEventListener("DOMContentLoaded", init, false);
