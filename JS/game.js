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
var isGoing = false;																//Tells whether the player is going or not


//obstacles
class Obstacle {
	constructor(x,y = ground,width,height,type) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.type = type;
	}

	update() {
		this.x -= 5																	//movement of obstacle when player goes to right
	}

}
var obstacles = [];

//************* Initialierung ******************//
function init(){
	console.log("init called");
	canvas = document.getElementById("mycanvas");
	canvas.style.border = "1px solid grey";
	ctx = canvas.getContext("2d");

	setInterval(draw, 40);
	changePlayerPicture()

	var box1 = new Obstacle(gameWidth - 100,gameHeight*0.8 - 100, 100,100,"box")				//demo obstacle
	var box2 = new Obstacle(gameWidth + 200,gameHeight*0.8 - 80, 80,80,"box")				//demo obstacle
	var box3 = new Obstacle(gameWidth + 500,gameHeight*0.8 - 200, 100,200,"box")				//demo obstacle
	var box4 = new Obstacle(gameWidth + 800,gameHeight*0.8 - 150, 150,150,"box")				//demo obstacle

	obstacles.push(box1)
	obstacles.push(box2)
	obstacles.push(box3)
	obstacles.push(box4)
	//setInterval(changePlayerPicture, movementSpeed);
	//setInterval(moveBackground, backgroundMoveSpeed);
	
}

function draw(){
	ctx.clearRect(0,0,gameWidth,gameHeight)
	var floor = drawRect(0,gameHeight*0.8,gameWidth,gameHeight*0.2, "green")   						//floor
	background = document.getElementById("background");
	ctx.drawImage(background,backgroundX,0,backgroundWidth,gameHeight*0.8); 						//Background
	ctx.drawImage(player, gameWidth*0.5-(charX/2),gameHeight*0.8-charY, charWidth, charHeight);		//character Image
	drawObstacles()
}

//*************** Functions ******************//
function drawRect(rx, ry, rw, rh, rstyle = "#0000FF"){
	ctx.fillStyle = rstyle;
	ctx.fillRect(rx, ry, rw, rh);
}

function drawObstacles() {
	
	for (index = 0; index < obstacles.length; index++) {
		var obstacle = obstacles[index];
		var colors = ["red", "green", "blue", "yellow", "orange"]
		drawRect(obstacle.x,obstacle.y,obstacle.width,obstacle.height, colors[Math.floor(Math.random() * colors.length)]);
	}

}

function updateObstacles() {
	for (index = 0; index < obstacles.length; index++) {
		var obstacle = obstacles[index]
		obstacle.update()
	}
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
		backgroundX-=5;
	}else{
		backgroundX = 0;
	}
}

function changePlayerPicture(){
	
	//Movement: Stay
	if (isGoing == false) {
		currentPictureIdx = 0;
	}
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
*/
function goRight(){
	console.log("Right Key pressed")
	isGoing = true
	//charX -= 10
	moveBackground()
	changePlayerPicture()
	updateObstacles()
}

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

function keyUp(event){
console.log("Key is up")	
	isGoing = false
	changePlayerPicture()
}

//Event Listener
document.addEventListener("keydown", keyDown, false); //Not the down arrow(Pfeil unten), but just the "slot" that ANY key was pressed
document.addEventListener("keyup", keyUp, false); //Not the up arrow(Pfeil oben), but just the "slot" that ANY key was released
document.addEventListener("DOMContentLoaded", init, false);
