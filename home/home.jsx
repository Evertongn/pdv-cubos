import "./home.css"

import savings from '../../img/savings.svg'

function Home() {
    return (
        <div className="home">
            <h1>Bem-vindo ao <span>PDV-Cubos</span></h1>
            <p>Começe a gerenciar seus produtos, pedidos e clientes!</p>
            <img src={savings} alt="PDV-Cubos" />
        </div>
    )
}

export default Home