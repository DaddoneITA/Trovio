import { Lead, SavedLead, SearchHistoryEntry } from './types'

const SAVED_LEADS_KEY = 'trovio_saved_leads'
const SEARCH_HISTORY_KEY = 'trovio_search_history'
const MONTHLY_MESSAGES_KEY = 'trovio_monthly_messages'
const MONTHLY_LEADS_KEY = 'trovio_monthly_leads'

function getMonthKey(): string {
  const now = new Date()
  return `${now.getFullYear()}-${now.getMonth()}`
}

export function getSavedLeads(): SavedLead[] {
  if (typeof window === 'undefined') return []
  const data = localStorage.getItem(SAVED_LEADS_KEY)
  return data ? JSON.parse(data) : []
}

export function saveLead(lead: Lead): void {
  const saved = getSavedLeads()
  if (saved.find((s) => s.id === lead.id)) return
  saved.unshift({ ...lead, savedAt: Date.now() })
  localStorage.setItem(SAVED_LEADS_KEY, JSON.stringify(saved))
}

export function removeSavedLead(id: string): void {
  const saved = getSavedLeads().filter((s) => s.id !== id)
  localStorage.setItem(SAVED_LEADS_KEY, JSON.stringify(saved))
}

export function isLeadSaved(id: string): boolean {
  return getSavedLeads().some((s) => s.id === id)
}

export function getSearchHistory(): SearchHistoryEntry[] {
  if (typeof window === 'undefined') return []
  const data = localStorage.getItem(SEARCH_HISTORY_KEY)
  return data ? JSON.parse(data) : []
}

export function addSearchHistory(
  entry: Omit<SearchHistoryEntry, 'id'>
): void {
  const history = getSearchHistory()
  history.unshift({ ...entry, id: crypto.randomUUID() })
  if (history.length > 50) history.pop()
  localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(history))
}

export function clearSearchHistory(): void {
  localStorage.removeItem(SEARCH_HISTORY_KEY)
}

export function getMonthlyMessageCount(): number {
  if (typeof window === 'undefined') return 0
  const data = localStorage.getItem(MONTHLY_MESSAGES_KEY)
  if (!data) return 0
  const parsed = JSON.parse(data)
  if (parsed.month !== getMonthKey()) return 0
  return parsed.count
}

export function incrementMessageCount(): void {
  const key = getMonthKey()
  const current = getMonthlyMessageCount()
  localStorage.setItem(
    MONTHLY_MESSAGES_KEY,
    JSON.stringify({ month: key, count: current + 1 })
  )
}

export function getMonthlyLeadCount(): number {
  if (typeof window === 'undefined') return 0
  const data = localStorage.getItem(MONTHLY_LEADS_KEY)
  if (!data) return 0
  const parsed = JSON.parse(data)
  if (parsed.month !== getMonthKey()) return 0
  return parsed.count
}

export function addMonthlyLeadCount(count: number): void {
  const key = getMonthKey()
  const current = getMonthlyLeadCount()
  localStorage.setItem(
    MONTHLY_LEADS_KEY,
    JSON.stringify({ month: key, count: current + count })
  )
}
