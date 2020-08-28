//************* Globale Variablen (Config) ***************//
//Window
var canvas, ctx;
var gameWidth = 1200;
var gameHeight = 700;
var gameGround = gameHeight * 0.88;

//Break-Menu
var breakMenuRect;
var breakMenuWidth = gameWidth/2;
var breakMenuHeight = gameHeight/2;
var breakMenuX = breakMenuWidth/2;
var breakMenuY = breakMenuHeight*0.8/2;

//Background
var background;
var backgroundWidth = 16273;																//Full lenght of the Background Image
var backgroundX = 0;																		//Current X-point from the top left corner of the image
var backgroundUpdateSpeed = 40;																//miliseconds how often the background will be updated
var backgroundMoveSpeed = 20;																//steps in pixel that backgound Move															//lower = faster
var environmentIntervalHandle;

// Audio
var audioPlayer;
if(sessionStorage.getItem("mutedStatus") == 1){
	var playingAudio = false;
}else if (sessionStorage.getItem("mutedStatus") == 0){
	var playingAudio = true;
}

//lecturer
class Lecturer {
	constructor() {
		var charWidth = 109;
		var charHeight = 152;
		this.charWidth = charWidth;																	
		this.charHeight = charHeight;						
		this.charX = gameWidth*0.5-(charWidth/2);	
		this.charY = gameHeight*0.87-charHeight;	
		this.charPictureWL = [];
		this.charPictureIL = [];					
		this.currentPictureIdxWL = 0;
		this.currentPictureIdxIL = 0;				
		this.movementSpeed = 60;					
		this.lecturerImg;								
		//move Option	
		this.ground = this.charY;																															
	}
	
	drawLecturer() {
		ctx.drawImage(this.lecturerImg, this.charX, this.charY, this.charWidth, this.charHeight);
	}

	setProf(level){
		if(level == 1){		
			//Muesch
			this.charPictureWL = ['MUWL01', 'MUWL02', 'MUWL03', 'MUWL04', 'MUWL05', 'MUWL06', 
			'MUWL07', 'MUWL08', 'MUWL09', 'MUWL10', 'MUWL11', 'MUWL12', 
			'MUWL13', 'MUWL14', 'MUWL15', 'MUWL16', 'MUWL17', 'MUWL18', 
			'MUWL19', 'MUWL20'];
			this.charPictureIL = ['MUIL01', 'MUIL02', 'MUIL03', 'MUIL04', 'MUIL05', 'MUIL06', 
			'MUIL07', 'MUIL08', 'MUIL09', 'MUIL10', 'MUIL11', 'MUIL12', 
			'MUIL13', 'MUIL14', 'MUIL15', 'MUIL16', 'MUIL17', 'MUIL18', 
			'MUIL19', 'MUIL20'];
			}

		if(level == 2){		
			//Baeumle-Courth								
			this.charPictureWL = ['BCWL01', 'BCWL02', 'BCWL03', 'BCWL04', 'BCWL05', 'BCWL06', 
			'BCWL07', 'BCWL08', 'BCWL09', 'BCWL10', 'BCWL11', 'BCWL12', 
			'BCWL13', 'BCWL14', 'BCWL15', 'BCWL16', 'BCWL17', 'BCWL18', 
			'BCWL19', 'BCWL20'];
			this.charPictureIL = ['BCIL01', 'BCIL02', 'BCIL03', 'BCIL04', 'BCIL05', 'BCIL06', 
			'BCIL07', 'BCIL08', 'BCIL09', 'BCIL10', 'BCIL11', 'BCIL12', 
			'BCIL13', 'BCIL14', 'BCIL15', 'BCIL16', 'BCIL17', 'BCIL18', 
			'BCIL19', 'BCIL20'];	
			}

		if(level == 3){		
			//Braendle										
			this.charPictureWL = ['BRWL01', 'BRWL02', 'BRWL03', 'BRWL04', 'BRWL05', 'BRWL06', 
			'BRWL07', 'BRWL08', 'BRWL09', 'BRWL10', 'BRWL11', 'BRWL12', 
			'BRWL13', 'BRWL14', 'BRWL15', 'BRWL16', 'BRWL17', 'BRWL18', 
			'BRWL19', 'BRWL20'];
			this.charPictureIL = ['BRIL01', 'BRIL02', 'BRIL03', 'BRIL04', 'BRIL05', 'BRIL06', 
			'BRIL07', 'BRIL08', 'BRIL09', 'BRIL10', 'BRIL11', 'BRIL12', 
			'BRIL13', 'BRIL14', 'BRIL15', 'BRIL16', 'BRIL17', 'BRIL18', 
			'BRIL19', 'BRIL20'];	
			}
	}
}

//character		
class Player {
	constructor() {
		var charWidth = 109;
		var charHeight = 152;
		this.charWidth = charWidth;																	//width of character image
		this.charHeight = charHeight;																	//height of character image
		this.rightPuffer = 30;																	//right puffer when an obstacle is hit
		this.leftPuffer = 30;																	//left puffer when an obstacle is hit
		this.charX = gameWidth*0.5-(charWidth/2);												//X-Point of character
		this.charY = gameHeight*0.87-charHeight;												//Y-Point of character
		this.charPictureWR = [];
		this.charPictureWL = [];
		this.charPictureJR = [];
		this.charPictureJL = [];
		this.charPictureIR = [];
		this.charPictureIL = [];																//Array of all Player-pictures for Movement which are listed in HTML-Image-Section
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
		var jumpHigh = 300;
		this.jumpHigh = jumpHigh;																//high from the ground
		this.helperJumpHigh = jumpHigh;															//save the standard jump high because the var jumpHigh will change when player is on platform
		this.jumpSpeed = 15;																	//lower = faster
		this.jumpingIntervalHandle = 0;							  											//jumping Intervall ID
		this.goingDown = false;																	//status of player currently going Down
		this.isGoing = false;																	//Tells whether the player is going or not
		this.onPlatform = false; 																//tells whether the player is on a platform or not
		this.playerWantsDownFromPlatform = false; 												//tells whether the player wants down from the platform
		this.walkDirection = 0;																	//1 = player go currently left, 0 = player go currently right
		var fallIntervalHandle;																	
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
		if ( ((this.getBottom() > object.getTop() && this.getBottom() < object.getBottom() )
		|| (this.getTop() < object.getBottom() && this.getTop() > object.getTop()))
		&& this.getRight() > object.getLeft() && this.getLeft() < object.getRight() ) {
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

			return true;
			}else{
				return false;
			}
	}

	setGender(gender){
		if(gender == 1){		
			//Boy 1										
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

		if(gender == 2){		
			//Boy 2									
			this.charPictureWR = ['BWR21', 'BWR22', 'BWR23', 'BWR24', 'BWR25', 'BWR26', 
			'BWR27', 'BWR28', 'BWR29', 'BWR30', 'BWR31', 'BWR32', 
			'BWR33', 'BWR34', 'BWR35', 'BWR36', 'BWR37', 'BWR38', 
			'BWR39', 'BWR40'];
			this.charPictureWL = ['BWL21', 'BWL22', 'BWL23', 'BWL24', 'BWL25', 'BWL26', 
			'BWL27', 'BWL28', 'BWL29', 'BWL30', 'BWL31', 'BWL32', 
			'BWL33', 'BWL34', 'BWL35', 'BWL36', 'BWL37', 'BWL38', 
			'BWL39', 'BWL40'];
			this.charPictureJR = ['BJR21', 'BJR22', 'BJR23', 'BJR24', 'BJR25', 'BJR26', 
			'BJR27', 'BJR28', 'BJR29', 'BJR30', 'BJR31', 'BJR32', 
			'BJR33', 'BJR34', 'BJR35', 'BJR36', 'BJR37', 'BJR38', 
			'BJR39', 'BJR40'];
			this.charPictureJL = ['BJL21', 'BJL22', 'BJL23', 'BJL24', 'BJL25', 'BJL26', 
			'BJL27', 'BJL28', 'BJL29', 'BJL30', 'BJL31', 'BJL32', 
			'BJL33', 'BJL34', 'BJL35', 'BJL36', 'BJL37', 'BJL38', 
			'BJL39', 'BJL40'];
			this.charPictureIR = ['BIR21', 'BIR22', 'BIR23', 'BIR24', 'BIR25', 'BIR26', 
			'BIR27', 'BIR28', 'BIR29', 'BIR30', 'BIR31', 'BIR32', 
			'BIR33', 'BIR34', 'BIR35', 'BIR36', 'BIR37', 'BIR38', 
			'BIR39', 'BIR40'];
			this.charPictureIL = ['BIL21', 'BIL22', 'BIL23', 'BIL24', 'BIL25', 'BIL26', 
			'BIL27', 'BIL28', 'BIL29', 'BIL30', 'BIL31', 'BIL32', 
			'BIL33', 'BIL34', 'BIL35', 'BIL36', 'BIL37', 'BIL38', 
			'BIL39', 'BIL40'];	
			}

		if(gender == 3){		
			//Boy 3										
			this.charPictureWR = ['BWR41', 'BWR42', 'BWR43', 'BWR44', 'BWR45', 'BWR46', 
			'BWR47', 'BWR48', 'BWR49', 'BWR50', 'BWR51', 'BWR52', 
			'BWR53', 'BWR54', 'BWR55', 'BWR56', 'BWR57', 'BWR58', 
			'BWR59', 'BWR60'];
			this.charPictureWL = ['BWL41', 'BWL42', 'BWL43', 'BWL44', 'BWL45', 'BWL46', 
			'BWL47', 'BWL48', 'BWL49', 'BWL50', 'BWL51', 'BWL52', 
			'BWL53', 'BWL54', 'BWL55', 'BWL56', 'BWL57', 'BWL58', 
			'BWL59', 'BWL60'];
			this.charPictureJR = ['BJR41', 'BJR42', 'BJR43', 'BJR44', 'BJR45', 'BJR46', 
			'BJR47', 'BJR48', 'BJR49', 'BJR50', 'BJR51', 'BJR52', 
			'BJR53', 'BJR54', 'BJR55', 'BJR56', 'BJR57', 'BJR58', 
			'BJR59', 'BJR60'];
			this.charPictureJL = ['BJL41', 'BJL42', 'BJL43', 'BJL44', 'BJL45', 'BJL46', 
			'BJL47', 'BJL48', 'BJL49', 'BJL50', 'BJL51', 'BJL52', 
			'BJL53', 'BJL54', 'BJL55', 'BJL56', 'BJL57', 'BJL58', 
			'BJL59', 'BJL60'];
			this.charPictureIR = ['BIR41', 'BIR42', 'BIR43', 'BIR44', 'BIR45', 'BIR46', 
			'BIR47', 'BIR48', 'BIR49', 'BIR50', 'BIR51', 'BIR52', 
			'BIR53', 'BIR54', 'BIR55', 'BIR56', 'BIR57', 'BIR58', 
			'BIR59', 'BIR60'];
			this.charPictureIL = ['BIL41', 'BIL42', 'BIL43', 'BIL44', 'BIL45', 'BIL46', 
			'BIL47', 'BIL48', 'BIL49', 'BIL50', 'BIL51', 'BIL52', 
			'BIL53', 'BIL54', 'BIL55', 'BIL56', 'BIL57', 'BIL58', 
			'BIL59', 'BIL60'];	
			}
	
		if(gender == 4){ 
			//Girl 1
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

		if(gender == 5){ 
			//Girl 2
			this.charPictureWR = ['GWR21', 'GWR22', 'GWR23', 'GWR24', 'GWR25', 'GWR26', 
			'GWR27', 'GWR28', 'GWR29', 'GWR30', 'GWR31', 'GWR32', 
			'GWR33', 'GWR34', 'GWR35', 'GWR36', 'GWR37', 'GWR38', 
			'GWR39', 'GWR40'];
			this.charPictureWL = ['GWL21', 'GWL22', 'GWL23', 'GWL24', 'GWL25', 'GWL26', 
			'GWL27', 'GWL28', 'GWL29', 'GWL30', 'GWL31', 'GWL32', 
			'GWL33', 'GWL34', 'GWL35', 'GWL36', 'GWL37', 'GWL38', 
			'GWL39', 'GWL40'];
			this.charPictureJR = ['GJR21', 'GJR22', 'GJR23', 'GJR24', 'GJR25', 'GJR26', 
			'GJR27', 'GJR28', 'GJR29', 'GJR30', 'GJR31', 'GJR32', 
			'GJR33', 'GJR34', 'GJR35', 'GJR36', 'GJR37', 'GJR38', 
			'GJR39', 'GJR40'];
			this.charPictureJL = ['GJL21', 'GJL22', 'GJL23', 'GJL24', 'GJL25', 'GJL26', 
			'GJL27', 'GJL28', 'GJL29', 'GJL30', 'GJL31', 'GJL32', 
			'GJL33', 'GJL34', 'GJL35', 'GJL36', 'GJL37', 'GJL38', 
			'GJL39', 'GJL40'];
			this.charPictureIR = ['GIR21', 'GIR22', 'GIR23', 'GIR24', 'GIR25', 'GIR26', 
			'GIR27', 'GIR28', 'GIR29', 'GIR30', 'GIR31', 'GIR32', 
			'GIR33', 'GIR34', 'GIR35', 'GIR36', 'GIR37', 'GIR38', 
			'GIR39', 'GIR40'];
			this.charPictureIL = ['GIL21', 'GIL22', 'GIL23', 'GIL24', 'GIL25', 'GIL26', 
			'GIL27', 'GIL28', 'GIL29', 'GIL30', 'GIL31', 'GIL32', 
			'GIL33', 'GIL34', 'GIL35', 'GIL36', 'GIL37', 'GIL38', 
			'GIL39', 'GIL40'];	
			}

		if(gender == 6){ 
			//Girl 3
			this.charPictureWR = ['GWR41', 'GWR42', 'GWR43', 'GWR44', 'GWR45', 'GWR46', 
			'GWR47', 'GWR48', 'GWR49', 'GWR50', 'GWR51', 'GWR52', 
			'GWR53', 'GWR54', 'GWR55', 'GWR56', 'GWR57', 'GWR58', 
			'GWR59', 'GWR60'];
			this.charPictureWL = ['GWL41', 'GWL42', 'GWL43', 'GWL44', 'GWL45', 'GWL46', 
			'GWL47', 'GWL48', 'GWL49', 'GWL50', 'GWL51', 'GWL52', 
			'GWL53', 'GWL54', 'GWL55', 'GWL56', 'GWL57', 'GWL58', 
			'GWL59', 'GWL60'];
			this.charPictureJR = ['GJR41', 'GJR42', 'GJR43', 'GJR44', 'GJR45', 'GJR46', 
			'GJR47', 'GJR48', 'GJR49', 'GJR50', 'GJR51', 'GJR52', 
			'GJR53', 'GJR54', 'GJR55', 'GJR56', 'GJR57', 'GJR58', 
			'GJR59', 'GJR60'];
			this.charPictureJL = ['GJL41', 'GJL42', 'GJL43', 'GJL44', 'GJL45', 'GJL46', 
			'GJL47', 'GJL48', 'GJL49', 'GJL50', 'GJL51', 'GJL52', 
			'GJL53', 'GJL54', 'GJL55', 'GJL56', 'GJL57', 'GJL58', 
			'GJL59', 'GJL60'];
			this.charPictureIR = ['GIR41', 'GIR42', 'GIR43', 'GIR44', 'GIR45', 'GIR46', 
			'GIR47', 'GIR48', 'GIR49', 'GIR50', 'GIR51', 'GIR52', 
			'GIR53', 'GIR54', 'GIR55', 'GIR56', 'GIR57', 'GIR58', 
			'GIR59', 'GIR60'];
			this.charPictureIL = ['GIL41', 'GIL42', 'GIL43', 'GIL44', 'GIL45', 'GIL46', 
			'GIL47', 'GIL48', 'GIL49', 'GIL50', 'GIL51', 'GIL52', 
			'GIL53', 'GIL54', 'GIL55', 'GIL56', 'GIL57', 'GIL58', 
			'GIL59', 'GIL60'];	
			}
	}
}

var player;																					// object of Class Player

//Obstacles
class Obstacle {
	constructor(x,y = ground,width,height,pictureId,type) {
		this.x = x;
		this.y = y - height;
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

//Items (for example: Credit-Points)
class Item {
	constructor( type, x,y = ground,width = 70,height = 70) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.type = type;																	//type coin = Creditpoint, else name of image
		this.currentPictureIdx = 0;
		this.collected = false;
	}

	update(direcion) {
		this.x += direcion;																	//movement of items when player goes to right
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

var creditsPerCoin = 3;													//5 Coins a 3CreditPoints = 15 CP
var walkCreditPoints = 0;												//counter for Creditpoints a playr can get by walk
var collectCreditpoints = 0												//Counter for Creditpoints a player can get by collecting coins
var creditPoints = walkCreditPoints + collectCreditpoints; 				//counter for the creditPoints
var recordDistance = 0; 												//saves the furthest distance the player had made
var nextCreditPointPosition = 0; 										//the next position in the game where the player can get a Creditpoint
var maxWalkCreditPoints = 45; 											//max Creditpoints a player can get by walk (45CP + 15CP = 60 per Semester)
var maxCreditPoints = 60;												//sum of walk- and collectCPwhich you need for finish level

//Collectables with shadow
var coinShadowPictures = ['CPS01', 'CPS02', 'CPS03', 'CPS04', 'CPS05', 'CPS06', 
'CPS07', 'CPS08', 'CPS09', 'CPS10'];

var glassesShadowPictures = ['GLS01', 'GLS02', 'GLS03', 'GLS04', 'GLS05', 'GLS06', 
'GLS07', 'GLS08', 'GLS09', 'GLS10'];

var blackBerryShadowPictures = ['BBS01', 'BBS02', 'BBS03', 'BBS04', 'BBS05', 'BBS06', 
'BBS07', 'BBS08', 'BBS09', 'BBS10'];

var bluePrintShadowPictures = ['BPS01', 'BPS02', 'BPS03', 'BPS04', 'BPS05', 'BPS06', 
'BPS07', 'BPS08', 'BPS09', 'BPS10'];

var grammarShadowPictures = ['GRS01', 'GRS02', 'GRS03', 'GRS04', 'GRS05', 'GRS06', 
'GRS07', 'GRS08', 'GRS09', 'GRS10'];

var LaptopShadowPictures = ['LTS01', 'LTS02', 'LTS03', 'LTS04', 'LTS05', 'LTS06', 
'LTS07', 'LTS08', 'LTS09', 'LTS10'];

var certificateShadowPictures = ['CTS01', 'CTS02', 'CTS03', 'CTS04', 'CTS05', 'CTS06', 
'CTS07', 'CTS08', 'CTS09', 'CTS10'];

var LaptopShadowPictures = ['PPS01', 'PPS02', 'PPS03', 'PPS04', 'PPS05', 'PPS06', 
'PPS07', 'PPS08', 'PPS09', 'PPS10'];

var passportShadowPictures = ['PIS01', 'PIS02', 'PIS03', 'PIS04', 'PIS05', 'PIS06', 
'PIS07', 'PIS08', 'PIS09', 'PIS10'];

var LaptopShadowPictures = ['SCS01', 'SCS02', 'SCS03', 'SCS04', 'SCS05', 'SCS06', 
'SCS07', 'SCS08', 'SCS09', 'SCS10'];

//Collectables without shadow
var coinPictures = ['CP01', 'CP02', 'CP03', 'CP04', 'CP05', 'CP06', 
'CP07', 'CP08', 'CP09', 'CP10'];

var blackberryPictures = ['BB01', 'BB02', 'BB03', 'BB04', 'BB05', 'BB06', 
'BB07', 'BB08', 'BB09', 'BB10'];

var blueprintPictures = ['BP01', 'BP02', 'BP03', 'BP04', 'BP05', 'BP06', 
'BP07', 'BP08', 'BP09', 'BP10'];

var certificatePictures = ['CT01', 'CT02', 'CT03', 'CT04', 'CT05', 'CT06', 
'CT07', 'CT08', 'CT09', 'CT10'];

var glassesPictures = ['GL01', 'GL02', 'GL03', 'GL04', 'GL05', 'GL06', 
'GL07', 'GL08', 'GL09', 'GL10'];

var grammarPictures = ['GR01', 'GR02', 'GR03', 'GR04', 'GR05', 'GR06', 
'GR07', 'GR08', 'GR09', 'GR10'];

var laptopPictures = ['LT01', 'LT02', 'LT03', 'LT04', 'LT05', 'LT06', 
'LT07', 'LT08', 'LT09', 'LT10'];

var passportPictures = ['PP01', 'PP02', 'PP03', 'PP04', 'PP05', 'PP06', 
'PP07', 'PP08', 'PP09', 'PP10'];

var piPictures = ['PI01', 'PI02', 'PI03', 'PI04', 'PI05', 'PI06', 
'PI07', 'PI08', 'PI09', 'PI10'];

var scriptPictures = ['SC01', 'SC02', 'SC03', 'SC04', 'SC05', 'SC06', 
'SC07', 'SC08', 'SC09', 'SC10'];



//TODO: other PictureArrays of the colecables 

//platforms 
class Platform {
	constructor(pictureId,x,y,width,height) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.pictureId = pictureId;
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
var playersPlatform; 																		// is the platform where the player is on top


//control the game
const gameState = {
	current : 0,
	getReady : 0,
	game : 1,
	over : 2,
	break : 3,
	finish : 4
}

//*************** Level ******************//

function createLevel1(){
	background = document.getElementById("cityImage");
	audioPlayer = document.getElementById("backgroundAudio");
	audioPlayer.volume = 0.1;
	var jumpsound = document.getElementById("jumpdemo");
	var gameoversound = document.getElementById("gameoversound");
	var runningsound = document.getElementById("runningsound");
	var collectcoin = document.getElementById("collectcoin");

	// 1. SEMESTER
	items.push(new Item("coin",900, 300, 60, 60));
	obstacles.push(new Obstacle(1225, gameGround, 160, 56,"cityOilBarrel","box"));
	obstacles.push(new Obstacle(1930, gameGround, 75, 95,"cityPowerbox","box"));
	items.push(new Item("coin",2295, 390, 60, 60));
	obstacles.push(new Obstacle(2615, gameGround, 160, 56,"cityOilBarrel","box"));
	platforms.push(new Platform("cityPlatS", 3640, 500, 85, 65));
	platforms.push(new Platform("cityPlatM", 3910, 425, 220, 65));
	platforms.push(new Platform("cityPlatS", 3975, 160, 85, 65));
	platforms.push(new Platform("cityPlatS", 4225, 275, 85, 65));
	// INSERT GRAMMARBOOK 
	obstacles.push(new Obstacle(4880, gameHeight, 285, 95,"cityWaterS","hole"));
	platforms.push(new Platform("cityPlatS", 4980, 520, 85, 65));
	items.push(new Item("coin",4990, 440, 60, 60));
	obstacles.push(new Obstacle(6045, gameGround, 75, 95,"cityPowerbox","box"));
	platforms.push(new Platform("cityPlatS", 6400, 295, 85, 65));
	items.push(new Item("coin",6410, 215, 60, 60));
	platforms.push(new Platform("cityPlatM", 6720, 180, 220, 65));
	obstacles.push(new Obstacle(6940, gameGround, 160, 56,"cityOilBarrel","box"));
	platforms.push(new Platform("cityPlatM", 7110, 245, 220, 65));
	platforms.push(new Platform("cityPlatS", 7430, 365, 85, 65));
	platforms.push(new Platform("cityPlatS", 7630, 485, 85, 65));

	// 2. SEMESTER
	platforms.push(new Platform("cityPlatS", 8650, 490, 85, 65));
	obstacles.push(new Obstacle(8800, gameHeight, 835, 95,"cityWaterL","hole"));
	platforms.push(new Platform("cityPlatS", 8840, 370, 85, 65));
	obstacles.push(new Obstacle(9085, gameGround - 330, 160, 56,"cityOilBarrel","box"));
	platforms.push(new Platform("cityPlatL", 8995, 280, 360, 65));
	platforms.push(new Platform("cityPlatS", 9300, 540, 85, 65));
	// INSERT GLASSES
	platforms.push(new Platform("cityPlatS", 9565, 495, 85, 65));
	obstacles.push(new Obstacle(10420, gameGround, 160, 56,"cityOilBarrel","box"));
	obstacles.push(new Obstacle(10830, gameGround, 75, 95,"cityPowerbox","box"));
	items.push(new Item("coin", 10920, 165, 60, 60));
	platforms.push(new Platform("cityPlatS", 11080, 290, 85, 65));
	platforms.push(new Platform("cityPlatM", 11210, 385, 220, 65));
	platforms.push(new Platform("cityPlatM", 11490, 500, 220, 65));
	platforms.push(new Platform("cityPlatS", 11780, 375, 85, 65));
	obstacles.push(new Obstacle(11850, gameGround, 160, 56,"cityOilBarrel","box"));
	platforms.push(new Platform("cityPlatS", 11990, 275, 85, 65));
	platforms.push(new Platform("cityPlatL", 12250, 220, 360, 65));	
	obstacles.push(new Obstacle(12360, 225, 160, 56,"cityOilBarrel","box"));
	obstacles.push(new Obstacle(12420, gameHeight, 560, 95,"cityWaterM","hole"));
	platforms.push(new Platform("cityPlatS", 12550, 490, 85, 65));
	platforms.push(new Platform("cityPlatS", 12770, 490, 85, 65));
	platforms.push(new Platform("cityPlatS", 12800, 205, 85, 65));
	platforms.push(new Platform("cityPlatS", 13060, 180, 85, 65));
	// INSERT SCRIPT
	obstacles.push(new Obstacle(13370, gameHeight, 285, 95,"cityWaterS","hole"));
	platforms.push(new Platform("cityPlatS", 13475, 475, 85, 65));
	obstacles.push(new Obstacle(13915, gameGround, 75, 95,"cityPowerbox","box"));
	items.push(new Item("coin", 13930, 375, 60, 60));
	obstacles.push(new Obstacle(14380, gameGround, 160, 56,"cityOilBarrel","box"));
}


function createLevel2(){
	background = document.getElementById("jungleImage");
	audioPlayer = document.getElementById("backgroundAudio");
	audioPlayer.volume = 0.1;
	var jumpsound = document.getElementById("jumpdemo");
	var gameoversound = document.getElementById("gameoversound");
	var runningsound = document.getElementById("runningsound");
	var collectcoin = document.getElementById("collectcoin");

	// 3. SEMESTER
	platforms.push(new Platform("junglePlatS", 1165, 485, 85, 85));
	obstacles.push(new Obstacle(1200, gameGround, 150, 35,"jungleSpikesL","box"));
	platforms.push(new Platform("junglePlatS", 1325, 400, 85, 85));
	obstacles.push(new Obstacle(1400, gameGround, 150, 35,"jungleSpikesL","box"));
	platforms.push(new Platform("junglePlatS", 1510, 320, 85, 85));
	obstacles.push(new Obstacle(1590, gameGround, 150, 35,"jungleSpikesL","box"));
	platforms.push(new Platform("junglePlatS", 1700, 240, 85, 85));
	obstacles.push(new Obstacle(1785, gameGround, 150, 35,"jungleSpikesL","box"));
	platforms.push(new Platform("junglePlatS", 1915, 195, 85, 85));
	items.push(new Item("coin",2150, 300, 60, 60));
	obstacles.push(new Obstacle(2540, gameGround, 150, 35,"jungleSpikesL","box"));
	obstacles.push(new Obstacle(2855, gameGround, 150, 35,"jungleSpikesL","box"));
	obstacles.push(new Obstacle(3820, gameHeight, 830, 96,"jungleWaterL","hole"));
	platforms.push(new Platform("junglePlatL", 3770, 520, 360, 85));
	obstacles.push(new Obstacle(3850, 530, 50, 35,"jungleSpikesS","box"));
	obstacles.push(new Obstacle(4070, 530, 50, 35,"jungleSpikesS","box"));
	platforms.push(new Platform("junglePlatM", 4100, 415, 220, 85));
	obstacles.push(new Obstacle(4165, 420, 150, 35,"jungleSpikesL","box"));
	platforms.push(new Platform("junglePlatS", 3925, 280, 85, 85));
	platforms.push(new Platform("junglePlatS", 4110, 180, 85, 85));
	platforms.push(new Platform("junglePlatS", 4330, 180, 85, 85));
	items.push(new Item("coin",4540, 50, 60, 60));
	platforms.push(new Platform("junglePlatM", 4570, 295, 220, 85));
	obstacles.push(new Obstacle(4640, 300, 50, 35,"jungleSpikesS","box"));
	obstacles.push(new Obstacle(6070, gameHeight, 830, 96,"jungleWaterL","hole"));
	platforms.push(new Platform("junglePlatL", 6090, 490, 360, 85));
	obstacles.push(new Obstacle(6160, 495, 50, 35,"jungleSpikesS","box"));
	obstacles.push(new Obstacle(6390, 495, 50, 35,"jungleSpikesS","box"));
	platforms.push(new Platform("junglePlatL", 6380, 365, 360, 85));
	obstacles.push(new Obstacle(6490, 370, 50, 35,"jungleSpikesS","box"));
	obstacles.push(new Obstacle(6645, 370, 50, 35,"jungleSpikesS","box"));
	platforms.push(new Platform("junglePlatL", 6080, 175, 360, 85));
	obstacles.push(new Obstacle(6290, 180, 50, 35,"jungleSpikesS","box"));
	obstacles.push(new Obstacle(6145, 180, 50, 35,"jungleSpikesS","box"));
	items.push(new Item("coin",6070, 80, 60, 60));

	// 4. SEMESTER
	obstacles.push(new Obstacle(8260, 410, 50, 35,"jungleSpikesS","box"));
	platforms.push(new Platform("junglePlatM", 8260, 400, 220, 85));
	// INSERT LAPTOP
	obstacles.push(new Obstacle(8430, 410, 50, 35,"jungleSpikesS","box"));
	platforms.push(new Platform("junglePlatS", 8550, 280, 85, 85));
	platforms.push(new Platform("junglePlatS", 8760, 365, 85, 85));
	platforms.push(new Platform("junglePlatS", 8985, 365, 85, 85));
	obstacles.push(new Obstacle(9040, gameGround, 150, 35,"jungleSpikesL","box"));
	platforms.push(new Platform("junglePlatS", 9200, 365, 85, 85));
	platforms.push(new Platform("junglePlatS", 9425, 430, 85, 85));
	platforms.push(new Platform("junglePlatS", 9575, 515, 85, 85));
	obstacles.push(new Obstacle(9480, gameHeight, 285, 96,"jungleWaterS","hole"));
	platforms.push(new Platform("junglePlatS", 9745, 420, 85, 85));
	platforms.push(new Platform("junglePlatS", 9880, 343, 85, 85));
	platforms.push(new Platform("junglePlatS", 10035, 265, 85, 85));
	obstacles.push(new Obstacle(9990, gameGround, 150, 35,"jungleSpikesL","box"));
	obstacles.push(new Obstacle(10135, gameHeight, 555, 96,"jungleWaterM","hole"));
	platforms.push(new Platform("junglePlatM", 10240, 265, 220, 85));
	platforms.push(new Platform("junglePlatS", 10633, 265, 85, 85));
	obstacles.push(new Obstacle(10790, gameGround, 150, 35,"jungleSpikesL","box"));
	items.push(new Item("coin",10880, 175, 60, 60));
	obstacles.push(new Obstacle(11495, gameHeight, 555, 96,"jungleWaterM","hole"));
	platforms.push(new Platform("junglePlatS", 11605, 485, 85, 85));
	platforms.push(new Platform("junglePlatS", 11885, 485, 85, 85));
	obstacles.push(new Obstacle(12550, gameGround, 150, 35,"jungleSpikesL","box"));
	obstacles.push(new Obstacle(12875, gameGround, 150, 35,"jungleSpikesL","box"));
	items.push(new Item("coin",12915, 400, 60, 60));
	obstacles.push(new Obstacle(13200, gameGround, 150, 35,"jungleSpikesL","box"));
	obstacles.push(new Obstacle(13600, gameHeight, 830, 96,"jungleWaterL","hole"));
	platforms.push(new Platform("junglePlatM", 13725, 500, 220, 85)); //movable
	platforms.push(new Platform("junglePlatS", 13975, 350, 85, 85));
	// INSERT BLACKBERRY
	obstacles.push(new Obstacle(14560, gameGround, 50, 35,"jungleSpikesS","box"));
	obstacles.push(new Obstacle(14735, gameGround, 50, 35,"jungleSpikesS","box"));







}
/*
function createLevel3(){
	background = document.getElementById("spaceImage");
	audioPlayer = document.getElementById("backgroundAudio");
	audioPlayer.volume = 0.1;
	var jumpsound = document.getElementById("jumpdemo");
	var gameoversound = document.getElementById("gameoversound");
	var runningsound = document.getElementById("runningsound");
	var collectcoin = document.getElementById("collectcoin");
}
*/

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
	
	lecturer = new Lecturer()
	lecturer.setProf(sessionStorage.getItem("level"))

	playBackgroundAudio(playingAudio);

	setInterval(draw, 40);
	setInterval(changePlayerPicture, player.movementSpeed);

	gameState.current = gameState.game;

	//Loading completed --> disable loading screen
	setTimeout(function(){
		var load = document.getElementById("load");
		load.setAttribute("style", "display:none");
	},2000);
}

function draw(){

	ctx.clearRect(0,0,gameWidth,gameHeight)
	ctx.drawImage(background,backgroundX,0,backgroundWidth,gameHeight); 								//Background		
	drawItems();																						
	drawPlatforms();																					//Obstacle Images
	drawObstacles();
	player.drawPlayer();																				//character Image																					
	checkGameState();

	drawMenuIcon();
	drawECTSLabel();
	//drawLevelLabel();
	drawLivesLabel();
	drawMuteButton(playingAudio);
}


//*************** Functions ******************//
function drawRect(rx, ry, rw, rh, rstyle = "#0000FF"){
	ctx.fillStyle = rstyle;
	return ctx.fillRect(rx, ry, rw, rh);
}

function playBackgroundAudio(state) {
	if (state) {
		console.log("Hintergrundaudio ja")
		audioPlayer.play()
	} else {
		audioPlayer.pause();
	}
}

function playSoundFX(sound){
	if(playingAudio){
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
		if (backgroundX < recordDistance) { 					//checks whether the player has already achieved the distance
			recordDistance = backgroundX; 						// new Record
			if (recordDistance < nextCreditPointPosition) { 	//checks whether the position for the next Credit Point is achieved
				var end = backgroundWidth*(-1)+gameWidth+20; 	// gets the gameWitdh
				var counterHelper = (end - recordDistance) / (maxWalkCreditPoints - walkCreditPoints); // calculate the next Position where a player gets a creditpoint
				nextCreditPointPosition += counterHelper; 
				walkCreditPoints++;
			}
		}

	}else if(gameState.current === gameState.getReady)
	{
		//TODO
	}else if (gameState.current == gameState.break)
	{
		clearInterval(environmentIntervalHandle);
		var menubackground = document.getElementById("breakmenu");
		ctx.drawImage(menubackground, 0, 0, canvas.width, canvas.height);
		var continueButton = document.getElementById("continuebutton");
		ctx.drawImage(continueButton, 500, 300, 200, 50);
		var restartButton = document.getElementById("restartbutton");
		ctx.drawImage(restartButton, 500, 370, 200, 50);
		var exitButton = document.getElementById("exitbutton");
		ctx.drawImage(exitButton, 500, 440, 200, 50);
	}else if (gameState.current == gameState.finish)
	{
		clearInterval(environmentIntervalHandle);
		var menubackground = document.getElementById("finishmenu");
		ctx.drawImage(menubackground, 0, 0, canvas.width, canvas.height);
		var restartButton = document.getElementById("restartbutton");
		ctx.drawImage(restartButton, 500, 370, 200, 50);
		var exitButton = document.getElementById("exitbutton");
		ctx.drawImage(exitButton, 500, 440, 200, 50);
	}else if (gameState.current == gameState.over)
	{
		clearInterval(environmentIntervalHandle);
		var menubackground = document.getElementById("gameovermenu");
		ctx.drawImage(menubackground, 0, 0, canvas.width, canvas.height);
		playSoundFX(gameoversound);
		var restartButton = document.getElementById("restartbutton");
		ctx.drawImage(restartButton, 500, 300, 200, 50);
		var exitButton = document.getElementById("exitbutton");
		ctx.drawImage(exitButton, 500, 370, 200, 50);
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
		if(item.collected == false){
			if(item.type === "coin"){
				changeItemPicture(coinPictures, item)
			}else if(item.type === "glasses"){
				changeItemPicture(glassesPictures, item)
			}else if(item.type === "glassesShadow"){
				changeItemPicture(glassesShadowPictures, item)
			}
			//TODO: Other Collectables...
		}
	}
}

function changeItemPicture(pictureArray, item){
	//draw next Picture of picrtureArray
	if(pictureArray[item.currentPictureIdx] == pictureArray[pictureArray.length-1]){
		item.currentPictureIdx = 0;
	}else{
		item.currentPictureIdx++;
	}		
	var picture = document.getElementById(pictureArray[item.currentPictureIdx])
	ctx.drawImage(picture, item.x, item.y, item.width, item.height)
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
	//check for upstacles
	for (index = 0; index < obstacles.length; index++) {
		var obstacle = obstacles[index]
		if (player.detectCollision(obstacle)) {
			gameState.current = gameState.over					//sets the current game State to Game Over when a Collision with an obstacle is detected
			break;
		}
	}

	//Collect item
	for (index = 0; index < items.length; index++) {
		var item = items[index]
		if(item.collected == false){
			if (player.detectCollision(item)) {
				item.collected = true;
				if(item.type == "coin"){
					collectCreditpoints += creditsPerCoin;
					playSoundFX(collectcoin)
				}
				break;
			}
		}
	}
	creditPoints = walkCreditPoints + collectCreditpoints; 
}

function drawPlatforms() {
	
	for (index = 0; index < platforms.length; index++) {
		var platform = platforms[index];	
		var picture = document.getElementById(platform.pictureId)
		ctx.drawImage(picture, platform.x,platform.y,platform.width,platform.height)
		//drawRect(platform.x,platform.y,platform.width,platform.height)
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
			playersPlatform = platform;
			break;
		} else {
			player.onPlatform = false;
			if (player.charY != player.ground && player.jumpingIntervalHandle == 0) { //player is going down from the platform
				
				player.playerWantsDownFromPlatform = true;
				player.jumpingIntervalHandle = setInterval(jump, player.jumpSpeed);
			}
		}
	}
	
}


function checkFinished() {
	//player is at end of map
	var end = backgroundWidth*(-1)+gameWidth+20

	if(backgroundX <= end && creditPoints >= maxCreditPoints){
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
			clearInterval(player.jumpingIntervalHandle);
			checkCollision();
			player.jumpingIntervalHandle = 0;
			player.playerWantsDownFromPlatform = false
			player.jumpHigh = player.helperJumpHigh; // when the player hits the ground the jumpHigh must be the standard 
		} else {
			if (player.onPlatform == false) {
				player.goingDown = true;
				player.charY += 9
			} else {
				player.goingDown = false;
				clearInterval(player.jumpingIntervalHandle);
				checkCollision();
				player.jumpingIntervalHandle = 0;
				player.jumpHigh = player.helperJumpHigh - (gameHeight*0.88 - playersPlatform.getTop()); //when the player hits the platform the jumphigh must be jumphigh + platformHeight
			}
		}
	}
}

function fall(){
	//player falls down in a hole
	clearInterval(environmentIntervalHandle);
	clearInterval(player.jumpingIntervalHandle);
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
	}else{
		clearInterval(environmentIntervalHandle);
	}

	checkFinished();																//player at end of map
	checkCollision();																//obstacles + items
	checkPlatforms();
}

function changePlayerPicture(){
	
	//Movement: Stay Right
	if (player.jumpingIntervalHandle === 0 && player.walkDirection === 0 && player.isGoing === false) {
		if(player.charPictureIR[player.currentPictureIdxIR] == player.charPictureIR[player.charPictureIR.length - 1]){
			player.currentPictureIdxIR = 0;
		}else{
			player.currentPictureIdxIR++;
		}
		player.playerImg = document.getElementById(player.charPictureIR[player.currentPictureIdxIR]);
	}

	//Movement: Stay Left
	else if (player.jumpingIntervalHandle === 0 && player.walkDirection === 1 && player.isGoing === false) {
		if(player.charPictureIL[player.currentPictureIdxIL] == player.charPictureIL[player.charPictureIL.length - 1]){
			player.currentPictureIdxIL = 0;
		}else{
			player.currentPictureIdxIL++;
		}
		player.playerImg = document.getElementById(player.charPictureIL[player.currentPictureIdxIL]);
	}

	//Movment: Walk Right
	else if(player.jumpingIntervalHandle === 0 && player.walkDirection === 0 && player.isGoing === true){
		if(player.charPictureWR[player.currentPictureIdxWR] == player.charPictureWR[player.charPictureWR.length - 1]){
			player.currentPictureIdxWR = 0;
		}else{
			player.currentPictureIdxWR++;
		}
		player.playerImg = document.getElementById(player.charPictureWR[player.currentPictureIdxWR]);
	}
	//Movement: Walk Left
	else if(player.jumpingIntervalHandle === 0 && player.walkDirection === 1 && player.isGoing === true){
		if(player.charPictureWL[player.currentPictureIdxWL] == player.charPictureWL[player.charPictureWL.length - 1]){
			player.currentPictureIdxWL = 0;
		}else{
			player.currentPictureIdxWL++;
		}
		player.playerImg = document.getElementById(player.charPictureWL[player.currentPictureIdxWL]);
	}

	//Movment: Jump Right
	else if(player.jumpingIntervalHandle != 0 && player.walkDirection === 0) {
		if(player.charPictureJR[player.currentPictureIdxJR] == player.charPictureJR[player.charPictureJR.length - 1]){
			player.currentPictureIdxJR = 0;
		} else{
			player.currentPictureIdxJR++;
		}
		player.playerImg = document.getElementById(player.charPictureJR[player.currentPictureIdxJR]);
	}

	//Movment: Jump Left
	else if(player.jumpingIntervalHandle != 0 && player.walkDirection === 1){
		if(player.charPictureJL[player.currentPictureIdxJL] == player.charPictureJL[player.charPictureJL.length - 1]){
			player.currentPictureIdxJL = 0;
		}else{
			player.currentPictureIdxJL++;
		}
		player.playerImg = document.getElementById(player.charPictureJL[player.currentPictureIdxJL]);
	}

}

function updateEnvironment(backgroundMoveSpeed){
	moveBackground(backgroundMoveSpeed);
	updateObstacles(backgroundMoveSpeed);
	updateItems(backgroundMoveSpeed);
	updatePlatforms(backgroundMoveSpeed);
}

function goLeft(){
	if(player.isGoing === false){
		player.isGoing = true;

			environmentIntervalHandle = setInterval(function() { updateEnvironment(backgroundMoveSpeed); }, backgroundUpdateSpeed);
	}
}

function goRight(){
	if(player.isGoing === false){
		player.isGoing = true;

		environmentIntervalHandle = setInterval(function() { updateEnvironment(-backgroundMoveSpeed); }, backgroundUpdateSpeed);
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
			playSoundFX(runningsound);
			break;
		case 38:
			// Up-Arrow Pressed
			// if (player.onPlatform && player.jumping == 0) {
			// 	player.jumpHigh -= playersPlatform.height;
			// } else {
			// 	player.jumpHigh = player.helperJumpHigh;
			// }
			if(player.jumpingIntervalHandle == 0) player.jumpingIntervalHandle = setInterval(jump, player.jumpSpeed)
			playSoundFX(jumpdemo);
			break;
		case 39:
			// Right-Arrow Pressed
			player.walkDirection = 0;
			goRight();
			playSoundFX(runningsound);
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
		clearInterval(environmentIntervalHandle);
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
	ctx.font = "29px Bangers";
	ctx.fillStyle = "#f28e13";
	ctx.textAlign = "center";
	ctx.fillText("Creditpoints: " + creditPoints, 240, 40);
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

function drawContinueButton() {
	if(gameState.current == gameState.break)
	{
		var continueButton = document.getElementById("continuebutton");
		ctx.drawImage(continueButton, 1000, 15, 50, 50);
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