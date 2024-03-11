import { Link, useNavigate } from 'react-router-dom'
import Botao from '../../Components/Botao'

import "./navbar.css"

import UserService from '../../Services/UserService'

import logo from '../../img/costs_logo.png'


function NavBar({ btnV }) {
    const userService = new UserService()
    const navigate = useNavigate()
    const Logout = async () => {
        await userService.logout()
        navigate("/login")
        return
    }
    return (
        <nav className='stylesNav' >
            <div className='ContainerNav'>
                <ul>
                    <li><Link to='/home'><img src={logo} alt='Costs' /></Link></li>
                    <li><Link to='/usuario'>Usuario</Link></li>
                    <li><Link to='/produto'>Produto</Link></li>
                    <li><Link to='/cliente'>Cliente</Link></li>
                    <li><Link to='/pedido'>Pedido</Link></li>
                    <Botao
                        disabled={btnV}
                        type='click'
                        text="Logout"
                        onClick={Logout}
                    />
                </ul>
            </div>
        </nav>)
}

export default NavBar