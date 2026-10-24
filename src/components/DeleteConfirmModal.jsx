import { useEffect } from 'react'
import { AlertTriangle, Trash2 } from 'lucide-react'

export default function DeleteConfirmModal({
  isOpen,
  project,
  onConfirm,
  onClose,
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen || !project) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="exhume-title"
    >
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      <div className="relative my-8 w-full max-w-md rounded-3xl border border-rose-500/20 bg-[#0c101c]/98 p-6 sm:p-8 shadow-2xl backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-200 text-moonlight z-10 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-rose-500/30 bg-rose-500/10 text-rose-400">
          <AlertTriangle size={28} />
        </div>

        <h3 id="exhume-title" className="mt-4 font-display text-2xl font-bold text-moonlight">
          Exhume this Inscription?
        </h3>

        <p className="mt-3 text-sm leading-relaxed text-ash">
          Are you sure you wish to banish <strong className="text-moonlight">“{project.title}”</strong> from the
          cemetery? Its tombstone and resurrection milestones will be lost into the void.
        </p>

        <div className="mt-8 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-white/15 bg-white/[0.04] px-5 py-2.5 text-xs font-semibold text-ash hover:bg-white/10 hover:text-moonlight transition"
          >
            Leave in Peace
          </button>

          <button
            type="button"
            onClick={() => onConfirm(project)}
            className="flex items-center gap-2 rounded-full bg-rose-500 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-rose-500/30 hover:bg-rose-600 transition"
          >
            <Trash2 size={15} />
            <span>Exhume & Dissolve</span>
          </button>
        </div>
      </div>
    </div>
  )
}
