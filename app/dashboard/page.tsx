'use client'

import { useState } from 'react'
import { SearchBar } from '@/components/SearchBar'
import { FilterPanel } from '@/components/FilterPanel'
import { LeadCard } from '@/components/LeadCard'
import { Lead, SUBREDDITS, TimeFilter } from '@/lib/types'
import { addSearchHistory, addMonthlyLeadCount } from '@/lib/storage'
import { Search, AlertCircle, ArrowRight } from 'lucide-react'

export default function DashboardPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [query, setQuery] = useState('')
  const [selectedSubreddits, setSelectedSubreddits] = useState<string[]>([...SUBREDDITS])
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('week')
  const [hasSearched, setHasSearched] = useState(false)
  const [error, setError] = useState('')

  const handleSearch = async (searchQuery: string) => {
    setQuery(searchQuery)
    setIsLoading(true)
    setError('')
    setHasSearched(true)

    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: searchQuery,
          subreddits: selectedSubreddits,
          timeFilter,
        }),
      })

      if (!response.ok) throw new Error('Search failed')

      const data = await response.json()
      setLeads(data.leads)

      // Save to history
      addSearchHistory({
        query: searchQuery,
        resultsCount: data.totalFound,
        subreddits: selectedSubreddits,
        timeFilter,
        timestamp: Date.now(),
      })

      // Update monthly counter
      addMonthlyLeadCount(data.totalFound)
    } catch (err) {
      setError('Errore durante la ricerca. Reddit potrebbe limitare le richieste. Riprova tra qualche secondo.')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="p-6 lg:p-8 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Cerca lead</h1>
        <p className="text-[var(--color-text-secondary)]">
          Inserisci il servizio che offri e trova chi lo sta cercando su Reddit.
        </p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <SearchBar onSearch={handleSearch} isLoading={isLoading} />
      </div>

      {/* Filters */}
      <div className="mb-8">
        <FilterPanel
          selectedSubreddits={selectedSubreddits}
          onSubredditsChange={setSelectedSubreddits}
          timeFilter={timeFilter}
          onTimeFilterChange={setTimeFilter}
        />
      </div>

      {/* Results */}
      {error && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 mb-6 animate-fade-in">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
          <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
        </div>
      )}

      {isLoading && (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-5 w-16 rounded animate-shimmer" />
                <div className="h-4 w-12 rounded animate-shimmer" />
              </div>
              <div className="h-5 w-3/4 rounded animate-shimmer mb-2" />
              <div className="h-4 w-full rounded animate-shimmer mb-1" />
              <div className="h-4 w-2/3 rounded animate-shimmer" />
            </div>
          ))}
        </div>
      )}

      {!isLoading && hasSearched && leads.length === 0 && !error && (
        <div className="text-center py-16 animate-fade-in">
          <Search className="w-12 h-12 text-[var(--color-text-tertiary)] mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Nessun lead trovato</h3>
          <p className="text-sm text-[var(--color-text-secondary)] max-w-md mx-auto">
            Prova a cambiare i filtri, ampliare il periodo di tempo o usare parole chiave diverse.
          </p>
        </div>
      )}

      {!isLoading && leads.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-[var(--color-text-secondary)]">
              <span className="font-semibold text-[var(--color-text)]">{leads.length}</span> lead trovati per &quot;{query}&quot;
            </p>
          </div>
          <div className="space-y-4">
            {leads.map((lead, index) => (
              <LeadCard
                key={lead.id}
                lead={lead}
                service={query}
                animationDelay={index * 80}
              />
            ))}
          </div>
        </div>
      )}

      {!hasSearched && (
        <div className="text-center py-20 animate-fade-in">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--color-primary)]/10 to-[var(--color-primary-light)]/10 flex items-center justify-center mx-auto mb-5">
            <Search className="w-7 h-7 text-[var(--color-primary)]" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Inizia a cercare lead</h3>
          <p className="text-[var(--color-text-secondary)] max-w-md mx-auto mb-6">
            Scrivi il servizio che offri nella barra di ricerca per trovare potenziali clienti su Reddit.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {['Logo design', 'SEO', 'Web development', 'Copywriting', 'Social media'].map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => handleSearch(suggestion)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[var(--color-border)] text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:border-[var(--color-primary)] hover:bg-[var(--color-primary-subtle)] transition-all duration-200"
              >
                {suggestion}
                <ArrowRight className="w-3 h-3" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
