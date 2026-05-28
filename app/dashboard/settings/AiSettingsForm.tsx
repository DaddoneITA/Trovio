'use client'

import { useState, useEffect, FormEvent } from 'react'
import { Key, Check, Save, Trash2 } from 'lucide-react'

interface CredentialInfo {
  configured: boolean
  key: string
}

interface CredentialsData {
  credentials: Record<string, CredentialInfo>
  selectedProvider: string
}

const PROVIDERS = [
  { id: 'openai', label: 'OpenAI', keyPlaceholder: 'sk-proj-...', docUrl: 'https://platform.openai.com/api-keys' },
  { id: 'anthropic', label: 'Anthropic Claude', keyPlaceholder: 'sk-ant-...', docUrl: 'https://console.anthropic.com/' },
  { id: 'gemini', label: 'Google Gemini', keyPlaceholder: 'AIza...', docUrl: 'https://aistudio.google.com/apikey' },
]

export default function AiSettingsForm() {
  const [data, setData] = useState<CredentialsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [editKeys, setEditKeys] = useState<Record<string, string>>({})

  useEffect(() => {
    fetch('/api/user/credentials')
      .then((r) => r.json())
      .then((d) => {
        setData(d)
        setEditKeys({})
      })
      .finally(() => setLoading(false))
  }, [])

  async function saveKey(provider: string) {
    const key = editKeys[provider]
    if (key === undefined) return
    setSaving(true)
    setMessage('')
    try {
      const r = await fetch('/api/user/credentials', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ provider, apiKey: key }),
      })
      if (!r.ok) throw new Error('Errore salvataggio')
      const res = await fetch('/api/user/credentials')
      const d = await res.json()
      setData(d)
      setEditKeys((prev) => ({ ...prev, [provider]: '' }))
      setMessage('Chiave salvata!')
    } catch {
      setMessage('Errore durante il salvataggio')
    } finally {
      setSaving(false)
    }
  }

  async function deleteKey(provider: string) {
    setSaving(true)
    setMessage('')
    try {
      const r = await fetch('/api/user/credentials', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ provider, apiKey: '' }),
      })
      if (!r.ok) throw new Error('Errore eliminazione')
      const res = await fetch('/api/user/credentials')
      const d = await res.json()
      setData(d)
      setMessage('Chiave rimossa')
    } catch {
      setMessage('Errore durante la rimozione')
    } finally {
      setSaving(false)
    }
  }

  async function selectProvider(provider: string) {
    setSaving(true)
    try {
      await fetch('/api/user/credentials', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ selectedProvider: provider, provider: '', apiKey: '' }),
      })
      setData((prev) => prev ? { ...prev, selectedProvider: provider } : prev)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="p-4 text-sm text-[var(--color-text-secondary)]">Caricamento...</div>
  }

  return (
    <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-[var(--color-bg-sidebar)] flex items-center justify-center">
          <Key className="w-5 h-5 text-[var(--color-text-secondary)]" />
        </div>
        <div>
          <h3 className="font-semibold">AI Providers</h3>
          <p className="text-sm text-[var(--color-text-secondary)]">
            Inserisci le tue chiavi API per generare messaggi personalizzati.
          </p>
        </div>
      </div>

      {message && (
        <div className="mb-4 px-4 py-2 rounded-lg bg-[var(--color-primary-subtle)] text-sm text-[var(--color-primary)]">
          {message}
        </div>
      )}

      <div className="space-y-4">
        {PROVIDERS.map((p) => {
          const cred = data?.credentials[p.id]
          const isSelected = data?.selectedProvider === p.id
          return (
            <div
              key={p.id}
              className={`rounded-lg border p-4 transition-colors ${
                isSelected
                  ? 'border-[var(--color-primary)] bg-[var(--color-primary-subtle)]'
                  : 'border-[var(--color-border)]'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">{p.label}</span>
                  {cred?.configured && (
                    <span className="inline-flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
                      <Check className="w-3 h-3" /> Configurato
                    </span>
                  )}
                </div>
                <button
                  onClick={() => selectProvider(p.id)}
                  disabled={!cred?.configured || isSelected || saving}
                  className={`text-xs px-3 py-1 rounded-md transition-colors ${
                    isSelected
                      ? 'bg-[var(--color-primary)] text-white'
                      : cred?.configured
                        ? 'border border-[var(--color-border)] hover:border-[var(--color-primary)] cursor-pointer'
                        : 'text-[var(--color-text-tertiary)] cursor-not-allowed'
                  }`}
                >
                  {isSelected ? 'In uso' : 'Usa questo'}
                </button>
              </div>

              {cred?.configured ? (
                <div className="flex items-center gap-2">
                  <div className="flex-1 px-3 py-2 rounded-lg bg-[var(--color-bg)] border border-[var(--color-border)] text-xs text-[var(--color-text-secondary)] font-mono">
                    {cred.key}
                  </div>
                  <button
                    onClick={() => deleteKey(p.id)}
                    disabled={saving}
                    className="p-2 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <input
                    type="password"
                    placeholder={p.keyPlaceholder}
                    value={editKeys[p.id] ?? ''}
                    onChange={(e) =>
                      setEditKeys((prev) => ({ ...prev, [p.id]: e.target.value }))
                    }
                    className="flex-1 px-3 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] text-sm"
                  />
                  <button
                    onClick={() => saveKey(p.id)}
                    disabled={!editKeys[p.id] || saving}
                    className="px-3 py-2 rounded-lg bg-[var(--color-primary)] text-white text-sm font-medium hover:bg-[var(--color-primary-hover)] disabled:opacity-50 transition-colors"
                  >
                    <Save className="w-4 h-4" />
                  </button>
                </div>
              )}

              <a
                href={p.docUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[var(--color-text-tertiary)] hover:text-[var(--color-primary)] mt-2 inline-block"
              >
                Ottieni una chiave {p.label} →
              </a>
            </div>
          )
        })}
      </div>
    </div>
  )
}
