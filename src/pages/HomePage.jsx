import { Link } from 'react-router-dom'
import {
    ArrowRight,
    Bot,
    Workflow,
    BarChart3,
    Puzzle,
    CheckCircle,
    ChevronDown,
    Zap
} from 'lucide-react'
import { useState } from 'react'
import './HomePage.css'

function HomePage() {
    const [openFaq, setOpenFaq] = useState(null)

    const services = [
        {
            icon: <Workflow size={28} />,
            title: 'Automação de Processos',
            description: 'Elimine tarefas manuais e aumente a produtividade da sua equipe.'
        },
        {
            icon: <Bot size={28} />,
            title: 'Chatbots com IA',
            description: 'Atendimento 24/7 que qualifica leads e responde clientes automaticamente.'
        },
        {
            icon: <BarChart3 size={28} />,
            title: 'Análise de Dados',
            description: 'Dashboards e relatórios automatizados para decisões mais rápidas.'
        },
        {
            icon: <Puzzle size={28} />,
            title: 'Integrações',
            description: 'Conecte seus sistemas e crie um ecossistema digital integrado.'
        }
    ]

    const steps = [
        {
            number: '01',
            title: 'Diagnóstico',
            description: 'Analisamos seus processos e identificamos oportunidades.'
        },
        {
            number: '02',
            title: 'Planejamento',
            description: 'Desenhamos a solução com ROI claro e cronograma definido.'
        },
        {
            number: '03',
            title: 'Implementação',
            description: 'Desenvolvemos e integramos com acompanhamento em tempo real.'
        },
        {
            number: '04',
            title: 'Otimização',
            description: 'Monitoramos e refinamos para maximizar resultados.'
        }
    ]

    const stats = [
        { value: '500+', label: 'Processos Automatizados' },
        { value: '85%', label: 'Redução de Tempo' },
        { value: '150+', label: 'Empresas Atendidas' },
        { value: '24/7', label: 'Suporte Disponível' }
    ]

    const benefits = [
        'Reduza custos operacionais em até 60%',
        'Libere sua equipe para tarefas estratégicas',
        'Atenda clientes 24 horas por dia',
        'Escale seu negócio sem aumentar headcount',
        'Tome decisões baseadas em dados reais',
        'Integre todas as suas ferramentas'
    ]

    const faqs = [
        {
            question: 'Quanto tempo leva para implementar?',
            answer: 'Dependendo da complexidade, de 1 a 8 semanas. Na primeira conversa, fornecemos um cronograma detalhado.'
        },
        {
            question: 'Preciso de conhecimento técnico?',
            answer: 'Não. Nossas soluções são intuitivas e oferecemos treinamento completo para sua equipe.'
        },
        {
            question: 'Funciona com os sistemas que já uso?',
            answer: 'Sim. Integramos com CRMs, ERPs, e-commerce, marketing e praticamente qualquer ferramenta.'
        },
        {
            question: 'Qual o investimento?',
            answer: 'Cada projeto é único. Agende uma conversa para receber um orçamento personalizado.'
        }
    ]

    return (
        <main className="home">
            {/* Hero Section */}
            <section className="hero">
                <div className="container">
                    <div className="hero-content">
                        <h1 className="hero-title">
                            Automatize processos.
                            <br />
                            <span className="gradient-text">Acelere resultados.</span>
                        </h1>
                        <p className="hero-subtitle">
                            Soluções de IA e automação que reduzem custos e multiplicam a eficiência da sua empresa.
                        </p>
                        <div className="hero-cta">
                            <Link to="/contato" className="btn btn-primary btn-lg">
                                Agendar Diagnóstico Gratuito
                                <ArrowRight size={20} />
                            </Link>
                        </div>
                        <div className="hero-stats">
                            {stats.map((stat, index) => (
                                <div key={index} className="hero-stat">
                                    <span className="hero-stat-value">{stat.value}</span>
                                    <span className="hero-stat-label">{stat.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="hero-bg">
                    <div className="hero-glow hero-glow-1"></div>
                    <div className="hero-glow hero-glow-2"></div>
                </div>
            </section>

            {/* Benefits Section - Simple List */}
            <section className="section benefits-section">
                <div className="container">
                    <div className="benefits-wrapper">
                        <div className="benefits-header">
                            <h2 className="section-title">
                                Por que escolher a <span className="gradient-text">ACE Solutions</span>?
                            </h2>
                        </div>
                        <div className="benefits-list">
                            {benefits.map((benefit, index) => (
                                <div key={index} className="benefit-item">
                                    <CheckCircle size={20} className="benefit-check" />
                                    <span>{benefit}</span>
                                </div>
                            ))}
                        </div>
                        <div className="benefits-cta">
                            <Link to="/contato" className="btn btn-primary">
                                Quero saber mais
                                <ArrowRight size={18} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section id="servicos" className="section services-section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">
                            Nossas <span className="gradient-text">Soluções</span>
                        </h2>
                    </div>
                    <div className="services-grid">
                        {services.map((service, index) => (
                            <div key={index} className="service-card glass-card">
                                <div className="service-icon">{service.icon}</div>
                                <h3 className="service-title">{service.title}</h3>
                                <p className="service-description">{service.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section id="como-funciona" className="section steps-section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">
                            Como <span className="gradient-text">Funciona</span>
                        </h2>
                    </div>
                    <div className="steps-grid">
                        {steps.map((step, index) => (
                            <div key={index} className="step-card">
                                <div className="step-number">{step.number}</div>
                                <h3 className="step-title">{step.title}</h3>
                                <p className="step-description">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section id="faq" className="section faq-section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">
                            Perguntas <span className="gradient-text">Frequentes</span>
                        </h2>
                    </div>
                    <div className="faq-list">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className={`faq-item glass-card ${openFaq === index ? 'active' : ''}`}
                            >
                                <button
                                    className="faq-question"
                                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                >
                                    <span>{faq.question}</span>
                                    <ChevronDown size={20} className="faq-icon" />
                                </button>
                                <div className="faq-answer">
                                    <p>{faq.answer}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section cta-section">
                <div className="container">
                    <div className="cta-card">
                        <div className="cta-content">
                            <h2 className="cta-title">
                                Pronto para <span className="gradient-text">transformar</span> sua empresa?
                            </h2>
                            <p className="cta-subtitle">
                                Agende um diagnóstico gratuito e descubra seu potencial de automação.
                            </p>
                            <Link to="/contato" className="btn btn-primary btn-lg">
                                Agendar Diagnóstico Gratuito
                                <ArrowRight size={20} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default HomePage
