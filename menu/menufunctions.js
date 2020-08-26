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
var gender = 0;
var y = 0;

function setGender(int){
    var img = document.getElementById("chosenCharacterGraphic");
    if(int == 0){
        gender = 0; //Male
        img.src="../assets/Images/Character/Boy/Gifs/Boy_Idle.gif";
        sessionStorage.setItem("chosenCharacter", 1); //save as Boy 1
        y = 1;
    }else if (int == 1){
        gender = 1; //Female
        img.src="../assets/Images/Character/Girl/Gifs/Girl_Idle_Left.gif";
        sessionStorage.setItem("chosenCharacter", 4); //save as Girl 1
        y = 4;
    }
}

function saveChosenCharacter(x)
{ 
    //  Arrow Button Function - changes character numbers stepwise form 1 to 3 in both directions (1 -> 2 -> 3 -> 1 and 3 -> 2 -> 1 -> 3)
    var img = document.getElementById("chosenCharacterGraphic");
    if(gender == 0){
        if(x == 1){
           if (y >= 0 && y <= 2){
                y = y + x;
            }else {
                y = 1;
            }
        }else if(x == -1){
            if (y >= 2 && y <= 3){
                y = y + x;
            }else{
                y = 3;
            }
        }  
    }else if(gender == 1){
        if(x == 1){
            if (y >= 3 && y <= 5){
                 y = y + x;
             }else {
                 y = 4;
             }
         }else if(x == -1){
             if (y >= 5 && y <= 6){
                 y = y + x;
             }else{
                 y = 6;
             }
         }  
    }    
    
    //  sets Character Graphics and saves the chosen Character in the Session Storage (1-3 -> Boys; 4-6 Girls;)
    switch (y) {
        case 1: 
        sessionStorage.setItem("chosenCharacter", 1) //Boy 1
        img.src ="../assets/Images/Character/Boy/Gifs/Boy_Idle.gif";
        break;
    
        case 2:
        sessionStorage.setItem("chosenCharacter", 2) //Boy 2
        img.src ="../assets/Images/Character/Old/Boy.gif";
        break;

        case 3:
        sessionStorage.setItem("chosenCharacter", 3) //Boy 3
        img.src ="../assets/Images/Character/Old/Brandle_Character.png";
        break;

        case 4:
        sessionStorage.setItem("chosenCharacter", 4) //Girl 1
        img.src ="../assets/Images/Character/Girl/Gifs/Girl_Idle_Left.gif";
        break;

        case 5:
        sessionStorage.setItem("chosenCharacter", 5) //Girl 2
        img.src ="../assets/Images/Character/Old/Girl.gif";
        break;

        case 6:
        sessionStorage.setItem("chosenCharacter", 6) //Girl 3
        img.src ="../assets/Images/Character/Old/Strichmnaenchen1.png";
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
    document.getElementById("head").innerHTML = "Hallo " + sessionStorage.getItem("characterName");
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