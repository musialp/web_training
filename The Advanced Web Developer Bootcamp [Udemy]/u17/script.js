function getMostFollowers(...usernames) {
    let baseUrl = "https://api.github.com/users/";
    let urls = usernames.map(username => {
        return fetch(baseUrl + username)
        .then(function(data) {
            return data.json();
        })
    });
    return Promise.all(urls)
        .then(function(data) {
            let max = data.sort((a, b) => a.followers < b.followers)[0];
            return `${max.name} has the most followers with ${max.followers}`;
    });
}

getMostFollowers('elie','tigarcia','colt').then(function(data){
    console.log(data)
});


function starWarsString(number) {
    var str = '';
    var url = `https://swapi.co/api/people/${number}/`;

    return fetch(url)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        str += `${data.name} is featured in `;
        var filmData = data.films[0];
        return fetch(filmData)
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        str += `${data.title}, directed by ${data.director} `;
        let planetData = data.planets[0];
        return fetch(planetData);
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        str += `and it takes place on ${data.name}.`;
        return str;
    })
}

starWarsString(1).then(function(data){
    console.log(data);
})
