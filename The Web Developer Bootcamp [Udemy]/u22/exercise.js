function echo (text, nrOfTimes) {
    for(var i = 0; i < nrOfTimes; i++) {
        console.log(text);
    }
}
echo("ECHO!!", 3);

function average(scores) {
    var result = 0;
    for (var i = 0; i < scores.length; i++) {
        result += scores[i];
    }
    result = Math.round(result/scores.length);
    console.log(result);
    return result;
}

var scores = [90, 98, 89, 100, 100, 86, 94];
average(scores);