import { useState } from "react"
import Model from "react-modal"
import "./Usuario.css"
import UserService from '../../Services/UserService'

import Input from "../../Components/input"
import Botao from "../../Components/Botao"

const userService = new UserService()

function Usuario({ setarBotao }) {

    const nome = localStorage.getItem('nome')
    const email = localStorage.getItem('email')
    const token = localStorage.getItem('token')

    const [ModalIsOpen, setModalIsOpen] = useState(false);
    const [form, setForm] = useState([])

    function openModal() {
        setModalIsOpen(true);
        setarBotao(true)
    }

    function closeModal() {
        setModalIsOpen(false);
        setarBotao(false)
    }
    const handleChange = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await userService.atualizar({
                nome: form.nome,
                email: form.email,
                senha: form.password,
            }, token);
            localStorage.setItem("nome", form.nome)
            localStorage.setItem("email", form.email)
            setModalIsOpen(false)
        }
        catch (err) {
            alert('Algo deu errado com o Cadastro' + err)
        }
    }



    return (
        <div className="ContainerUsuario">
            <Model overlayClassName={"overlay"} className={"modalUsuario"} isOpen={ModalIsOpen} onRequestClose={closeModal}>
                <form>
                    <h1>Edite suas informaçoes ✏️</h1>
                    <Input
                        name='nome'
                        placeholder='Digite o seu nome'
                        onChange={handleChange}
                        type='text'
                    />
                    <Input
                        name='email'
                        placeholder='Digite o seu e-mail'
                        onChange={handleChange}
                        type='email'
                    />
                    <Input
                        name='password'
                        placeholder='Digite a sua senha'
                        onChange={handleChange}
                        type='password'
                    />
                    <div className="flex">
                        <Botao disabled={!ModalIsOpen} type='submit' onClick={handleSubmit} text='Enviar!' />
                        <Botao disabled={!ModalIsOpen} type='clcik' onClick={closeModal} text='voltar!' />
                    </div>
                </form>
            </Model>
            <h2>Dados da conta</h2>
            <div className="borda">
                <div className="dados">
                    <div className="inicio">
                        <h4>Nome Completo</h4>
                    </div>
                    <div className="fim">
                        <p>{nome}</p>
                    </div>
                </div>
                <div className="dados">
                    <div className="inicio">
                        <h4>E-mail</h4>
                    </div>
                    <div className="fim">
                        <p>{email}</p>
                    </div>
                </div>
            </div>
            <Botao disabled={ModalIsOpen} onClick={openModal} text='Editar!' />
        </div >

    )
}

export default Usuario