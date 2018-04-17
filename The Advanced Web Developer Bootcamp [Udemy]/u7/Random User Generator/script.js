var avatar = document.getElementById('avatar');
var fullname = document.getElementById('fullname');
var username = document.getElementById('username');
var email = document.getElementById('email');
var city = document.getElementById('city');
var btn = document.getElementById('btn');


btn.addEventListener('click', function() {
    var url = 'https://randomuser.me/api/';

    fetch(url)
    .then(handleErrors)
    .then(parseJSON)
    .then(updateProfile)
    .catch(printError);
});

function handleErrors(response) {
    if(!response.ok) {
        throw Error(response.status);
    }
    return response;
}

function parseJSON(response) {
    return response.json().then(function(data) {
        return data.results[0];
    });
}

function updateProfile(data) {
    avatar.src = data.picture.medium;
    fullname.innerText = data.name.first + data.name.last;
    username.innerText = data.login.username;
    email.innerText = data.email;
    city.innerText = data.location.city;
}

function printError(error) {
    console.log(error);
}

