import { Skull, Sparkles, RefreshCw, Archive, Flame } from 'lucide-react'

export default function StatsSection({ projects = [] }) {
  const total = projects.length
  const restingCount = projects.filter((p) => p.status === 'Resting').length
  const readyCount = projects.filter((p) => p.status === 'Ready for Revival').length
  const resurrectedCount = projects.filter((p) => p.status === 'Resurrected').length

  const revivalRate = total > 0 ? Math.round((resurrectedCount / total) * 100) : 0

  const metrics = [
    {
      label: 'Souls Entombed',
      value: total,
      subtext: `${restingCount} projects resting peacefully in the crypt`,
      icon: Skull,
      color: 'text-ghost',
      border: 'border-ghost/20 bg-ghost/5',
    },
    {
      label: 'Awaiting Resurrection',
      value: readyCount,
      subtext: 'Roadmaps scoped and prepared',
      icon: Flame,
      color: 'text-revival',
      border: 'border-revival/20 bg-revival/5',
    },
    {
      label: 'Brought Back to Life',
      value: resurrectedCount,
      subtext: 'Successfully launched projects',
      icon: RefreshCw,
      color: 'text-amber-300',
      border: 'border-amber-400/20 bg-amber-400/5',
    },
    {
      label: 'Revival Success Rate',
      value: `${revivalRate}%`,
      subtext: 'Exhumed and reborn into production',
      icon: Sparkles,
      color: 'text-sky-300',
      border: 'border-sky-400/20 bg-sky-400/5',
    },
  ]

  return (
    <section id="stats" className="border-t border-white/[0.08] bg-[#070b15]/80 px-6 py-24 backdrop-blur-md md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-ghost/25 bg-ghost/[0.07] px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-ghost mb-4">
            <Archive size={13} />
            The Sanctuary Shrine
          </div>
          <h2 className="font-display text-3xl font-extrabold text-moonlight md:text-5xl">
            Graveyard Vital Signs
          </h2>
          <p className="mt-4 text-base text-ash">
            Tracking the cycle of death, preservation, and resurrection across the archive.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((m) => {
            const Icon = m.icon
            return (
              <div
                key={m.label}
                className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0b101c]/80 p-7 backdrop-blur-xl transition hover:border-white/20"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-ash">
                    {m.label}
                  </span>
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl border ${m.border} ${m.color}`}>
                    <Icon size={20} />
                  </div>
                </div>

                <div className={`mt-5 font-display text-4xl font-extrabold ${m.color}`}>
                  {m.value}
                </div>

                <p className="mt-2 text-xs text-ash/80">
                  {m.subtext}
                </p>
              </div>
            )
          })}
        </div>

        {/* Common Causes of Project Demise */}
        <div className="mt-12 rounded-3xl border border-white/[0.08] bg-[#0b101c]/50 p-6 md:p-8 backdrop-blur-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.06] pb-5">
            <div>
              <h3 className="font-display text-lg font-bold text-moonlight">
                Leading Causes of Project Demise in the Crypt
              </h3>
              <p className="text-xs text-ash mt-1">
                Based on postmortems submitted by digital gravediggers
              </p>
            </div>
            <span className="text-xs text-revival font-semibold tracking-wide uppercase">
              Sanctuary Statistics
            </span>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/[0.05] bg-white/[0.02] p-4">
              <span className="text-xl">🕸️</span>
              <h4 className="mt-2 text-sm font-bold text-moonlight">Scope Creep</h4>
              <p className="mt-1 text-xs text-ash">
                42% of ideas succumbed to adding 10 more features before shipping v1.
              </p>
            </div>

            <div className="rounded-2xl border border-white/[0.05] bg-white/[0.02] p-4">
              <span className="text-xl">🕯️</span>
              <h4 className="mt-2 text-sm font-bold text-moonlight">Creative Burnout</h4>
              <p className="mt-1 text-xs text-ash">
                31% ran out of nocturnal steam when the initial dopamine faded.
              </p>
            </div>

            <div className="rounded-2xl border border-white/[0.05] bg-white/[0.02] p-4">
              <span className="text-xl">⚡</span>
              <h4 className="mt-2 text-sm font-bold text-moonlight">Architecture Overkill</h4>
              <p className="mt-1 text-xs text-ash">
                27% rewrote the backend in 3 different frameworks before launching.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
