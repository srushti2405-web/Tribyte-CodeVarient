import {
  Sparkles,
  ArrowRight,
  Flame,
  Moon,
  CheckCircle2,
  Edit3,
  Trash2,
  Skull,
} from 'lucide-react'

export default function ProjectCard({
  project,
  onInspect,
  onEdit,
  onDelete,
  onToggleResurrect,
}) {
  const isResurrected = project.status === 'Resurrected'
  const isReady = project.status === 'Ready for Revival'

  const statusBadge = () => {
    if (isResurrected) {
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-amber-300 shadow-[0_0_12px_rgba(251,191,36,0.2)]">
          <Sparkles size={12} className="text-amber-300" />
          Resurrected
        </span>
      )
    }
    if (isReady) {
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-revival/30 bg-revival/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-revival shadow-[0_0_12px_rgba(52,211,153,0.2)]">
          <Flame size={12} className="text-revival" />
          Ready for Revival
        </span>
      )
    }
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-ghost/30 bg-ghost/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-ghost">
        <Moon size={12} className="text-ghost" />
        Resting Peacefully
      </span>
    )
  }

  const fateBadge = () => {
    const colors = {
      Preserve: 'border-ghost/25 text-ghost bg-ghost/5',
      Revive: 'border-revival/25 text-revival bg-revival/5',
      Transform: 'border-sky-400/25 text-sky-300 bg-sky-400/5',
      Release: 'border-amber-400/25 text-amber-300 bg-amber-400/5',
    }
    const color = colors[project.fate] || colors.Preserve
    return (
      <span className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${color}`}>
        {project.fate || 'Preserve'}
      </span>
    )
  }

  return (
    <article
      className={`group relative flex flex-col justify-between rounded-3xl border bg-[#0b101d]/85 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl focus-within:ring-2 focus-within:ring-revival ${
        isResurrected
          ? 'border-amber-400/30 hover:border-amber-400/60 hover:shadow-[0_0_35px_rgba(251,191,36,0.15)]'
          : isReady
          ? 'border-revival/25 hover:border-revival/50 hover:shadow-[0_0_35px_rgba(52,211,153,0.15)]'
          : 'border-white/[0.08] hover:border-ghost/40 hover:shadow-[0_0_30px_rgba(167,139,250,0.12)]'
      }`}
    >
      <div>
        {/* Card Header: Badges & Rune */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex flex-wrap items-center gap-2">
            {statusBadge()}
            {fateBadge()}
          </div>
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-xl shadow-inner select-none transition-transform group-hover:scale-110">
            {project.symbol || '🪦'}
          </span>
        </div>

        {/* Category & Date Buried */}
        <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-ash">
          <span>{project.category}</span>
          <span>{project.dateBuried || 'Date Unknown'}</span>
        </div>

        {/* Project Title */}
        <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-moonlight transition-colors group-hover:text-revival">
          {project.title}
        </h3>

        {/* Tagline */}
        <p className="mt-2 text-sm leading-relaxed text-ash line-clamp-2">
          {project.tagline || project.description}
        </p>

        {/* Inscribed Epitaph Quote */}
        {project.epitaph && (
          <div className="mt-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 text-xs italic text-moonlight/80">
            <span className="text-revival font-serif font-bold text-sm mr-1">“</span>
            {project.epitaph}
            <span className="text-revival font-serif font-bold text-sm ml-1">”</span>
          </div>
        )}

        {/* Cause of Death banner */}
        {project.causeOfDeath && (
          <div className="mt-3.5 flex items-center gap-2 text-xs text-ash/90">
            <Skull size={13} className="text-rose-400 shrink-0" />
            <span className="truncate">
              <strong className="text-rose-300 font-medium">Demise:</strong> {project.causeOfDeath}
            </span>
          </div>
        )}

        {/* Tech Stack Pills */}
        {project.techStack && project.techStack.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.techStack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-white/[0.06] bg-white/[0.03] px-2 py-0.5 text-[10px] font-medium text-ash"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 4 && (
              <span className="rounded-md border border-white/[0.06] bg-white/[0.03] px-1.5 py-0.5 text-[10px] font-medium text-ash">
                +{project.techStack.length - 4}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Card Footer Actions */}
      <div className="mt-6 border-t border-white/[0.08] pt-4">
        <div className="flex items-center justify-between">
          {/* Quick Resurrect Toggle */}
          <button
            type="button"
            onClick={() => onToggleResurrect(project)}
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition ${
              isResurrected
                ? 'border border-amber-400/30 bg-amber-400/10 text-amber-300 hover:bg-amber-400/20'
                : 'border border-revival/30 bg-revival/10 text-revival hover:bg-revival/20'
            }`}
            title={isResurrected ? 'Lay back to rest' : 'Mark as Resurrected!'}
          >
            {isResurrected ? (
              <>
                <CheckCircle2 size={13} />
                <span>Resurrected</span>
              </>
            ) : (
              <>
                <Flame size={13} />
                <span>Resurrect</span>
              </>
            )}
          </button>

          {/* Action icon group */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => onEdit(project)}
              className="rounded-lg p-2 text-ash hover:bg-white/10 hover:text-moonlight transition"
              aria-label={`Edit ${project.title}`}
              title="Edit Tombstone"
            >
              <Edit3 size={15} />
            </button>

            <button
              type="button"
              onClick={() => onDelete(project)}
              className="rounded-lg p-2 text-ash hover:bg-rose-500/20 hover:text-rose-400 transition"
              aria-label={`Delete ${project.title}`}
              title="Exhume / Delete"
            >
              <Trash2 size={15} />
            </button>

            <button
              type="button"
              onClick={() => onInspect(project)}
              className="flex items-center gap-1 rounded-xl bg-white/[0.05] px-3 py-1.5 text-xs font-semibold text-moonlight hover:bg-revival hover:text-[#050811] transition-all ml-1"
            >
              <span>Inspect</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}
