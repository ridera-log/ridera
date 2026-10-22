import { useState } from 'react'
import { useFormik } from 'formik'
import { loginSchema } from '../validations/schemas'
import { useLoginMutation } from '../hooks/useQueries'
import { useAppSelector } from '../store/store'
import logo from "/drive-download-20260304T223405Z-3-001/logo.png";

interface LoginProps {
  onLogin: (email: string) => void
}

function Login({ onLogin }: LoginProps): React.ReactElement {
  const { error: authError, loading } = useAppSelector((state) => state.auth)
  const loginMutation = useLoginMutation()
  const [showPassword, setShowPassword] = useState(false)

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values) => {
      try {
        await loginMutation.mutateAsync(values)
        onLogin(values.email)
      } catch {
        // Error is handled by mutation error handler
      }
    },
  })

  const isSubmitting = loading || loginMutation.isPending

  return (
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center bg-slate-100 px-4 py-10 dark:bg-slate-950 sm:px-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(14,165,233,0.2),transparent_42%),radial-gradient(circle_at_85%_10%,rgba(251,146,60,0.2),transparent_38%)] dark:bg-[radial-gradient(circle_at_15%_20%,rgba(14,165,233,0.22),transparent_40%),radial-gradient(circle_at_85%_10%,rgba(251,146,60,0.18),transparent_40%)]" />
      <div className="relative max-w-md rounded-3xl border border-slate-200 bg-white/95 p-8 shadow-xl shadow-slate-300/40 backdrop-blur dark:border-slate-700 dark:bg-slate-900/90 dark:shadow-slate-950/60">
        <div className="mb-8 flex flex-col items-center text-center">
          <a href="/">
            <img src={logo} alt="Ridera logo" className="mb-4 h-14 w-auto" />
          </a>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Ridera Portal</h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Sign in to manage quotes and track activity.</p>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...formik.getFieldProps('email')}
              className={`w-full rounded-xl border px-4 py-2.5 text-slate-900 placeholder-slate-400 focus:outline-none dark:text-white ${formik.touched.email && formik.errors.email
                  ? 'border-rose-500 dark:border-rose-500 dark:bg-slate-800/50'
                  : 'border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-800'
                }`}
              placeholder="you@ridera.com"
              disabled={isSubmitting}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="mt-1 text-sm text-rose-600 dark:text-rose-400">{formik.errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                {...formik.getFieldProps('password')}
                className={`w-full rounded-xl border px-4 py-2.5 text-slate-900 placeholder-slate-400 focus:outline-none dark:text-white ${formik.touched.password && formik.errors.password
                    ? 'border-rose-500 dark:border-rose-500 dark:bg-slate-800/50'
                    : 'border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-800'
                  }`}
                placeholder="Enter your password"
                disabled={isSubmitting}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
            {formik.touched.password && formik.errors.password && (
              <p className="mt-1 text-sm text-rose-600 dark:text-rose-400">{formik.errors.password}</p>
            )}
          </div>

          {authError ? <p className="text-sm text-rose-600 dark:text-rose-400">{authError}</p> : null}

          <button
            type="submit"
            disabled={isSubmitting || !formik.isValid}
            className="w-full rounded-xl bg-sky-600 px-4 py-2.5 font-semibold text-white transition hover:bg-sky-700 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Signing In...' : 'Log In'}
          </button>
        </form>

        <div className="mt-6 border-t border-slate-200 pt-6 dark:border-slate-700">
          <p className="text-center text-sm text-slate-600 dark:text-slate-400">
            Don't have an account? <span className="font-medium text-sky-600 dark:text-sky-400">Contact support</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
