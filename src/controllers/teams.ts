import { Response, Request, NextFunction } from 'express';
import { NOSQL_URL, NOSQL_DATABASE } from '../config';
import { reject, resolve } from 'bluebird';

const MongoClient = require('mongodb').MongoClient; //biblioteca para conectar ao mongodb
const ObjectId = require('mongodb').ObjectId; 

function getScore(mood: string){
    if(mood == 'AMAZING') return 4
    if(mood == 'HAPPY') return 3
    if(mood == 'NOTGOOD') return 2
    if(mood == 'BAD') return 1
}

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

function avaliarDia(req: Request, res: Response, next: NextFunction ){
    let { team, login, mood } = req.body
    let userScore = getScore(mood)
    let date = new Date(Date.now())
    date.setHours(0,0,0,0);
    
    MongoClient.connect(NOSQL_URL, function (err: any, client: any) {
        var db = client.db(NOSQL_DATABASE);

        db.collection("teams").findOne({_id: new ObjectId(team)}, function(err:any, team:any){
            if(err) return res.status(500).send("ERRO INTERNO - tente novamente mais tarde")
            console.log(team);
            let index = team.data.findIndex((d: any)=> d.date == date.getTime())
            if(index == -1){
                team.data = [{
                    date: date.getTime(),
                    averageScore: userScore,
                    evaluations: [{
                        login: login,
                        userScore: userScore
                    }]
                }]
            }else{
                team.data[index].evaluations.push({
                    login: login,
                    userScore: userScore
                })
                let totalEv = team.data[index].evaluations.length
                let sum = team.data[index].evaluations.reduce((a: any,b: any)=> parseInt(a.userScore || a) + parseInt(b.userScore))
                team.data[index].averageScore = sum/totalEv
            }

            db.collection('teams').updateOne({ _id: team._id }, {
                $set: {
                    data: team.data
                }
            }).then((resp: any)=>{
                res.status(200).send(team)
            }, (error: any)=>{
                res.status(500).send("ERROR")
            })
        })
    })

}

export default {
    test,
    listarEquipes,
    criarEquipe,
    listarEquipesPorUsuario,
    avaliarDia
};

