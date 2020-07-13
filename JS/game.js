
//************* Globale Variablen (Config) ***************//
//Window
var canvas, ctx;
var gameWidth = 1200;
var gameHeight = 700;

//character
var charX = 60;
var charY = 150;
var charWidth = 120;
var	charHeight = 120;

//move Options
var ground = charY;
var jumpHigh = 250;		//high from the ground
var jumpSpeed = 10;		//lower = faster
var jumping;			//jumping Intervall ID
var goingDown = false;		

//************* Initialierung ******************//
function init(){
	console.log("init called");
	canvas = document.getElementById("mycanvas");
	canvas.style.border = "1px solid grey";
	ctx = canvas.getContext("2d");

	player = document.getElementById("char");
	setInterval(draw, 40);

}

function draw(){
	ctx.clearRect(0,0,gameWidth,gameHeight)
	drawRect(0,gameHeight*0.8,gameWidth,gameHeight*0.2, "green")   					//floor
	drawRect(0,0,gameWidth,gameHeight*0.8, "lightblue")	       					//Background
	ctx.drawImage(player, gameHeight*0.8-charX,gameWidth*0.5-charY, charWidth, charHeight);		//character Image
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

console.log('charY: ' + charY + ' ground: ' + ground + ' ' + goingDown);
}

function goLeft(){
	charX += 10
}

function goRight(){
	charX -= 10
}

//************** Event Functions *************//
function keyDown(event){
	switch (event.keyCode) {
	  case 37:
	    // Left-Arrow Pressed
	    goLeft();
	    break;
	  case 38:
	    // Up-Arrow Pressed
	    if(charY == ground) jumping = setInterval(jump, jumpSpeed)
	    break;
	  case 39:
	    // Right-Arrow Pressed
	    goRight();
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
