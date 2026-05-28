import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Search, Sparkles, TrendingUp, ArrowRight, Zap, CheckCircle2, Users, MessageSquare, BarChart3 } from 'lucide-react'

const features = [
  {
    icon: Search,
    title: 'Ricerca intelligente',
    description: 'Scansiona 8+ subreddit in tempo reale per trovare chi sta cercando esattamente il tuo servizio.',
  },
  {
    icon: Sparkles,
    title: 'Messaggi AI personalizzati',
    description: 'Genera risposte professionali e naturali per ogni lead, pronte da inviare con un click.',
  },
  {
    icon: TrendingUp,
    title: 'Dashboard completa',
    description: 'Salva lead, traccia le ricerche e monitora le tue statistiche mensili in un unico posto.',
  },
]

const steps = [
  {
    number: '01',
    title: 'Inserisci il tuo servizio',
    description: 'Scrivi cosa offri: logo design, SEO, sviluppo web, copywriting...',
  },
  {
    number: '02',
    title: 'Trova i lead perfetti',
    description: 'Trovio cerca su Reddit le persone che stanno cercando esattamente il tuo servizio.',
  },
  {
    number: '03',
    title: 'Rispondi e converti',
    description: 'Genera un messaggio personalizzato, copialo e rispondi al post. Nuovo cliente acquisito!',
  },
]

const stats = [
  { icon: Users, value: '2,500+', label: 'Freelancer attivi' },
  { icon: MessageSquare, value: '15,000+', label: 'Messaggi generati' },
  { icon: BarChart3, value: '8', label: 'Subreddit monitorati' },
]

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-subtle)] via-[var(--color-bg)] to-[var(--color-bg)] dark:from-[#0D2818] dark:via-[var(--color-bg)] dark:to-[var(--color-bg)]" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-[var(--color-primary)]/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-[var(--color-primary-light)]/10 to-transparent rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 sm:pt-28 sm:pb-32">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--color-primary-subtle)] border border-[var(--color-primary)]/20 mb-8">
              <Zap className="w-3.5 h-3.5 text-[var(--color-primary)]" />
              <span className="text-xs font-semibold text-[var(--color-primary)] uppercase tracking-wider">
                Lead generation per freelancer
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-[1.1]">
              Trova clienti su Reddit{' '}
              <span className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-light)] bg-clip-text text-transparent animate-gradient">
                in tempo reale
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-[var(--color-text-secondary)] mb-10 max-w-2xl mx-auto leading-relaxed">
              Smetti di cercare clienti manualmente. Trovio scansiona Reddit per te e trova le persone che stanno cercando esattamente il tuo servizio.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[var(--color-primary)] text-white font-semibold text-base hover:bg-[var(--color-primary-hover)] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Inizia gratis
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border border-[var(--color-border)] text-[var(--color-text)] font-semibold text-base hover:bg-[var(--color-bg-sidebar)] transition-all duration-300"
              >
                Vedi i piani
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
              {stats.map((stat) => {
                const Icon = stat.icon
                return (
                  <div key={stat.label} className="text-center">
                    <Icon className="w-5 h-5 text-[var(--color-primary)] mx-auto mb-2" />
                    <div className="text-2xl font-bold text-[var(--color-text)]">{stat.value}</div>
                    <div className="text-xs text-[var(--color-text-tertiary)] mt-0.5">{stat.label}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 sm:py-28 bg-[var(--color-bg)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Tutto quello che ti serve per trovare clienti
            </h2>
            <p className="text-[var(--color-text-secondary)] text-lg max-w-2xl mx-auto">
              Tre strumenti potenti in un&apos;unica piattaforma semplice e veloce.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <div
                  key={feature.title}
                  className="group bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-2xl p-8 hover:shadow-lg hover:border-[var(--color-primary)]/30 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-light)] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-[var(--color-text-secondary)] leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 sm:py-28 bg-[var(--color-bg-sidebar)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Come funziona</h2>
            <p className="text-[var(--color-text-secondary)] text-lg">
              Tre semplici passi per trovare il tuo prossimo cliente.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {steps.map((step, i) => (
              <div key={step.number} className="relative text-center">
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-[2px] bg-gradient-to-r from-[var(--color-primary)]/30 to-transparent" />
                )}
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-light)] text-white text-xl font-bold mb-5">
                  {step.number}
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden bg-gradient-to-br from-[var(--color-primary)] to-[#065F46] rounded-3xl px-8 py-16 sm:px-16 sm:py-20 text-center">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl" />
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Pronto a trovare nuovi clienti?
              </h2>
              <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto">
                Inizia a usare Trovio gratuitamente. Nessuna carta di credito richiesta.
              </p>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white text-[var(--color-primary)] font-semibold text-base hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Inizia gratis
                <ArrowRight className="w-4 h-4" />
              </Link>
              <div className="mt-6 flex items-center justify-center gap-6 text-white/70 text-sm">
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
