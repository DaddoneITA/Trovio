'use client'

import { useState, useEffect } from 'react'
import { Lead } from '@/lib/types'
import { timeAgo } from '@/lib/utils'
import { saveLead, removeSavedLead, isLeadSaved } from '@/lib/storage'
import { ExternalLink, Sparkles, Bookmark, BookmarkCheck } from 'lucide-react'
import { MessageBox } from './MessageBox'

interface LeadCardProps {
  lead: Lead
  service: string
  animationDelay?: number
}

export function LeadCard({ lead, service, animationDelay = 0 }: LeadCardProps) {
  const [showMessage, setShowMessage] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setSaved(isLeadSaved(lead.id))
  }, [lead.id])

  const handleSave = () => {
    if (saved) {
      removeSavedLead(lead.id)
      setSaved(false)
    } else {
      saveLead(lead)
      setSaved(true)
    }
  }

  return (
    <div
      className="animate-fade-in bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl p-5 shadow-sm hover:shadow-md hover:border-[var(--color-border-hover)] transition-all duration-300 group"
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-2.5 py-0.5 rounded-md bg-[var(--color-primary-subtle)] text-[var(--color-primary)] text-xs font-semibold">
            r/{lead.subreddit}
          </span>
          <span className="text-xs text-[var(--color-text-tertiary)]">
            {timeAgo(lead.createdAt)}
          </span>
          {lead.isNew && (
            <span className="px-2 py-0.5 rounded-md bg-[var(--color-accent-light)] text-[var(--color-accent)] text-xs font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] animate-pulse" />
              Nuovo
            </span>
          )}
        </div>
        <span className="text-xs text-[var(--color-text-tertiary)]">
          u/{lead.author}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-base font-semibold mb-2 leading-snug text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors duration-200">
        {lead.title}
      </h3>

      {/* Body snippet */}
      {lead.body && (
        <p className="text-sm text-[var(--color-text-secondary)] mb-4 line-clamp-3 leading-relaxed">
          {lead.body}
        </p>
      )}

      {/* Actions */}
      <div className="flex items-center gap-2 flex-wrap">
        <a
          href={lead.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg-sidebar)] transition-all duration-200 border border-[var(--color-border)]"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          Apri post
        </a>
        <button
          onClick={() => setShowMessage(!showMessage)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] transition-all duration-200 shadow-sm hover:shadow-md"
        >
          <Sparkles className="w-3.5 h-3.5" />
          {showMessage ? 'Nascondi' : 'Genera messaggio'}
        </button>
        <button
          onClick={handleSave}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 border ${
            saved
              ? 'bg-[var(--color-accent-light)] border-[var(--color-accent)] text-[var(--color-accent)]'
              : 'border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg-sidebar)]'
          }`}
        >
          {saved ? (
            <BookmarkCheck className="w-3.5 h-3.5" />
          ) : (
            <Bookmark className="w-3.5 h-3.5" />
          )}
          {saved ? 'Salvato' : 'Salva'}
        </button>
      </div>

      {/* Message Box */}
      {showMessage && (
        <div className="mt-4 animate-fade-in">
          <MessageBox
            service={service}
            postTitle={lead.title}
            postBody={lead.body}
          />
        </div>
      )}
    </div>
  )
}
