'use client'

import { useState, useEffect } from 'react'
import { SearchHistoryEntry } from '@/lib/types'
import { getSearchHistory, clearSearchHistory } from '@/lib/storage'
import { History, Trash2, Search, Clock } from 'lucide-react'

export default function HistoryPage() {
  const [history, setHistory] = useState<SearchHistoryEntry[]>([])

  useEffect(() => {
    setHistory(getSearchHistory())
  }, [])

  const handleClear = () => {
    clearSearchHistory()
    setHistory([])
  }

  return (
    <div className="p-6 lg:p-8 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold mb-2">Storico ricerche</h1>
          <p className="text-[var(--color-text-secondary)]">
            Le tue ricerche precedenti.
          </p>
        </div>
        {history.length > 0 && (
          <button
            onClick={handleClear}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all border border-transparent hover:border-red-200"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Cancella tutto
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="text-center py-20 animate-fade-in">
          <div className="w-16 h-16 rounded-2xl bg-[var(--color-bg-sidebar)] flex items-center justify-center mx-auto mb-5">
            <History className="w-7 h-7 text-[var(--color-text-tertiary)]" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Nessuna ricerca</h3>
          <p className="text-[var(--color-text-secondary)] max-w-md mx-auto">
            Le tue ricerche appariranno qui.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {history.map((entry, index) => (
            <div
              key={entry.id}
              className="animate-fade-in bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl p-4 hover:shadow-sm transition-all duration-200 flex items-center justify-between"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-[var(--color-bg-sidebar)] flex items-center justify-center flex-shrink-0">
                  <Search className="w-4 h-4 text-[var(--color-text-secondary)]" />
                </div>
                <div>
                  <p className="font-medium text-sm">{entry.query}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-[var(--color-text-tertiary)] flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(entry.timestamp).toLocaleDateString('it-IT', {
                        day: 'numeric',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                    <span className="text-xs text-[var(--color-text-tertiary)]">
                      ·
                    </span>
                    <span className="text-xs text-[var(--color-text-tertiary)]">
                      {entry.subreddits?.length || 0} subreddit
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-[var(--color-primary)]">
                  {entry.resultsCount}
                </span>
                <p className="text-xs text-[var(--color-text-tertiary)]">lead</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
