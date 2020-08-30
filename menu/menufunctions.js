//************* Initialierung ******************//


//*************** Functions ******************//

//  function to change the visibility of an element
function toggle(txt) {
    var txt = document.getElementById(txt);
   
    if (txt.style.display == "block") {
        txt.style.display = "none"}
    else {
        txt.style.display = "block"
    }
}

//  saves the character selection in the sessionStorage
var gender = 0; //0 = Male; 1 = Female
var charID = 0; //defines the character 

function setGender(int){
    var img = document.getElementById("chosenCharacterGraphic");
    if(int == 0){
        gender = 0; //Male
        img.src="../assets/Images/Character/Player/Boys/Boy 1/Gifs/Boy1 Idle R.gif";
        img.setAttribute("style","height: 344px; width: 228px; margin-left: 300px; margin-top: 18px");
        sessionStorage.setItem("chosenCharacter", 1); //save as Boy 1
        charID = 1;
    }else if (int == 1){
        gender = 1; //Female
        img.src="../assets/Images/Character/Player/Girls/Girl 1/Gifs/Girl1 Idle R.gif";
        img.setAttribute("style","height: 358px; width: 223px; margin-left: 310px;");
        sessionStorage.setItem("chosenCharacter", 4); //save as Girl 1
        charID = 4;
    }
}

function saveChosenCharacter(x)
{ 
    //  Arrow Button Function - changes character numbers stepwise form 1 to 3 in both directions (1 -> 2 -> 3 -> 1 and 3 -> 2 -> 1 -> 3)
    var img = document.getElementById("chosenCharacterGraphic");
    if(gender == 0){
        if(x == 1){
           if (charID >= 0 && charID <= 2){
                charID = charID + x;
            }else {
                charID = 1;
            }
        }else if(x == -1){
            if (charID >= 2 && charID <= 3){
                charID = charID + x;
            }else{
                charID = 3;
            }
        }  
    }else if(gender == 1){
        if(x == 1){
            if (charID >= 3 && charID <= 5){
                charID = charID + x;
             }else {
                charID = 4;
             }
         }else if(x == -1){
             if (charID >= 5 && charID <= 6){
                charID = charID + x;
             }else{
                charID = 6;
             }
         }  
    }    
    
    //  sets Character Graphics and saves the chosen Character in the Session Storage (1-3 -> Boys; 4-6 Girls;)
    switch (charID) {
        case 1: 
        sessionStorage.setItem("chosenCharacter", 1) //Boy 1
        img.src ="../assets/Images/Character/Player/Boys/Boy 1/Gifs/Boy1 Idle R.gif";
        img.setAttribute("style","height: 344px; width: 228px; margin-left: 300px; margin-top: 20px");
        break;
    
        case 2:
        sessionStorage.setItem("chosenCharacter", 2) //Boy 2
        img.src ="../assets/Images/Character/Player/Boys/Boy 2/Gifs/Boy2 Idle R.gif";
        img.setAttribute("style", "height: 366px; width: 183px; margin-left: 350px;");
        
        break;

        case 3:
        sessionStorage.setItem("chosenCharacter", 3) //Boy 3
        img.src ="../assets/Images/Character/Player/Boys/Boy 3/Gifs/Boy3 Idle R.gif";
        img.setAttribute("style", "height: 366px; width: 183px; margin-left: 350px;");
        break;

        case 4:
        sessionStorage.setItem("chosenCharacter", 4) //Girl 1
        img.src ="../assets/Images/Character/Player/Girls/Girl 1/Gifs/Girl1 Idle R.gif";
        img.setAttribute("style","height: 358px; width: 223px; margin-left: 310px;");
        break;

        case 5:
        sessionStorage.setItem("chosenCharacter", 5) //Girl 2
        img.src ="../assets/Images/Character/Player/Girls/Girl 2/Gifs/Girl2 Idle R.gif";
        img.setAttribute("style", "height: 366px; width: 183px; margin-left: 340px;");
        break;

        case 6:
        sessionStorage.setItem("chosenCharacter", 6) //Girl 3
        img.src ="../assets/Images/Character/Player/Girls/Girl 3/Gifs/Girl3 Idle R.gif";
        img.setAttribute("style","height: 358px; width: 223px; margin-left: 310px;");
        break;
    }
}

//  saves the user input as charactername in the session storage
function saveCharacterName() {
    var input = document.getElementById("userInput").value;
    sessionStorage.setItem("characterName", input);
}

// gets the chosen character out of the session storge and replace it at the given paragraph id
function getCharacterName(){
    var header = document.getElementById("head")
    header.innerHTML = "Run " + sessionStorage.getItem("characterName") + " RUN!!!";
    header.setAttribute("style", "font: 60px Bangers; color: #233769; margin-bottom: -15px; text-shadow: -1px 0 #F39F21, 0 1px #F39F21, 1px 0 #F39F21, 0 -1px #F39F21;")
}

//changes the display property of the given div-tag ID's to show and hide several parts of the HTML page
function showMenuPage(showpage, hidepage){
    document.getElementById(showpage).style.display='block';
    document.getElementById(hidepage).style.display='none';
    
}

//audio functions for the menu HTML
var audiostate = false;
function playAudio(){
    audiostate = !audiostate;
    if (audiostate) {
        menuAudio.play();
        menuAudio.loop = true;
        menuAudio.volume = 0.2;
        var img2 = document.getElementById("menumutebutton")
        img2.src ="../assets/Images/Buttons/Menu_Buttons/Mute yellow.png";
        img2.setAttribute('onmouseover', "src='../assets/Images/Buttons/Menu_Buttons/Mute hover yellow.png'") 
        img2.setAttribute('onmouseout', "src='../assets/Images/Buttons/Menu_Buttons/Mute yellow.png'") 
        sessionStorage.setItem("mutedStatus", 0);
	} else {
        menuAudio.pause();
        var img3 = document.getElementById("menumutebutton")
        img3.src ="../assets/Images/Buttons/Menu_Buttons/Unmute yellow.png";
        img3.setAttribute('onmouseover', "src='../assets/Images/Buttons/Menu_Buttons/Unmute hover yellow.png'") 
        img3.setAttribute('onmouseout', "src='../assets/Images/Buttons/Menu_Buttons/Unmute yellow.png'") 
        sessionStorage.setItem("mutedStatus", 1);
    }
}

function playSoundEffect(soundName){
   if(audiostate){
        var sound = document.getElementById(soundName);
        sound.play()
   }
}