import { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useQuoteQuery } from '../hooks/useQueries'
import DashboardShell from './DashboardShell.tsx'

interface QuoteDetailsProps {
  userEmail: string
  onLogout: () => void
}

function parseRequestData(requestData: unknown): Record<string, unknown> {
  if (!requestData) return {}

  if (typeof requestData === 'string') {
    try {
      const parsed = JSON.parse(requestData)
      return parsed && typeof parsed === 'object' ? (parsed as Record<string, unknown>) : {}
    } catch {
      return {}
    }
  }

  return typeof requestData === 'object' ? (requestData as Record<string, unknown>) : {}
}

function formatLabel(key: string): string {
  return key
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/[_-]+/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

function QuoteDetails({ userEmail, onLogout }: QuoteDetailsProps): React.ReactElement {
  const { quoteId = '' } = useParams()
  const { data, isLoading } = useQuoteQuery(quoteId)
  const quote = data?.data ?? null
  const parsedRequestData = useMemo(() => parseRequestData(quote?.requestData), [quote?.requestData])
  const requestEntries = useMemo(() => Object.entries(parsedRequestData), [parsedRequestData])

  if (isLoading) {
    return (
      <DashboardShell pageTitle="Quote Details" pageSubtitle="Review quote information" userEmail={userEmail} onLogout={onLogout} activeNav="quotes">
        <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <p className="text-slate-600 dark:text-slate-300">Loading quote...</p>
        </div>
      </DashboardShell>
    )
  }

  if (!quote) {
    return (
      <DashboardShell pageTitle="Quote Details" pageSubtitle="Review quote information" userEmail={userEmail} onLogout={onLogout} activeNav="quotes">
        <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Quote Not Found</h1>
          <p className="mt-2 text-slate-600 dark:text-slate-300">The quote you requested does not exist.</p>
          <Link to="/dashboard" className="mt-5 inline-flex rounded-lg bg-sky-600 px-4 py-2 font-medium text-white hover:bg-sky-700">
            Back to Dashboard
          </Link>
        </div>
      </DashboardShell>
    )
  }

  return (
    <DashboardShell pageTitle="Quote Details" pageSubtitle="Review quote information" userEmail={userEmail} onLogout={onLogout} activeNav="quotes">
      <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-sky-700 dark:text-sky-300">Quote Details</p>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{quote.id}</h1>
          </div>
          <Link to="/dashboard" className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800">
            Back
          </Link>
        </div>

        <dl className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800/70">
            <dt className="text-xs uppercase text-slate-500 dark:text-slate-300">Customer</dt>
            <dd className="mt-1 text-sm font-medium text-slate-900 dark:text-white">{quote.fullName}</dd>
          </div>
          <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800/70">
            <dt className="text-xs uppercase text-slate-500 dark:text-slate-300">Service</dt>
            <dd className="mt-1 text-sm font-medium text-slate-900 dark:text-white">{quote.quoteType}</dd>
          </div>
          <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800/70">
            <dt className="text-xs uppercase text-slate-500 dark:text-slate-300">Phone</dt>
            <dd className="mt-1 text-sm font-medium text-slate-900 dark:text-white">{quote.phone}</dd>
          </div>
          <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800/70">
            <dt className="text-xs uppercase text-slate-500 dark:text-slate-300">Email</dt>
            <dd className="mt-1 text-sm font-medium text-slate-900 dark:text-white">{quote.email}</dd>
          </div>
          <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800/70">
            <dt className="text-xs uppercase text-slate-500 dark:text-slate-300">Amount</dt>
            <dd className="mt-1 text-sm font-medium text-slate-900 dark:text-white">{quote.amount ?? '-'}</dd>
          </div>
          <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800/70">
            <dt className="text-xs uppercase text-slate-500 dark:text-slate-300">Status</dt>
            <dd className="mt-1 text-sm font-medium text-slate-900 dark:text-white">{quote.status ?? 'Pending'}</dd>
          </div>
          <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800/70 sm:col-span-2">
            <dt className="text-xs uppercase text-slate-500 dark:text-slate-300">Created On</dt>
            <dd className="mt-1 text-sm font-medium text-slate-900 dark:text-white">{quote.createdAt ?? '-'}</dd>
          </div>
          <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800/70 sm:col-span-2">
            <dt className="text-xs uppercase text-slate-500 dark:text-slate-300">Notes</dt>
            <dd className="mt-1 text-sm font-medium text-slate-900 dark:text-white">{quote.notes}</dd>
          </div>
          <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800/70 sm:col-span-2">
            <dt className="text-xs uppercase text-slate-500 dark:text-slate-300">Request Data</dt>
            <dd className="mt-2 space-y-2 text-sm text-slate-700 dark:text-slate-200">
              {requestEntries.length > 0 ? (
                requestEntries.map(([key, value]) => (
                  <div key={key} className="grid gap-1 sm:grid-cols-[180px_1fr]">
                    <span className="font-medium text-slate-500 dark:text-slate-300">{formatLabel(key)}</span>
                    <span>{typeof value === 'object' ? JSON.stringify(value) : String(value)}</span>
                  </div>
                ))
              ) : (
                <span>-</span>
              )}
            </dd>
          </div>
        </dl>
      </div>
    </DashboardShell>
  )
}

export default QuoteDetails
