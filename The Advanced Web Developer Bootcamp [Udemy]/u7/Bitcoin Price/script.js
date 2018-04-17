var button = document.querySelector('button');
var price = document.querySelector('span');

button.addEventListener('click', function() {
    var XHR = new XMLHttpRequest();

    XHR.onreadystatechange = function() {
        if(XHR.readyState == 4 && XHR.status == 200) {
            var currentPrice = JSON.parse(XHR.responseText).bpi.USD.rate;
            price.textContent = currentPrice + ' USD';
        }
    }

    XHR.open('get', 'https://api.coindesk.com/v1/bpi/currentprice.json');
    XHR.send();
})
