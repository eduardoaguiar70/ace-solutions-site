import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, Linkedin, Instagram, Youtube } from 'lucide-react'
import aceLogo from '../assets/ace-logo.png'
import './Footer.css'

function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-brand">
                        <Link to="/" className="footer-logo">
                            <img src={aceLogo} alt="ACE Solutions" className="footer-logo-image" />
                        </Link>
                        <p className="footer-description">
                            Transformamos empresas através de soluções inteligentes de IA e automação.
                            Sua jornada para a eficiência começa aqui.
                        </p>
                        <div className="footer-social">
                            <a href="https://www.linkedin.com/in/eduaguiarai/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
                                <Linkedin size={20} />
                            </a>
                            <a href="https://www.instagram.com/eduaguiar.ai" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram">
                                <Instagram size={20} />
                            </a>
                            <a href="https://www.youtube.com/@eduaguiarai" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="YouTube">
                                <Youtube size={20} />
                            </a>
                        </div>
                    </div>

                    <div className="footer-links-section">
                        <h4 className="footer-title">Links Rápidos</h4>
                        <ul className="footer-links">
                            <li><a href="/#servicos">Serviços</a></li>
                            <li><a href="/#como-funciona">Como Funciona</a></li>
                            <li><a href="/#faq">FAQ</a></li>
                            <li><Link to="/contato">Contato</Link></li>
                        </ul>
                    </div>

                    <div className="footer-links-section">
                        <h4 className="footer-title">Serviços</h4>
                        <ul className="footer-links">
                            <li><a href="/#servicos">Automação de Processos</a></li>
                            <li><a href="/#servicos">Chatbots Inteligentes</a></li>
                            <li><a href="/#servicos">Análise de Dados com IA</a></li>
                            <li><a href="/#servicos">Integrações Personalizadas</a></li>
                        </ul>
                    </div>

                    <div className="footer-links-section">
                        <h4 className="footer-title">Contato</h4>
                        <ul className="footer-contact">
                            <li>
                                <Mail size={16} />
                                <span>acesolucoesai@gmail.com</span>
                            </li>
                            <li>
                                <MapPin size={16} />
                                <span>Fortaleza, Brasil</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {currentYear} ACE Solutions. Todos os direitos reservados.</p>
                    <div className="footer-bottom-links">
                        <a href="#">Política de Privacidade</a>
                        <a href="#">Termos de Uso</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
