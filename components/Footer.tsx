import { Zap } from 'lucide-react'
import Link from 'next/link'
import Script from 'next/script'

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-bg)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-light)] flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold">Trovio</span>
            </div>
            <p className="text-sm text-[var(--color-text-secondary)] max-w-sm leading-relaxed">
              Trova clienti su Reddit in tempo reale. Il tool perfetto per freelancer che vogliono crescere.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-4 text-[var(--color-text)]">Prodotto</h4>
            <ul className="space-y-2">
              <li><Link href="/#features" className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors">Features</Link></li>
              <li><Link href="/pricing" className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors">Prezzi</Link></li>
              <li><Link href="/dashboard" className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors">Dashboard</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-4 text-[var(--color-text)]">Legale</h4>
            <ul className="space-y-2">
              <li>
                <a href="https://www.iubenda.com/privacy-policy/52771181" className="iubenda-white iubenda-noiframe iubenda-embed text-sm" title="Privacy Policy">Privacy Policy</a>
              </li>
              <li>
                <a href="/termini#" className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors">Termini di Servizio</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-[var(--color-border)] text-center">
          <p className="text-xs text-[var(--color-text-tertiary)]">
            © {new Date().getFullYear()} Trovio. Tutti i diritti riservati.
          </p>
        </div>
      </div>
      <Script src="https://cdn.iubenda.com/iubenda.js" strategy="lazyOnload" />
    </footer>
  )
}
