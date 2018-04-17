async function getMostFollowers(...usernames) {
    let baseUrl = "https://api.github.com/users/";
    let urls = usernames.map(username => fetch(baseUrl + username).then(data => data.json()));
    var users = await Promise.all(urls);
    let max = users.sort((a, b) => a.followers < b.followers)[0];
    return `${max.name} has the most followers with ${max.followers}`;
}

getMostFollowers('elie','tigarcia','colt').then(function(data){
    console.log(data)
});


async function starWarsString(number) {
    let str = '';
    let url = `https://swapi.co/api/people/${number}/`;

    let hero = await fetch(url).then(data => data.json());
    str += `${hero.name} is featured in `;
    let filmData = await fetch(hero.films[0]).then(data =>data.json());
    str += `${filmData.title}, directed by ${filmData.director} `;
    let planetData = await fetch(filmData.planets[0]).then(data => data.json());
    str += `and it takes place on ${planetData.name}.`;
    return str;
}

starWarsString(1).then(function(data){
    console.log(data);
})
