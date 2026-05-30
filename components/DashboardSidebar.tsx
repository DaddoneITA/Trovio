'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import { cn } from '@/lib/utils'
import { Search, Bookmark, History, Settings, Zap, TrendingUp, LogOut, Crown } from 'lucide-react'
import { useEffect, useState } from 'react'
import { getMonthlyLeadCount, getMonthlyMessageCount, getSavedLeads } from '@/lib/storage'

const sidebarLinks = [
  { href: '/dashboard', label: 'Cerca lead', icon: Search },
  { href: '/dashboard/saved', label: 'Lead salvati', icon: Bookmark },
  { href: '/dashboard/history', label: 'Storico', icon: History },
  { href: '/dashboard/settings', label: 'Impostazioni', icon: Settings },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const [stats, setStats] = useState({ leads: 0, messages: 0, saved: 0 })

  useEffect(() => {
    setStats({
      leads: getMonthlyLeadCount(),
      messages: getMonthlyMessageCount(),
      saved: getSavedLeads().length,
    })
  }, [pathname])

  return (
    <aside className="hidden lg:flex flex-col w-64 border-r border-[var(--color-border)] bg-[var(--color-bg-sidebar)] h-[calc(100vh-64px)] sticky top-16">
      <nav className="flex-1 p-4 space-y-1">
        {sidebarLinks.map((link) => {
          const Icon = link.icon
          const isActive = pathname === link.href
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-[var(--color-primary-subtle)] text-[var(--color-primary)]'
                  : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg-card)]'
              )}
            >
              <Icon className="w-4 h-4" />
              {link.label}
              {link.href === '/dashboard/saved' && stats.saved > 0 && (
                <span className="ml-auto px-2 py-0.5 rounded-full text-xs bg-[var(--color-primary-subtle)] text-[var(--color-primary)] font-semibold">
                  {stats.saved}
                </span>
              )}
            </Link>
          )
        })}
      </nav>
      <div className="p-4 border-t border-[var(--color-border)] space-y-3">
        <div className="bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-light)] rounded-xl p-4 text-white">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-4 h-4" />
            <span className="text-xs font-semibold uppercase tracking-wider opacity-80">Questo mese</span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm opacity-90">Lead trovati</span>
              <span className="text-lg font-bold">{stats.leads}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm opacity-90">Messaggi</span>
              <span className="text-lg font-bold">{stats.messages}</span>
            </div>
          </div>
        </div>
        <Link
          href="/pricing"
          className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-sm font-medium bg-amber-50 text-amber-700 hover:bg-amber-100 dark:bg-amber-950/20 dark:text-amber-400 transition-all"
        >
          <Crown className="w-4 h-4" />
          Upgrade a Pro
        </Link>
        {session?.user && (
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-sm font-medium text-[var(--color-text-secondary)] hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Esci
          </button>
        )}
      </div>
    </aside>
  )
}
