import { useState } from 'react'
import { useFormik } from 'formik'
import { useAppSelector } from '../store/store'
import { useRidersQuery, useCreateRiderMutation } from '../hooks/useQueries'
import { riderSchema } from '../validations/schemas'

function RidersList() {
  const { riders, loading, error, total } = useAppSelector((state) => state.rider)
  useRidersQuery(1, 10)

  if (loading) {
    return <div className="p-6 text-center">Loading riders...</div>
  }

  if (error) {
    return <div className="p-6 text-center text-rose-600 dark:text-rose-400">Error: {error}</div>
  }

  return (
    <div className="rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
            <th className="px-6 py-3 text-left font-semibold text-slate-900 dark:text-white">Name</th>
            <th className="px-6 py-3 text-left font-semibold text-slate-900 dark:text-white">Email</th>
            <th className="px-6 py-3 text-left font-semibold text-slate-900 dark:text-white">University</th>
            <th className="px-6 py-3 text-left font-semibold text-slate-900 dark:text-white">Actions</th>
          </tr>
        </thead>
        <tbody>
          {riders.map((rider) => (
            <tr key={rider.id} className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800">
              <td className="px-6 py-3 text-slate-900 dark:text-white">
                {rider.firstName} {rider.lastName}
              </td>
              <td className="px-6 py-3 text-slate-900 dark:text-white">{rider.email}</td>
              <td className="px-6 py-3 text-slate-900 dark:text-white">{rider.universityName}</td>
              <td className="px-6 py-3">
                <button className="text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300 text-sm font-medium">
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
        Showing {riders.length} of {total} riders
      </div>
    </div>
  )
}

function CreateRiderForm() {
  const createMutation = useCreateRiderMutation()
  const [isOpen, setIsOpen] = useState(false)

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      universityName: '',
      matriculationNumber: '',
    },
    validationSchema: riderSchema,
    onSubmit: async (values) => {
      try {
        await createMutation.mutateAsync({
          quoteType: 'standard_ride',
          fullName: `${values.firstName} ${values.lastName}`.trim(),
          phone: values.phoneNumber,
          email: values.email,
          notes: '',
          requestData: {
            firstName: values.firstName,
            lastName: values.lastName,
            universityName: values.universityName,
            matriculationNumber: values.matriculationNumber,
          },
        })
        formik.resetForm()
        setIsOpen(false)
      } catch {
        // Error is handled by mutation error handler
      }
    },
  })

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="rounded-lg bg-sky-600 px-4 py-2 font-semibold text-white hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-600"
      >
        Add Rider
      </button>
    )
  }

  return (
    <div className="rounded-lg border border-slate-200 dark:border-slate-700 p-6 mb-6">
      <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Create New Rider</h2>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">First Name</label>
            <input
              {...formik.getFieldProps('firstName')}
              className={`w-full rounded-lg border px-4 py-2 ${
                formik.touched.firstName && formik.errors.firstName ? 'border-rose-500' : 'border-slate-300 dark:border-slate-600'
              } dark:bg-slate-800 dark:text-white`}
            />
            {formik.touched.firstName && formik.errors.firstName && (
              <p className="text-sm text-rose-600 dark:text-rose-400">{formik.errors.firstName}</p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">Last Name</label>
            <input
              {...formik.getFieldProps('lastName')}
              className={`w-full rounded-lg border px-4 py-2 ${
                formik.touched.lastName && formik.errors.lastName ? 'border-rose-500' : 'border-slate-300 dark:border-slate-600'
              } dark:bg-slate-800 dark:text-white`}
            />
            {formik.touched.lastName && formik.errors.lastName && (
              <p className="text-sm text-rose-600 dark:text-rose-400">{formik.errors.lastName}</p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">Email</label>
            <input
              type="email"
              {...formik.getFieldProps('email')}
              className={`w-full rounded-lg border px-4 py-2 ${
                formik.touched.email && formik.errors.email ? 'border-rose-500' : 'border-slate-300 dark:border-slate-600'
              } dark:bg-slate-800 dark:text-white`}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-sm text-rose-600 dark:text-rose-400">{formik.errors.email}</p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">Phone Number</label>
            <input
              {...formik.getFieldProps('phoneNumber')}
              className={`w-full rounded-lg border px-4 py-2 ${
                formik.touched.phoneNumber && formik.errors.phoneNumber ? 'border-rose-500' : 'border-slate-300 dark:border-slate-600'
              } dark:bg-slate-800 dark:text-white`}
            />
            {formik.touched.phoneNumber && formik.errors.phoneNumber && (
              <p className="text-sm text-rose-600 dark:text-rose-400">{formik.errors.phoneNumber}</p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">University Name</label>
            <input
              {...formik.getFieldProps('universityName')}
              className={`w-full rounded-lg border px-4 py-2 ${
                formik.touched.universityName && formik.errors.universityName ? 'border-rose-500' : 'border-slate-300 dark:border-slate-600'
              } dark:bg-slate-800 dark:text-white`}
            />
            {formik.touched.universityName && formik.errors.universityName && (
              <p className="text-sm text-rose-600 dark:text-rose-400">{formik.errors.universityName}</p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">Matriculation Number</label>
            <input
              {...formik.getFieldProps('matriculationNumber')}
              className={`w-full rounded-lg border px-4 py-2 ${
                formik.touched.matriculationNumber && formik.errors.matriculationNumber ? 'border-rose-500' : 'border-slate-300 dark:border-slate-600'
              } dark:bg-slate-800 dark:text-white`}
            />
            {formik.touched.matriculationNumber && formik.errors.matriculationNumber && (
              <p className="text-sm text-rose-600 dark:text-rose-400">{formik.errors.matriculationNumber}</p>
            )}
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={createMutation.isPending}
            className="rounded-lg bg-sky-600 px-4 py-2 font-semibold text-white hover:bg-sky-700 disabled:opacity-50 dark:bg-sky-500 dark:hover:bg-sky-600"
          >
            {createMutation.isPending ? 'Creating...' : 'Create Rider'}
          </button>
          <button
            type="button"
            onClick={() => {
              setIsOpen(false)
              formik.resetForm()
            }}
            className="rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export function RidersManagement() {
  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Riders Management</h1>
      <CreateRiderForm />
      <RidersList />
    </div>
  )
}

export default RidersManagement
