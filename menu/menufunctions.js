
// function to change the visibility of an element
function toggle(txt) {
    var txt = document.getElementById(txt);
   
    if (txt.style.display == "block") {
        txt.style.display = "none"}
    else {
        txt.style.display = "block"
    }
}

function getPlayerName() {
    var input = document.getElementById("userInput").value;
    document.getElementById("test").innerHTML = "Hallo " + input;
}


//save the character selection in the sessionStorage
function saveChosenCharacter(x)
{ 
    //0 = Boy   1 = Girl
    if (x == 0) {
        sessionStorage.setItem("chosenCharacter", 0) //Boy
        sessionStorage.setItem("chosenCharGraphic", "../assets/Images/menu/boy.gif")}
    else {
        sessionStorage.setItem("chosenCharacter", 1) //Girl
        sessionStorage.setItem("chosenCharGraphic", "../assets/Images/menu/girl.gif")
    }
}

//Change the graphic of the choosen character 
function getChosenCharGraphic()
{
    var img = document.getElementById("showChosenCharacter");
    img.src = sessionStorage.getItem("chosenCharGraphic");
}