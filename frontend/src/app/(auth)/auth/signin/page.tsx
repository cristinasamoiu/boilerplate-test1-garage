'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useAuth } from '@/hooks/useAuth'
import { loginSchema, type LoginInput } from '@/lib/validations/auth'
import { FullPageSpinner } from '@/components/shared/LoadingSpinner'

export default function SignInPage() {
  const router = useRouter()
  const { user, loading, signInWithEmail } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  })

  useEffect(() => {
    if (!loading && user) {
      router.replace('/team')
    }
  }, [loading, user, router])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('verification') === 'sent') {
      toast.success('Verification email sent. Verify your email, then sign in.')
    }
  }, [])

  if (loading) return <FullPageSpinner />

  const onSubmit = async (data: LoginInput) => {
    try {
      await signInWithEmail(data.email, data.password)
      toast.success('Signed in successfully')
      router.replace('/team')
      router.refresh()
    } catch (error: unknown) {
      if (error instanceof Error && error.message.includes('email-not-verified')) {
        toast.error('Please verify your email before signing in.')
      } else {
        toast.error('Invalid email or password')
      }
    }
  }

  return (
    <div className="rounded-2xl bg-[#f8fafc] px-9 py-10 shadow-2xl">
      <h1 className="text-2xl font-bold tracking-tight text-slate-900">
        Sign in
      </h1>
      <p className="mt-1.5 text-[0.9375rem] text-black">
        Enter your credentials to continue
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-7 space-y-5" noValidate>
        <div>
          <label
            htmlFor="email"
            className="mb-1.5 block text-sm font-medium text-slate-900"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className={`w-full rounded-[10px] border-[1.5px] px-3.5 py-3 text-[0.9375rem] text-slate-900 outline-none transition
              ${
                errors.email
                  ? 'border-red-500 bg-red-50 focus:ring-2 focus:ring-red-200'
                  : 'border-slate-200 bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
              }`}
            {...register('email')}
          />
          {errors.email && (
            <p
              id="email-error"
              className="mt-1.5 text-[0.8125rem] font-medium text-red-500"
              role="alert"
            >
              Please Enter a Valid Email Address
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="password"
            className="mb-1.5 block text-sm font-medium text-slate-900"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
            aria-invalid={!!errors.password}
            className="w-full rounded-[10px] border-[1.5px] border-slate-200 bg-white px-3.5 py-3 text-[0.9375rem] text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            {...register('password')}
          />
          {errors.password && (
            <p className="mt-1.5 text-[0.8125rem] font-medium text-red-500" role="alert">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-1 w-full rounded-[10px] bg-gradient-to-r from-indigo-500 to-indigo-600 py-3.5 text-base font-semibold text-white shadow-lg shadow-indigo-500/40 transition hover:from-indigo-600 hover:to-indigo-700 hover:-translate-y-px active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? 'Signing in…' : 'Sign in'}
        </button>
      </form>

      <p className="mt-7 text-center text-sm text-slate-500">
        Don&apos;t have an account?{' '}
        <Link
          href="/auth/signup"
          className="font-semibold text-indigo-500 hover:underline"
        >
          Create one
        </Link>
      </p>
    </div>
  )
}