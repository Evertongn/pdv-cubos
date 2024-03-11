import React, { useState } from 'react'
import Input from "../../Components/input/index"
import Botao from '../../Components/Botao/index'
import UserService from '../../Services/UserService'
import { useNavigate, Link } from 'react-router-dom'
const userService = new UserService()

import "./login.css"

const Login = () => {
  const [loading, setLoading] = useState()

  const [form, setForm] = useState([])

  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true)
      const response = await userService.login(form)
      console.log('response do Login', response)
      if (response === true) {
        alert('usuário Logado com Sucesso')
        navigate('/home')
      }
      setLoading(false)
    }
    catch (err) {
      alert('Algo deu errado com o Login' + err)
    }
  }

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  return (
    <div className='container'>
      <div className='form'>
        <h1>Faça o seu Login 👋</h1>
        <Input
          name='email'
          placeholder='Digite o seu e-mail'
          onChange={handleChange}
          type='email'
        />
        <Input
          name='senha'
          placeholder='Digite a sua senha'
          onChange={handleChange}
          type='password'
        />
        <Botao
          type='submit'
          text='Entrar!'
          onClick={handleSubmit}
        />
        <div className='SubContainerSign'>
          <p>Não possui conta?</p>
          <Link to="/cadastrar">Cadastrar</Link>
        </div>
      </div>
    </div>
  )
}

export default Login
