
import { Response, Request, NextFunction } from 'express';
import { TOKEN_ACCESS_TIME_MINUTES, NOSQL_URL, NOSQL_DATABASE } from '../config';

// import storeMultipleFiles from '../lib/documents';
// import userSchema from '../lib/validators/user';
// import patientSchema from '../lib/validators/patient';

const MongoClient = require('mongodb').MongoClient; //biblioteca para conectar ao mongodb
const criptoHash = require('password-hash'); //biblioteca para encriptar a senha
var randtoken = require('rand-token'); //gera um token aleatório
var tokensMap = new Map() //tokens armazenados em memoria

function createUser( req: Request, res: Response, next: NextFunction ) {
    MongoClient.connect(NOSQL_URL, function (err: any, client: any) {
        if(err) console.log(err);
        var db = client.db(NOSQL_DATABASE);

        let { username, password, email, apelido } = req.body
        //criando usuario
        var user = {
            login: username,
            password: criptoHash.generate(password),
            email: email,
            apelido: apelido
        }
        
        db.collection("users").findOne({
            $or: [
                {login: username},
                {email: email}
            ]
        }, function(error: any, result: any){
            if(error) return res.status(500).send("ERRO INTERNO - tente novamente mais tarde")
            if(result != undefined) return res.status(401).send("USUÁRIO OU EMAIL JÁ EXISTENTE")

            db.collection("users").insertOne(user, function (err:any , result: any) {
                if (err) return res.status(500).send("ERRO INTERNO - tente novamente mais tarde")
                res.status(200).send({message: "successo!"})
                client.close();
            })
        })
    });
}

function login( req: Request, res: Response, next: NextFunction ) {
    const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
    const [username, password] = Buffer.from(b64auth, 'base64').toString().split(':')

    MongoClient.connect(NOSQL_URL, function(err: string, client: any){
        var db = client.db(NOSQL_DATABASE);
        const userCollection = db.collection("users")

        userCollection.findOne({"login": username}).then((usuario: any)=>{

            if(criptoHash.verify(password, usuario.password)){
                var token = randtoken.generate(16)
                //salvando valores num Map
                tokensMap.set(token, {
                    username: username, 
                    generateDate: Date.now() 
                })
                res.send({token, apelido:usuario.apelido})
            } else {
                res.status(401).send('usuário ou senha incorretos')
            }
        }).catch((error: any)=>{
            console.log(error);
            res.status(500).send('Erro ao verificar usuário/senha')
        })

    })
}

function authentication( req: Request, res: Response, next: NextFunction ) {
    console.log("TESTE");
    if (req.headers.token == undefined) res.status(401).send("TOKEN NÃO INFORMADO")
    validateToken((req.headers.token || '').toString()).then(resp => {
        next()
    }).catch(error => {
        res.status(401).send(error)
    })
} 

function validateToken(token: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
        let result = tokensMap.get(token)
        if(!result) return reject(false)

        if(Date.now() - result.generateDate > TOKEN_ACCESS_TIME_MINUTES){
            tokensMap.delete(token) //deletando token do map
            reject(false)
        }
        resolve(true)
    })
}

export default {
    createUser,
    login,
    authentication
};



