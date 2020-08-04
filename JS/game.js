//************* Globale Variablen (Config) ***************//
//Window
var canvas, ctx;
var gameWidth = 1200;
var gameHeight = 700;

//Break-Menu
var breakMenuRect;
var breakMenuWidth = gameWidth/2;
var breakMenuHeight = gameHeight/2;
var breakMenuX = breakMenuWidth/2;
var breakMenuY = breakMenuHeight*0.8/2;

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
		this.charWidth = charWidth;																//width of character image
		this.charHeight = charHeight;															//height of character image
		this.rightPuffer = 30;																	//right puffer when an obstacle is hit
		this.leftPuffer = 30;																	//left puffer when an obstacle is hit
		this.charX = gameWidth*0.5-(charWidth/2);												//X-Point of character
		this.charY = gameHeight*0.88-charHeight;												//Y-Point of character
		this.charPictureWR = ['BWR01', 'BWR02', 'BWR03', 'BWR04', 'BWR05', 'BWR06', 
		'BWR07', 'BWR08', 'BWR09', 'BWR10', 'BWR11', 'BWR12', 
		'BWR13', 'BWR14', 'BWR15', 'BWR16', 'BWR17', 'BWR18', 
		'BWR19', 'BWR20'];
		this.charPictureWL = ['BWL01', 'BWL02', 'BWL03', 'BWL04', 'BWL05', 'BWL06', 
		'BWL07', 'BWL08', 'BWL09', 'BWL10', 'BWL11', 'BWL12', 
		'BWL13', 'BWL14', 'BWL15', 'BWL16', 'BWL17', 'BWL18', 
		'BWL19', 'BWL20'];
		this.charPictureJR = ['BJR01', 'BJR02', 'BJR03', 'BJR04', 'BJR05', 'BJR06', 
		'BJR07', 'BJR08', 'BJR09', 'BJR10', 'BJR11', 'BJR12', 
		'BJR13', 'BJR14', 'BJR15', 'BJR16', 'BJR17', 'BJR18', 
		'BJR19', 'BJR20'];
		this.charPictureJL = ['BJL01', 'BJL02', 'BJL03', 'BJL04', 'BJL05', 'BJL06', 
		'BJLR07', 'BJL08', 'BJL09', 'BJL10', 'BJL11', 'BJL12', 
		'BJL13', 'BJL14', 'BJL15', 'BJL16', 'BJL17', 'BJL18', 
		'BJL19', 'BJL20'];																	//Array of all Player-pictures for Movement which are listed in HTML-Image-Section
		this.currentPictureIdxR = 0;
		this.currentPictureIdxL = 0;																//current Displayed PlayerPicture Index of charPictureIds-Array
		this.movementSpeed = 40;																//speed of how often an image changes (lower = faster)	
		this.playerImg;																			//contains the currently used image-Element of the player
		this.playerIntervalHandle;  															//Event-Handle for clearing the Inervall if the player is standing											
		//move Option	
		this.ground = this.charY;																//save the null point of the ground
		this.jumpHigh = 250;																	//high from the ground
		this.jumpSpeed = 10;																	//lower = faster
		this.jumping = 0;							  											//jumping Intervall ID
		this.goingDown = false;																	//status of player currently going Down
		this.isGoing = false;																	//Tells whether the player is going or not
		this.walkDirection = 0;																	//1 = player go currently left, 0 = player go currently right

	}

	drawPlayer() {
		ctx.drawImage(this.playerImg, this.charX ,this.charY, this.charWidth, this.charHeight);
	}

	getTop() {
		return this.charY;
	}
	getLeft() {
		return this.charX+this.leftPuffer;
	}

	getRight() {
		return this.charX + this.charWidth-this.rightPuffer;
	}

	getBottom() {
		return this.charY + this.charHeight;
	}

	detectCollision(obstacle) {
		if (this.getBottom() > obstacle.getTop() && this.getRight() > obstacle.getLeft() && this.getLeft() < obstacle.getRight()) {
			return true;
		}
		return false;
	}	

}

var player;																				// object of Class Player

//obstacles
class Obstacle {
	constructor(x,y = ground,width,height,pictureId,type) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.pictureId = pictureId;
		this.type = type;
	}

	update(direcion) {
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


//control the game
const gameState = {
	current : 0,
	getReady : 0,
	game : 1,
	over : 2
}

//************* Initialierung ******************//
function init(){
	console.log("init called");
	canvas = document.getElementById("mycanvas");
	canvas.style.border = "2px solid black";
	ctx = canvas.getContext("2d");
	player = new Player()

	setInterval(draw, 60);
	changePlayerPicture();

	var box1 = new Obstacle(gameWidth - 50,gameHeight*0.88 - 100, 100,100,"book","box");				//demo obstacle
	var box2 = new Obstacle(gameWidth + 500,gameHeight*0.88 - 100, 100,100,"book","box");					//demo obstacle
	var box3 = new Obstacle(gameWidth + 900,gameHeight*0.88 - 100, 100,100,"book","box");				//demo obstacle
	var box4 = new Obstacle(gameWidth + 1300,gameHeight*0.88 - 100, 100,100,"book","box");				//demo obstacle

	obstacles.push(box1);
	obstacles.push(box2);
	obstacles.push(box3);
	obstacles.push(box4);
	
}

function draw(){
	ctx.clearRect(0,0,gameWidth,gameHeight)
	//var floor = drawRect(0,gameHeight*0.8,gameWidth,gameHeight*0.2, "green")   						//floor
	background = document.getElementById("background");
	ctx.drawImage(background,backgroundX,0,backgroundWidth,gameHeight); 						//Background		
	player.drawPlayer()																				//character Image
	drawObstacles()																					//Obstacle Images
	checkGameState()
}

//*************** Functions ******************//
function drawRect(rx, ry, rw, rh, rstyle = "#0000FF"){
	ctx.fillStyle = rstyle;
	return ctx.fillRect(rx, ry, rw, rh);
}

function checkGameState(){
	if(gameState.current === gameState.over){
		clearInterval(playerIntervalHandle);
		clearInterval(backgroundIntervalHandle);
		clearInterval(obstaclesIntervalHandle);
		drawBreakMenu();
	}else if(gameState.current === gameState.game){
		//TODO
	}else if(gameState.current === gameState.getReady){
		//TODO
	}
}

function drawBreakMenu(){
	drawRect(breakMenuX,breakMenuY,breakMenuWidth, breakMenuHeight, "lightgrey");
	ctx.font = "60px Arial Black";
	ctx.fillStyle = "red";
	ctx.textAlign = "center";
	ctx.fillText("Game Over", canvas.width/2, canvas.height/3)
}

function drawObstacles() {
	
	for (index = 0; index < obstacles.length; index++) {
		var obstacle = obstacles[index];	
		var picture = document.getElementById(obstacle.pictureId)
		//var colors = ["red", "green", "blue", "yellow", "orange"]
		ctx.drawImage(picture, obstacle.x,obstacle.y,obstacle.width,obstacle.height)
		//drawRect(obstacle.x,obstacle.y,obstacle.width,obstacle.height, colors[Math.floor(Math.random() * colors.length)]);
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
			gameState.current = gameState.over					//sets the current game State to Game Over when a Collision with an obstacle is detected
			break;
		}
	}
	
}
function jump(){
	if(player.charY > player.jumpHigh && !player.goingDown){
		player.charY -= 6
	}else {
		if(player.charY > player.ground){
			player.goingDown = false;
			player.charY = player.ground;
			clearInterval(player.jumping);
			player.jumping = 0;
		}else{
			player.goingDown = true;
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
	}

	checkCollision()
}

function changePlayerPicture(){
	
	//Movement: Stay
	if (player.isGoing == false) {
		player.currentPictureIdx = 0;
	}
	//Movment: Go Right
	if(player.jumping === 0 && player.walkDirection === 0){
		if(player.charPictureWR[player.currentPictureIdxR] == player.charPictureWR[player.charPictureWR.length - 1]){
			player.currentPictureIdxR = 0;
		}else{
			player.currentPictureIdxR++;
		}
		player.playerImg = document.getElementById(player.charPictureWR[player.currentPictureIdxR]);
	}
	//Movement: Go Left
	if(player.jumping === 0 && player.walkDirection === 1){
		if(player.charPictureWL[player.currentPictureIdxL] == player.charPictureWL[player.charPictureWL.length - 1]){
			player.currentPictureIdxL = 0;
		}else{
			player.currentPictureIdxL++;
		}
		player.playerImg = document.getElementById(player.charPictureWL[player.currentPictureIdxL]);
	}

	//Movment: jump Right
	else if(player.jumping != 0 && player.walkDirection === 0){
		if(player.charPictureJR[player.currentPictureIdxR] == player.charPictureJR[player.charPictureJR.length - 1]){
			player.currentPictureIdxR = 0;
		}else{
			player.currentPictureIdxR++;
		}
		player.playerImg = document.getElementById(player.charPictureJR[player.currentPictureIdxR]);
	}

	//Movment: jump Left
	else if(player.jumping != 0 && player.walkDirection === 1){
		if(player.charPictureJL[player.currentPictureIdxL] == player.charPictureJL[player.charPictureJL.length - 1]){
			player.currentPictureIdxL = 0;
		}else{
			player.currentPictureIdxL++;
		}
		player.playerImg = document.getElementById(player.charPictureJL[player.currentPictureIdxL]);
	}

	
	//Movment: duck
	//...
}

function goLeft(){
	if(player.isGoing === false){
		player.isGoing = true;

		playerIntervalHandle = setInterval(changePlayerPicture, player.movementSpeed);
		backgroundIntervalHandle = setInterval(function() { moveBackground(backgroundMoveSpeed); }, backgroundUpdateSpeed);
		obstaclesIntervalHandle = setInterval(function() { updateObstacles(backgroundMoveSpeed); }, backgroundUpdateSpeed);
	}
}

function goRight(){
	if(player.isGoing === false){
		player.isGoing = true;

		playerIntervalHandle = setInterval(changePlayerPicture, player.movementSpeed);
		backgroundIntervalHandle = setInterval(function() { moveBackground(-backgroundMoveSpeed); }, backgroundUpdateSpeed);
		obstaclesIntervalHandle = setInterval(function() { updateObstacles(-backgroundMoveSpeed); }, backgroundUpdateSpeed);
	}
}

//************** Event Functions *************//
//Key-Events: Every key has one keyCode. 
//Find Out KeyCode Here  ->  https://keycode.info

function keyDown(event){
	if(gameState.current != gameState.over){
		switch (event.keyCode) {
		case 37:
			// Left-Arrow Pressed
			player.walkDirection = 1;
			goLeft();
			break;
		case 38:
			// Up-Arrow Pressed
			if(player.charY == player.ground && player.jumping == 0) player.jumping = setInterval(jump, player.jumpSpeed)
			break;
		case 39:
			// Right-Arrow Pressed
			player.walkDirection = 0;
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
}

function keyUp(event){
	changePlayerPicture()
	if(player.isGoing === true && (event.keyCode === 37 || event.keyCode === 39)){
		player.isGoing = false
		clearInterval(playerIntervalHandle);
		clearInterval(backgroundIntervalHandle);
		clearInterval(obstaclesIntervalHandle);
	}
}

//Event Listener
document.addEventListener("keydown", keyDown, false); 			//Not the down arrow(Pfeil unten), but just the "slot" that ANY key was pressed
document.addEventListener("keyup", keyUp, false); 				//Not the up arrow(Pfeil oben), but just the "slot" that ANY key was released
document.addEventListener("DOMContentLoaded", init, false);
