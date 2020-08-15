import { Response, Request, NextFunction } from 'express';
import { NOSQL_URL, NOSQL_DATABASE } from '../config';
import { reject, resolve } from 'bluebird';

const MongoClient = require('mongodb').MongoClient; //biblioteca para conectar ao mongodb

function test( req: Request, res: Response, next: NextFunction ) {
    res.status(200).send("OK")
}

function listarEquipes(req: Request, res: Response, next: NextFunction ){
    let texto = req.params.texto
    MongoClient.connect(NOSQL_URL, function (err: any, client: any) {
        if(err) return res.status(500).send(err)
        var db = client.db(NOSQL_DATABASE);

        let equipes = db.collection("teams").find({
            nome: { $regex: texto } 
        }).toArray()

        return res.status(200).send(equipes)
    })
}

function listarEquipesPorUsuario(req: Request, res: Response, next: NextFunction ){
    let login = req.params.login
    console.log(login);
    MongoClient.connect(NOSQL_URL, async function (err: any, client: any) {
        if(err) return res.status(500).send(err)
        var db = client.db(NOSQL_DATABASE);

        let equipes = await db.collection("teams").find({
            usuarios: { $elemMatch: { $regex: login } }
        }).toArray()
        
        return res.status(200).send(equipes)
    })
}

function criarEquipe(req: Request, res: Response, next: NextFunction ){
    let equipe = req.body.equipe
    MongoClient.connect(NOSQL_URL, function (err: any, client: any) {
        var db = client.db(NOSQL_DATABASE);

        db.collection("teams").insertOne(equipe, function(err:any, result:any){
            if(err) return res.status(500).send("ERRO INTERNO - tente novamente mais tarde")
            res.status(200).send({message: "successo!"})
            client.close();
        })
    })
}


export default {
    test,
    listarEquipes,
    criarEquipe,
    listarEquipesPorUsuario
};

