const express = require('express');
const bodyParser = require("body-parser");
const path = require('path');
const cors = require("cors");
port = 3600;
const app = express();

const router = express.Router();

const connection = require("./database/database");
const UsuarioRouter = require("./router/usuarioRouter");
const ChamadoRouter = require("./router/chamadoRouter");


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
 


const start = async () =>{
    try {
        await connection.authenticate();
        console.log("Conexão estabelecida com sucesso.");
        await connection.sync({force: false});
        console.log("Tabelas sicronizadas.");
    } catch (error) {
        console.error("Não foi possivel conectar ao banco de dados: ", error)
    }
};

start();

app.use("/usuario", UsuarioRouter);
app.use("/chamado", ChamadoRouter);
app.use("/", router);

app.listen(port, ()=>{
    console.log(`A aplicação está rodando ${port}`);
})