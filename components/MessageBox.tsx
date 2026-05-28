'use client'

import { useState, useEffect, useCallback } from 'react'
import { Copy, RefreshCw, Check, MessageSquare, Loader2, Sparkles } from 'lucide-react'
import { incrementMessageCount } from '@/lib/storage'

interface MessageBoxProps {
  service: string
  postTitle: string
  postBody: string
}

export function MessageBox({ service, postTitle, postBody }: MessageBoxProps) {
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState('')

  const generateMessage = useCallback(async () => {
    setIsLoading(true)
    setError('')
    try {
      const response = await fetch('/api/generate-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ service, postTitle, postBody }),
      })

      if (!response.ok) throw new Error('Failed to generate message')

      const data = await response.json()
      setMessage(data.message)
      incrementMessageCount()
    } catch (err) {
      setError('Errore nella generazione del messaggio. Riprova.')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }, [service, postTitle, postBody])

  useEffect(() => {
    generateMessage()
  }, [generateMessage])

  const handleCopy = async () => {
    if (!message) return
    await navigator.clipboard.writeText(message)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-[var(--color-bg-sidebar)] border border-[var(--color-border)] rounded-xl p-4">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-light)] flex items-center justify-center">
          <MessageSquare className="w-3.5 h-3.5 text-white" />
        </div>
        <span className="text-sm font-semibold text-[var(--color-text)]">
          Messaggio suggerito
        </span>
        {!process.env.NEXT_PUBLIC_HAS_CLAUDE && (
          <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-[var(--color-accent-light)] text-[var(--color-accent)]">
            Template
          </span>
        )}
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="flex items-center gap-3 py-6 justify-center">
          <Loader2 className="w-5 h-5 text-[var(--color-primary)] animate-spin" />
          <span className="text-sm text-[var(--color-text-secondary)]">
            Generazione in corso...
          </span>
        </div>
      ) : error ? (
        <div className="py-4 text-center">
          <p className="text-sm text-red-500 mb-2">{error}</p>
          <button
            onClick={generateMessage}
            className="text-sm text-[var(--color-primary)] hover:underline"
          >
            Riprova
          </button>
        </div>
      ) : (
        <>
          <div className="bg-[var(--color-bg-card)] rounded-lg p-4 mb-3 border border-[var(--color-border)]">
            <p className="text-sm leading-relaxed text-[var(--color-text)] whitespace-pre-wrap">
              {message}
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                copied
                  ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                  : 'bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg-sidebar)]'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  Copiato!
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  Copia
                </>
              )}
            </button>
            <button
              onClick={generateMessage}
              disabled={isLoading}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg-sidebar)] transition-all duration-200"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Rigenera
            </button>
          </div>
        </>
      )}
    </div>
  )
}
