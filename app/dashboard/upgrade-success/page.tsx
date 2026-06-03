'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Crown, ArrowRight } from 'lucide-react'

export default function UpgradeSuccessPage() {
  const router = useRouter()
  const { data: session } = useSession()
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          router.push('/dashboard')
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [router])

  const name = session?.user?.name?.split(' ')[0] || 'freelancer'

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg)]">
      <div className="text-center max-w-md mx-auto px-6">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-light)] flex items-center justify-center mx-auto mb-6 shadow-lg">
          <Crown className="w-10 h-10 text-white" />
        </div>

        <h1 className="text-3xl font-bold mb-3">
          Benvenuto nel Pro, {name}! 🎉
        </h1>

        <p className="text-[var(--color-text-secondary)] text-lg mb-2">
          Il tuo account è stato aggiornato con successo.
        </p>

        <p className="text-[var(--color-text-secondary)] mb-8">
          Ora hai accesso a <strong>300 ricerche al mese</strong> e alla generazione messaggi illimitata. Inizia subito a trovare i tuoi primi clienti su Reddit.
        </p>

        <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-2xl p-6 mb-8">
          <p className="text-sm text-[var(--color-text-secondary)] mb-1">Cosa puoi fare adesso</p>
          <ul className="text-sm text-left space-y-2 mt-3">
            <li className="flex items-center gap-2">
              <span className="text-[var(--color-primary)]">✓</span> Cerca lead illimitati su Reddit
            </li>
            <li className="flex items-center gap-2">
              <span className="text-[var(--color-primary)]">✓</span> Genera messaggi personalizzati con AI
            </li>
            <li className="flex items-center gap-2">
              <span className="text-[var(--color-primary)]">✓</span> Salva i lead più interessanti
            </li>
          </ul>
        </div>

        <p className="text-sm text-[var(--color-text-secondary)] mb-4">
          Verrai reindirizzato alla dashboard tra <strong>{countdown}</strong> secondi...
        </p>

        <button
          onClick={() => router.push('/dashboard')}
          className="flex items-center gap-2 mx-auto px-6 py-3 rounded-xl bg-[var(--color-primary)] text-white font-semibold hover:bg-[var(--color-primary-hover)] transition-all"
        >
          Vai alla dashboard <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}