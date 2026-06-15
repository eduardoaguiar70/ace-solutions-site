import { Link } from 'react-router-dom'
import {
    ArrowRight,
    Bot,
    Workflow,
    BarChart3,
    Puzzle,
    ChevronDown,
    Zap,
    Target,
    Users,
    TrendingUp,
    Clock,
    CheckCircle2,
    Quote
} from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import founderPhoto from '../assets/founder.png'
import './HomePage.css'

function useScrollAnimation() {
    const ref = useRef(null)
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true) },
            { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
        )
        const el = ref.current
        if (el) observer.observe(el)
        return () => { if (el) observer.unobserve(el) }
    }, [])

    return [ref, visible]
}

function AnimatedSection({ children, className = '', delay = 0 }) {
    const [ref, visible] = useScrollAnimation()
    return (
        <div
            ref={ref}
            className={`${className} reveal-section ${visible ? 'is-visible' : ''}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    )
}

function HomePage() {
    const [openFaq, setOpenFaq] = useState(null)
    const [counterValues, setCounterValues] = useState({ a: 0, b: 0, c: 0 })
    const [heroRef, heroVisible] = useScrollAnimation()

    useEffect(() => {
        if (!heroVisible) return
        const targets = { a: 500, b: 85, c: 150 }
        const duration = 1800
        const steps = 60
        let step = 0
        const timer = setInterval(() => {
            step++
            const ease = 1 - Math.pow(1 - step / steps, 3)
            setCounterValues({
                a: Math.round(targets.a * ease),
                b: Math.round(targets.b * ease),
                c: Math.round(targets.c * ease)
            })
            if (step >= steps) clearInterval(timer)
        }, duration / steps)
        return () => clearInterval(timer)
    }, [heroVisible])

    const services = [
        { icon: <Workflow size={22} />, tag: '01', title: 'Automação de Processos', description: 'Elimine tarefas manuais e libere sua equipe para o que realmente importa.' },
        { icon: <Bot size={22} />, tag: '02', title: 'Chatbots com IA', description: 'Atendimento 24/7 que qualifica leads e responde clientes no exato momento.' },
        { icon: <BarChart3 size={22} />, tag: '03', title: 'Análise de Dados', description: 'Dashboards e relatórios automáticos para decisões mais rápidas e certeiras.' },
        { icon: <Puzzle size={22} />, tag: '04', title: 'Integrações', description: 'Conecte seus sistemas e crie um ecossistema digital coeso e eficiente.' }
    ]

    const steps = [
        { number: '01', title: 'Diagnóstico', description: 'Analisamos seus processos e mapeamos oportunidades com ROI real.' },
        { number: '02', title: 'Planejamento', description: 'Desenhamos a solução com cronograma definido e metas claras.' },
        { number: '03', title: 'Implementação', description: 'Desenvolvemos e integramos com acompanhamento em tempo real.' },
        { number: '04', title: 'Otimização', description: 'Monitoramos, ajustamos e maximizamos continuamente os resultados.' }
    ]

    const benefits = [
        { icon: <TrendingUp size={16} />, text: 'Reduza custos operacionais em até 60%' },
        { icon: <Users size={16} />, text: 'Libere sua equipe para tarefas estratégicas' },
        { icon: <Clock size={16} />, text: 'Atenda clientes 24 horas por dia, 7 dias por semana' },
        { icon: <Target size={16} />, text: 'Escale seu negócio sem aumentar headcount' },
        { icon: <BarChart3 size={16} />, text: 'Tome decisões baseadas em dados reais' },
        { icon: <Puzzle size={16} />, text: 'Integre todas as suas ferramentas em um só lugar' }
    ]

    const faqs = [
        { question: 'Quanto tempo leva para implementar?', answer: 'Dependendo da complexidade, de 1 a 8 semanas. Na primeira conversa, fornecemos um cronograma detalhado e realista.' },
        { question: 'Preciso de conhecimento técnico?', answer: 'Não. Nossas soluções são intuitivas e oferecemos treinamento completo para toda a sua equipe.' },
        { question: 'Funciona com os sistemas que já uso?', answer: 'Sim. Integramos com CRMs, ERPs, e-commerce, marketing e praticamente qualquer ferramenta do mercado.' },
        { question: 'Qual o investimento?', answer: 'Cada projeto é único. Agende uma conversa para receber uma proposta personalizada com ROI projetado.' }
    ]

    return (
        <main className="home">

            {/* ── HERO ─────────────────────────────── */}
            <section className="hero" aria-label="Hero">
                <div className="hero-noise" aria-hidden="true" />

                <div className="container hero-inner" ref={heroRef}>
                    <div className={`hero-top ${heroVisible ? 'hero-animate' : ''}`}>
                        <span className="hero-eyebrow">
                            <Zap size={12} /> Automação &amp; Inteligência Artificial
                        </span>
                        <h1 className="hero-title">
                            Automatize.<br />
                            <em>Escale.</em><br />
                            <span className="hero-title-accent">Domine.</span>
                        </h1>
                        <p className="hero-desc">
                            Soluções de IA que transformam processos manuais em<span className="hero-br" />{' '}
                            vantagem competitiva real — com ROI mensurável.
                        </p>
                        <div className="hero-actions">
                            <Link to="/contato" className="btn btn-primary-blue btn-lg" id="hero-cta-primary">
                                Diagnóstico Gratuito
                                <ArrowRight size={18} />
                            </Link>
                            <a href="#como-funciona" className="btn btn-ghost-white btn-lg" id="hero-cta-secondary">
                                Como funciona
                            </a>
                        </div>
                    </div>

                    <div className={`hero-metrics ${heroVisible ? 'hero-animate' : ''}`}>
                        <div className="metric-item">
                            <span className="metric-value">{counterValues.a}<sup>+</sup></span>
                            <span className="metric-label">Processos Automatizados</span>
                        </div>
                        <div className="metric-divider" aria-hidden="true" />
                        <div className="metric-item">
                            <span className="metric-value">{counterValues.b}<sup>%</sup></span>
                            <span className="metric-label">Redução de Tempo Médio</span>
                        </div>
                        <div className="metric-divider" aria-hidden="true" />
                        <div className="metric-item">
                            <span className="metric-value">{counterValues.c}<sup>+</sup></span>
                            <span className="metric-label">Empresas Atendidas</span>
                        </div>
                        <div className="metric-divider" aria-hidden="true" />
                        <div className="metric-item">
                            <span className="metric-value">24<sup>/7</sup></span>
                            <span className="metric-label">Suporte Disponível</span>
                        </div>
                    </div>
                </div>

                <div className="hero-scroll-hint" aria-hidden="true">
                    <ChevronDown size={18} />
                </div>
            </section>

            {/* ── BENEFITS ─────────────────────────── */}
            <section className="section benefits-section" aria-label="Benefícios">
                <div className="container">
                    <AnimatedSection className="benefits-header-block">
                        <span className="section-tag">Por que a ACE?</span>
                        <h2 className="section-heading">
                            O que você ganha quando para<br />
                            de operar no <span className="text-accent">manual</span>
                        </h2>
                    </AnimatedSection>

                    <div className="benefits-grid">
                        {benefits.map((b, i) => (
                            <AnimatedSection key={i} delay={i * 50}>
                                <div className="benefit-row">
                                    <span className="benefit-icon" aria-hidden="true">{b.icon}</span>
                                    <span className="benefit-text">{b.text}</span>
                                    <CheckCircle2 size={15} className="benefit-check" aria-hidden="true" />
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>

                    <AnimatedSection delay={350} className="benefits-footer">
                        <Link to="/contato" className="btn btn-primary-blue" id="benefits-cta">
                            Quero transformar minha operação
                            <ArrowRight size={16} />
                        </Link>
                    </AnimatedSection>
                </div>
            </section>

            {/* ── SERVICES ─────────────────────────── */}
            <section id="servicos" className="section services-section" aria-label="Serviços">
                <div className="container">
                    <AnimatedSection className="section-header">
                        <span className="section-tag">Soluções</span>
                        <h2 className="section-heading">O que entregamos</h2>
                    </AnimatedSection>

                    <div className="services-stack">
                        {services.map((svc, i) => (
                            <AnimatedSection key={i} delay={i * 70}>
                                <div className="service-row" id={`service-${i + 1}`}>
                                    <span className="service-tag">{svc.tag}</span>
                                    <div className="service-icon-wrap" aria-hidden="true">{svc.icon}</div>
                                    <div className="service-body">
                                        <h3 className="service-title">{svc.title}</h3>
                                        <p className="service-desc">{svc.description}</p>
                                    </div>
                                    <ArrowRight size={16} className="service-arrow" aria-hidden="true" />
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── HOW IT WORKS ─────────────────────── */}
            <section id="como-funciona" className="section steps-section" aria-label="Como Funciona">
                <div className="container">
                    <AnimatedSection className="section-header">
                        <span className="section-tag">Metodologia</span>
                        <h2 className="section-heading">
                            Do diagnóstico ao resultado<br />
                            em <span className="text-accent">4 etapas</span>
                        </h2>
                    </AnimatedSection>

                    <div className="steps-track">
                        {steps.map((step, i) => (
                            <AnimatedSection key={i} delay={i * 100} className="step-wrap">
                                <div className="step-card" id={`step-${i + 1}`}>
                                    <span className="step-num" aria-hidden="true">{step.number}</span>
                                    <h3 className="step-title">{step.title}</h3>
                                    <p className="step-desc">{step.description}</p>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── QUEM SOMOS ───────────────────────── */}
            <section id="quem-somos" className="section founder-section" aria-label="Quem Somos">
                <div className="container">
                    <AnimatedSection className="founder-grid">
                        {/* Foto */}
                        <div className="founder-visual">
                            <div className="founder-photo-frame">
                                <img
                                    src={founderPhoto}
                                    alt="Foto do Fundador da ACE Solutions"
                                    className="founder-photo"
                                    loading="lazy"
                                />
                            </div>
                            <div className="founder-badge">
                                <Zap size={12} />
                                Especialista em IA e Automação
                            </div>
                        </div>

                        {/* Texto */}
                        <div className="founder-content">
                            <span className="section-tag">Quem Somos</span>
                            <h2 className="founder-heading">
                                Da operação manual à<br />
                                eficiência extrema com<br />
                                <span className="text-accent">Inteligência Artificial.</span>
                            </h2>

                            <div className="founder-quote-block">
                                <Quote size={26} className="founder-quote-icon" aria-hidden="true" />
                                <p className="founder-quote-text">
                                    Meu trabalho não é vender teorias, é resolver gargalos operacionais. Como desenvolvedor de sistemas, já estruturei fluxos de automação e introduzi agentes de IA na operação de mais de 20 negócios. Eu construo a inteligência nos bastidores para que a sua equipe pare de fazer trabalho robótico e passe a focar no que realmente importa: o crescimento estratégico da sua empresa.
                                </p>
                            </div>

                            <div className="founder-name-block">
                                <span className="founder-name">Edu Aguiar</span>
                                <span className="founder-role">Especialista em IA e Automação, ACE Solutions</span>
                            </div>

                            <Link to="/contato" className="btn btn-outline-accent" id="founder-cta">
                                Fale diretamente comigo
                                <ArrowRight size={15} />
                            </Link>
                        </div>
                    </AnimatedSection>
                </div>
            </section>

            {/* ── FAQ ──────────────────────────────── */}
            <section id="faq" className="section faq-section" aria-label="Perguntas Frequentes">
                <div className="container">
                    <AnimatedSection className="section-header">
                        <span className="section-tag">Dúvidas</span>
                        <h2 className="section-heading">Perguntas Frequentes</h2>
                    </AnimatedSection>

                    <div className="faq-list" role="list">
                        {faqs.map((faq, i) => (
                            <AnimatedSection key={i} delay={i * 60}>
                                <div
                                    className={`faq-item ${openFaq === i ? 'is-open' : ''}`}
                                    role="listitem"
                                >
                                    <button
                                        className="faq-trigger"
                                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                        aria-expanded={openFaq === i}
                                        id={`faq-btn-${i}`}
                                    >
                                        <span>{faq.question}</span>
                                        <ChevronDown size={17} className="faq-chevron" aria-hidden="true" />
                                    </button>
                                    <div className="faq-body">
                                        <p>{faq.answer}</p>
                                    </div>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA FINAL ────────────────────────── */}
            <section className="section cta-final-section" aria-label="Chamada para ação">
                <div className="container">
                    <AnimatedSection className="cta-final-block">
                        <span className="cta-final-tag">
                            <Zap size={12} /> Próximo passo
                        </span>
                        <h2 className="cta-final-heading">
                            Pronto para parar de perder<br />
                            tempo com o que pode<br />
                            ser <span className="text-accent">automático?</span>
                        </h2>
                        <p className="cta-final-sub">
                            Agende um diagnóstico gratuito e em 30 minutos você saberá exatamente onde sua empresa está perdendo dinheiro.
                        </p>
                        <Link to="/contato" className="btn btn-primary-blue btn-xl" id="cta-final-btn">
                            Agendar Diagnóstico Gratuito
                            <ArrowRight size={20} />
                        </Link>
                        <p className="cta-final-note">Sem compromisso · 100% gratuito · Resposta em até 24h</p>
                    </AnimatedSection>
                </div>
            </section>

        </main>
    )
}

export default HomePage
