function isEven(number) {
    if(number % 2 === 0) {
        return true;
    }
    else if (number % 2 === 1) {
        return false;
    }
    else {
        return NaN;
    }
}

function factorial(number) {
    var factorial = 1;
    for(i = 2; i <= number; i++) {
        factorial *= i;
    }
    return factorial;
}

function kebabToSnake(string) {
    return string.replace("-", "_");
}