var numberOfSquares = 6;
var colors = [];
var pickedColor;

var squares = document.querySelectorAll(".square");
var colorDisplay = document.querySelector("#colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

init();

function init() {
    // Mode buttons even listeners
    setupModeButtons();
    // Square clicks event listeners
    setupSquares();
    // Reset button event listener
    setupResetButton();
    // Initial game reset
    resetGame();    
}

function changeColors (color) {
    for(var i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = color;
    }
}

function pickColor() {
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

function generateRandomColors(numberOfColors) {
    colors = [];

    for(var i = 0; i < numberOfColors; i++) {
        colors.push(randomColor());
    }

    return colors;
}

function randomColor() {
    var red = Math.floor(Math.random() * 256);
    var green = Math.floor(Math.random() * 256);
    var blue = Math.floor(Math.random() * 256);
    return "rgb(" + red + ", " + green + ", " + blue + ")";
}

function resetGame() {
    colors = generateRandomColors(numberOfSquares);
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;
    for(var i = 0; i < squares.length; i++) {
        if(colors[i]) {
            squares[i].style.backgroundColor = colors[i];
            squares[i].style.display = "block";
        } else {
            squares[i].style.display = "none";
        }
    }
    resetButton.textContent = "New colors";
    h1.style.backgroundColor = "steelblue";
    messageDisplay.textContent = "";
}

function setupModeButtons() {
    for(var i = 0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener("click", function() {
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            this.classList.add("selected")
            this.textContent ==="Easy" ? numberOfSquares = 3 : numberOfSquares = 6;
            resetGame();
        });
    }
}

function setupSquares() {
    for(var i = 0; i < squares.length; i++) {
        //Add click listeners to squares
        squares[i].addEventListener("click", function() {
            //Grab color of clicked square
            var clickedColor = this.style.backgroundColor;
            
            //Compare color to pickedColor
            if(clickedColor === pickedColor) {
                changeColors(pickedColor);
                h1.style.backgroundColor = pickedColor;
                resetButton.textContent = "Play again?"
                messageDisplay.textContent = "Correct";
            } else {
                this.style.backgroundColor = "#232323";
                messageDisplay.textContent = "Try again";
            }
        });
    }
}

function setupResetButton() {
    resetButton.addEventListener("click", function() {
        resetGame();
    })
}