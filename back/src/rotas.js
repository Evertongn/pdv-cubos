const express = require("express")

const rotas = express.Router()

const listarCategorias = require("./controladores/categorias")
const { cadastrarUsuario, login, detalharUsuario, editarUsuario } = require('./controladores/usuario')
const autenticacao = require("./intermediarios/autenticacao")

//produtos
const { cadastroProduto, atualizarProduto, listarProdutos, detalharProduto, excluirProduto } = require('./controladores/produto')

//cliente
const { cadastroCliente, atualizarCliente, listarClientes, detalharCliente } = require("./controladores/cliente")

//pedido
const { listarPedido, cadastroPedido } = require("./controladores/pedido")

//Squemas
const { schemaUsuario, schemaLoginUsuario } = require('./Validacoes/squemaUsuario');
const schemaProduto = require('./Validacoes/squemaProduto')
const schemaCliente = require('./Validacoes/squemaCliente')
const schemaPedido = require('./Validacoes/squemaPedido')


//joi
const validarCorpoRequisicao = require('./intermediarios/validarCorpo');

rotas.post('/usuario', validarCorpoRequisicao(schemaUsuario), cadastrarUsuario)
rotas.post('/login', validarCorpoRequisicao(schemaLoginUsuario), login)
rotas.get('/categoria', listarCategorias)

rotas.use(autenticacao)

//rotas Usuario
rotas.get('/usuario', detalharUsuario)
rotas.put('/usuario', validarCorpoRequisicao(schemaUsuario), editarUsuario)

//rotas Produto
rotas.post('/produto', validarCorpoRequisicao(schemaProduto), cadastroProduto)
rotas.put('/produto/:id', validarCorpoRequisicao(schemaProduto), atualizarProduto);
rotas.get('/produto', listarProdutos)
rotas.get('/produto/:id', detalharProduto)
rotas.delete('/produto/:id', excluirProduto)

//rotas cliente
rotas.get("/cliente", listarClientes)
rotas.get("/cliente/:id", detalharCliente)
rotas.post('/cliente', validarCorpoRequisicao(schemaCliente), cadastroCliente)
rotas.put('/cliente/:id', validarCorpoRequisicao(schemaCliente), atualizarCliente);

//rotas Pedido
rotas.post('/pedido', validarCorpoRequisicao(schemaPedido), cadastroPedido)
rotas.get('/pedido', listarPedido)



module.exports = rotas