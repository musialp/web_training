var stringChoice = prompt("which loop should I run?");
var choice = Number(stringChoice);

if (choice === 1) {
    var currentNumber = -10
    while (currentNumber <= 19) {
        console.log(currentNumber);
        currentNumber++;
    }
}

else if (choice === 2) {
    var currentNumber = 10
    while (currentNumber <= 40) {
        if(currentNumber % 2 === 0) {
            console.log(currentNumber);
        }
        currentNumber++;
    }
}

else if (choice === 3) {
    var currentNumber = 300
    while (currentNumber <= 333) {
        if(currentNumber % 2 === 1) {
            console.log(currentNumber);
        }
        currentNumber++;
    }
}

else if (choice === 4) {
    var currentNumber = 5
    while (currentNumber <= 50) {
        if(currentNumber % 15 === 0) {
            console.log(currentNumber);
        }
        currentNumber++;
    }
}