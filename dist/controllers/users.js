"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
// import storeMultipleFiles from '../lib/documents';
// import userSchema from '../lib/validators/user';
// import patientSchema from '../lib/validators/patient';
const MongoClient = require('mongodb').MongoClient; //biblioteca para conectar ao mongodb
const criptoHash = require('password-hash'); //biblioteca para encriptar a senha
var randtoken = require('rand-token'); //gera um token aleatório
var tokensMap = new Map(); //tokens armazenados em memoria
function createUser(req, res, next) {
    MongoClient.connect(config_1.NOSQL_URL, function (err, client) {
        if (err)
            console.log(err);
        var db = client.db(config_1.NOSQL_DATABASE);
        let { username, password, email, apelido } = req.body;
        //criando usuario
        var user = {
            login: username,
            password: criptoHash.generate(password),
            email: email,
            apelido: apelido
        };
        db.collection("users").findOne({
            $or: [
                { login: username },
                { email: email }
            ]
        }, function (error, result) {
            if (error)
                return res.status(500).send("ERRO INTERNO - tente novamente mais tarde");
            if (result != undefined)
                return res.status(401).send("USUÁRIO OU EMAIL JÁ EXISTENTE");
            db.collection("users").insertOne(user, function (err, result) {
                if (err)
                    return res.status(500).send("ERRO INTERNO - tente novamente mais tarde");
                res.status(200).send({ message: "successo!" });
                client.close();
            });
        });
    });
}
function login(req, res, next) {
    const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
    const [username, password] = Buffer.from(b64auth, 'base64').toString().split(':');
    console.log(username, password);
    MongoClient.connect(config_1.NOSQL_URL, function (err, client) {
        var db = client.db(config_1.NOSQL_DATABASE);
        const userCollection = db.collection("users");
        userCollection.findOne({ "login": username }).then((usuario) => {
            if (criptoHash.verify(password, usuario.password)) {
                var token = randtoken.generate(16);
                //salvando valores num Map
                tokensMap.set(token, {
                    username: username,
                    generateDate: Date.now()
                });
                res.send({ token, apelido: usuario.apelido });
            }
            else {
                res.status(401).send('usuário ou senha incorretos');
            }
        }).catch((error) => {
            console.log(error);
            res.status(500).send('Erro ao verificar usuário/senha');
        });
    });
}
function authentication(req, res, next) {
    console.log("TESTE");
    if (req.headers.token == undefined)
        res.status(401).send("TOKEN NÃO INFORMADO");
    validateToken((req.headers.token || '').toString()).then(resp => {
        next();
    }).catch(error => {
        res.status(401).send(error);
    });
}
function validateToken(token) {
    return new Promise((resolve, reject) => {
        let result = tokensMap.get(token);
        if (!result)
            return reject(false);
        if (Date.now() - result.generateDate > config_1.TOKEN_ACCESS_TIME_MINUTES) {
            tokensMap.delete(token); //deletando token do map
            reject(false);
        }
        resolve(true);
    });
}
function listarUsuarios(req, res, next) {
    let texto = req.params.texto;
    console.log("listando: ", texto);
    MongoClient.connect(config_1.NOSQL_URL, function (err, client) {
        return __awaiter(this, void 0, void 0, function* () {
            if (err)
                return res.status(500).send(err);
            var db = client.db(config_1.NOSQL_DATABASE);
            let usuarios = yield db.collection("users").find({
                apelido: { $regex: texto }
            }).project({ apelido: 1 }).toArray();
            return res.status(200).send(usuarios);
        });
    });
}
exports.default = {
    createUser,
    login,
    authentication,
    listarUsuarios
};
