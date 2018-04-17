var url = 'https://ron-swanson-quotes.herokuapp.com/v2/quotes';

var quote = document.getElementById('quote');

var btnXHR = document.getElementById('xhr');
var btnFetch = document.getElementById('fetch');
var btnAxios = document.getElementById('axios');


// ----- XHR -----

btnXHR.addEventListener('click', function() {
    var XHR = new XMLHttpRequest();

    XHR.onreadystatechange = function() {
        if(XHR.readyState == 4 && XHR.status == 200) {
            var newQuote = JSON.parse(XHR.responseText)[0];
            quote.innerText = newQuote;
        }
    }

    XHR.open('GET', url);
    XHR.send()
})


// ----- Fetch -----

btnFetch.addEventListener('click', function() {
    fetch(url)
    .then(handleErrors)
    .then(parseJSON)
    .then(updateQuote)
    .catch(displayErrors);
})

function handleErrors(response) {
    if(!response.ok) {
        throw Error(response.status);
    }
    return response;
}

function parseJSON(response) {
    console.log(response.json());
    return response.json();
}

function updateQuote(data) {
    quote.innerText = data[0];
}

function displayErrors(error) {
    console.log(error);
}


// ----- jQuery -----

$('#jquery').click(function() {
    $.getJSON(url)
     .done(function(data) {
        $('#quote').text(data[0]);
     })
     .fail(function(error) {
         console.log(error);
     })
})

// ----- Axios -----

btnAxios.addEventListener('click', function() {
    axios.get(url)
    .then(function(response) {
        quote.innerText = response.data[0];
    })
    .catch(function(error) {
        console.log(error);
    })
})
