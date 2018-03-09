var age = Number(prompt("What is your age?"));
if(age < 0) {
    console.log("Whoa, whoa! Negative age?")
}
else if(age < 18) {
    console.log("Sorry, you are not old enough to enter the venue")
}
else if(age < 21) {
    console.log("You can enter, but cannot drink");
}
else if(age === 21) {
    console.log("Happy 21st birthday");
}
else {
    console.log("Come on in. You can drink.");
}
if (age % 2 === 1) {
    console.log("Your age is odd!");
}
if ( Math.sqrt(age) % 1 === 0) {
    console.log("Perfect square!");
}