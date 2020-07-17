//************* Globale Variablen (Config) ***************//
//Window
var canvas, ctx;
var gameWidth = 1200;
var gameHeight = 700;

//Background
var background;
var backgroundWidth = 2826;																//Full lenght of the Background Image
var backgroundX = 0;																	//Current X-point from the top left corner of the image
var backgroundMoveSpeed = 30;															//lower = faster

//character											
var charX = 130;																	//X-Point of character
var charY = 130;																	//Y-Point of character
var charWidth = 130;																//width of character image
var	charHeight = 130;																//height of character image

var charPictureIds = ['char1', 'char2', 'char3', 'char4', 'char5', 'char6', 
					  'char7', 'char8', 'char9', 'char10', 'char11', 'char12', 
					  'char13', 'char14', 'char15', 'char16', 'char17', 'char18', 
					  'char19', 'char20'];											//Array of all Player-pictures for Movement which are listed in HTML-Image-Section
var currentPictureIdx = 0;															//current Displayed PlayerPicture Index of charPictureIds-Array
var movementSpeed = 40;					    										//speed of how often an image changes (lower = faster)	

//move Option	
var ground = charY;																	//save the null point of the ground
var jumpHigh = 250;																	//high from the ground
var jumpSpeed = 15;																	//lower = faster
var jumping;							  											//jumping Intervall ID
var goingDown = false;		

//************* Initialierung ******************//
function init(){
	console.log("init called");
	canvas = document.getElementById("mycanvas");
	canvas.style.border = "1px solid grey";
	ctx = canvas.getContext("2d");

	setInterval(draw, 40);
	setInterval(changePlayerPicture, movementSpeed);
	setInterval(moveBackground, backgroundMoveSpeed);
}

function draw(){
	ctx.clearRect(0,0,gameWidth,gameHeight)
	var floor = drawRect(0,gameHeight*0.8,gameWidth,gameHeight*0.2, "green")   						//floor
	background = document.getElementById("background");
	ctx.drawImage(background,backgroundX,0,backgroundWidth,gameHeight*0.8); 						//Background
	ctx.drawImage(player, gameWidth*0.5-(charX/2),gameHeight*0.8-charY, charWidth, charHeight);		//character Image
}

//*************** Functions ******************//
function drawRect(rx, ry, rw, rh, rstyle = "#0000FF"){
	ctx.fillStyle = rstyle
	ctx.fillRect(rx, ry, rw, rh);
}

function jump(){
	if(charY < jumpHigh && !goingDown){
		charY += 5
	}else {
		goingDown = true;
		if(charY == ground){
			goingDown = false;
			clearInterval(jumping);
		}else{
			charY -= 10
		}
	}
}

function moveBackground(){
	if(backgroundX > backgroundWidth*(-1)+gameWidth){
		backgroundX-=3;
	}else{
		backgroundX = 0;
	}
}

function changePlayerPicture(){
	
	//Movment: Run
	if(charPictureIds[currentPictureIdx] == charPictureIds[charPictureIds.length - 1]){
		currentPictureIdx = 0;
	}else{
		currentPictureIdx++;
	}
	player = document.getElementById(charPictureIds[currentPictureIdx]);

	//Movment: jump
	//...

	//Movment: duck
	//...
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
