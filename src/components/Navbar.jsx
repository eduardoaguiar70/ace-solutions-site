import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import aceLogo from '../assets/ace-logo.png'
import './Navbar.css'

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/#servicos', label: 'Serviços' },
    { path: '/#como-funciona', label: 'Como Funciona' },
    { path: '/#quem-somos', label: 'Quem Somos' },
    { path: '/#faq', label: 'FAQ' },
  ]

  const handleNavClick = (path) => {
    setIsMenuOpen(false)
    if (path.includes('#')) {
      const id = path.split('#')[1]
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo">
          <img src={aceLogo} alt="ACE Solutions" className="logo-image" />
        </Link>

        <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <ul className="navbar-links">
            {navLinks.map((link) => (
              <li key={link.path}>
                <a
                  href={link.path}
                  className={`navbar-link ${location.pathname === link.path ? 'active' : ''}`}
                  onClick={() => handleNavClick(link.path)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <Link to="/contato" className="btn btn-primary navbar-cta" onClick={() => setIsMenuOpen(false)}>
            Fale Conosco
          </Link>
        </div>

        <button
          className="navbar-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </nav>
  )
}

export default Navbar
