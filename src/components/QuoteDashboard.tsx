import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuotesQuery } from '../hooks/useQueries'
import DashboardShell from './DashboardShell.tsx'
import EmailModal from './EmailModal'

interface QuoteDashboardProps {
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

function QuoteDashboard({ userEmail, onLogout }: QuoteDashboardProps): React.ReactElement {
  const { data, isLoading, error } = useQuotesQuery(1, 20)
  const quotes = data?.data ?? []
  const [socialCodeSearch, setSocialCodeSearch] = useState('')

  const [selectedQuoteIds, setSelectedQuoteIds] = useState<string[]>([])
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false)
  const [emailRecipients, setEmailRecipients] = useState<string[]>([])

  const filteredQuotes = useMemo(() => {
    const normalizedSearch = socialCodeSearch.trim().toLowerCase()
    if (!normalizedSearch) return quotes

    return quotes.filter((quote) => {
      const requestData = parseRequestData(quote.requestData)
      const socialCode = String(requestData.socialCode ?? '').toLowerCase()
      return socialCode.includes(normalizedSearch)
    })
  }, [quotes, socialCodeSearch])

  // Checkbox handlers
  const allVisibleIds = filteredQuotes.map((q) => q.id)
  const allSelected = allVisibleIds.length > 0 && allVisibleIds.every((id) => selectedQuoteIds.includes(id))
  const handleSelectAll = () => {
    if (allSelected) setSelectedQuoteIds([])
    else setSelectedQuoteIds(allVisibleIds)
  }
  const handleSelectOne = (id: string) => {
    setSelectedQuoteIds((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])
  }

  // Email modal handlers
  const openEmailModal = (emails: string[]) => {
    setEmailRecipients(emails)
    setIsEmailModalOpen(true)
  }
  const closeEmailModal = () => {
    setIsEmailModalOpen(false)
    setEmailRecipients([])
  }
  // Simulate sending email (replace with real API call)
  const handleSendEmail = async (subject: string, message: string) => {
    // TODO: Replace with actual API call
    alert(`Email sent to: ${emailRecipients.join(', ')}\nSubject: ${subject}\nMessage: ${message}`)
  }

  return (
    <DashboardShell pageTitle="Dashboard" pageSubtitle="Overview of your quote activity" userEmail={userEmail} onLogout={onLogout} activeNav="dashboard">
      <div className="space-y-6">
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <article className="rounded-2xl border border-sky-200 bg-sky-50 p-5 dark:border-sky-900 dark:bg-sky-950/40">
            <p className="text-sm font-medium text-sky-700 dark:text-sky-300">Quote Count</p>
            <p className="mt-2 text-3xl font-bold text-sky-900 dark:text-sky-100">{quotes.length}</p>
          </article>
        </section>

        {isLoading ? <p className="text-sm text-slate-600 dark:text-slate-300">Loading quotes...</p> : null}
        {error ? <p className="text-sm text-rose-600 dark:text-rose-400">Failed to load quotes.</p> : null}

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <div className="flex items-center justify-between px-6 pt-4">
            <div>
              {selectedQuoteIds.length > 0 && (
                <button
                  className="rounded-lg bg-sky-600 px-4 py-2 text-white font-semibold hover:bg-sky-700 transition"
                  onClick={() => {
                    // Collect emails for selected quotes
                    const emails = filteredQuotes.filter(q => selectedQuoteIds.includes(q.id)).map(q => q.email).filter(Boolean)
                    if (emails.length > 0) openEmailModal(emails)
                  }}
                >
                  Send Email to Selected ({selectedQuoteIds.length})
                </button>
              )}
            </div>
          </div>
          <div className="border-b border-slate-200 px-6 py-4 dark:border-slate-700">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Recent Quotes</h2>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">Search quotes by the social code saved in request data.</p>
              </div>

              <div className="w-full max-w-md">
                <label className="sr-only" htmlFor="social-code-search">Search by social code</label>
                <input
                  id="social-code-search"
                  type="text"
                  value={socialCodeSearch}
                  onChange={(event) => setSocialCodeSearch(event.target.value)}
                  placeholder="Search by social code"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 transition-all focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
                />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
              <thead className="bg-slate-50 dark:bg-slate-800/70">
                <tr>
                  <th className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={allSelected}
                      onChange={handleSelectAll}
                      aria-label="Select all quotes"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-300">Quote ID</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-300">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-300">Service</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-300">Social Code</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-300">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-300">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-300">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {filteredQuotes.length > 0 ? (
                  filteredQuotes.map((quote) => {
                    const requestData = parseRequestData(quote.requestData)
                    const socialCode = String(requestData.socialCode ?? '')

                    return (
                      <tr key={quote.id} className="transition hover:bg-slate-50 dark:hover:bg-slate-800/50">
                        <td className="px-4 py-4">
                          <input
                            type="checkbox"
                            checked={selectedQuoteIds.includes(quote.id)}
                            onChange={() => handleSelectOne(quote.id)}
                            aria-label={`Select quote ${quote.id}`}
                          />
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-sky-700 dark:text-sky-300">
                          <Link to={`/dashboard/quotes/${quote.id}`} className="hover:underline">
                            {quote.id}
                          </Link>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-700 dark:text-slate-200">{quote.fullName || '-'}</td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-700 dark:text-slate-200">{quote.quoteType || '-'}</td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-700 dark:text-slate-200">{socialCode || '-'}</td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-700 dark:text-slate-200">{quote.amount ?? '-'}</td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-700 dark:text-slate-200">{quote.status ?? 'Pending'}</td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm">
                          {quote.email && (
                            <button
                              className="rounded bg-sky-500 px-3 py-1 text-white hover:bg-sky-600 text-xs font-semibold"
                              onClick={() => openEmailModal([quote.email])}
                            >
                              Send Email
                            </button>
                          )}
                        </td>
                      </tr>
                    )
                  })
                ) : (
                  <tr>
                    <td colSpan={8} className="px-6 py-10 text-center text-sm text-slate-500 dark:text-slate-300">
                      No quotes matched that social code.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
      {isEmailModalOpen && (
        <EmailModal
          isOpen={isEmailModalOpen}
          onClose={closeEmailModal}
          recipients={emailRecipients}
          onSend={handleSendEmail}
        />
      )}
    </DashboardShell>
  )
}

export default QuoteDashboard
