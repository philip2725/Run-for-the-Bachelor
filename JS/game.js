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

// Audio
var audioPlayer;
if(sessionStorage.getItem("mutedStatus") == 1){
	var playingAudio = false;
}else if (sessionStorage.getItem("mutedStatus") == 0){
	var playingAudio = true;
}




//character		
class Player {
	constructor() {
		var charWidth = 109;
		var charHeight = 152;
		this.charWidth = charWidth;																//width of character image
		this.charHeight = charHeight;															//height of character image
		this.rightPuffer = 30;																	//right puffer when an obstacle is hit
		this.leftPuffer = 30;																	//left puffer when an obstacle is hit
		this.charX = gameWidth*0.5-(charWidth/2);												//X-Point of character
		this.charY = gameHeight*0.87-charHeight;												//Y-Point of character
		this.charPictureWR = [];
		this.charPictureWL = [];
		this.charPictureJR = [];
		this.charPictureJL = [];
		this.charPictureIR = [];
		this.charPictureIL = [];																		//Array of all Player-pictures for Movement which are listed in HTML-Image-Section
		this.currentPictureIdxWR = 0;
		this.currentPictureIdxWL = 0;
		this.currentPictureIdxJR = 0;
		this.currentPictureIdxJL = 0;
		this.currentPictureIdxIR = 0;
		this.currentPictureIdxIL = 0;															//current Displayed PlayerPicture Index of charPictureIds-Array
		this.movementSpeed = 60;																//speed of how often an image changes (lower = faster)	
		this.playerImg;																			//contains the currently used image-Element of the player										
		//move Option	
		this.ground = this.charY;																//save the null point of the ground
		this.jumpHigh = 220;																	//high from the ground
		this.jumpSpeed = 10;																	//lower = faster
		this.jumping = 0;							  											//jumping Intervall ID
		this.goingDown = false;																	//status of player currently going Down
		this.isGoing = false;																	//Tells whether the player is going or not
		this.onPlatform = false; //tells whether the player is on a platform or not
		this.playerWantsDownFromPlatform = false; //tells whether the player wants down from the platform
		this.walkDirection = 0;	
		var fallIntervalHandle;															//1 = player go currently left, 0 = player go currently right

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

	detectCollision(object) {
		if (this.getBottom() > object.getTop() && this.getRight() > object.getLeft() && this.getLeft() < object.getRight()) {
			if(object.type == "hole"){
				this.fallIntervalHandle = setInterval(fall,this.jumpSpeed);
				setTimeout(function(){gameState.current = gameState.over},500);
			}else{
				return true;
			}
		}
		return false;
	}	

	detectPlatform(platform) {
		if (this.getBottom() > platform.getTop() && this.getRight() > platform.getLeft() && this.getLeft() < platform.getRight()) {
			//hier muss noch genauer geprüft werden. Wenn player gegen die Platform läuft kann er nicht weiter und nur wenn er auf der Plattform läuft wird hier auf true gesetzt!
			return true;
			}else{
				return false;
			}
	}

	setGender(gender){
		if(gender == 0){												
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
			'BJL07', 'BJL08', 'BJL09', 'BJL10', 'BJL11', 'BJL12', 
			'BJL13', 'BJL14', 'BJL15', 'BJL16', 'BJL17', 'BJL18', 
			'BJL19', 'BJL20'];
			this.charPictureIR = ['BIR01', 'BIR02', 'BIR03', 'BIR04', 'BIR05', 'BIR06', 
			'BIR07', 'BIR08', 'BIR09', 'BIR10', 'BIR11', 'BIR12', 
			'BIR13', 'BIR14', 'BIR15', 'BIR16', 'BIR17', 'BIR18', 
			'BIR19', 'BIR20'];
			this.charPictureIL = ['BIL01', 'BIL02', 'BIL03', 'BIL04', 'BIL05', 'BIL06', 
			'BIL07', 'BIL08', 'BIL09', 'BIL10', 'BIL11', 'BIL12', 
			'BIL13', 'BIL14', 'BIL15', 'BIL16', 'BIL17', 'BIL18', 
			'BIL19', 'BIL20'];	
			}
	
		if(gender == 1){ 
			this.charPictureWR = ['GWR01', 'GWR02', 'GWR03', 'GWR04', 'GWR05', 'GWR06', 
			'GWR07', 'GWR08', 'GWR09', 'GWR10', 'GWR11', 'GWR12', 
			'GWR13', 'GWR14', 'GWR15', 'GWR16'];
			this.charPictureWL = ['GWL01', 'GWL02', 'GWL03', 'GWL04', 'GWL05', 'GWL06', 
			'GWL07', 'GWL08', 'GWL09', 'GWL10', 'GWL11', 'GWL12', 
			'GWL13', 'GWL14', 'GWL15', 'GWL16'];
			this.charPictureJR = ['GJR01', 'GJR02', 'GJR03', 'GJR04', 'GJR05', 'GJR06', 
			'GJR07', 'GJR08', 'GJR09', 'GJR10', 'GJR11', 'GJR12', 
			'GJR13', 'GJR14', 'GJR15', 'GJR16', 'GJR17', 'GJR18', 
			'GJR19', 'GJR20'];
			this.charPictureJL = ['GJL01', 'GJL02', 'GJL03', 'GJL04', 'GJL05', 'GJL06', 
			'GJL07', 'GJL08', 'GJL09', 'GJL10', 'GJL11', 'GJL12', 
			'GJL13', 'GJL14', 'GJL15', 'GJL16', 'GJL17', 'GJL18', 
			'GJL19', 'GJL20'];
			this.charPictureIR = ['GIR01', 'GIR02', 'GIR03', 'GIR04', 'GIR05', 'GIR06', 
			'GIR07', 'GIR08', 'GIR09', 'GIR10', 'GIR11', 'GIR12', 
			'GIR13', 'GIR14', 'GIR15', 'GIR16', 'GIR17', 'GIR18', 
			'GIR19', 'GIR20'];
			this.charPictureIL = ['GIL01', 'GIL02', 'GIL03', 'GIL04', 'GIL05', 'GIL06', 
			'GIL07', 'GIL08', 'GIL09', 'GIL10', 'GIL11', 'GIL12', 
			'GIL13', 'GIL14', 'GIL15', 'GIL16', 'GIL17', 'GIL18', 
			'GIL19', 'GIL20'];	
			}
	}
}

var player;																				// object of Class Player

//Obstacles
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

//Items (for example: Credit-Points)
class Item {
	constructor( type, x,y = ground,width = 70,height = 70) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.type = type;																	//type coin = Creditpoint
		this.currentPictureIdx = 0;
	}

	update(direcion) {
		this.x += direcion;																	//movement of items when player goes to right
	}

	update(direcion) {
		this.x += direcion;																	//movement of platform when player goes to right
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
var items = [];
var itemsIntervalHandle;
var coinsPictures = ['CP01', 'CP02', 'CP03', 'CP04', 'CP05', 'CP06', 
'CP07', 'CP08', 'CP09', 'CP10', 'CP11', 'CP12'];
creditsPerCoin = 10;

//platforms 
class Platform {
	constructor(x,y = ground,width,height) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.type = type;																	//type coin = Creditpoint
		this.currentPictureIdx = 0;
	}

	update(direcion) {
		this.x += direcion;																	//movement of items when player goes to right
	}

	update(direcion) {
		this.x += direcion;																	//movement of platform when player goes to right
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
var platforms = [];
var platformsIntervalHandle;



//control the game
const gameState = {
	current : 0,
	getReady : 0,
	game : 1,
	over : 2,
	break : 3,
	finish : 4
}

var creditPoints = 0; 				//counter for the creditPoints
var recordDistance = 0; 			//saves the furthest distance the player had made
var nextCreditPointPosition = 0; 	// the next position in the game where the player can get a Creditpoint
var maxCreditPoints = 60; 			//max Creditpoints a player can get in the game

//*************** Level ******************//

function createLevel1(){
	background = document.getElementById("background");
	audioPlayer = document.getElementById("backgroundAudio");
	audioPlayer.volume = 0.1;
	var jumpsound = document.getElementById("jumpdemo");
	var gameoversound = document.getElementById("gameoversound");
	var runningsound = document.getElementById("runningsound");
	


	items.push(new Item( "coin", gameWidth - 100,gameHeight*0.75));
	obstacles.push(new Obstacle(gameWidth + 50,gameHeight*0.84, 200,120,"water","hole"));
	obstacles.push(new Obstacle(gameWidth + 500,gameHeight*0.88 - 100, 100,100,"book","box"));
	items.push(new Item( "coin", gameWidth + 700,gameHeight*0.65));
	obstacles.push(new Obstacle(gameWidth + 900,gameHeight*0.88 - 100, 100,100,"book","box"));
	obstacles.push(new Obstacle(gameWidth + 1300,gameHeight*0.88 - 100, 100,100,"book","box"));
	obstacles.push(new Obstacle(gameWidth + 1600,gameHeight*0.88 - 100, 100,100,"book","box"));
	items.push(new Item( "coin", gameWidth + 2100,gameHeight*0.8));


	platforms.push(new Platform(gameWidth - 500, gameHeight*0.88 - 120, 120,120));
}

function createLevel2(){
	//TODO
}

function createLevel3(){
	//TODO
}

//************* Initialisierung ******************//
function init(){
	console.log("init called");
	canvas = document.getElementById("mycanvas");
	canvas.style.border = "2px solid black";
	ctx = canvas.getContext("2d");


	sessionStorage.setItem("level", 1)

	if(sessionStorage.getItem("level") == 1){
		createLevel1();
	}else if(sessionStorage.getItem("level") == 2){
		createLevel2();
	}else if(sessionStorage.getItem("level") == 3){
		createLevel3();
	}

	player = new Player();
	player.setGender(sessionStorage.getItem("chosenCharacter"));	

	playBackgroundAudio(playingAudio);

	setInterval(draw, 70);
	setInterval(changePlayerPicture, player.movementSpeed);

	gameState.current = gameState.game;
}

function draw(){

	ctx.clearRect(0,0,gameWidth,gameHeight)
	ctx.drawImage(background,backgroundX,0,backgroundWidth,gameHeight); 								//Background		
	player.drawPlayer();																				//character Image																					
	drawItems();																						
	drawObstacles();
	drawPlatforms();																					//Obstacle Images
	checkGameState();

	drawMenuIcon();
	drawECTSLabel();
	//drawLevelLabel();
	drawMuteButton(playingAudio);
	
}


//*************** Functions ******************//
function drawRect(rx, ry, rw, rh, rstyle = "#0000FF"){
	ctx.fillStyle = rstyle;
	return ctx.fillRect(rx, ry, rw, rh);
}

function playBackgroundAudio(state) {
	if (state) {
		console.log("Hintergundaudio ja")
		audioPlayer.play()
	} else {
		audioPlayer.pause();
	}
}

function playSoundFX(state, sound){
	if(state){
		sound.play();
	}
}


function checkGameState(){

	if(gameState.current === gameState.game)
	{
		//TODO
		// var end = backgroundWidth*(-1)+gameWidth+20
		// console.log("ENd: " + end); 
		
		// if (backgroundX < recordDistance) { //checks whether the player has already achieved the distance
		// 	recordDistance = backgroundX; 
		// 	if ((backgroundX - recordDistance) <= -84) {
		// 		creditPoints++;
		// 	}
		// }

		//creditPoint Counter
		/*if (backgroundX < recordDistance) { //checks whether the player has already achieved the distance
			recordDistance = backgroundX; // new Record
			if (recordDistance <= nextCreditPointPosition) { //checks whether the position for the next Credit Point is achieved
				var end = backgroundWidth*(-1)+gameWidth+20; // gets the gameWitdh
				var counterHelper = (end - recordDistance) / (maxCreditPoints - creditPoints); // calculate the next Position where a player gets a creditpoint
				nextCreditPointPosition += counterHelper; 
				creditPoints++;
			}
		}*/

	}else if(gameState.current === gameState.getReady)
	{
		//TODO
	}else if (gameState.current == gameState.break)
	{
		clearInterval(backgroundIntervalHandle);
		clearInterval(obstaclesIntervalHandle);
		clearInterval(platformsIntervalHandle);
		var menubackground = document.getElementById("breakmenu");
		ctx.drawImage(menubackground, 0, 0, canvas.width, canvas.height);
	}else if (gameState.current == gameState.finish)
	{
		clearInterval(backgroundIntervalHandle);
		clearInterval(obstaclesIntervalHandle);
		clearInterval(platformsIntervalHandle);
		var menubackground = document.getElementById("finishmenu");
		ctx.drawImage(menubackground, 0, 0, canvas.width, canvas.height);
	}else if (gameState.current == gameState.over)
	{
		clearInterval(backgroundIntervalHandle);
		clearInterval(obstaclesIntervalHandle);
		clearInterval(platformsIntervalHandle);
		var menubackground = document.getElementById("gameovermenu");
		ctx.drawImage(menubackground, 0, 0, canvas.width, canvas.height);
		playSoundFX(playingAudio, gameoversound);
	}
}

function drawObstacles() {
	
	for (index = 0; index < obstacles.length; index++) {
		var obstacle = obstacles[index];	
		var picture = document.getElementById(obstacle.pictureId)
		ctx.drawImage(picture, obstacle.x,obstacle.y,obstacle.width,obstacle.height)
	}
}

function drawItems() {
	for (index = 0; index < items.length; index++) {
		var item = items[index];	
		if(item.type === "coin"){
			if(coinsPictures[item.currentPictureIdx] == coinsPictures[coinsPictures.length-1]){
				item.currentPictureIdx = 0;
			}else{
				item.currentPictureIdx++;
			}		
			var picture = document.getElementById(coinsPictures[item.currentPictureIdx])
			ctx.drawImage(picture, item.x, item.y, item.width, item.height)
		}
	}
}

function updateItems(direction) {
	for (index = 0; index < items.length; index++) {
		var item = items[index]
		item.update(direction)
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
			gameState.current = gameState.over					//sets the current game State to Game Over when a Collision with an obstacle is detected
			break;
		}
	}
	for (index = 0; index < items.length; index++) {
		var item = items[index]
		if (player.detectCollision(item)) {
			items[index].x = -1000;								
			items[index].y = -1000;
			creditPoints += creditsPerCoin;
			break;
		}
	}
}

function drawPlatforms() {
	
	for (index = 0; index < platforms.length; index++) {
		var platform = platforms[index];	
		//var picture = document.getElementById(obstacle.pictureId)
		//ctx.drawImage(picture, obstacle.x,obstacle.y,obstacle.width,obstacle.height)
		drawRect(platform.x,platform.y,platform.width,platform.height)
	}
}

function updatePlatforms(direction) {
	for (index = 0; index < platforms.length; index++) {
		var platform = platforms[index]
		platform.update(direction)
	}
}

function checkPlatforms() {
	
	for (index = 0; index < platforms.length; index++) {
		var platform = platforms[index]
		if (player.detectPlatform(platform)) {
			player.onPlatform = true;	
			break;
		} else {
			player.onPlatform = false;
			if (player.charY != player.ground && player.jumping == 0) {
				player.playerWantsDownFromPlatform = true;
				player.jumping = setInterval(jump, player.jumpSpeed);
			}
		}
	}
	
}


function checkFinished() {
	var end = backgroundWidth*(-1)+gameWidth+20

	if(backgroundX <= end){
		gameState.current = gameState.finish;
	}
}

function jump(){
	 checkPlatforms()
	if(player.charY > player.jumpHigh && !player.goingDown && player.playerWantsDownFromPlatform == false){
		player.charY -= 6
	}else {
		if(player.charY > player.ground){
			player.goingDown = false;
			player.charY = player.ground;
			clearInterval(player.jumping);
			checkCollision();
			player.jumping = 0;
			player.playerWantsDownFromPlatform = false
		} else {
			if (player.onPlatform == false) {
				player.goingDown = true;
				player.charY += 9
			} else {
				player.goingDown = false;
				clearInterval(player.jumping);
				checkCollision();
				player.jumping = 0;
			}
		}
	}
}

function fall(){
	clearInterval(backgroundIntervalHandle);
	clearInterval(obstaclesIntervalHandle);
	clearInterval(platformsIntervalHandle);
	if(player.charY < gameHeight){
		player.charY += 5
	}else{
		clearInterval( player.fallIntervalHandle )
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

	checkFinished();
	checkCollision();
	checkPlatforms();
}

function changePlayerPicture(){
	
	//Movement: Stay Right
	if (player.jumping === 0 && player.walkDirection === 0 && player.isGoing === false) {
		if(player.charPictureIR[player.currentPictureIdxIR] == player.charPictureIR[player.charPictureIR.length - 1]){
			player.currentPictureIdxIR = 0;
		}else{
			player.currentPictureIdxIR++;
		}
		player.playerImg = document.getElementById(player.charPictureIR[player.currentPictureIdxIR]);
	}

	//Movement: Stay Left
	else if (player.jumping === 0 && player.walkDirection === 1 && player.isGoing === false) {
		if(player.charPictureIL[player.currentPictureIdxIL] == player.charPictureIL[player.charPictureIL.length - 1]){
			player.currentPictureIdxIL = 0;
		}else{
			player.currentPictureIdxIL++;
		}
		player.playerImg = document.getElementById(player.charPictureIL[player.currentPictureIdxIL]);
	}

	//Movment: Walk Right
	else if(player.jumping === 0 && player.walkDirection === 0 && player.isGoing === true){
		if(player.charPictureWR[player.currentPictureIdxWR] == player.charPictureWR[player.charPictureWR.length - 1]){
			player.currentPictureIdxWR = 0;
		}else{
			player.currentPictureIdxWR++;
		}
		player.playerImg = document.getElementById(player.charPictureWR[player.currentPictureIdxWR]);
	}
	//Movement: Walk Left
	else if(player.jumping === 0 && player.walkDirection === 1 && player.isGoing === true){
		if(player.charPictureWL[player.currentPictureIdxWL] == player.charPictureWL[player.charPictureWL.length - 1]){
			player.currentPictureIdxWL = 0;
		}else{
			player.currentPictureIdxWL++;
		}
		player.playerImg = document.getElementById(player.charPictureWL[player.currentPictureIdxWL]);
	}

	//Movment: Jump Right
	else if(player.jumping != 0 && player.walkDirection === 0) {
		if(player.charPictureJR[player.currentPictureIdxJR] == player.charPictureJR[player.charPictureJR.length - 1]){
			player.currentPictureIdxJR = 0;
		} else{
			player.currentPictureIdxJR++;
		}
		player.playerImg = document.getElementById(player.charPictureJR[player.currentPictureIdxJR]);
	}

	//Movment: Jump Left
	else if(player.jumping != 0 && player.walkDirection === 1){
		if(player.charPictureJL[player.currentPictureIdxJL] == player.charPictureJL[player.charPictureJL.length - 1]){
			player.currentPictureIdxJL = 0;
		}else{
			player.currentPictureIdxJL++;
		}
		player.playerImg = document.getElementById(player.charPictureJL[player.currentPictureIdxJL]);
	}

	
	//Movment: duck
	//...
}

function goLeft(){
	if(player.isGoing === false){
		player.isGoing = true;

		backgroundIntervalHandle = setInterval(function() { moveBackground(backgroundMoveSpeed); }, backgroundUpdateSpeed);
		obstaclesIntervalHandle = setInterval(function() { updateObstacles(backgroundMoveSpeed); }, backgroundUpdateSpeed);
		itemsIntervalHandle = setInterval(function() { updateItems(backgroundMoveSpeed); }, backgroundUpdateSpeed );
		platformsIntervalHandle = setInterval(function() { updatePlatforms(backgroundMoveSpeed); }, backgroundUpdateSpeed);
	}
}

function goRight(){
	if(player.isGoing === false){
		player.isGoing = true;

		backgroundIntervalHandle = setInterval(function() { moveBackground(-backgroundMoveSpeed); }, backgroundUpdateSpeed);
		obstaclesIntervalHandle = setInterval(function() { updateObstacles(-backgroundMoveSpeed); }, backgroundUpdateSpeed);
		itemsIntervalHandle = setInterval(function() { updateItems(-backgroundMoveSpeed); }, backgroundUpdateSpeed )
		platformsIntervalHandle = setInterval(function() { updatePlatforms(-backgroundMoveSpeed); }, backgroundUpdateSpeed);
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
			playSoundFX(playingAudio, runningsound);
			break;
		case 38:
			// Up-Arrow Pressed
			if(player.jumping == 0) player.jumping = setInterval(jump, player.jumpSpeed)
			playSoundFX(playingAudio, jumpdemo);
			break;
		case 39:
			// Right-Arrow Pressed
			player.walkDirection = 0;
			goRight();
			playSoundFX(playingAudio, runningsound);
			break;
		case 40:
			// Down-Arrow Pressed
			break;
		case 27:
			// ESC-Key Pressed
			if(gameState.current != gameState.break)
			{
				gameState.current = gameState.break;
			}else if(gameState.current == gameState.break){
				gameState.current = gameState.game; 
			}
			break;
		case 77:
			// M-Key Pressed
			playingAudio = !playingAudio;
			if(playingAudio)
			{
				sessionStorage.setItem("mutedStatus", 0);
			}else{
				sessionStorage.setItem("mutedStatus", 1);
			}
			playBackgroundAudio(playingAudio);
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
		clearInterval(backgroundIntervalHandle);
		clearInterval(obstaclesIntervalHandle);
		clearInterval(itemsIntervalHandle);
		clearInterval(platformsIntervalHandle);
	}
}

//Event Listener
document.addEventListener("keydown", keyDown, false); 			//Not the down arrow(Pfeil unten), but just the "slot" that ANY key was pressed
document.addEventListener("keyup", keyUp, false); 				//Not the up arrow(Pfeil oben), but just the "slot" that ANY key was released
document.addEventListener("DOMContentLoaded", init, false);
document.addEventListener("click", menuButtonClick, false);

function drawMenuIcon()
{
	if(gameState.current == gameState.game)
	{
		var menuiconopen = document.getElementById("menuopen");
		ctx.drawImage(menuiconopen, 15, 5, 50, 50);
	}
	
	if(gameState.current == gameState.break)
	{
		var menuiconclose = document.getElementById("menuclose");
		ctx.drawImage(menuiconclose, 15, 5, 50, 50);
	}
}

function drawECTSLabel()
{
	ctx.font = "25px Bangers";
	ctx.fillStyle = "#f28e13";
	ctx.textAlign = "center";
	ctx.fillText("Creditpoints: " + creditPoints, 200, 40);
}

/*
function drawLevelLabel()
{
	ctx.font = "25px Bangers";
	ctx.fillStyle = "#0c65f5";
	ctx.textAlign = "center";
	ctx.fillText("Level: 1", 200, 80);
}
*/

function drawMuteButton(state) {
	if (state) {
		var audioButton = document.getElementById("mutebutton");
		ctx.drawImage(audioButton, 1140, 5, 50, 50);
	} else {
		var audioButton = document.getElementById("unmutebutton");
	    ctx.drawImage(audioButton, 1140, 5, 50, 50);
	}
	
}

function menuButtonClick(event)
{
	let rect = canvas.getBoundingClientRect(); 
	let x = event.clientX - rect.left; 
	let y = event.clientY - rect.top;

	// handler for breakButtonClicked
	if (x <= 50 && y <= 50)
	{
		if(gameState.current == gameState.break)
		{
			gameState.current = gameState.game;
		}
		else if(gameState.current == gameState.game)
		{
			gameState.current = gameState.break;
		}
		//handler for muteButtonClicked
	} else if (x > 1150 && y < 200) {
		playingAudio = !playingAudio
		if(playingAudio){
			sessionStorage.setItem("mutedStatus", 0);
		}else{
			sessionStorage.setItem("mutedStatus", 1);
		}
		playBackgroundAudio(playingAudio)
	}
}

function drawLivesLabel() {
	var livesLabel = document.getElementById("liveslabel");
	var middle = gameWidth / 2 - 37.5;
	ctx.drawImage(livesLabel, middle - 100, 10, 75, 40);
	ctx.drawImage(livesLabel, middle, 10, 75, 40);
	ctx.drawImage(livesLabel, middle + 100, 10, 75, 40);
}