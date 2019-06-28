import * as sqlite3 from "sqlite3";
import express = require('express');

const app = express();
let bodyParser = require('body-parser');
const PORT = 3112;
import * as path from "path"

// let users_token = {};
// let sample_secret = "A to kanapka pana kota";
// let jwt = require('jsonwebtoken');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// ROUTES
app.use(express.static(path.join(__dirname)));

// SERVER SETUP
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

// DATA BASE
// sqlite3.verbose(); TODO potrzebne?
let sql_damian = require('sqlite3').verbose();
let db = new sql_damian.Database('baza.db');


db.getAsync = function (sql) {
    var that = this;
    return new Promise(function (resolve, reject) {
        that.get(sql, function (err, row) {
            if (err)
                reject(err);
            else
                resolve(row);
        });
    });
};


db.allAsync = function (sql) {
    var that = this;
    return new Promise(function (resolve, reject) {
        that.all(sql, function (err, row) {
            if (err)
                reject(err);
            else
                resolve(row);
        });
    });
};

app.get('/database/pokemons', async function (req, res) {
    let cmd = 'SELECT * FROM pokemon;';
    let result = await db.allAsync(cmd).then((row) => {
        if (row) {
            console.log("OK /database/pokemon");
            return row;
        } else {
            console.log("Fail /database/pokemon");
            return [];
        }
    });
    res.send(result);
});

app.post('/database/pokemonInfo', async function (req, res) {
    console.log('/database/pokemonInfo' + req.body.pokemonName);
    let cmd = 'SELECT * FROM pokemon WHERE name=' + req.body.name + ';';
    let result = await db.allAsync(cmd).then((row) => {
        if (row) {
            console.log("OK");
            console.log(row);
            let cmd = 'SELECT * FROM pokemon_types WHERE pokemon_id=' + row['pokemon_id'] + ';';
            return row;
        } else {
            console.log("Fail");
            return [];
        }
    });
});