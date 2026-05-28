'use client'

import { useState, useEffect } from 'react'
import { SavedLead } from '@/lib/types'
import { getSavedLeads, removeSavedLead } from '@/lib/storage'
import { timeAgo } from '@/lib/utils'
import { Bookmark, ExternalLink, Trash2, Sparkles } from 'lucide-react'
import { MessageBox } from '@/components/MessageBox'

export default function SavedLeadsPage() {
  const [savedLeads, setSavedLeads] = useState<SavedLead[]>([])
  const [expandedId, setExpandedId] = useState<string | null>(null)

  useEffect(() => {
    setSavedLeads(getSavedLeads())
  }, [])

  const handleRemove = (id: string) => {
    removeSavedLead(id)
    setSavedLeads((prev) => prev.filter((l) => l.id !== id))
  }

  return (
    <div className="p-6 lg:p-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Lead salvati</h1>
        <p className="text-[var(--color-text-secondary)]">
          I lead che hai salvato per contattarli in seguito.
        </p>
      </div>

      {savedLeads.length === 0 ? (
        <div className="text-center py-20 animate-fade-in">
          <div className="w-16 h-16 rounded-2xl bg-[var(--color-bg-sidebar)] flex items-center justify-center mx-auto mb-5">
            <Bookmark className="w-7 h-7 text-[var(--color-text-tertiary)]" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Nessun lead salvato</h3>
          <p className="text-[var(--color-text-secondary)] max-w-md mx-auto">
            Quando trovi un lead interessante, clicca su &quot;Salva&quot; per ritrovarlo qui.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {savedLeads.map((lead, index) => (
            <div
              key={lead.id}
              className="animate-fade-in bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300"
              style={{ animationDelay: `${index * 60}ms` }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-[var(--color-primary-subtle)] text-[var(--color-primary)] text-xs font-semibold">
                    r/{lead.subreddit}
                  </span>
                  <span className="text-xs text-[var(--color-text-tertiary)]">
                    {timeAgo(lead.createdAt)}
                  </span>
                </div>
                <span className="text-xs text-[var(--color-text-tertiary)]">
                  Salvato {new Date(lead.savedAt).toLocaleDateString('it-IT')}
                </span>
              </div>

              <h3 className="text-base font-semibold mb-2">{lead.title}</h3>
              {lead.body && (
                <p className="text-sm text-[var(--color-text-secondary)] mb-4 line-clamp-2">
                  {lead.body}
                </p>
              )}

              <div className="flex items-center gap-2">
                <a
                  href={lead.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg-sidebar)] transition-all border border-[var(--color-border)]"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Apri post
                </a>
                <button
                  onClick={() => setExpandedId(expandedId === lead.id ? null : lead.id)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] transition-all shadow-sm"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Genera messaggio
                </button>
                <button
                  onClick={() => handleRemove(lead.id)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all border border-transparent hover:border-red-200 dark:hover:border-red-800"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Rimuovi
                </button>
              </div>

              {expandedId === lead.id && (
                <div className="mt-4 animate-fade-in">
                  <MessageBox
                    service=""
                    postTitle={lead.title}
                    postBody={lead.body}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
