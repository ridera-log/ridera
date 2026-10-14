import { FC, FormEvent, useEffect, useMemo, useState } from 'react'
import riderService from '../api/services/riderService'

type QuoteType = 'moving' | 'charter' | 'shipping' | 'water' | 'towing' | 'storage'

type ContactErrors = {
  fullName?: string
  phone?: string
  email?: string
  quoteType?: string
}

type FieldConfig = {
  name: string
  label: string
  type: 'text' | 'email' | 'tel' | 'number' | 'date' | 'select'
  placeholder?: string
  required?: boolean
  options?: string[]
}

const quoteTypeOptions: { value: QuoteType; label: string }[] = [
  { value: 'moving', label: 'Moving & Haulage' },
  { value: 'charter', label: 'Bus Charter & Car Rental' },
  { value: 'shipping', label: 'Global Shipping' },
  { value: 'water', label: 'Water Recreational Trips' },
  { value: 'towing', label: 'Towing & Heavy Equipment Hire' },
  { value: 'storage', label: 'Storage Services' },
]

const dynamicFieldsByType: Record<QuoteType, FieldConfig[]> = {
  moving: [
    { name: 'pickupAddress', label: 'Pickup Address', type: 'text', required: true },
    { name: 'dropoffAddress', label: 'Drop-off Address', type: 'text', required: true },
    { name: 'moveSize', label: 'Move Size', type: 'select', required: true, options: ['Studio/1 Bedroom', '2-3 Bedrooms', '4+ Bedrooms', 'Office Move'] },
  ],
  charter: [
    { name: 'tripDate', label: 'Trip Date', type: 'date', required: true },
    { name: 'route', label: 'Pickup & Destination', type: 'text', required: true },
    { name: 'passengers', label: 'Number of Passengers', type: 'number', required: true, placeholder: 'e.g. 12' },
  ],
  shipping: [
    { name: 'originCountry', label: 'Origin Country', type: 'text', required: true },
    { name: 'destinationCountry', label: 'Destination Country', type: 'text', required: true },
    { name: 'cargoWeight', label: 'Estimated Cargo Weight (kg)', type: 'number', required: true, placeholder: 'e.g. 250' },
  ],
  water: [
    { name: 'tripDate', label: 'Preferred Date', type: 'date', required: true },
    { name: 'guestCount', label: 'Number of Guests', type: 'number', required: true, placeholder: 'e.g. 8' },
    { name: 'tripDuration', label: 'Trip Duration', type: 'select', required: true, options: ['2 Hours', '4 Hours', '6 Hours', 'Full Day'] },
  ],
  towing: [
    { name: 'vehicleType', label: 'Vehicle Type', type: 'text', required: true, placeholder: 'e.g. SUV, Truck' },
    { name: 'breakdownLocation', label: 'Breakdown/Collection Location', type: 'text', required: true },
    { name: 'dropoffLocation', label: 'Drop-off Location', type: 'text', required: true },
  ],
  storage: [
    { name: 'storageDuration', label: 'Storage Duration', type: 'select', required: true, options: ['1-2 Weeks', '1 Month', '3 Months', '6+ Months'] },
    { name: 'storageSize', label: 'Storage Space Needed', type: 'select', required: true, options: ['Small', 'Medium', 'Large', 'Full Container'] },
    { name: 'moveInDate', label: 'Preferred Move-In Date', type: 'date', required: true },
  ],
}

const inputBase = 'w-full rounded-xl border px-4 py-3 text-gray-900 transition-all focus:outline-none focus:ring-2 dark:bg-gray-800 dark:text-white'
const inputNormal = `${inputBase} border-gray-300 bg-white focus:border-primary-500 focus:ring-primary-500/20 dark:border-gray-700`
const inputError = `${inputBase} border-red-400 bg-white focus:border-red-500 focus:ring-red-500/20 dark:border-red-500`

function validate(fullName: string, phone: string, email: string, quoteType: string): ContactErrors {
  const errs: ContactErrors = {}

  if (!fullName.trim()) {
    errs.fullName = 'Full name is required.'
  } else if (fullName.trim().length < 2) {
    errs.fullName = 'Enter at least 2 characters.'
  }

  if (!phone.trim()) {
    errs.phone = 'Phone number is required.'
  } else if (!/^[+]?[\d\s\-()]{7,15}$/.test(phone.trim())) {
    errs.phone = 'Enter a valid phone number.'
  }

  if (!email.trim()) {
    errs.email = 'Email address is required.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    errs.email = 'Enter a valid email address.'
  }

  if (!quoteType) {
    errs.quoteType = 'Please select a service type.'
  }

  return errs
}

interface QuoteModalProps {
  isOpen: boolean
  onClose: () => void
}

const QuoteModal: FC<QuoteModalProps> = ({ isOpen, onClose }) => {
  const [quoteType, setQuoteType] = useState<QuoteType | ''>('')
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<ContactErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const dynamicFields = useMemo<FieldConfig[]>(
    () => (quoteType ? dynamicFieldsByType[quoteType] : []),
    [quoteType],
  )

  useEffect(() => {
    if (!isOpen) return

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onEscape)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onEscape)
    }
  }, [isOpen, onClose])

  useEffect(() => {
    if (!isOpen) {
      setSubmitted(false)
      setFormData({})
      setQuoteType('')
      setErrors({})
      setSubmitError(null)
    }
  }, [isOpen])

  function handleChange(name: string, value: string) {
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (name in errors) setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  function handleQuoteTypeChange(value: QuoteType | '') {
    setQuoteType(value)
    if (errors.quoteType) setErrors((prev) => ({ ...prev, quoteType: undefined }))
    setFormData({})
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const errs = validate(formData.fullName ?? '', formData.phone ?? '', formData.email ?? '', quoteType)
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }

    const { fullName, phone, email, notes, ...rest } = formData

    setIsSubmitting(true)
    setSubmitError(null)

    try {
      await riderService.createRider({
        quoteType: quoteType as QuoteType,
        fullName,
        phone,
        email,
        notes: notes ?? '',
        requestData: rest,
      })
      setSubmitted(true)
    } catch {
      setSubmitError('Something went wrong. Please try again or call us directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-gray-900/70 backdrop-blur-sm"
        aria-label="Close quote modal"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-2xl rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl dark:border-gray-700 dark:bg-gray-900 sm:p-8">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Request a Quote</h3>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Fill this form and Ridera will contact you shortly.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200"
            aria-label="Close"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {submitted ? (
          <div className="rounded-xl border border-green-200 bg-green-50 p-5 dark:border-green-900/40 dark:bg-green-900/20">
            <p className="font-semibold text-green-700 dark:text-green-300">Quote request received.</p>
            <p className="mt-1 text-sm text-green-700/90 dark:text-green-300/90">Our team will reach out shortly with your estimate.</p>
            <button
              type="button"
              onClick={onClose}
              className="mt-4 inline-flex rounded-full bg-accent-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-600"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white" htmlFor="fullName">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  value={formData.fullName ?? ''}
                  onChange={(e) => handleChange('fullName', e.target.value)}
                  className={errors.fullName ? inputError : inputNormal}
                  placeholder="Your full name"
                />
                {errors.fullName && <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>}
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white" htmlFor="phone">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone ?? ''}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className={errors.phone ? inputError : inputNormal}
                  placeholder="e.g. 0813..."
                />
                {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white" htmlFor="email">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email ?? ''}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className={errors.email ? inputError : inputNormal}
                  placeholder="you@example.com"
                />
                {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white" htmlFor="quoteType">
                  Service Type <span className="text-red-500">*</span>
                </label>
                <select
                  id="quoteType"
                  name="quoteType"
                  value={quoteType}
                  onChange={(e) => handleQuoteTypeChange(e.target.value as QuoteType | '')}
                  className={errors.quoteType ? inputError : inputNormal}
                >
                  <option value="">Select a service</option>
                  {quoteTypeOptions.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
                {errors.quoteType && <p className="mt-1 text-xs text-red-500">{errors.quoteType}</p>}
              </div>
            </div>

            {dynamicFields.length > 0 && (
              <div className="grid gap-4 sm:grid-cols-2">
                {dynamicFields.map((field: FieldConfig) => (
                  <div key={field.name}>
                    <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white" htmlFor={field.name}>{field.label}</label>
                    {field.type === 'select' ? (
                      <select
                        id={field.name}
                        name={field.name}
                        required={field.required}
                        value={formData[field.name] ?? ''}
                        onChange={(e) => handleChange(field.name, e.target.value)}
                        className={inputNormal}
                      >
                        <option value="">Select an option</option>
                        {field.options?.map((option: string) => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        id={field.name}
                        name={field.name}
                        type={field.type}
                        required={field.required}
                        value={formData[field.name] ?? ''}
                        onChange={(e) => handleChange(field.name, e.target.value)}
                        placeholder={field.placeholder}
                        className={inputNormal}
                      />
                    )}
                  </div>
                ))}
              </div>
            )}

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white" htmlFor="notes">Additional Notes</label>
              <textarea
                id="notes"
                name="notes"
                rows={3}
                value={formData.notes ?? ''}
                onChange={(e) => handleChange('notes', e.target.value)}
                className={inputNormal}
                placeholder="Any special requests?"
              />
            </div>

            {submitError && (
              <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-900/40 dark:bg-red-900/20 dark:text-red-400">
                {submitError}
              </p>
            )}

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="inline-flex justify-center rounded-full border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex justify-center rounded-full bg-accent-500 px-5 py-2.5 text-sm font-semibold text-white shadow transition-colors hover:bg-accent-600 disabled:opacity-60"
              >
                {isSubmitting ? 'Submitting…' : 'Submit Quote Request'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default QuoteModal
