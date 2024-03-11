import React, { useState } from 'react'
import Input from '../../Components/input/index'
import Botao from '../../Components/Botao/index'
import UserService from '../../Services/UserService'
import { NavLink, useNavigate } from 'react-router-dom'

import "./cadastro.css"
const userService = new UserService()

const Cadastro = () => {
    const [form, setForm] = useState([])
    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await userService.cadastrar({
                nome: form.nome,
                email: form.email,
                senha: form.password,
            })
            if (data) {
                const responseLogin = await userService.login({
                    email: form.email,
                    senha: form.password
                })
                if (responseLogin === true) {
                    alert('usuário Cadastrado com Sucesso')
                    navigate('/home')
                }
            }
        }
        catch (err) {
            alert('Algo deu errado com o Cadastro' + err)
        }
    }

    const handleChange = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    return (
        <div className='container'>
            <div className='form'>
                <h1>Faça o seu Cadastro 👋</h1>
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
                <Botao
                    type='submit'
                    text='Efetuar Cadastro!'
                    onClick={handleSubmit}
                />
                <div className='SubContainerSign'>
                    <p>Já possui conta?</p>
                    <NavLink to="/login">Login</NavLink>
                </div>
            </div>
        </div>

    )
}

export default Cadastro;