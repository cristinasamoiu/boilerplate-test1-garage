import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Authentication',
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden p-6 bg-gradient-to-br from-[#1e1b4b] via-[#312e81] to-[#5b21b6]">
      {/* Decorative circles */}
      <div className="pointer-events-none absolute -top-28 -left-24 h-[420px] w-[420px] rounded-full bg-white/5" />
      <div className="pointer-events-none absolute -bottom-20 -right-16 h-[380px] w-[380px] rounded-full bg-white/5" />
      <div className="pointer-events-none absolute top-[18%] right-[8%] h-[280px] w-[280px] rounded-full bg-white/5 opacity-60" />
      <div className="pointer-events-none absolute bottom-[12%] left-[6%] h-[160px] w-[160px] rounded-full bg-white/5 opacity-40" />

      <div className="relative z-10 w-full max-w-[400px]">{children}</div>
    </div>
  )
}