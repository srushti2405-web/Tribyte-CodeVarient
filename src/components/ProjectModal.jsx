import { useEffect } from 'react'
import {
  X,
  Sparkles,
  Flame,
  Moon,
  ExternalLink,
  Edit3,
  Trash2,
  Skull,
  CheckSquare,
  Square,
  Compass,
} from 'lucide-react'

export default function ProjectModal({
  project,
  onClose,
  onEdit,
  onDelete,
  onToggleResurrect,
  onToggleChecklistTask,
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [onClose])

  if (!project) return null

  const isResurrected = project.status === 'Resurrected'
  const isReady = project.status === 'Ready for Revival'

  const completedChecklistCount = (project.checklist || []).filter(
    (item) => item.done
  ).length
  const totalChecklistCount = (project.checklist || []).length
  const checklistProgress =
    totalChecklistCount > 0
      ? Math.round((completedChecklistCount / totalChecklistCount) * 100)
      : 0

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog Card */}
      <div className="relative my-8 w-full max-w-3xl rounded-[2.5rem] border border-white/15 bg-[#0b101c]/95 p-6 sm:p-10 shadow-[0_0_60px_rgba(0,0,0,0.8)] backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-200 text-moonlight z-10 max-h-[90vh] overflow-y-auto">
        {/* Top Header Controls */}
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-5">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">{project.symbol || '🪦'}</span>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-ash">
              Tombstone Inscription #{project.id.slice(0, 8)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onEdit(project)}
              className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs font-semibold text-ash hover:border-white/20 hover:text-moonlight transition"
              title="Edit project"
            >
              <Edit3 size={14} />
              <span className="hidden sm:inline">Edit Inscription</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-ash hover:bg-white/10 hover:text-moonlight transition"
              aria-label="Close tombstone dialog"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Badges & Identity */}
        <div className="mt-6 flex flex-wrap items-center gap-2.5">
          {isResurrected ? (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/40 bg-amber-400/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-300 shadow-[0_0_15px_rgba(251,191,36,0.25)]">
              <Sparkles size={13} />
              Resurrected
            </span>
          ) : isReady ? (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-revival/40 bg-revival/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-revival shadow-[0_0_15px_rgba(52,211,153,0.25)]">
              <Flame size={13} />
              Ready for Revival
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-ghost/40 bg-ghost/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-ghost">
              <Moon size={13} />
              Resting Peacefully
            </span>
          )}

          <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium text-ash uppercase tracking-wider">
            Fate: {project.fate || 'Preserve'}
          </span>

          <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium text-ash uppercase tracking-wider">
            {project.category}
          </span>

          <span className="text-xs text-ash ml-auto">
            Buried: <strong className="text-moonlight font-medium">{project.dateBuried || 'Ancient Past'}</strong>
          </span>
        </div>

        {/* Title & Tagline */}
        <h2
          id="modal-project-title"
          className="mt-5 font-display text-3xl font-extrabold tracking-tight text-moonlight sm:text-4xl"
        >
          {project.title}
        </h2>

        {project.tagline && (
          <p className="mt-2 text-base font-medium text-revival/90">
            {project.tagline}
          </p>
        )}

        {/* Inscribed Epitaph Quote */}
        {project.epitaph && (
          <div className="mt-6 rounded-2xl border border-white/10 bg-gradient-to-r from-ghost/[0.08] to-revival/[0.04] p-5 shadow-inner">
            <p className="font-serif italic text-base leading-relaxed text-moonlight/90">
              <span className="text-revival font-bold text-xl mr-1">“</span>
              {project.epitaph}
              <span className="text-revival font-bold text-xl ml-1">”</span>
            </p>
          </div>
        )}

        {/* Cause of Death */}
        {project.causeOfDeath && (
          <div className="mt-6 rounded-2xl border border-rose-500/20 bg-rose-500/[0.06] p-4 flex items-start gap-3">
            <Skull size={18} className="text-rose-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-rose-300">
                Cause of Demise
              </span>
              <p className="mt-1 text-sm text-rose-100/90 leading-relaxed">
                {project.causeOfDeath}
              </p>
            </div>
          </div>
        )}

        {/* Full Story & Background */}
        <div className="mt-6">
          <h3 className="text-xs font-bold uppercase tracking-widest text-ash">
            The Chronicle Behind the Code
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-ash/90 sm:text-base">
            {project.description}
          </p>
        </div>

        {/* Interactive Revival Checklist */}
        {project.checklist && project.checklist.length > 0 && (
          <div className="mt-8 rounded-2xl border border-white/10 bg-[#070b16]/80 p-5">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3 mb-4">
              <div>
                <h3 className="text-sm font-bold text-moonlight flex items-center gap-2">
                  <Compass size={16} className="text-revival" />
                  <span>Resurrection Roadmap</span>
                </h3>
                <p className="text-xs text-ash mt-0.5">
                  Check off milestones to prepare this project for revival
                </p>
              </div>
              <span className="text-xs font-bold text-revival">
                {completedChecklistCount} of {totalChecklistCount} ({checklistProgress}%)
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-white/10 rounded-full h-1.5 mb-4 overflow-hidden">
              <div
                className="bg-gradient-to-r from-revival to-emerald-400 h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${checklistProgress}%` }}
              />
            </div>

            <div className="space-y-2.5">
              {project.checklist.map((item, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => onToggleChecklistTask(project.id, index)}
                  className={`w-full flex items-start gap-3 rounded-xl p-2.5 text-left transition ${
                    item.done
                      ? 'bg-revival/[0.06] border border-revival/20 text-moonlight'
                      : 'bg-white/[0.02] border border-white/[0.05] text-ash hover:bg-white/[0.05]'
                  }`}
                >
                  <span className="shrink-0 mt-0.5">
                    {item.done ? (
                      <CheckSquare size={16} className="text-revival" />
                    ) : (
                      <Square size={16} className="text-ash/60" />
                    )}
                  </span>
                  <span
                    className={`text-xs sm:text-sm leading-snug ${
                      item.done ? 'line-through text-ash/70' : 'text-moonlight'
                    }`}
                  >
                    {item.text}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Revival Notes */}
        {project.revivalNotes && (
          <div className="mt-6 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4">
            <span className="text-xs font-bold uppercase tracking-wider text-revival">
              Gravedigger’s Notes & Next Steps
            </span>
            <p className="mt-1.5 text-xs sm:text-sm text-ash leading-relaxed">
              {project.revivalNotes}
            </p>
          </div>
        )}

        {/* Tech Stack */}
        {project.techStack && project.techStack.length > 0 && (
          <div className="mt-6">
            <span className="text-xs font-bold uppercase tracking-widest text-ash">
              Relic Artifacts & Technologies
            </span>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium text-moonlight"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Links */}
        {(project.repoUrl || project.demoUrl) && (
          <div className="mt-6 flex flex-wrap gap-3">
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-semibold text-moonlight hover:bg-white/10 transition"
              >
                <ExternalLink size={14} />
                <span>Source Repository</span>
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl border border-revival/30 bg-revival/10 px-4 py-2 text-xs font-semibold text-revival hover:bg-revival/20 transition"
              >
                <ExternalLink size={14} />
                <span>Live Memorial Demo</span>
              </a>
            )}
          </div>
        )}

        {/* Modal Bottom Actions */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.08] pt-6">
          <button
            type="button"
            onClick={() => {
              onToggleResurrect(project)
            }}
            className={`flex items-center gap-2 rounded-full px-6 py-3 text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
              isResurrected
                ? 'border border-white/20 bg-white/[0.06] text-moonlight hover:bg-white/15'
                : 'bg-gradient-to-r from-revival to-emerald-400 text-[#050811] shadow-[0_0_25px_rgba(52,211,153,0.35)] hover:scale-105'
            }`}
          >
            {isResurrected ? (
              <>
                <Moon size={15} />
                <span>Return to Peaceful Rest</span>
              </>
            ) : (
              <>
                <Sparkles size={15} />
                <span>Resurrect This Project!</span>
              </>
            )}
          </button>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                onClose()
                onDelete(project)
              }}
              className="flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold text-rose-400 hover:bg-rose-500/15 transition"
            >
              <Trash2 size={14} />
              <span>Exhume & Delete</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-white/15 bg-white/[0.05] px-5 py-2.5 text-xs font-bold text-moonlight hover:bg-white/10 transition"
            >
              Close Inscription
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
