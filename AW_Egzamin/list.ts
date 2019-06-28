let pokemons;

function refreshTable() {
    let tabelka = '<tr><th onclick="posortuj(\'name\')">Nazwa</th>' +
        '<th  onclick="posortuj(\'height\')">Wzrost</th>' +
        '<th  onclick="posortuj(\'weight\')">Waga</th>' +
        '<th>Groźny</th></tr>\n';
    for (let i = 0; i < pokemons.length; i++) {
        tabelka += '<tr>' +
            '<td><a href="pokemon.html?name=' + pokemons[i]['name'] + '">' + pokemons[i]['name'] + '</a></td>' +
            '<td>' + pokemons[i]['height'] + '</td>' +
            '<td>' + pokemons[i]['weight'] + '</td>' +
            '<td>nie</td>' +
            '</tr>\n';
    }
    document.getElementById("tabelka").innerHTML = tabelka;

}

fetch('http://localhost:3112/database/pokemons')
    .then(function (response) {
        return response.json();
    })
    .then(async function (pokemonFetch) {
        pokemons = pokemonFetch;
        let options = "";
        if (pokemons.length == 0) {
            options = "Problem with server.";
            document.getElementById("tabelka").innerHTML = options;
        } else {
            window.localStorage.setItem("pokemonName", pokemons[0]['name']);
            refreshTable();
        }
    });

let podzialTabelki = "";

function posortuj(nazwa: string) {
    if (pokemons.length != 0) {
        if (podzialTabelki == nazwa) {
            pokemons.sort(function (a, b) {
                return a[nazwa] > b[nazwa]
            });
            podzialTabelki = "";
        } else {
            pokemons.sort(function (a, b) {
                return a[nazwa] < b[nazwa]
            });
            podzialTabelki = nazwa;
        }
        refreshTable();
    }
}