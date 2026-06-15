import { useState } from 'react'
import { Send, CheckCircle, Loader2, Sparkles } from 'lucide-react'
import { supabase } from '../lib/supabase'
import './ContactPage.css'

function ContactPage() {
    const [formData, setFormData] = useState({
        nome_completo: '',
        email_corporativo: '',
        telefone_whatsapp: '',
        nome_empresa: '',
        linkedin_instagram: '',
        setor_atuacao: '',
        numero_colaboradores: '',
        cargo: '',
        faixa_investimento: '',
        principal_objetivo: [],
        desafio_empresa: ''
    })
    const [status, setStatus] = useState('idle') // idle, loading, success, error
    const [errors, setErrors] = useState({})

    const setoresOptions = [
        'Tecnologia',
        'Varejo / E-commerce',
        'Serviços Financeiros',
        'Saúde',
        'Educação',
        'Indústria / Manufatura',
        'Logística',
        'Consultoria',
        'Marketing / Publicidade',
        'Outro'
    ]

    const cargosOptions = [
        'CEO / Fundador',
        'Diretor(a)',
        'Gerente',
        'Coordenador(a)',
        'Analista',
        'Desenvolvedor(a)',
        'Consultor(a)',
        'Outro'
    ]

    const investimentoOptions = [
        'Até R$ 5.000/mês',
        'R$ 5.000 - R$ 15.000/mês',
        'R$ 15.000 - R$ 50.000/mês',
        'Acima de R$ 50.000/mês',
        'Ainda não definido'
    ]

    const objetivosOptions = [
        'Automatizar processos internos',
        'Melhorar atendimento ao cliente',
        'Reduzir custos operacionais',
        'Aumentar vendas e marketing',
        'Outro'
    ]

    const validateForm = () => {
        const newErrors = {}

        if (!formData.nome_completo.trim()) {
            newErrors.nome_completo = 'Nome é obrigatório'
        }

        if (!formData.email_corporativo.trim()) {
            newErrors.email_corporativo = 'E-mail é obrigatório'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email_corporativo)) {
            newErrors.email_corporativo = 'E-mail inválido'
        }

        if (!formData.nome_empresa.trim()) {
            newErrors.nome_empresa = 'Nome da empresa é obrigatório'
        }

        if (!formData.setor_atuacao) {
            newErrors.setor_atuacao = 'Setor é obrigatório'
        }

        if (!formData.numero_colaboradores) {
            newErrors.numero_colaboradores = 'Selecione o número de colaboradores'
        }

        if (!formData.cargo) {
            newErrors.cargo = 'Cargo é obrigatório'
        }

        if (formData.principal_objetivo.length === 0) {
            newErrors.principal_objetivo = 'Selecione pelo menos um objetivo'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))

        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }))
        }
    }

    const handleCheckboxChange = (objetivo) => {
        setFormData(prev => {
            const newObjetivos = prev.principal_objetivo.includes(objetivo)
                ? prev.principal_objetivo.filter(o => o !== objetivo)
                : [...prev.principal_objetivo, objetivo]
            return { ...prev, principal_objetivo: newObjetivos }
        })

        if (errors.principal_objetivo) {
            setErrors(prev => ({ ...prev, principal_objetivo: '' }))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!validateForm()) return

        setStatus('loading')

        try {
            // Prepare data for Supabase - convert objetivo array to string
            const dataToSend = {
                ...formData,
                principal_objetivo: formData.principal_objetivo.join(', ')
            }

            const optionalFields = ['telefone_whatsapp', 'linkedin_instagram', 'faixa_investimento', 'desafio_empresa'];
            optionalFields.forEach(field => {
                if (dataToSend[field] === '') {
                    dataToSend[field] = null;
                }
            });

            const { error } = await supabase
                .from('ace_formulario')
                .insert([dataToSend])

            if (error) throw error

            setStatus('success')
            setFormData({
                nome_completo: '',
                email_corporativo: '',
                telefone_whatsapp: '',
                nome_empresa: '',
                linkedin_instagram: '',
                setor_atuacao: '',
                numero_colaboradores: '',
                cargo: '',
                faixa_investimento: '',
                principal_objetivo: [],
                desafio_empresa: ''
            })

            // Reset status after 5 seconds
            setTimeout(() => setStatus('idle'), 5000)
        } catch (error) {
            console.error('Error submitting form:', error)
            setStatus('error')
            setTimeout(() => setStatus('idle'), 5000)
        }
    }

    return (
        <main className="contact-page">
            <div className="container">
                <div className="contact-header">
                    <h1 className="contact-main-title">
                        Diagnóstico Gratuito de IA
                    </h1>
                    <p className="section-subtitle">
                        Preencha o formulário e descubra como a IA pode transformar seu negócio
                    </p>
                </div>

                <div className="contact-content">
                    <div className="contact-form-container glass-card">
                        {status === 'success' ? (
                            <div className="success-message">
                                <div className="success-icon">
                                    <CheckCircle size={48} />
                                </div>
                                <h3>Solicitação enviada com sucesso!</h3>
                                <p>Obrigado pelo seu interesse. Entraremos em contato em breve para agendar sua consultoria gratuita de IA.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="contact-form">
                                {/* Nome Completo */}
                                <div className="form-group">
                                    <label htmlFor="nome_completo" className="form-label">Nome Completo *</label>
                                    <input
                                        type="text"
                                        id="nome_completo"
                                        name="nome_completo"
                                        className={`form-input ${errors.nome_completo ? 'error' : ''}`}
                                        placeholder="Seu nome completo"
                                        value={formData.nome_completo}
                                        onChange={handleChange}
                                    />
                                    {errors.nome_completo && <span className="form-error">{errors.nome_completo}</span>}
                                </div>

                                {/* E-mail Corporativo */}
                                <div className="form-group">
                                    <label htmlFor="email_corporativo" className="form-label">E-mail Corporativo *</label>
                                    <input
                                        type="email"
                                        id="email_corporativo"
                                        name="email_corporativo"
                                        className={`form-input ${errors.email_corporativo ? 'error' : ''}`}
                                        placeholder="seuemail@empresa.com"
                                        value={formData.email_corporativo}
                                        onChange={handleChange}
                                    />
                                    {errors.email_corporativo && <span className="form-error">{errors.email_corporativo}</span>}
                                </div>

                                {/* Telefone/WhatsApp */}
                                <div className="form-group">
                                    <label htmlFor="telefone_whatsapp" className="form-label">Telefone/WhatsApp</label>
                                    <input
                                        type="tel"
                                        id="telefone_whatsapp"
                                        name="telefone_whatsapp"
                                        className="form-input"
                                        placeholder="(11) 99999-9999"
                                        value={formData.telefone_whatsapp}
                                        onChange={handleChange}
                                    />
                                    <span className="form-hint">Opcional, mas útil para follow-up rápido</span>
                                </div>

                                {/* Nome da Empresa */}
                                <div className="form-group">
                                    <label htmlFor="nome_empresa" className="form-label">Nome da Empresa *</label>
                                    <input
                                        type="text"
                                        id="nome_empresa"
                                        name="nome_empresa"
                                        className={`form-input ${errors.nome_empresa ? 'error' : ''}`}
                                        placeholder="Nome da sua empresa"
                                        value={formData.nome_empresa}
                                        onChange={handleChange}
                                    />
                                    {errors.nome_empresa && <span className="form-error">{errors.nome_empresa}</span>}
                                </div>

                                {/* LinkedIn ou Instagram */}
                                <div className="form-group">
                                    <label htmlFor="linkedin_instagram" className="form-label">LinkedIn ou Instagram (pessoal ou da empresa)</label>
                                    <input
                                        type="text"
                                        id="linkedin_instagram"
                                        name="linkedin_instagram"
                                        className="form-input"
                                        placeholder="linkedin.com/in/seu-perfil"
                                        value={formData.linkedin_instagram}
                                        onChange={handleChange}
                                    />
                                    <span className="form-hint">Opcional, mas nos ajuda a conhecer melhor seu perfil</span>
                                </div>

                                {/* Setor de Atuação */}
                                <div className="form-group">
                                    <label htmlFor="setor_atuacao" className="form-label">Setor de Atuação *</label>
                                    <select
                                        id="setor_atuacao"
                                        name="setor_atuacao"
                                        className={`form-select ${errors.setor_atuacao ? 'error' : ''}`}
                                        value={formData.setor_atuacao}
                                        onChange={handleChange}
                                    >
                                        <option value="">Selecione seu setor</option>
                                        {setoresOptions.map(setor => (
                                            <option key={setor} value={setor}>{setor}</option>
                                        ))}
                                    </select>
                                    {errors.setor_atuacao && <span className="form-error">{errors.setor_atuacao}</span>}
                                </div>

                                {/* Número de Colaboradores */}
                                <div className="form-group">
                                    <label className="form-label">Número Aproximado de Colaboradores *</label>
                                    <div className="radio-group">
                                        {['1-10 colaboradores', '11-50 colaboradores', '51-200 colaboradores', '200+ colaboradores'].map(opcao => (
                                            <label key={opcao} className="radio-label">
                                                <input
                                                    type="radio"
                                                    name="numero_colaboradores"
                                                    value={opcao}
                                                    checked={formData.numero_colaboradores === opcao}
                                                    onChange={handleChange}
                                                    className="radio-input"
                                                />
                                                <span className="radio-custom"></span>
                                                {opcao}
                                            </label>
                                        ))}
                                    </div>
                                    {errors.numero_colaboradores && <span className="form-error">{errors.numero_colaboradores}</span>}
                                </div>

                                {/* Cargo */}
                                <div className="form-group">
                                    <label htmlFor="cargo" className="form-label">Qual é o seu cargo? *</label>
                                    <select
                                        id="cargo"
                                        name="cargo"
                                        className={`form-select ${errors.cargo ? 'error' : ''}`}
                                        value={formData.cargo}
                                        onChange={handleChange}
                                    >
                                        <option value="">Selecione seu cargo</option>
                                        {cargosOptions.map(cargo => (
                                            <option key={cargo} value={cargo}>{cargo}</option>
                                        ))}
                                    </select>
                                    {errors.cargo && <span className="form-error">{errors.cargo}</span>}
                                </div>

                                {/* Faixa de Investimento */}
                                <div className="form-group">
                                    <label htmlFor="faixa_investimento" className="form-label">
                                        Qual é a faixa de investimento que sua empresa planeja alocar para este projeto de IA nos próximos 6 meses?
                                    </label>
                                    <select
                                        id="faixa_investimento"
                                        name="faixa_investimento"
                                        className="form-select"
                                        value={formData.faixa_investimento}
                                        onChange={handleChange}
                                    >
                                        <option value="">Selecione a faixa de investimento</option>
                                        {investimentoOptions.map(inv => (
                                            <option key={inv} value={inv}>{inv}</option>
                                        ))}
                                    </select>
                                    <span className="form-hint">Opcional, mas nos ajuda a personalizar nossa proposta</span>
                                </div>

                                {/* Objetivo com IA */}
                                <div className="form-group">
                                    <label className="form-label">Qual o principal objetivo com IA na sua empresa? *</label>
                                    <div className="checkbox-group">
                                        {objetivosOptions.map(objetivo => (
                                            <label key={objetivo} className="checkbox-label">
                                                <input
                                                    type="checkbox"
                                                    checked={formData.principal_objetivo.includes(objetivo)}
                                                    onChange={() => handleCheckboxChange(objetivo)}
                                                    className="checkbox-input"
                                                />
                                                <span className="checkbox-custom"></span>
                                                {objetivo}
                                            </label>
                                        ))}
                                    </div>
                                    {errors.principal_objetivo && <span className="form-error">{errors.principal_objetivo}</span>}
                                </div>

                                {/* Desafio */}
                                <div className="form-group">
                                    <label htmlFor="desafio_empresa" className="form-label">Descreva rapidamente o desafio da sua empresa</label>
                                    <textarea
                                        id="desafio_empresa"
                                        name="desafio_empresa"
                                        className="form-textarea"
                                        placeholder="Conte-nos sobre os principais desafios que sua empresa enfrenta..."
                                        value={formData.desafio_empresa}
                                        onChange={handleChange}
                                    />
                                    <span className="form-hint">Opcional, mas nos ajuda a preparar uma proposta mais assertiva</span>
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary btn-lg submit-btn"
                                    disabled={status === 'loading'}
                                >
                                    {status === 'loading' ? (
                                        <>
                                            <Loader2 size={20} className="spin" />
                                            Enviando...
                                        </>
                                    ) : (
                                        <>
                                            <Sparkles size={20} />
                                            Solicitar Diagnóstico Gratuito
                                        </>
                                    )}
                                </button>

                                <p className="form-disclaimer">
                                    Ao enviar, você concorda que entraremos em contato para agendar sua consultoria gratuita.
                                </p>

                                {status === 'error' && (
                                    <p className="form-error-message">
                                        Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente.
                                    </p>
                                )}
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </main>
    )
}

export default ContactPage
