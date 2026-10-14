import { useEffect, useState } from 'react'
import {
  useCreateSocialLinkMutation,
  useDeleteSocialLinkMutation,
  useSocialLinksQuery,
  useUpdateSocialLinkMutation,
} from '../hooks/useQueries'
import { SocialLinkRecord, SocialLinkResponse, SocialLinksListResponse } from '../api/services/riderService'
import DashboardShell from './DashboardShell.tsx'
import { useSocialNumbers } from '../hooks/useSocialNumbers'

interface SocialLinksPageProps {
  userEmail: string
  onLogout: () => void
}

interface SocialCode extends SocialLinkRecord { }

interface SocialCodeFormValues {
  codeName: string
  socialOrigin: string
  whatsappNumber: string
  socialName: string
}

const SOCIAL_CODES_STORAGE_KEY = 'ridera-social-codes'

const emptySocialCodeForm: SocialCodeFormValues = {
  codeName: '',
  socialOrigin: '',
  whatsappNumber: '',
  socialName: '',
}

function normalizeStoredSocialCode(item: unknown, index: number): SocialCode {
  const record = item && typeof item === 'object' ? (item as Record<string, unknown>) : {}

  return {
    id: Number(record.id ?? index + 1),
    userId: String(record.userId ?? ''),
    name: String(record.name ?? record.codeName ?? ''),
    socialOrigin: String(record.socialOrigin ?? ''),
    whatsappNumber: String(record.whatsappNumber ?? ''),
    socialName: String(record.socialName ?? ''),
    socialCode: String(record.socialCode ?? ''),
    status: String(record.status ?? 'active'),
    createdAt: String(record.createdAt ?? ''),
    updatedAt: String(record.updatedAt ?? ''),
  }
}

function readStoredSocialCodes(): SocialCode[] {
  const storedValue = localStorage.getItem(SOCIAL_CODES_STORAGE_KEY)
  if (!storedValue) return []

  try {
    const parsed = JSON.parse(storedValue)
    if (!Array.isArray(parsed)) return []

    return parsed.map((item, index) => normalizeStoredSocialCode(item, index))
  } catch {
    return []
  }
}

function normalizeCreateSocialLinkResponse(response: SocialLinkResponse): SocialCode {
  const payload = response.data ?? response

  return {
    id: Number(payload.id ?? Date.now()),
    userId: String(payload.userId ?? ''),
    name: String(payload.name ?? ''),
    socialOrigin: String(payload.socialOrigin ?? ''),
    whatsappNumber: String(payload.whatsappNumber ?? ''),
    socialName: String(payload.socialName ?? ''),
    socialCode: String(payload.socialCode ?? ''),
    status: String(payload.status ?? 'active'),
    createdAt: String(payload.createdAt ?? ''),
    updatedAt: String(payload.updatedAt ?? ''),
  }
}

function normalizeSocialLinksResponse(response: SocialLinksListResponse | SocialLinkRecord[]): SocialCode[] {
  const payload = Array.isArray(response) ? response : response.data ?? []
  return payload.map((item, index) => normalizeStoredSocialCode(item, index))
}

function SocialCodeModal({
  isOpen,
  mode,
  values,
  isSubmitting,
  errorMessage,
  socialNumbers,
  onClose,
  onChange,
  onSubmit,
}: {
  isOpen: boolean
  mode: 'create' | 'edit'
  values: SocialCodeFormValues
  isSubmitting: boolean
  errorMessage: string | null
  socialNumbers: Array<{ id: number; name: string; phone: string }> | undefined
  onClose: () => void
  onChange: (field: keyof SocialCodeFormValues, value: string) => void
  onSubmit: () => void
}): React.ReactElement | null {
  useEffect(() => {
    if (!isOpen) return undefined

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !isSubmitting) onClose()
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onEscape)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onEscape)
    }
  }, [isOpen, isSubmitting, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
        aria-label="Close social code modal"
        onClick={() => {
          if (!isSubmitting) onClose()
        }}
      />

      <div className="relative z-10 w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-700 dark:bg-slate-900 sm:p-8">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-sky-700 dark:text-sky-300">Social Links</p>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{mode === 'create' ? 'Create Social Code' : 'Update Social Code'}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-50 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
            aria-label="Close"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form
          className="space-y-5"
          onSubmit={(event) => {
            event.preventDefault()
            onSubmit()
          }}
        >
          {errorMessage ? (
            <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:border-rose-900/40 dark:bg-rose-950/30 dark:text-rose-300">
              {errorMessage}
            </div>
          ) : null}

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-900 dark:text-white" htmlFor="codeName">Code Name</label>
              <input
                id="codeName"
                required
                value={values.codeName}
                onChange={(event) => onChange('codeName', event.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 transition-all focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                placeholder="e.g. Facebook Community"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-900 dark:text-white" htmlFor="socialOrigin">Code Social Origin</label>
              <input
                id="socialOrigin"
                required
                value={values.socialOrigin}
                onChange={(event) => onChange('socialOrigin', event.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 transition-all focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                placeholder="e.g. facebook"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-900 dark:text-white" htmlFor="whatsappNumber">Code WhatsApp Number</label>
              <select
                id="whatsappNumber"
                required
                value={values.whatsappNumber}
                onChange={(event) => onChange('whatsappNumber', event.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 transition-all focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              >
                <option value="">Select a WhatsApp number</option>
                {Array.isArray(socialNumbers) && socialNumbers.length > 0 ? (
                  socialNumbers.map((num) => (
                    <option key={num.id} value={num.phone}>
                      {num.name} ({num.phone})
                    </option>
                  ))
                ) : (
                  <option value="" disabled>No social numbers available</option>
                )}
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-900 dark:text-white" htmlFor="socialName">Code Social Name</label>
              <input
                id="socialName"
                required
                value={values.socialName}
                onChange={(event) => onChange('socialName', event.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 transition-all focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                placeholder="e.g. @my_community"
              />
            </div>
          </div>

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="inline-flex justify-center rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex justify-center rounded-lg bg-sky-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? 'Saving...' : mode === 'create' ? 'Create Social Code' : 'Update Social Code'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function SocialLinksPage({ userEmail, onLogout }: SocialLinksPageProps): React.ReactElement {
  const createSocialLinkMutation = useCreateSocialLinkMutation()
  const updateSocialLinkMutation = useUpdateSocialLinkMutation()
  const deleteSocialLinkMutation = useDeleteSocialLinkMutation()
  const { data: socialLinksResponse, isLoading, error, isFetching } = useSocialLinksQuery()
  const [socialCodes, setSocialCodes] = useState<SocialCode[]>([])
  const [isSocialCodeModalOpen, setIsSocialCodeModalOpen] = useState(false)
  const [socialCodeMode, setSocialCodeMode] = useState<'create' | 'edit'>('create')
  const [activeSocialCodeId, setActiveSocialCodeId] = useState<number | null>(null)
  const [socialCodeForm, setSocialCodeForm] = useState<SocialCodeFormValues>(emptySocialCodeForm)
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null)
  const [modalErrorMessage, setModalErrorMessage] = useState<string | null>(null)
  const [actionErrorMessage, setActionErrorMessage] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<number | null>(null)
  const [copied, setCopied] = useState(false);
  const {data} = useSocialNumbers()


  useEffect(() => {
    setSocialCodes(readStoredSocialCodes())
  }, [])

  useEffect(() => {
    if (!socialLinksResponse) return
    setSocialCodes(normalizeSocialLinksResponse(socialLinksResponse))
  }, [socialLinksResponse])

  useEffect(() => {
    localStorage.setItem(SOCIAL_CODES_STORAGE_KEY, JSON.stringify(socialCodes))
  }, [socialCodes])

  function resetSocialCodeForm() {
    setSocialCodeForm(emptySocialCodeForm)
    setActiveSocialCodeId(null)
    setSocialCodeMode('create')
    setModalErrorMessage(null)
  }

  function openCreateSocialCodeModal() {
    resetSocialCodeForm()
    setFeedbackMessage(null)
    setIsSocialCodeModalOpen(true)
  }

  function openEditSocialCodeModal(socialCode: SocialCode) {
    setSocialCodeMode('edit')
    setActiveSocialCodeId(socialCode.id)
    setSocialCodeForm({
      codeName: socialCode.name,
      socialOrigin: socialCode.socialOrigin,
      whatsappNumber: socialCode.whatsappNumber,
      socialName: socialCode.socialName,
    })
    setModalErrorMessage(null)
    setFeedbackMessage(null)
    setIsSocialCodeModalOpen(true)
  }

  function closeSocialCodeModal() {
    if (createSocialLinkMutation.isPending || updateSocialLinkMutation.isPending) return
    setIsSocialCodeModalOpen(false)
    resetSocialCodeForm()
  }

  function handleSocialCodeFormChange(field: keyof SocialCodeFormValues, value: string) {
    setSocialCodeForm((prev) => ({ ...prev, [field]: value }))
  }


  const handleCopy = async (socialCode:any) => {
    const previewUrl = `https://rideralogistics.com?socialcode=${socialCode.socialCode}`;

    await navigator.clipboard.writeText(previewUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };
  
  async function handleSocialCodeSubmit() {
    const trimmedValues = {
      codeName: socialCodeForm.codeName.trim(),
      socialOrigin: socialCodeForm.socialOrigin.trim(),
      whatsappNumber: socialCodeForm.whatsappNumber.trim(),
      socialName: socialCodeForm.socialName.trim(),
    }

    setModalErrorMessage(null)
    setFeedbackMessage(null)
    setActionErrorMessage(null)

    if (socialCodeMode === 'edit' && activeSocialCodeId !== null) {
      try {
        const response = await updateSocialLinkMutation.mutateAsync({
          id: activeSocialCodeId,
          data: {
            name: trimmedValues.codeName,
            socialOrigin: trimmedValues.socialOrigin,
            whatsappNumber: trimmedValues.whatsappNumber,
            socialName: trimmedValues.socialName,
          },
        })

        const updatedSocialLink = normalizeCreateSocialLinkResponse(response)
        setSocialCodes((prev) => prev.map((item) => (item.id === updatedSocialLink.id ? updatedSocialLink : item)))
        setFeedbackMessage(`Social code updated successfully${updatedSocialLink.socialCode ? `: ${updatedSocialLink.socialCode}` : '.'}`)
        closeSocialCodeModal()
        return
      } catch (error: any) {
        setModalErrorMessage(error.response?.data?.message || error.message || 'Failed to update social code.')
        return
      }
    }

    try {
      const response = await createSocialLinkMutation.mutateAsync({
        name: trimmedValues.codeName,
        socialOrigin: trimmedValues.socialOrigin,
        whatsappNumber: trimmedValues.whatsappNumber,
        socialName: trimmedValues.socialName,
      })

      const createdSocialLink = normalizeCreateSocialLinkResponse(response)
      setSocialCodes((prev) => [createdSocialLink, ...prev.filter((item) => item.id !== createdSocialLink.id)])
      setFeedbackMessage(`Social code created successfully${createdSocialLink.socialCode ? `: ${createdSocialLink.socialCode}` : '.'}`)
      closeSocialCodeModal()
    } catch (error: any) {
      setModalErrorMessage(error.response?.data?.message || error.message || 'Failed to create social code.')
    }
  }

  async function handleDeleteSocialCode(id: number) {
    setFeedbackMessage(null)
    setActionErrorMessage(null)
    setDeletingId(id)

    try {
      await deleteSocialLinkMutation.mutateAsync(id)
      setSocialCodes((prev) => prev.filter((item) => item.id !== id))
      setFeedbackMessage('Social code deleted successfully.')
    } catch (error: any) {
      setActionErrorMessage(error.response?.data?.message || error.message || 'Failed to delete social code.')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <DashboardShell pageTitle="Social Links" pageSubtitle="Create and manage social codes" userEmail={userEmail} onLogout={onLogout} activeNav="social-links">
      <div className="space-y-6">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium text-sky-700 dark:text-sky-300">Social Links</p>
              <h1 className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">Social Codes</h1>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">Create social links from the backend and manage the current list from this page.</p>
              {isFetching && !isLoading ? <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">Refreshing social links...</p> : null}
            </div>
            <button
              type="button"
              onClick={openCreateSocialCodeModal}
              className="inline-flex items-center justify-center rounded-lg bg-sky-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-sky-700"
            >
              Create Social Code
            </button>
          </div>
        </section>

        {feedbackMessage ? (
          <section className="rounded-2xl border border-emerald-200 bg-emerald-50 px-6 py-4 text-sm text-emerald-700 shadow-sm dark:border-emerald-900/40 dark:bg-emerald-950/30 dark:text-emerald-300">
            {feedbackMessage}
          </section>
        ) : null}

        {actionErrorMessage ? (
          <section className="rounded-2xl border border-rose-200 bg-rose-50 px-6 py-4 text-sm text-rose-700 shadow-sm dark:border-rose-900/40 dark:bg-rose-950/30 dark:text-rose-300">
            {actionErrorMessage}
          </section>
        ) : null}

        {error ? (
          <section className="rounded-2xl border border-rose-200 bg-rose-50 px-6 py-4 text-sm text-rose-700 shadow-sm dark:border-rose-900/40 dark:bg-rose-950/30 dark:text-rose-300">
            {(error as any)?.response?.data?.message || (error as Error)?.message || 'Failed to load social links.'}
          </section>
        ) : null}

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <div className="border-b border-slate-200 px-6 py-4 dark:border-slate-700">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">All Social Codes</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
              <thead className="bg-slate-50 dark:bg-slate-800/70">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-300">Code Name</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-300">Social Origin</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-300">WhatsApp Number</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-300">Social Name</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-300">Generated Code</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-300">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-300">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {isLoading ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-10 text-center text-sm text-slate-500 dark:text-slate-300">
                      Loading social links...
                    </td>
                  </tr>
                ) : socialCodes.length > 0 ? (
                  socialCodes.map((socialCode) => {

                    return (
                      <tr key={socialCode.id} className="transition hover:bg-slate-50 dark:hover:bg-slate-800/50">
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-slate-900 dark:text-white">{socialCode.name}</td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-700 dark:text-slate-200">{socialCode.socialOrigin}</td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-700 dark:text-slate-200">{socialCode.whatsappNumber}</td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-700 dark:text-slate-200">{socialCode.socialName}</td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-700 dark:text-slate-200 flex items-center gap-2">
                          {socialCode.socialCode || '-'}
                          {socialCode.socialCode && (
                            <button
                              type="button"
                              onClick={() => handleCopy(socialCode)}
                              className="ml-2 p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700"
                              title="Copy preview link"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16h8a2 2 0 002-2V8a2 2 0 00-2-2H8a2 2 0 00-2 2v6a2 2 0 002 2z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8V6a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2h2" />
                              </svg>
                            </button>
                          )}
                          {copied && (
                            <span className="ml-1 text-xs text-emerald-600 dark:text-emerald-300">Copied!</span>
                          )}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm">
                          <span className="inline-flex rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                            {socialCode.status || 'active'}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-right text-sm">
                          <div className="flex justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => openEditSocialCodeModal(socialCode)}
                              disabled={deleteSocialLinkMutation.isPending || deletingId === socialCode.id}
                              className="rounded-lg border border-slate-300 px-3 py-1.5 font-medium text-slate-700 transition-colors hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
                            >
                              Update
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteSocialCode(socialCode.id)}
                              disabled={deleteSocialLinkMutation.isPending && deletingId === socialCode.id}
                              className="rounded-lg border border-rose-200 px-3 py-1.5 font-medium text-rose-600 transition-colors hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-rose-900/60 dark:text-rose-300 dark:hover:bg-rose-950/30"
                            >
                              {deleteSocialLinkMutation.isPending && deletingId === socialCode.id ? 'Deleting...' : 'Delete'}
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-10 text-center text-sm text-slate-500 dark:text-slate-300">
                      No social codes yet. Use &quot;Create Social Code&quot; to add one.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      <SocialCodeModal
        isOpen={isSocialCodeModalOpen}
        mode={socialCodeMode}
        values={socialCodeForm}
        isSubmitting={createSocialLinkMutation.isPending || updateSocialLinkMutation.isPending}
        errorMessage={modalErrorMessage}
        socialNumbers={data}
        onClose={closeSocialCodeModal}
        onChange={handleSocialCodeFormChange}
        onSubmit={handleSocialCodeSubmit}
      />
    </DashboardShell>
  )
}

export default SocialLinksPage
