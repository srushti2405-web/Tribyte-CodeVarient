import { useState, useEffect } from 'react'
import { X, Skull, Compass, Save } from 'lucide-react'

const CATEGORIES = [
  'Web & AI',
  'Creative Writing',
  'Game Dev',
  'Developer Tools',
  'Hardware & IoT',
  'Design Systems',
  'Experimental',
]

const FATES = ['Preserve', 'Revive', 'Transform', 'Release']
const STATUSES = ['Resting', 'Ready for Revival', 'Resurrected']
const SYMBOLS = ['🪦', '✳', '☾', '⌘', '⚡', '🪶', '⏳', '✨', '🥀', '🔮', '🕸️']

function InnerForm({ initialData, onClose, onSave }) {
  const isEditing = !!initialData

  const [formData, setFormData] = useState(() => {
    if (initialData) {
      return {
        title: initialData.title || '',
        tagline: initialData.tagline || '',
        category: initialData.category || 'Web & AI',
        fate: initialData.fate || 'Revive',
        status: initialData.status || 'Ready for Revival',
        symbol: initialData.symbol || '🪦',
        causeOfDeath: initialData.causeOfDeath || '',
        epitaph: initialData.epitaph || '',
        description: initialData.description || '',
        techStackText: (initialData.techStack || []).join(', '),
        checklistText: (initialData.checklist || [])
          .map((item) => (typeof item === 'string' ? item : item.text))
          .join('\n'),
        repoUrl: initialData.repoUrl || '',
        demoUrl: initialData.demoUrl || '',
        dateBuried: initialData.dateBuried || '',
      }
    }
    return {
      title: '',
      tagline: '',
      category: 'Web & AI',
      fate: 'Revive',
      status: 'Ready for Revival',
      symbol: '🪦',
      causeOfDeath: '',
      epitaph: '',
      description: '',
      techStackText: '',
      checklistText: '',
      repoUrl: '',
      demoUrl: '',
      dateBuried: `Buried ${new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}`,
    }
  })

  const [errors, setErrors] = useState({})

  const validate = () => {
    const errs = {}
    if (!formData.title.trim()) {
      errs.title = 'Project title is required'
    }
    if (!formData.description.trim()) {
      errs.description = 'The chronicle / description is required'
    }
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return

    const techStack = formData.techStackText
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean)

    const checklist = formData.checklistText
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .map((text, idx) => {
        if (initialData && initialData.checklist && initialData.checklist[idx]) {
          return { text, done: !!initialData.checklist[idx].done }
        }
        return { text, done: false }
      })

    const payload = {
      ...(initialData || {}),
      id: initialData?.id || `proj-${Date.now()}`,
      title: formData.title.trim(),
      tagline: formData.tagline.trim(),
      category: formData.category,
      fate: formData.fate,
      status: formData.status,
      symbol: formData.symbol,
      causeOfDeath: formData.causeOfDeath.trim(),
      epitaph: formData.epitaph.trim(),
      description: formData.description.trim(),
      techStack,
      checklist,
      repoUrl: formData.repoUrl.trim(),
      demoUrl: formData.demoUrl.trim(),
      dateBuried: formData.dateBuried || 'Recently Entombed',
      lastUpdated: new Date().toISOString().split('T')[0],
    }

    onSave(payload)
    onClose()
  }

  return (
    <div className="relative my-8 w-full max-w-2xl rounded-[2.5rem] border border-white/15 bg-[#0b101c]/98 p-6 sm:p-9 shadow-[0_0_60px_rgba(0,0,0,0.85)] backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-200 text-moonlight z-10 max-h-[90vh] overflow-y-auto">
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
        <div className="flex items-center gap-2.5">
          <span className="text-2xl">{formData.symbol}</span>
          <div>
            <h3
              id="tombstone-form-title"
              className="font-display text-xl font-bold text-moonlight"
            >
              {isEditing ? 'Carve Project Tombstone' : 'Entomb a New Idea'}
            </h3>
            <p className="text-xs text-ash mt-0.5">
              {isEditing
                ? 'Update the sacred inscription and roadmap'
                : 'Give an unfinished project a dignified digital resting place'}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="rounded-full border border-white/10 bg-white/[0.04] p-2 text-ash hover:bg-white/10 hover:text-moonlight transition"
          aria-label="Close form"
        >
          <X size={18} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        {/* Title & Symbol */}
        <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-ash mb-1.5">
              Project Title <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="e.g. The Habit Garden"
              className={`w-full rounded-xl border bg-white/[0.03] px-4 py-2.5 text-sm text-moonlight placeholder-ash/50 focus:outline-none focus:ring-2 focus:ring-revival ${
                errors.title ? 'border-rose-500' : 'border-white/10'
              }`}
            />
            {errors.title && (
              <p className="text-xs text-rose-400 mt-1">{errors.title}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-ash mb-1.5">
              Rune / Relic
            </label>
            <div className="flex items-center gap-1.5">
              {SYMBOLS.slice(0, 6).map((sym) => (
                <button
                  key={sym}
                  type="button"
                  onClick={() => setFormData({ ...formData, symbol: sym })}
                  className={`h-9 w-9 rounded-xl border text-base flex items-center justify-center transition ${
                    formData.symbol === sym
                      ? 'border-revival bg-revival/20 scale-105'
                      : 'border-white/10 bg-white/[0.03] hover:border-white/20'
                  }`}
                >
                  {sym}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tagline */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-ash mb-1.5">
            One-Line Summary / Hook
          </label>
          <input
            type="text"
            value={formData.tagline}
            onChange={(e) =>
              setFormData({ ...formData, tagline: e.target.value })
            }
            placeholder="e.g. A tiny 3D digital garden blooming with micro-habits"
            className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-moonlight placeholder-ash/50 focus:outline-none focus:ring-2 focus:ring-revival"
          />
        </div>

        {/* Category & Fate & Status */}
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-ash mb-1.5">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="w-full rounded-xl border border-white/10 bg-[#070b14] px-3.5 py-2.5 text-xs font-medium text-moonlight focus:outline-none focus:ring-2 focus:ring-revival"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c} className="bg-[#070b14]">
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-ash mb-1.5">
              Chosen Fate
            </label>
            <select
              value={formData.fate}
              onChange={(e) =>
                setFormData({ ...formData, fate: e.target.value })
              }
              className="w-full rounded-xl border border-white/10 bg-[#070b14] px-3.5 py-2.5 text-xs font-medium text-moonlight focus:outline-none focus:ring-2 focus:ring-revival"
            >
              {FATES.map((f) => (
                <option key={f} value={f} className="bg-[#070b14]">
                  {f}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-ash mb-1.5">
              Sanctuary Status
            </label>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
              className="w-full rounded-xl border border-white/10 bg-[#070b14] px-3.5 py-2.5 text-xs font-medium text-moonlight focus:outline-none focus:ring-2 focus:ring-revival"
            >
              {STATUSES.map((s) => (
                <option key={s} value={s} className="bg-[#070b14]">
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Cause of Death & Epitaph */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-ash mb-1.5 flex items-center gap-1.5">
              <Skull size={13} className="text-rose-400" />
              Cause of Demise
            </label>
            <input
              type="text"
              value={formData.causeOfDeath}
              onChange={(e) =>
                setFormData({ ...formData, causeOfDeath: e.target.value })
              }
              placeholder="e.g. Scope creep, lost motivation, burnout"
              className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-moonlight placeholder-ash/50 focus:outline-none focus:ring-2 focus:ring-revival"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-ash mb-1.5">
              Inscribed Tombstone Epitaph
            </label>
            <input
              type="text"
              value={formData.epitaph}
              onChange={(e) =>
                setFormData({ ...formData, epitaph: e.target.value })
              }
              placeholder="e.g. A melody that faded before the chorus began."
              className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-moonlight placeholder-ash/50 focus:outline-none focus:ring-2 focus:ring-revival"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-ash mb-1.5">
            The Chronicle Behind the Code <span className="text-rose-400">*</span>
          </label>
          <textarea
            rows={3}
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="What was the dream? What worked, what failed, and what did you learn?"
            className={`w-full rounded-xl border bg-white/[0.03] px-4 py-2.5 text-sm text-moonlight placeholder-ash/50 focus:outline-none focus:ring-2 focus:ring-revival ${
              errors.description ? 'border-rose-500' : 'border-white/10'
            }`}
          />
          {errors.description && (
            <p className="text-xs text-rose-400 mt-1">{errors.description}</p>
          )}
        </div>

        {/* Tech Stack & Links */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-ash mb-1.5">
              Tech Stack (comma separated)
            </label>
            <input
              type="text"
              value={formData.techStackText}
              onChange={(e) =>
                setFormData({ ...formData, techStackText: e.target.value })
              }
              placeholder="React, Three.js, Node.js"
              className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-moonlight placeholder-ash/50 focus:outline-none focus:ring-2 focus:ring-revival"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-ash mb-1.5">
              Repository or Demo URL
            </label>
            <input
              type="url"
              value={formData.repoUrl}
              onChange={(e) =>
                setFormData({ ...formData, repoUrl: e.target.value })
              }
              placeholder="https://github.com/..."
              className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-moonlight placeholder-ash/50 focus:outline-none focus:ring-2 focus:ring-revival"
            />
          </div>
        </div>

        {/* Revival Roadmap Checklist */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-ash mb-1.5 flex items-center gap-1.5">
            <Compass size={13} className="text-revival" />
            Resurrection Checklist (one milestone per line)
          </label>
          <textarea
            rows={3}
            value={formData.checklistText}
            onChange={(e) =>
              setFormData({ ...formData, checklistText: e.target.value })
            }
            placeholder={'Simplify state storage to localStorage\nStrip out 80% of unused css\nDeploy live demo on Vercel'}
            className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-xs sm:text-sm text-moonlight placeholder-ash/50 focus:outline-none focus:ring-2 focus:ring-revival font-mono"
          />
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-end gap-3 border-t border-white/[0.08] pt-5">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-white/15 bg-white/[0.04] px-5 py-2.5 text-xs font-semibold text-ash hover:bg-white/10 hover:text-moonlight transition"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="flex items-center gap-2 rounded-full bg-gradient-to-r from-revival to-emerald-400 px-7 py-2.5 text-xs font-bold uppercase tracking-wide text-[#050811] shadow-[0_0_20px_rgba(52,211,153,0.3)] hover:scale-105 transition"
          >
            <Save size={15} />
            <span>{isEditing ? 'Save Inscription' : 'Entomb in Graveyard'}</span>
          </button>
        </div>
      </form>
    </div>
  )
}

export default function ProjectFormModal({
  isOpen,
  onClose,
  onSave,
  initialData = null,
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

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="tombstone-form-title"
    >
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      <InnerForm
        key={initialData ? initialData.id : 'new-tombstone'}
        initialData={initialData}
        onClose={onClose}
        onSave={onSave}
      />
    </div>
  )
}
