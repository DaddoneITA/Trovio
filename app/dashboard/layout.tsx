import { Navbar } from '@/components/Navbar'
import { DashboardSidebar } from '@/components/DashboardSidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <Navbar />
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 min-h-[calc(100vh-64px)] min-w-0 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  )
}
