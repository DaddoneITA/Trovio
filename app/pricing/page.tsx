import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Check, Zap, Crown, Building2 } from 'lucide-react'
import Link from 'next/link'

const plans = [
  {
    name: 'Free',
    price: '€0',
    period: 'per sempre',
    description: 'Perfetto per iniziare a testare Trovio.',
    icon: Zap,
    features: [
      '5 ricerche al mese',
      '3 messaggi generati al mese',
      'Solo Reddit',
      'Accesso a 8 subreddit',
    ],
    cta: 'Inizia gratis',
    href: '/dashboard',
    popular: false,
  },
  {
    name: 'Pro',
    price: '€19',
    period: '/mese',
    description: 'Per freelancer seri che vogliono crescere.',
    icon: Crown,
    features: [
      '300 ricerche al mese',
      '100 messaggi al mese',
      'Solo Reddit (LinkedIn in arrivo)',
      'Monitoring automatico (3 keyword)',
      'Email digest giornaliera',
      'Salvataggio lead illimitato',
      'Supporto prioritario',
    ],
    cta: 'Scegli Pro',
    href: '/dashboard',
    popular: true,
  },
  {
    name: 'Agency',
    price: '€49',
    period: '/mese',
    description: 'Per team e agenzie con più clienti.',
    icon: Building2,
    features: [
      'Tutto di Pro incluso',
      '1000 ricerche al mese',
      'Messaggi illimitati',
      'Reddit + LinkedIn (in arrivo)',
      'Monitoring su 10 keyword',
      'Multi-account (3 utenti)',
      'Export CSV dei lead',
      'API access',
      'Onboarding dedicato',
    ],
    cta: 'Scegli Agency',
    href: '/dashboard',
    popular: false,
  },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Piani semplici,{' '}
              <span className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-light)] bg-clip-text text-transparent">
                risultati concreti
              </span>
            </h1>
            <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto">
              Scegli il piano perfetto per il tuo business. Upgrade o downgrade in qualsiasi momento.
            </p>
          </div>

          {/* Plans grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {plans.map((plan) => {
              const Icon = plan.icon
              return (
                <div
                  key={plan.name}
                  className={`relative bg-[var(--color-bg-card)] rounded-2xl p-8 border transition-all duration-300 hover:-translate-y-1 ${
                    plan.popular
                      ? 'border-[var(--color-primary)] shadow-lg shadow-[var(--color-primary)]/10 scale-[1.02]'
                      : 'border-[var(--color-border)] hover:shadow-lg'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-light)] text-white text-xs font-semibold">
                      Più popolare
                    </div>
                  )}

                  <div className="mb-6">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${
                      plan.popular
                        ? 'bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-light)]'
                        : 'bg-[var(--color-bg-sidebar)]'
                    }`}>
                      <Icon className={`w-5 h-5 ${plan.popular ? 'text-white' : 'text-[var(--color-text-secondary)]'}`} />
                    </div>
                    <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                    <p className="text-sm text-[var(--color-text-secondary)]">{plan.description}</p>
                  </div>

                  <div className="mb-6">
                    <span className="text-4xl font-extrabold">{plan.price}</span>
                    <span className="text-[var(--color-text-secondary)] text-sm ml-1">{plan.period}</span>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5">
                        <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${plan.popular ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-tertiary)]'}`} />
                        <span className="text-sm text-[var(--color-text-secondary)]">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={plan.href}
                    className={`block text-center w-full py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
                      plan.popular
                        ? 'bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] shadow-sm hover:shadow-md'
                        : 'bg-[var(--color-bg-sidebar)] text-[var(--color-text)] hover:bg-[var(--color-border)]'
                    }`}
                  >
                    {plan.cta}
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
