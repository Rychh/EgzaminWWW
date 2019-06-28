"use strict";
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
exports.__esModule = true;
var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var PORT = 3112;
var path = require("path");
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
app.listen(PORT, function () { return console.log("Server listening on port " + PORT); });
// DATA BASE
// sqlite3.verbose(); TODO potrzebne?
var sql_damian = require('sqlite3').verbose();
var db = new sql_damian.Database('baza.db');
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
app.get('/database/pokemons', function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var cmd, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("?");
                    cmd = 'SELECT * FROM pokemon;';
                    return [4 /*yield*/, db.allAsync(cmd).then(function (row) {
                            if (row) {
                                console.log("OK /database/pokemon");
                                return row;
                            }
                            else {
                                console.log("Fail /database/pokemon");
                                return [];
                            }
                        })];
                case 1:
                    result = _a.sent();
                    res.send(result);
                    return [2 /*return*/];
            }
        });
    });
});
app.post('/database/pokemonInfo', function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var cmd, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('/database/pokemonInfo' + req.body.pokemonName);
                    cmd = 'SELECT * FROM pokemon WHERE name=' + req.body.name + ';';
                    return [4 /*yield*/, db.allAsync(cmd).then(function (row) {
                            if (row) {
                                console.log("OK");
                                console.log(row);
                                var cmd_1 = 'SELECT * FROM pokemon_types WHERE pokemon_id=' + row['pokemon_id'] + ';';
                                return row;
                            }
                            else {
                                console.log("Fail");
                                return [];
                            }
                        })];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/];
            }
        });
    });
});
