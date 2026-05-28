'use client'

import { SUBREDDITS, TimeFilter } from '@/lib/types'
import { cn } from '@/lib/utils'
import { Filter, Clock } from 'lucide-react'

interface FilterPanelProps {
  selectedSubreddits: string[]
  onSubredditsChange: (subreddits: string[]) => void
  timeFilter: TimeFilter
  onTimeFilterChange: (filter: TimeFilter) => void
}

const TIME_OPTIONS: { value: TimeFilter; label: string }[] = [
  { value: '24h', label: 'Ultime 24h' },
  { value: 'week', label: 'Ultima settimana' },
  { value: 'month', label: 'Ultimo mese' },
]

export function FilterPanel({
  selectedSubreddits,
  onSubredditsChange,
  timeFilter,
  onTimeFilterChange,
}: FilterPanelProps) {
  const toggleSubreddit = (sub: string) => {
    if (selectedSubreddits.includes(sub)) {
      onSubredditsChange(selectedSubreddits.filter((s) => s !== sub))
    } else {
      onSubredditsChange([...selectedSubreddits, sub])
    }
  }

  const toggleAll = () => {
    if (selectedSubreddits.length === SUBREDDITS.length) {
      onSubredditsChange([])
    } else {
      onSubredditsChange([...SUBREDDITS])
    }
  }

  return (
    <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl p-5 shadow-sm">
      {/* Time filter */}
      <div className="mb-5">
        <div className="flex items-center gap-2 mb-3">
          <Clock className="w-4 h-4 text-[var(--color-text-secondary)]" />
          <span className="text-sm font-medium text-[var(--color-text-secondary)]">
            Periodo
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {TIME_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => onTimeFilterChange(opt.value)}
              className={cn(
                'px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-200',
                timeFilter === opt.value
                  ? 'bg-[var(--color-primary)] text-white shadow-sm'
                  : 'bg-[var(--color-bg-sidebar)] text-[var(--color-text-secondary)] hover:bg-[var(--color-border)]'
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Subreddit filter */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-[var(--color-text-secondary)]" />
            <span className="text-sm font-medium text-[var(--color-text-secondary)]">
              Subreddit
            </span>
          </div>
          <button
            onClick={toggleAll}
            className="text-xs font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] transition-colors"
          >
            {selectedSubreddits.length === SUBREDDITS.length
              ? 'Deseleziona tutti'
              : 'Seleziona tutti'}
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {SUBREDDITS.map((sub) => (
            <button
              key={sub}
              onClick={() => toggleSubreddit(sub)}
              className={cn(
                'px-3 py-1.5 rounded-lg text-sm transition-all duration-200 border',
                selectedSubreddits.includes(sub)
                  ? 'bg-[var(--color-primary-subtle)] border-[var(--color-primary)] text-[var(--color-primary)] font-medium'
                  : 'bg-[var(--color-bg)] border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-border-hover)]'
              )}
            >
              r/{sub}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
