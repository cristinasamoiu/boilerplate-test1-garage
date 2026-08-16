'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { LogOut, User } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

export function Navbar() {
  const router = useRouter()
  const { user, signOut } = useAuth()

  const handleSignOut = async () => {
    await signOut()
    router.replace('/auth/signin')
    router.refresh()
  }

  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-800 bg-slate-900 px-6 text-white">
      <div className="flex flex-col">
        <span className="text-[1.05rem] font-semibold tracking-tight">
          Telstra Health — UX Research Companion — Team 2
        </span>
        <span className="text-sm text-slate-400">Capstone Project</span>
      </div>

      <div className="flex items-center gap-3">
        {user && (
          <span className="hidden text-sm text-slate-300 sm:block">
            {user.email}
          </span>
        )}
        <Link
          href="/profile"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 text-slate-300 transition-colors hover:bg-slate-700"
          aria-label="Profile"
        >
          <User className="h-4 w-4" />
        </Link>
        <button
          type="button"
          onClick={handleSignOut}
          className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-800 hover:text-slate-200"
          aria-label="Sign out"
        >
          <LogOut className="h-4 w-4" />
        </button>
      </div>
    </header>
  )
}