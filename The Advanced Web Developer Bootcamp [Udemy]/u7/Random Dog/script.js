var button = document.getElementById('btn');
var img = document.getElementById('photo');

button.addEventListener("click", function() {
    var XHR = new XMLHttpRequest();

    XHR.onreadystatechange = function() {
        if(XHR.readyState == 4 && XHR.status == 200) {
            var url = JSON.parse(XHR.responseText).message;
            img.src = url;
        }
    }

    XHR.open('GET', 'https://dog.ceo/api/breeds/image/random');
    XHR.send();
})
