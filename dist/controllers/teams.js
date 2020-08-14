"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
const MongoClient = require('mongodb').MongoClient; //biblioteca para conectar ao mongodb
function test(req, res, next) {
    res.status(200).send("OK");
}
function listarEquipes(req, res, next) {
    let texto = req.params.texto;
    MongoClient.connect(config_1.NOSQL_URL, function (err, client) {
        if (err)
            return res.status(500).send(err);
        var db = client.db(config_1.NOSQL_DATABASE);
        let equipes = db.collection("teams").find({
            nome: { $regex: texto }
        }).toArray();
        return res.status(200).send(equipes);
    });
}
function criarEquipe(req, res, next) {
    let equipe = req.body.equipe;
    MongoClient.connect(config_1.NOSQL_URL, function (err, client) {
        var db = client.db(config_1.NOSQL_DATABASE);
        db.collection("teams").inserOne(equipe, function (err, result) {
            if (err)
                return res.status(500).send("ERRO INTERNO - tente novamente mais tarde");
            res.status(200).send({ message: "successo!" });
            client.close();
        });
    });
}
exports.default = {
    test,
    listarEquipes,
    criarEquipe
};
