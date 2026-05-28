import { Settings, Bell, Shield } from 'lucide-react'
import AiSettingsForm from './AiSettingsForm'

export default function SettingsPage() {
  return (
    <div className="p-6 lg:p-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Impostazioni</h1>
        <p className="text-[var(--color-text-secondary)]">
          Gestisci il tuo account e le preferenze.
        </p>
      </div>

      <div className="space-y-6">
        <AiSettingsForm />

        <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-[var(--color-bg-sidebar)] flex items-center justify-center">
              <Bell className="w-5 h-5 text-[var(--color-text-secondary)]" />
            </div>
            <div>
              <h3 className="font-semibold">Monitoring automatico</h3>
              <p className="text-sm text-[var(--color-text-secondary)]">
                Ricevi notifiche quando nuovi lead corrispondono alle tue keyword.
              </p>
            </div>
          </div>
          <div className="bg-[var(--color-bg-sidebar)] rounded-lg p-4 text-center">
            <Shield className="w-8 h-8 text-[var(--color-text-tertiary)] mx-auto mb-2" />
            <p className="text-sm font-medium text-[var(--color-text-secondary)]">
              Funzionalità premium
            </p>
            <p className="text-xs text-[var(--color-text-tertiary)] mt-1">
              Disponibile con il piano Pro o Agency.
            </p>
          </div>
        </div>

        <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-[var(--color-bg-sidebar)] flex items-center justify-center">
              <Settings className="w-5 h-5 text-[var(--color-text-secondary)]" />
            </div>
            <div>
              <h3 className="font-semibold">Info applicazione</h3>
              <p className="text-sm text-[var(--color-text-secondary)]">
                Dettagli tecnici dell&apos;applicazione.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-[var(--color-text-tertiary)]">Versione</span>
              <p className="font-medium">1.0.0 MVP</p>
            </div>
            <div>
              <span className="text-[var(--color-text-tertiary)]">Stack</span>
              <p className="font-medium">Next.js 16 + Tailwind</p>
            </div>
            <div>
              <span className="text-[var(--color-text-tertiary)]">AI Engine</span>
              <p className="font-medium">OpenAI / Claude / Gemini</p>
            </div>
            <div>
              <span className="text-[var(--color-text-tertiary)]">Storage</span>
              <p className="font-medium">PostgreSQL</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
