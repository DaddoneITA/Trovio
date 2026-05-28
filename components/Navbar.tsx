'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { useSession, signOut } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { Sun, Moon, Menu, X, Zap, LogOut, User } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Navbar() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const { data: session } = useSession()
  const [mounted, setMounted] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => setMounted(true), [])

  const isDashboard = pathname?.startsWith('/dashboard')

  const navLinks = isDashboard
    ? [
        { href: '/dashboard', label: 'Cerca' },
        { href: '/dashboard/saved', label: 'Salvati' },
        { href: '/dashboard/history', label: 'Storico' },
      ]
    : [
        { href: '/#features', label: 'Features' },
        { href: '/pricing', label: 'Prezzi' },
      ]

  return (
    <header className="sticky top-0 z-50 glass">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href={isDashboard ? '/dashboard' : '/'} className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-light)] flex items-center justify-center transition-transform group-hover:scale-110">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">
              Trovio
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                  pathname === link.href
                    ? 'bg-[var(--color-primary-subtle)] text-[var(--color-primary)]'
                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg-sidebar)]'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-lg text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg-sidebar)] transition-all duration-200"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            )}

            {isDashboard && session?.user ? (
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-[var(--color-text-secondary)] hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all"
              >
                <LogOut className="w-4 h-4" />
                Esci
              </button>
            ) : !isDashboard ? (
              <Link
                href="/login"
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--color-primary)] text-white text-sm font-medium hover:bg-[var(--color-primary-hover)] transition-all duration-200 shadow-sm hover:shadow-md"
              >
                Inizia gratis
              </Link>
            ) : null}

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-sidebar)] transition-all"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden py-3 border-t border-[var(--color-border)] animate-fade-in">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'block px-4 py-2.5 rounded-lg text-sm font-medium transition-all',
                  pathname === link.href
                    ? 'bg-[var(--color-primary-subtle)] text-[var(--color-primary)]'
                    : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-sidebar)]'
                )}
              >
                {link.label}
              </Link>
            ))}
            {isDashboard && session?.user && (
              <button
                onClick={() => { signOut({ callbackUrl: '/' }); setMobileOpen(false) }}
                className="block w-full mt-2 px-4 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 text-left"
              >
                <LogOut className="w-4 h-4 inline mr-2" />
                Esci
              </button>
            )}
            {!isDashboard && (
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="block mt-2 mx-4 text-center px-4 py-2.5 rounded-lg bg-[var(--color-primary)] text-white text-sm font-medium"
              >
                Inizia gratis
              </Link>
            )}
          </div>
        )}
      </nav>
    </header>
  )
}
