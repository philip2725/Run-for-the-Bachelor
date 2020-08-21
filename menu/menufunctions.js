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
function saveChosenCharacter(x)
{ 
    //0 = Boy   1 = Girl
    if (x == 0) {
        sessionStorage.setItem("chosenCharacter", 0) //Boy
        sessionStorage.setItem("chosenCharGraphic", "../assets/Images/Character/Boy/Gifs/Boy_Idle.gif")}
    else {
        sessionStorage.setItem("chosenCharacter", 1) //Girl
        sessionStorage.setItem("chosenCharGraphic", "../assets/Images/Character/Girl/Gifs/Girl_Idle_Right.gif")
    }
}

//  Change the graphic of the choosen character 
function getChosenCharGraphic()
{
    var img = document.getElementById("showChosenCharacter");
    img.src = sessionStorage.getItem("chosenCharGraphic");
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