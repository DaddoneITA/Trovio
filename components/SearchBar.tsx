'use client'

import { useState } from 'react'
import { Search, Loader2 } from 'lucide-react'

interface SearchBarProps {
  onSearch: (query: string) => void
  isLoading: boolean
  initialQuery?: string
}

export function SearchBar({ onSearch, isLoading, initialQuery = '' }: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim() && !isLoading) {
      onSearch(query.trim())
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-light)] rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 blur-sm -z-10 scale-[1.02]" />
        <div className="relative flex items-center bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl shadow-sm group-focus-within:border-[var(--color-primary)] group-focus-within:shadow-md transition-all duration-300">
          <Search className="ml-4 w-5 h-5 text-[var(--color-text-tertiary)] flex-shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Che servizio offri? Es. logo design, SEO, web development..."
            className="flex-1 px-4 py-4 bg-transparent text-[var(--color-text)] placeholder:text-[var(--color-text-tertiary)] focus:outline-none text-base"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!query.trim() || isLoading}
            className="m-2 px-6 py-2.5 rounded-lg bg-[var(--color-primary)] text-white font-medium text-sm hover:bg-[var(--color-primary-hover)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Ricerca...
              </>
            ) : (
              'Cerca lead'
            )}
          </button>
        </div>
      </div>
    </form>
  )
}
