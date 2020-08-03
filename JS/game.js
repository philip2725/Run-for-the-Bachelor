//************* Globale Variablen (Config) ***************//
//Window
var canvas, ctx;
var gameWidth = 1200;
var gameHeight = 700;

//Background
var background;
var backgroundWidth = 16358;																//Full lenght of the Background Image
var backgroundX = 0;																	//Current X-point from the top left corner of the image
var backgroundUpdateSpeed = 30;															//miliseconds how often the background will be updated
var backgroundMoveSpeed = 15;															//steps in pixel that backgound Move
var backgroundIntervalHandle;															//lower = faster

//character		
class Player {
	constructor() {
		var charWidth = 130;
		var charHeight = 130;
		this.charWidth = charWidth;																	//width of character image
		this.charHeight = charHeight;																	//height of character image
		this.charX = gameWidth*0.5-(charWidth/2);												//X-Point of character
		this.charY = gameHeight*0.88-charHeight;													//Y-Point of character
		this.charPictureIds = ['char1', 'char2', 'char3', 'char4', 'char5', 'char6', 
		'char7', 'char8', 'char9', 'char10', 'char11', 'char12', 
		'char13', 'char14', 'char15', 'char16', 'char17', 'char18', 
		'char19', 'char20'];																	//Array of all Player-pictures for Movement which are listed in HTML-Image-Section
		this.currentPictureIdx = 0;
		this.currentPictureIdx = 0;																//current Displayed PlayerPicture Index of charPictureIds-Array
		this.movementSpeed = 40;																	//speed of how often an image changes (lower = faster)	
		this.playerImg;																			//contains the currently used image-Element of the player
		this.playerIntervalHandle;  																//Event-Handle for clearing the Inervall if the player is standing											
		//move Option	
		this.ground = this.charY;																		//save the null point of the ground
		this.jumpHigh = 250;																		//high from the ground
		this.jumpSpeed = 10;																		//lower = faster
		this.jumping;							  												//jumping Intervall ID
		this.goingDown = false;																	//status of player currently going Down
		this.isGoing = false;																	//Tells whether the player is going or not

	}

	drawPlayer() {
		ctx.drawImage(this.playerImg, this.charX ,this.charY, this.charWidth, this.charHeight);
	}

	getTop() {
		//console.log(this.charY)
		return this.charY + this.charHeight;
	}
	getLeft() {
		return this.charX;
	}

	getRight() {
		return this.charX + this.charWidth;
	}

	getBottom() {
		return this.charY + this.charHeight;
	}

	detectCollision(obstacle) {
		if (this.getTop() > obstacle.getBottom() || this.getRight() < obstacle.getLeft() || this.getBottom() < obstacle.getTop() || this.getLeft() > obstacle.getRight()) {
			return false;
		}
		return true;
	}	

}

var player;																				// object of Class Player
// var charWidth = 130;																	//width of character image
// var	charHeight = 130;																	//height of character image
// var charX = gameWidth*0.5-(charWidth/2);												//X-Point of character
// var charY = gameHeight*0.8-charHeight;													//Y-Point of character

// var charPictureIds = ['char1', 'char2', 'char3', 'char4', 'char5', 'char6', 
// 					  'char7', 'char8', 'char9', 'char10', 'char11', 'char12', 
// 					  'char13', 'char14', 'char15', 'char16', 'char17', 'char18', 
// 					  'char19', 'char20'];												//Array of all Player-pictures for Movement which are listed in HTML-Image-Section
// var currentPictureIdx = 0;																//current Displayed PlayerPicture Index of charPictureIds-Array
// var movementSpeed = 40;																	//speed of how often an image changes (lower = faster)	
// var playerImg;																			//contains the currently used image-Element of the player
// var playerIntervalHandle;  																//Event-Handle for clearing the Inervall if the player is standing											

// //move Option	
// var ground = charY;																		//save the null point of the ground
// var jumpHigh = 250;																		//high from the ground
// var jumpSpeed = 10;																		//lower = faster
// var jumping;							  												//jumping Intervall ID
// var goingDown = false;																	//status of player currently going Down
// var isGoing = false;																	//Tells whether the player is going or not


//obstacles
class Obstacle {
	constructor(x,y = ground,width,height,type) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.type = type;
	}

	update(direcion) {
		console.log(direcion);
		this.x += direcion;																	//movement of obstacle when player goes to right
	}

	getTop() {
		return this.y;
	}

	getBottom() {
		return this.y + this.height;
	}

	getLeft() {
		return this.x;
	}

	getRight() {
		return this.x + this.width;
	}

}
var obstacles = [];
var obstaclesIntervalHandle;

//************* Initialierung ******************//
function init(){
	console.log("init called");
	canvas = document.getElementById("mycanvas");
	canvas.style.border = "2px solid black";
	ctx = canvas.getContext("2d");
	player = new Player()

	setInterval(draw, 40);
	changePlayerPicture()

	

	var box1 = new Obstacle(gameWidth - 100,gameHeight - 194, 100,100,"box")				//demo obstacle
	var box2 = new Obstacle(gameWidth + 200,gameHeight - 174, 80,80,"box")					//demo obstacle
	var box3 = new Obstacle(gameWidth + 500,gameHeight - 294, 100,200,"box")				//demo obstacle
	var box4 = new Obstacle(gameWidth + 800,gameHeight - 244, 150,150,"box")				//demo obstacle

	obstacles.push(box1)
	obstacles.push(box2)
	obstacles.push(box3)
	obstacles.push(box4)
	
}

function draw(){
	ctx.clearRect(0,0,gameWidth,gameHeight)
	//var floor = drawRect(0,gameHeight*0.8,gameWidth,gameHeight*0.2, "green")   						//floor
	background = document.getElementById("background");
	ctx.drawImage(background,backgroundX,0,backgroundWidth,gameHeight); 						//Background
	//ctx.drawImage(playerImg, charX ,charY, charWidth, charHeight);									//character Image
	player.drawPlayer()
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

function updateObstacles(direction) {
	for (index = 0; index < obstacles.length; index++) {
		var obstacle = obstacles[index]
		obstacle.update(direction)
	}
}

function checkCollision() {

	for (index = 0; index < obstacles.length; index++) {
		var obstacle = obstacles[index]
		if (player.detectCollision(obstacle)) {
			console.log("Collision detected")
		}
	}
	
}
function jump(){
	if(player.charY > player.jumpHigh && !player.goingDown){
		player.charY -= 6
		console.log(player.charY);
	}else {
		player.goingDown = true;
		if(player.charY == player.ground){
			player.goingDown = false;
			clearInterval(player.jumping);
		}else{
			player.charY += 12
		}
	}
}

function moveBackground(direction){
	//direction = negaitve --> go left
	//direction = positive --> go right
	
	var start = 0
	var end = backgroundWidth*(-1)+gameWidth

	if(backgroundX + direction > end && backgroundX + direction <= start){
		backgroundX += direction;
	}else{
	//	if(charX + direction + charWidth < gameWidth && charX > direction) charX += direction;
	}
}

function changePlayerPicture(){
	
	//Movement: Stay
	if (player.isGoing == false) {
		player.currentPictureIdx = 0;
	}
	//Movment: Run
	if(player.charPictureIds[player.currentPictureIdx] == player.charPictureIds[player.charPictureIds.length - 1]){
		player.currentPictureIdx = 0;
	}else{
		player.currentPictureIdx++;
	}
	player.playerImg = document.getElementById(player.charPictureIds[player.currentPictureIdx]);

	//Movment: jump
	//...

	//Movment: duck
	//...
}

function goLeft(){
	if(player.isGoing === false){
		console.log("Left Key pressed")
		player.isGoing = true;
		player.charX -= backgroundMoveSpeed;
		// console.log("PlayerXPosition:" + charX)
		checkCollision()
		playerIntervalHandle = setInterval(changePlayerPicture, player.movementSpeed);
		backgroundIntervalHandle = setInterval(function() { moveBackground(backgroundMoveSpeed); }, backgroundUpdateSpeed);
		obstaclesIntervalHandle = setInterval(function() { updateObstacles(backgroundMoveSpeed); }, backgroundUpdateSpeed);
	}
}

function goRight(){
	if(player.isGoing === false){
		console.log("Right Key pressed");
		player.isGoing = true;
		player.charX += backgroundMoveSpeed;
		// console.log("PlayerXPosition:" + charX)
		checkCollision()
		playerIntervalHandle = setInterval(changePlayerPicture, player.movementSpeed);
		backgroundIntervalHandle = setInterval(function() { moveBackground(-backgroundMoveSpeed); }, backgroundUpdateSpeed);
		obstaclesIntervalHandle = setInterval(function() { updateObstacles(-backgroundMoveSpeed); }, backgroundUpdateSpeed);
	}
}

//************** Event Functions *************//
//Key-Events: Every key has one keyCode. 
//Find Out KeyCode Here  ->  https://keycode.info

function keyDown(event){
	switch (event.keyCode) {
	  case 37:
	    // Left-Arrow Pressed
	    goLeft();
	    break;
	  case 38:
	    // Up-Arrow Pressed
	    if(player.charY == player.ground) player.jumping = setInterval(jump, player.jumpSpeed)
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
	changePlayerPicture()
	if(player.isGoing === true && (event.keyCode === 39 || event.keyCode === 37)){
		player.isGoing = false
		clearInterval(playerIntervalHandle);
		clearInterval(backgroundIntervalHandle);
		clearInterval(obstaclesIntervalHandle);
	}
}

//Event Listener
document.addEventListener("keydown", keyDown, false); //Not the down arrow(Pfeil unten), but just the "slot" that ANY key was pressed
document.addEventListener("keyup", keyUp, false); //Not the up arrow(Pfeil oben), but just the "slot" that ANY key was released
document.addEventListener("DOMContentLoaded", init, false);
