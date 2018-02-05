var password = "Better safe than sorry";
password = password.toUpperCase();
var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var mishitNumber = 0;

var yes = new Audio("yes.wav");
var no = new Audio("no.wav");

var passwordMasked = ""
for (i = 0; i < password.length; i++) {
    if (password.charAt(i) != " ") {
        passwordMasked = passwordMasked + "_";
    } else {
        passwordMasked = passwordMasked + " ";
    }
}

function listPassword() {
    document.getElementById("board").innerHTML = passwordMasked;
}

function alphabetStart() {
    var divContent = "";

    for (i = 0; i < 26; i++) {
        divContent = divContent + "<div id=\"let" + i + "\" class=\"letter\" onclick=\"checkLetter(" + i + ")\">" + letters.charAt(i) + "</div>";
        if ((i + 1) % 6 == 0) {
            divContent = divContent + "<div style=\"clear: both;\"></div>";
        }
    }

    document.getElementById("alphabet").innerHTML = divContent;
}

String.prototype.replaceLetter = function (charPosition, newCharacter) {
    if (charPosition > this.length - 1) {
        console.log("charPlace exceeds string length.");
        return this.toString();
    } else {
        return this.substr(0, charPosition) + newCharacter + this.substr(charPosition+1);
    }
}

function checkLetter(letterNumber) {
    var hit = false;
    for (i = 0; i < password.length; i++) {
        if (password.charAt(i) == letters.charAt(letterNumber)) {
            passwordMasked = passwordMasked.replaceLetter(i, letters.charAt(letterNumber));
            hit = true;
        }
    }
    if (hit == true) {
        var element = "let" + letterNumber;
        document.getElementById(element).style.background = "#003300";
        document.getElementById(element).style.color = "#00c000";
        document.getElementById(element).style.border = "3px solid #00c000";
        document.getElementById(element).style.cursor = "default";
        yes.play();
        listPassword();
    } else {
        var element = "let" + letterNumber;
        document.getElementById(element).style.background = "#330000";
        document.getElementById(element).style.color = "#c00000";
        document.getElementById(element).style.border = "3px solid #c00000";
        document.getElementById(element).style.cursor = "default";
        document.getElementById(element).setAttribute("onclick", ";");
        mishitNumber++;
        document.getElementById("gallows").innerHTML = "<img src=\"img/s" + mishitNumber + ".jpg\" alt=\"\">"
        no.play();
    }
    
    if (password == passwordMasked) {
        document.getElementById("alphabet").innerHTML = 
                "Congratulations, you win! <br/> <br/> Password: " + password + "<br/> <br/><span class=\"reset\" onclick=\"location.reload()\">One more time?</span>"
    }

    if (mishitNumber >= 9) {
        document.getElementById("alphabet").innerHTML = 
        "You lost! <br/> <br/> Password: " + password + "<br/> <br/><span class=\"reset\" onclick=\"location.reload()\">One more time?</span>"
    }
}

function initializeGame() {
    listPassword();
    alphabetStart();
}

window.onload = initializeGame;