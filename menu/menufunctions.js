
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