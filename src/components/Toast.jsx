import { useEffect } from 'react'
import { Sparkles, CheckCircle2, AlertCircle, X } from 'lucide-react'

export default function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => {
      onClose()
    }, 4500)
    return () => clearTimeout(timer)
  }, [toast, onClose])

  if (!toast) return null

  const isResurrect = toast.type === 'resurrect'
  const isDelete = toast.type === 'delete'

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 flex max-w-md items-center gap-3 rounded-2xl border border-white/15 bg-[#0b101c]/95 p-4 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-bottom-5 duration-300"
    >
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
          isResurrect
            ? 'border border-revival/30 bg-revival/15 text-revival shadow-[0_0_15px_rgba(52,211,153,0.3)]'
            : isDelete
            ? 'border border-rose-500/30 bg-rose-500/15 text-rose-400'
            : 'border border-ghost/30 bg-ghost/15 text-ghost'
        }`}
      >
        {isResurrect ? (
          <Sparkles size={20} className="animate-spin-slow" />
        ) : isDelete ? (
          <AlertCircle size={20} />
        ) : (
          <CheckCircle2 size={20} />
        )}
      </div>

      <div className="flex-1 pr-2">
        <h4 className="text-sm font-semibold text-moonlight">
          {toast.title || 'Graveyard Record Updated'}
        </h4>
        <p className="text-xs text-ash mt-0.5">{toast.message}</p>
      </div>

      <button
        type="button"
        onClick={onClose}
        className="rounded-lg p-1 text-ash hover:bg-white/10 hover:text-moonlight transition"
        aria-label="Dismiss notification"
      >
        <X size={16} />
      </button>
    </div>
  )
}
