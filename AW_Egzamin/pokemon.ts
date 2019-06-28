function parseURLParams(url) {
    var queryStart = url.indexOf("?") + 1,
        queryEnd = url.indexOf("#") + 1 || url.length + 1,
        query = url.slice(queryStart, queryEnd - 1),
        pairs = query.replace(/\+/g, " ").split("&"),
        parms = {}, i, n, v, nv;

    if (query === url || query === "") return;

    for (i = 0; i < pairs.length; i++) {
        nv = pairs[i].split("=", 2);
        n = decodeURIComponent(nv[0]);
        v = decodeURIComponent(nv[1]);

        if (!parms.hasOwnProperty(n)) parms[n] = [];
        parms[n].push(nv.length === 2 ? v : null);
    }
    return parms;
}

function postData(url = '', data = {}) {
    // Default options are marked with *
    return fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
        .then(response => response.json()); // parses JSON response into native Javascript objects
}

let pokemonName = parseURLParams(window.location.search)['name'][0];
let pokemons;

// , JSON.stringify({name:"pokemonName"}

function refreshInfo() {
    let nr = 0;
    for (let i = 0; i < pokemons.length; i++) {
        if (pokemons[i]['name'] == pokemonName) {
            nr = i;
        }
    }
    let info = '<dt>Nazwa</dt><dd>' + pokemons[nr]['name'] + '</dd>\n' +
        '      <dt>Waga</dt><dd>' + pokemons[nr]['weight'] + '</dd>\n' +
        '      <dt>Wzrost</dt><dd>' + pokemons[nr]['height'] + '</dd>\n' +
        '      <dt>Typy</dt><dd>'+pokemons[nr]['id']+'</dd>';
    document.getElementById("informacje").innerHTML = info;
    document.getElementById("tytul").innerHTML = "Pokemon " + pokemonName;
}


console.log(pokemonName);
fetch('http://localhost:3112/database/pokemons')
    .then(function (response) {
        return response.json();
    })
    .then(async function (pokemonFetch) {
        pokemons = pokemonFetch;
        let info = "";
        if (pokemons.length == 0) {
            info = "Problem with server.";
            document.getElementById("informacje").innerHTML = info;
        } else {
            refreshInfo();
        }
    });

