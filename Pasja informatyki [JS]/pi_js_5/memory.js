var cards = ["ciri.png", "geralt.png", "jaskier.png", "jaskier.png",
             "iorweth.png", "triss.png", "geralt.png", "yen.png", 
             "ciri.png", "triss.png", "yen.png", "iorweth.png"];

console.log(cards);

var c0 = document.getElementById('c0');
var c1 = document.getElementById('c1');
var c2 = document.getElementById('c2');
var c3 = document.getElementById('c3');

var c4 = document.getElementById('c4');
var c5 = document.getElementById('c5');
var c6 = document.getElementById('c6');
var c7 = document.getElementById('c7');

var c8 = document.getElementById('c8');
var c9 = document.getElementById('c9');
var c10 = document.getElementById('c10');
var c11 = document.getElementById('c11');

c0.addEventListener("click", function() { revealCard(0); });
c1.addEventListener("click", function() { revealCard(1); });
c2.addEventListener("click", function() { revealCard(2); });
c3.addEventListener("click", function() { revealCard(3); });

c4.addEventListener("click", function() { revealCard(4); });
c5.addEventListener("click", function() { revealCard(5); });
c6.addEventListener("click", function() { revealCard(6); });
c7.addEventListener("click", function() { revealCard(7); });

c8.addEventListener("click", function() { revealCard(8); });
c9.addEventListener("click", function() { revealCard(9); });
c10.addEventListener("click", function() { revealCard(10); });
c11.addEventListener("click", function() { revealCard(11); });

var oneVisible = false;
var turnCounter = 0;
var firstCardClicked;
var lock = false;
var pairsLeft = 6;

function revealCard(cardNumber)
{
    if (!lock) {
        lock = true;
        var image = "url(img/" + cards[cardNumber] + ")";
        $('#c'+cardNumber).css('background-image', image);
        $('#c'+cardNumber).removeClass('card');
        $('#c'+cardNumber).addClass('cardActive');

        if(!oneVisible) {
            //first card
            oneVisible = true;
            firstCardClicked = cardNumber;
            lock = false;
        } else {
            //second card
            oneVisible = false;
            turnCounter++;
            $('.score').html("Turn counter: " + turnCounter);

            if(cards[firstCardClicked] == cards[cardNumber]) {
                //hit
                setTimeout(function () { hideTwoCards(cardNumber, firstCardClicked) }, 750);
            } else {
                //miss
                setTimeout(function () { restoreTwoCards(cardNumber, firstCardClicked) }, 1000);
            }
        }
    }
}

function hideTwoCards (cardNr1, cardNr2) {
    $('#c' + cardNr1).css('opacity', '0');
    $('#c' + cardNr2).css('opacity', '0');
    $('#c' + cardNr1).css('visibility', 'hidden');
    $('#c' + cardNr2).css('visibility', 'hidden');
    pairsLeft--;
    if (pairsLeft == 0) {
        $('.board').html('<h1>You win!</h1><br>Done in ' + turnCounter + ' turns. <br/><span class=\"reset\" onclick=\"location.reload()\">One more time?</span>');
    }
    lock = false;
}

function restoreTwoCards (cardNr1, cardNr2) {
    $('#c'+cardNr1).css('background-image', 'url(img/karta.png');
    $('#c'+cardNr1).addClass('card');
    $('#c'+cardNr1).removeClass('cardActive');

    $('#c'+cardNr2).css('background-image', 'url(img/karta.png');
    $('#c'+cardNr2).addClass('card');
    $('#c'+cardNr2).removeClass('cardActive');

    lock = false;
}
