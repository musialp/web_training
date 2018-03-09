var stringChoice = prompt("which loop should I run?");
var choice = Number(stringChoice);

if (choice === 1) {
    for(i = -10; i <= 19; i++) {
        console.log(i);
    }
}

else if (choice === 2) {
    for(i = 10; i <= 40; i++) {
        if(i % 2 === 0) {
            console.log(i);
        }
    }
}

else if (choice === 3) {
    for(i = 300; i <= 333; i++) {
        if(i % 2 === 1) {
            console.log(i);
        }
    }
}

else if (choice === 4) {
    for(i = 5; i <= 50; i++) {
        if(i % 15 === 0) {
            console.log(i);
        }
    }
}