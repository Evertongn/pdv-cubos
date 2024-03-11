const express = require('express')
require('dotenv').config()
const cors = require('cors');
const app = express()

const rotas = require("./rotas")


app.use(express.json())
app.use(rotas)


app.listen(3000, () =>
    console.log("Servidor iniciado com sucesso!")
);


