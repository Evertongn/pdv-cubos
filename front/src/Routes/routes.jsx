import { React, useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProtectedRoutes from '../Routes/ProtectedRoutes'

//Pages
import Login from '../pages/login/login'
import Cadastro from '../pages/Cadastro/cadastro'
import Home from "../pages/home/home"
import Usuario from "../pages/Usuario/Usuario"
import Produto from '../pages/Produto/Produto'
import ProdutoId from '../pages/Produto/ProdutoId'
import Cliente from "../pages/Cliente/Cliente"
import ClienteID from '../pages/Cliente/ClienteID'
import Pedido from "../pages/Pedido/Pedido"
import NovoProduto from "../pages/NovoProduto/NovoProduto"
import NovoCliente from '../pages/NovoCliente/NovoCliente'
import NovoPedido from '../pages/NovoPedido/NovoPedido'


//Layout
import NavBar from '../layout/Navbar/Navbar'
import Footer from '../layout/Footer/Footer'




const Routering = () => {

    const [btnV, setbtnv] = useState(false)

    function setarBotao(visivel) {
        setbtnv(visivel)
    }

    return (
        <Router>
            <Routes>
                <Route path="*" element={
                    <ProtectedRoutes>
                        <NavBar btnV={btnV} />
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/home" element={<Home />} />
                            <Route path="/usuario" element={<Usuario setarBotao={setarBotao} />} />
                            <Route path="/produto" element={<Produto />} />
                            <Route path="/novoProduto" element={<NovoProduto />} />
                            <Route path="/NovoCliente" element={<NovoCliente />} />
                            <Route path="/cliente" element={<Cliente />} />
                            <Route path="/pedido" element={<Pedido />} />
                            <Route path="/novoPedido" element={<NovoPedido />} />
                            <Route path="/produto/:id" element={<ProdutoId />} />
                            <Route path="/cliente/:id" element={<ClienteID />} />
                        </Routes>
                        <Footer />
                    </ProtectedRoutes>} />
                <Route path="/login" element={<Login />} />
                <Route path="/cadastrar" element={<Cadastro />} />
            </Routes>
        </Router>
    );
}

export default Routering;