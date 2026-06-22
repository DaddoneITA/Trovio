import Link from 'next/link'
import Image from 'next/image'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import {
  Search, Sparkles, TrendingUp, ArrowRight, Zap,
  CheckCircle2, BarChart3, Clock, Target, ChevronDown
} from 'lucide-react'

const leadExamples = [
  {
    category: 'Consulente AI',
    text: 'Cerco un consulente AI che mi aiuti ad automatizzare il supporto clienti del mio ecommerce.',
    time: '2 ore fa',
    intent: 'Alto',
  },
  {
    category: 'Sviluppatore Web',
    text: 'Sto cercando uno sviluppatore freelance per creare il mio MVP SaaS. Budget disponibile.',
    time: '5 ore fa',
    intent: 'Alto',
  },
  {
    category: 'Agenzia Marketing',
    text: 'Qualcuno conosce un\'agenzia che possa aiutarmi a generare lead B2B qualificati?',
    time: '8 ore fa',
    intent: 'Alto',
  },
]

const steps = [
  {
    number: '01',
    title: 'Inserisci il tuo servizio',
    description: 'Scrivi le parole chiave che descrivono il tuo lavoro, la tua consulenza o il tuo software.',
  },
  {
    number: '02',
    title: 'Trovio analizza le discussioni',
    description: 'Il sistema individua richieste pertinenti pubblicate online da persone con un bisogno reale.',
  },
  {
    number: '03',
    title: 'Scopri lead ad alta intenzione',
    description: 'Visualizza persone che stanno già cercando una soluzione come la tua, ordinate per rilevanza.',
  },
  {
    number: '04',
    title: 'Contattali e crea opportunità',
    description: 'Interagisci con potenziali clienti prima della concorrenza con messaggi personalizzati dall\'AI.',
  },
]

const targets = [
  { title: 'Consulenti AI', description: 'Trova aziende che cercano supporto nell\'implementazione dell\'intelligenza artificiale.' },
  { title: 'Agenzie Marketing', description: 'Scopri aziende che stanno cercando aiuto per acquisire clienti.' },
  { title: 'Sviluppatori', description: 'Trova startup e imprenditori che cercano competenze tecniche.' },
  { title: 'Designer', description: 'Intercetta richieste di branding, UI e grafica.' },
  { title: 'Copywriter', description: 'Scopri aziende che hanno bisogno di contenuti e comunicazione.' },
  { title: 'Founder SaaS', description: 'Trova utenti che stanno cercando software o strumenti specifici.' },
]

const whyItems = [
  {
    icon: Target,
    title: 'Lead ad alta intenzione',
    description: 'Non stai cercando clienti a freddo. Stai trovando persone che stanno già cercando una soluzione.',
  },
  {
    icon: Clock,
    title: 'Risparmia tempo',
    description: 'Evita ore di ricerca manuale tra forum e community online.',
  },
  {
    icon: TrendingUp,
    title: 'Arriva prima della concorrenza',
    description: 'Rispondi alle richieste mentre sono ancora attive e il bisogno è urgente.',
  },
]

const faqs = [
  {
    q: 'I lead sono reali?',
    a: 'Sì. Le opportunità mostrate provengono da discussioni pubbliche pubblicate da persone che stanno cercando consigli, professionisti, servizi o software.',
  },
  {
    q: 'I lead sono aggiornati?',
    a: 'Trovio privilegia contenuti recenti per aiutarti a intercettare opportunità ancora attive.',
  },
  {
    q: 'Posso usarlo per qualsiasi settore?',
    a: 'Sì. È sufficiente inserire keyword pertinenti al tuo servizio o prodotto.',
  },
  {
    q: 'Serve esperienza con Reddit?',
    a: 'No. Trovio si occupa della ricerca e dell\'individuazione delle opportunità. Tu devi solo rispondere.',
  },
  {
    q: 'I lead sono esclusivi?',
    a: 'No. Sono opportunità pubbliche, ma Trovio ti permette di trovarle molto più velocemente rispetto a una ricerca manuale.',
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-subtle)] via-[var(--color-bg)] to-[var(--color-bg)] dark:from-[#0D2818] dark:via-[var(--color-bg)] dark:to-[var(--color-bg)]" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-[var(--color-primary)]/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-[var(--color-primary-light)]/10 to-transparent rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 sm:pt-28 sm:pb-32">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--color-primary-subtle)] border border-[var(--color-primary)]/20 mb-8">
              <Zap className="w-3.5 h-3.5 text-[var(--color-primary)]" />
              <span className="text-xs font-semibold text-[var(--color-primary)] uppercase tracking-wider">
                Lead generation per freelancer
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-[1.1]">
              Trova persone che{' '}
              <span className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-light)] bg-clip-text text-transparent">
                stanno già cercando il tuo servizio
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-[var(--color-text-secondary)] mb-10 max-w-2xl mx-auto leading-relaxed">
              Inserisci una parola chiave relativa al tuo servizio e scopri richieste reali pubblicate online da persone che stanno cercando esattamente ciò che offri.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[var(--color-primary)] text-white font-semibold text-base hover:bg-[var(--color-primary-hover)] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Trova i miei primi lead
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#esempi"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border border-[var(--color-border)] text-[var(--color-text)] font-semibold text-base hover:bg-[var(--color-bg-sidebar)] transition-all duration-300"
              >
                Guarda esempi reali
                <ChevronDown className="w-4 h-4" />
              </a>
            </div>

            <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
              <div className="text-center">
                <BarChart3 className="w-5 h-5 text-[var(--color-primary)] mx-auto mb-2" />
                <div className="text-2xl font-bold text-[var(--color-text)]">8</div>
                <div className="text-xs text-[var(--color-text-tertiary)] mt-0.5">Subreddit monitorati</div>
              </div>
              <div className="text-center">
                <Search className="w-5 h-5 text-[var(--color-primary)] mx-auto mb-2" />
                <div className="text-2xl font-bold text-[var(--color-text)]">1,000+</div>
                <div className="text-xs text-[var(--color-text-tertiary)] mt-0.5">Post cercano un freelancer ogni giorno</div>
              </div>
              <div className="text-center">
                <Sparkles className="w-5 h-5 text-[var(--color-primary)] mx-auto mb-2" />
                <div className="text-2xl font-bold text-[var(--color-text)]">Sei tu?</div>
                <div className="text-xs text-[var(--color-text-tertiary)] mt-0.5">La maggior parte non riceve risposta</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ESEMPI LEAD REALI */}
      <section id="esempi" className="py-20 sm:py-28 bg-[var(--color-bg-sidebar)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Ecco il tipo di opportunità che Trovio trova ogni giorno
            </h2>
            <p className="text-[var(--color-text-secondary)] text-lg max-w-2xl mx-auto">
              Persone reali che stanno cercando professionisti, consulenti, agenzie e software.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {leadExamples.map((lead) => (
              <div key={lead.category} className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-2xl p-6 hover:shadow-lg hover:border-[var(--color-primary)]/30 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[var(--color-primary-subtle)] text-[var(--color-primary)]">
                    {lead.category}
                  </span>
                  <span className="text-xs text-[var(--color-text-tertiary)] flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {lead.time}
                  </span>
                </div>
                <p className="text-[var(--color-text)] leading-relaxed mb-4 text-sm">
                  &ldquo;{lead.text}&rdquo;
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-xs text-[var(--color-text-secondary)]">Intento: <span className="font-semibold text-emerald-600">{lead.intent}</span></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COME FUNZIONA */}
      <section className="py-20 sm:py-28 bg-[var(--color-bg)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Come funziona Trovio</h2>
            <p className="text-[var(--color-text-secondary)] text-lg">
              Quattro semplici passi per trovare il tuo prossimo cliente.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {steps.map((step, i) => (
              <div key={step.number} className="relative text-center">
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-[2px] bg-gradient-to-r from-[var(--color-primary)]/30 to-transparent" />
                )}
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-light)] text-white text-xl font-bold mb-5">
                  {step.number}
                </div>
                <h3 className="text-base font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PER CHI È */}
      <section className="py-20 sm:py-28 bg-[var(--color-bg-sidebar)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Chi può usare Trovio</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {targets.map((t) => (
              <div key={t.title} className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-2xl p-6 hover:border-[var(--color-primary)]/30 transition-all duration-300">
                <h3 className="font-semibold text-base mb-2">{t.title}</h3>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{t.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PERCHÉ TROVIO */}
      <section className="py-20 sm:py-28 bg-[var(--color-bg)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Perché usare Trovio</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {whyItems.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.title} className="text-center p-8 bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-2xl hover:border-[var(--color-primary)]/30 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-light)] flex items-center justify-center mb-5 mx-auto">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-base mb-2">{item.title}</h3>
                  <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{item.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* STORIA FONDATORE */}
      <section className="py-20 sm:py-28 bg-[var(--color-bg-sidebar)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center gap-10">
            <div className="flex-shrink-0">
              <Image
                src="/luca-corazzi.jpg"
                alt="Luca Corazzi, founder di Trovio"
                width={160}
                height={160}
                className="rounded-2xl object-cover shadow-lg"
              />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">Perché ho creato Trovio</h2>
              <p className="text-[var(--color-text-secondary)] leading-relaxed mb-4">
                Ho creato Trovio dopo tre mesi su Fiverr senza ricevere un solo messaggio. Avevo un profilo curato, prezzi competitivi, un portfolio solido, ma stavo solo aspettando. Il problema era che su Fiverr non hai controllo: sei uno tra migliaia.
              </p>
              <p className="text-[var(--color-text-secondary)] leading-relaxed mb-6">
                Poi ho iniziato a cercare manualmente nelle community online e ho capito che ogni giorno centinaia di persone pubblicano richieste specifiche alla ricerca di professionisti. Trovio nasce per rendere queste opportunità immediatamente accessibili, senza ore di ricerca manuale.
              </p>
              <p className="font-semibold text-[var(--color-text)]">Luca Corazzi — Founder di Trovio</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 sm:py-28 bg-[var(--color-bg)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Domande frequenti</h2>
          </div>
          <div className="max-w-2xl mx-auto space-y-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-2xl p-6">
                <h3 className="font-semibold mb-2">{faq.q}</h3>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINALE */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden bg-gradient-to-br from-[var(--color-primary)] to-[#065F46] rounded-3xl px-8 py-16 sm:px-16 sm:py-20 text-center">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl" />
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Inizia a trovare clienti realmente interessati
              </h2>
              <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto">
                Smetti di perdere tempo cercando clienti. Scopri persone che stanno già cercando ciò che offri.
              </p>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white text-[var(--color-primary)] font-semibold text-base hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Trova i miei primi lead
                <ArrowRight className="w-4 h-4" />
              </Link>
              <div className="mt-6 flex items-center justify-center gap-6 text-white/70 text-sm flex-wrap">
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> Piano gratuito</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> Setup in 30 secondi</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> Nessuna carta richiesta</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
