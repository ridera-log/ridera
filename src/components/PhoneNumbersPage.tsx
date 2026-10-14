import { useState } from 'react'
import DashboardShell from './DashboardShell'
import {
  useSocialNumbers,
  useCreateSocialNumber,
  useUpdateSocialNumber,
  useDeleteSocialNumber,
} from '../hooks/useSocialNumbers'


export default function PhoneNumbersPage({ userEmail, onLogout }: { userEmail: string; onLogout: () => void }) {

  const { data, isLoading, error } = useSocialNumbers()
  const createMutation = useCreateSocialNumber()
  const updateMutation = useUpdateSocialNumber()
  const deleteMutation = useDeleteSocialNumber()

  const [modalOpen, setModalOpen] = useState(false)
  const [editId, setEditId] = useState<number | null>(null)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [form, setForm] = useState({ name: '', phoneNumber: '' })

  const openAddModal = () => {
    setForm({ name: '', phoneNumber: '' })
    setEditId(null)
    setModalOpen(true)
  }

  const openEditModal = (id: number) => {
    const num = Array.isArray(data) ? data.find((n) => n.id === id) : null
    if (num) {
      setForm({ name: num.name, phoneNumber: num.phone })
      setEditId(id)
      setModalOpen(true)
    }
  }

  const openDeleteModal = (id: number) => setDeleteId(id)
  const closeModal = () => { setModalOpen(false); setEditId(null) }
  const closeDeleteModal = () => setDeleteId(null)

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name.trim() || !form.phoneNumber.trim()) return
    if (editId !== null) {
      await updateMutation.mutateAsync({ id: editId, data: form })
    } else {
      await createMutation.mutateAsync(form)
    }
    closeModal()
  }

  const handleDelete = async () => {
    if (deleteId !== null) {
      await deleteMutation.mutateAsync(deleteId)
      closeDeleteModal()
    }
  }

  return (
    <DashboardShell
      pageTitle="Phone Numbers"
      pageSubtitle="Manage social phone numbers"
      userEmail={userEmail}
      onLogout={onLogout}
      activeNav="phone-numbers"
    >
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold">Phone Numbers</h2>
        <button
          className="rounded bg-sky-600 px-4 py-2 text-white font-semibold hover:bg-sky-700"
          onClick={openAddModal}
        >
          Add Social Number
        </button>
      </div>
      <div className="overflow-x-auto rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-800">
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Phone</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan={3} className="px-4 py-4 text-center text-slate-400">Loading...</td></tr>
            ) : error ? (
              <tr><td colSpan={3} className="px-4 py-4 text-center text-rose-400">Error loading numbers</td></tr>
            ) : Array.isArray(data) && data.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-4 py-4 text-center text-slate-400">No phone numbers added yet.</td>
              </tr>
            ) : Array.isArray(data) ? (
              data.map((n) => (
                <tr key={n.id} className="border-t border-slate-100 dark:border-slate-800">
                  <td className="px-4 py-2">{n.name}</td>
                  <td className="px-4 py-2">{n.phoneNumber}</td>
                  <td className="px-4 py-2 flex gap-2 justify-center">
                    <button className="text-sky-600 hover:underline" onClick={() => openEditModal(n.id)}>Edit</button>
                    <button className="text-rose-600 hover:underline" onClick={() => openDeleteModal(n.id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : null}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white dark:bg-slate-900 rounded-lg shadow-lg p-6 w-full max-w-sm">
            <h3 className="text-lg font-bold mb-4">{editId !== null ? 'Edit' : 'Add'} Social Number</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="name">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleFormChange}
                  className="w-full rounded border border-slate-300 px-3 py-2 dark:bg-slate-800 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="phone">Phone Number</label>
                <input
                  id="phone"
                  name="phoneNumber"
                  type="tel"
                  value={form.phoneNumber}
                  onChange={handleFormChange}
                  className="w-full rounded border border-slate-300 px-3 py-2 dark:bg-slate-800 dark:text-white"
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <button type="button" className="px-4 py-2 rounded bg-slate-200 dark:bg-slate-700" onClick={closeModal}>Cancel</button>
                <button type="submit" className="px-4 py-2 rounded bg-sky-600 text-white font-semibold hover:bg-sky-700">{editId !== null ? 'Update' : 'Add'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deleteId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white dark:bg-slate-900 rounded-lg shadow-lg p-6 w-full max-w-sm">
            <h3 className="text-lg font-bold mb-4">Delete Social Number</h3>
            <p>Are you sure you want to delete this phone number?</p>
            <div className="flex justify-end gap-2 mt-6">
              <button type="button" className="px-4 py-2 rounded bg-slate-200 dark:bg-slate-700" onClick={closeDeleteModal}>Cancel</button>
              <button type="button" className="px-4 py-2 rounded bg-rose-600 text-white font-semibold hover:bg-rose-700" onClick={handleDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </DashboardShell>
  )
}
