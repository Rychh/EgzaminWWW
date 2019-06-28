var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
function parseURLParams(url) {
    var queryStart = url.indexOf("?") + 1, queryEnd = url.indexOf("#") + 1 || url.length + 1, query = url.slice(queryStart, queryEnd - 1), pairs = query.replace(/\+/g, " ").split("&"), parms = {}, i, n, v, nv;
    if (query === url || query === "")
        return;
    for (i = 0; i < pairs.length; i++) {
        nv = pairs[i].split("=", 2);
        n = decodeURIComponent(nv[0]);
        v = decodeURIComponent(nv[1]);
        if (!parms.hasOwnProperty(n))
            parms[n] = [];
        parms[n].push(nv.length === 2 ? v : null);
    }
    return parms;
}
function postData(url, data) {
    if (url === void 0) { url = ''; }
    if (data === void 0) { data = {}; }
    // Default options are marked with *
    return fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrer: 'no-referrer',
        body: JSON.stringify(data)
    })
        .then(function (response) { return response.json(); }); // parses JSON response into native Javascript objects
}
var pokemonName = parseURLParams(window.location.search)['name'][0];
var pokemons;
// , JSON.stringify({name:"pokemonName"}
function refreshInfo() {
    var nr = 0;
    for (var i = 0; i < pokemons.length; i++) {
        if (pokemons[i]['name'] == pokemonName) {
            nr = i;
        }
    }
    var info = '<dt>Nazwa</dt><dd>' + pokemons[nr]['name'] + '</dd>\n' +
        '      <dt>Waga</dt><dd>' + pokemons[nr]['weight'] + '</dd>\n' +
        '      <dt>Wzrost</dt><dd>' + pokemons[nr]['height'] + '</dd>\n' +
        '      <dt>Typy</dt><dd>' + pokemons[nr]['id'] + '</dd>';
    document.getElementById("informacje").innerHTML = info;
    document.getElementById("tytul").innerHTML = "Pokemon " + pokemonName;
}
console.log(pokemonName);
fetch('http://localhost:3112/database/pokemons')
    .then(function (response) {
    return response.json();
})
    .then(function (pokemonFetch) {
    return __awaiter(this, void 0, void 0, function () {
        var info;
        return __generator(this, function (_a) {
            pokemons = pokemonFetch;
            info = "";
            if (pokemons.length == 0) {
                info = "Problem with server.";
                document.getElementById("informacje").innerHTML = info;
            }
            else {
                refreshInfo();
            }
            return [2 /*return*/];
        });
    });
});
