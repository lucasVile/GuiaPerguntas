const express = require("Express");
const app = express();
const bodyParser = require('body-parser');
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");
const Resposta = require("./database/Resposta");

connection  
    .authenticate()
    .then(() =>{
        console.log("Conexão feita com o banco de dados!")
    })
    .catch((msgErro)=>{
        console.log(msgErro);
    })

//Estou dizendo para o express usar o EJS como View engine
app.set("view engine","ejs");
app.use(express.static('public'));
//body parser
app.use(bodyParser.urlencoded({extend: true}));
app.use(bodyParser.json());
//Rotas
app.get("/perguntar", (req,res)=>{
    res.render("perguntar");
});

app.get("/",(req, res) =>{
    Pergunta.findAll({raw:true, order:[
        ['id','ASC']
    ]}).then(perguntas =>{
        console.log(perguntas); 
            res.render("index", {
            perguntas : perguntas
        });
    });   
});

app.post("/salvarpergunta",(req , res) =>{
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    Pergunta.create({
        titulo : titulo,
        descricao : descricao
    }).then(()=>{
        res.redirect("/");
    });
});

app.get("/pergunta/:id",(req, res)=>{
    var id = req.params.id;
    Pergunta.findOne({
        where: {id: id}
    }).then(pergunta =>{
        if(pergunta != undefined){
            res.render("pergunta",{
                pergunta: pergunta
            });
        }else{
            res.redirect("/");
        }
    });
});

app.post("/responder",(req, res)=>{
    var corpo = req.body.corpo;
    var perguntaId = req.body.perguntaId;
    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(()=>{
        res.redirect("/pergunta/"+perguntaId);
    }).catch(console.log);
});

app.listen(8080,()=>{console.log("App rodando!");});
