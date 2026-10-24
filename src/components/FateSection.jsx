import { Archive, RefreshCw, Shuffle, Heart, ChevronRight, Sparkles } from 'lucide-react'

export default function FateSection({ onSelectFate }) {
  const fates = [
    {
      fateKey: 'Preserve',
      number: '01',
      title: 'Preserve',
      subtitle: 'The Rite of the Vault',
      description:
        'Not everything needs building right now. Archive your notes, repo links, architectures, and design tokens in peace.',
      icon: Archive,
      badgeColor: 'border-ghost/30 text-ghost bg-ghost/10',
      actionText: 'Filter Preserved Ideas',
      accentGlow: 'hover:border-ghost/50 hover:shadow-[0_0_30px_rgba(167,139,250,0.2)]',
    },
    {
      fateKey: 'Revive',
      number: '02',
      title: 'Revive',
      subtitle: 'The Rite of Awakening',
      description:
        'Return to the codebase with fresh clarity. Strip out the bloat, scope down to what matters, and breathe life into it.',
      icon: RefreshCw,
      badgeColor: 'border-revival/30 text-revival bg-revival/10',
      actionText: 'Filter Revival Candidates',
      accentGlow: 'hover:border-revival/50 hover:shadow-[0_0_30px_rgba(52,211,153,0.2)]',
    },
    {
      fateKey: 'Transform',
      number: '03',
      title: 'Transform',
      subtitle: 'The Rite of Metamorphosis',
      description:
        'An old idea can become something entirely new. Carve out the best algorithm or UI widget and spin it into a new project.',
      icon: Shuffle,
      badgeColor: 'border-sky-400/30 text-sky-300 bg-sky-400/10',
      actionText: 'Filter Transformed Ideas',
      accentGlow: 'hover:border-sky-400/50 hover:shadow-[0_0_30px_rgba(56,189,248,0.2)]',
    },
    {
      fateKey: 'Release',
      number: '04',
      title: 'Release',
      subtitle: 'The Rite of Peaceful Departure',
      description:
        'Close the repository without regret. Celebrate what you learned, thank the project for its service, and clear your slate.',
      icon: Heart,
      badgeColor: 'border-amber-400/30 text-amber-300 bg-amber-400/10',
      actionText: 'Filter Released Ideas',
      accentGlow: 'hover:border-amber-400/50 hover:shadow-[0_0_30px_rgba(251,191,36,0.2)]',
    },
  ]

  const handleCardClick = (fateKey) => {
    onSelectFate(fateKey)
    const target = document.getElementById('archive')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="fates" className="relative mx-auto max-w-7xl px-6 py-28 md:px-10">
      <div className="mx-auto max-w-3xl text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-revival/25 bg-revival/[0.07] px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-revival mb-4">
          <Sparkles size={13} />
          Choose the Destiny
        </div>
        <h2 className="font-display text-4xl font-extrabold text-moonlight md:text-5xl">
          Choose the fate of your idea
        </h2>
        <p className="mt-5 text-base leading-relaxed text-ash md:text-lg">
          Every project possesses a soul. Choose which ritual suits its current state,
          and explore other projects resting under the same fate.
        </p>
      </div>

      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {fates.map((fate) => {
          const Icon = fate.icon
          return (
            <div
              key={fate.number}
              onClick={() => handleCardClick(fate.fateKey)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleCardClick(fate.fateKey)
                }
              }}
              className={`group cursor-pointer relative flex flex-col justify-between rounded-3xl border border-white/[0.09] bg-[#0c1220]/70 p-7 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-revival ${fate.accentGlow}`}
            >
              <div>
                <div className="mb-7 flex items-center justify-between">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${fate.badgeColor}`}>
                    <Icon size={24} />
                  </div>
                  <span className="font-display text-sm font-bold tracking-widest text-ash/50">
                    {fate.number}
                  </span>
                </div>

                <span className="text-[11px] font-bold uppercase tracking-widest text-ash">
                  {fate.subtitle}
                </span>

                <h3 className="mt-1 font-display text-2xl font-bold text-moonlight group-hover:text-revival transition-colors">
                  {fate.title}
                </h3>

                <p className="mt-3.5 text-sm leading-relaxed text-ash">
                  {fate.description}
                </p>
              </div>

              <div className="mt-8 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-revival transition-transform duration-300 group-hover:translate-x-1">
                <span>{fate.actionText}</span>
                <ChevronRight size={15} />
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
