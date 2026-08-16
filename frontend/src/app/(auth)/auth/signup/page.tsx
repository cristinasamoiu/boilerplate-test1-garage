'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useAuth } from '@/hooks/useAuth'
import { signupSchema, type SignupInput } from '@/lib/validations/auth'
import { FullPageSpinner } from '@/components/shared/LoadingSpinner'

export default function SignUpPage() {
  const router = useRouter()
  const { user, loading, signUpWithEmail } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
  })

  useEffect(() => {
    if (!loading && !isSubmitting && user) {
      router.replace('/team')
    }
  }, [loading, isSubmitting, user, router])

  if (loading) return <FullPageSpinner />

  const onSubmit = async (data: SignupInput) => {
    try {
      await signUpWithEmail(data.email, data.password, data.displayName)
      router.push('/auth/signin?verification=sent')
    } catch (error: unknown) {
      if (error instanceof Error && error.message.includes('email-already-in-use')) {
        toast.error('An account with this email already exists')
      } else {
        toast.error('Failed to create account. Please try again.')
      }
    }
  }

  return (
    <div className="rounded-2xl bg-[#f8fafc] px-9 py-10 shadow-2xl">
      <h1 className="text-2xl font-bold tracking-tight text-slate-900">
        Create an Account
      </h1>
      <p className="mt-1.5 text-[0.9375rem] text-slate-500">
        Enter your details to get started
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-7 space-y-5" noValidate>
        {/* Full Name */}
        <div>
          <label
            htmlFor="displayName"
            className="mb-1.5 block text-sm font-medium text-slate-900"
          >
            Full Name
          </label>
          <input
            id="displayName"
            type="text"
            autoComplete="name"
            aria-invalid={!!errors.displayName}
            className={`w-full rounded-[10px] border-[1.5px] px-3.5 py-3 text-[0.9375rem] text-slate-900 outline-none transition
              ${
                errors.displayName
                  ? 'border-red-500 bg-red-50 focus:ring-2 focus:ring-red-200'
                  : 'border-slate-200 bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
              }`}
            {...register('displayName')}
          />
          {errors.displayName && (
            <p className="mt-1.5 text-[0.8125rem] font-medium text-red-500" role="alert">
              {errors.displayName.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="mb-1.5 block text-sm font-medium text-slate-900"
          >
            Email Address
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            aria-invalid={!!errors.email}
            className={`w-full rounded-[10px] border-[1.5px] px-3.5 py-3 text-[0.9375rem] text-slate-900 outline-none transition
              ${
                errors.email
                  ? 'border-red-500 bg-red-50 focus:ring-2 focus:ring-red-200'
                  : 'border-slate-200 bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
              }`}
            {...register('email')}
          />
          {errors.email && (
            <p className="mt-1.5 text-[0.8125rem] font-medium text-red-500" role="alert">
              Please Enter a Valid Email Address
            </p>
          )}
        </div>

        {/* Password */}
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
            autoComplete="new-password"
            aria-invalid={!!errors.password}
            className={`w-full rounded-[10px] border-[1.5px] px-3.5 py-3 text-[0.9375rem] text-slate-900 outline-none transition
              ${
                errors.password
                  ? 'border-red-500 bg-red-50 focus:ring-2 focus:ring-red-200'
                  : 'border-slate-200 bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
              }`}
            {...register('password')}
          />
          {errors.password && (
            <p className="mt-1.5 text-[0.8125rem] font-medium text-red-500" role="alert">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label
            htmlFor="confirmPassword"
            className="mb-1.5 block text-sm font-medium text-slate-900"
          >
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            autoComplete="new-password"
            aria-invalid={!!errors.confirmPassword}
            className={`w-full rounded-[10px] border-[1.5px] px-3.5 py-3 text-[0.9375rem] text-slate-900 outline-none transition
              ${
                errors.confirmPassword
                  ? 'border-red-500 bg-red-50 focus:ring-2 focus:ring-red-200'
                  : 'border-slate-200 bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
              }`}
            {...register('confirmPassword')}
          />
          {errors.confirmPassword && (
            <p className="mt-1.5 text-[0.8125rem] font-medium text-red-500" role="alert">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-1 w-full rounded-[10px] bg-gradient-to-r from-indigo-500 to-indigo-600 py-3.5 text-base font-semibold text-white shadow-lg shadow-indigo-500/40 transition hover:from-indigo-600 hover:to-indigo-700 hover:-translate-y-px active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? 'Creating account…' : 'Sign up'}
        </button>
      </form>

      <p className="mt-7 text-center text-sm text-slate-500">
        Already have an account?{' '}
        <Link
          href="/auth/signin"
          className="font-semibold text-indigo-500 hover:underline"
        >
          Sign in
        </Link>
      </p>
    </div>
  )
}