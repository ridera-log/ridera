import React, { useState } from 'react';
import QuillEditor from './QuillEditor';

interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipients: string[];
  onSend: (subject: string, message: string) => void;
}

const EmailModal: React.FC<EmailModalProps> = ({ isOpen, onClose, recipients, onSend }) => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    // Send HTML content from Quill
    await onSend(subject, message);
    setSending(false);
    setSubject('');
    setMessage('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div
        className="fixed p-3 inset-0 z-50 flex flex-col rounded-none bg-white p-0 shadow-xl dark:bg-slate-900 border-0 dark:border-0"
        style={{ width: '100vw', height: '100vh', maxWidth: '100vw', maxHeight: '100vh', borderRadius: 0, overflow: 'auto' }}
      >
        <button
          className="absolute right-4 top-4 text-slate-400 hover:text-slate-700 dark:hover:text-white"
          onClick={onClose}
          aria-label="Close"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">Send Email</h2>
        <p className="mb-4 text-sm text-slate-600 dark:text-slate-300">
          Sending to: <span className="font-semibold">{recipients.join(', ')}</span>
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">Subject</label>
            <input
              type="text"
              className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-slate-900 dark:text-white"
              value={subject}
              onChange={e => setSubject(e.target.value)}
              required
              placeholder="Subject"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">Message</label>
            <div className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-slate-900 dark:text-white min-h-[120px] focus-within:ring-2 focus-within:ring-sky-500/20">
              <QuillEditor value={message} onChange={setMessage} />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="rounded-lg px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-white font-semibold hover:bg-slate-300 dark:hover:bg-slate-600"
              onClick={onClose}
              disabled={sending}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg px-4 py-2 bg-sky-600 text-white font-semibold hover:bg-sky-700 disabled:opacity-60"
              disabled={sending}
            >
              {sending ? 'Sending...' : 'Send Email'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmailModal;
