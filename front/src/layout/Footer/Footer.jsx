import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa'

import "./Footer.css"

function Footer() {
    return (
        <footer className='FooterStyle'>
            <ul>
                <li><FaFacebook /></li>
                <li><FaInstagram /></li>
                <li><FaLinkedin /></li>
            </ul>
            <p><span>Costs</span> &copy;2024</p>
        </footer>)
}

export default Footer