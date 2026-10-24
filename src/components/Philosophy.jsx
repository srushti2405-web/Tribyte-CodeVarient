import { Sparkles, Compass, ShieldCheck, Feather } from 'lucide-react'

export default function Philosophy() {
  const pillars = [
    {
      icon: Compass,
      title: 'Dignity Over Guilt',
      description:
        'Abandoning a codebase should not feel like moral failure. Stepping away is often the smartest architectural decision a creator makes.',
      tag: 'Sanctuary Rule I',
    },
    {
      icon: Feather,
      title: 'The Compost of Genius',
      description:
        'Unfinished prototypes are not waste. They are fertile digital soil. The regex, the shader, or the state machine you solved lives on.',
      tag: 'Sanctuary Rule II',
    },
    {
      icon: ShieldCheck,
      title: 'Frictionless Resurrection',
      description:
        'Documenting cause of death and keeping a concrete revival roadmap turns intimidating half-baked repos into 1-hour weekend victories.',
      tag: 'Sanctuary Rule III',
    },
  ]

  return (
    <section
      id="about"
      className="relative border-y border-white/[0.08] bg-[#070b14]/75 px-6 py-28 backdrop-blur-md md:px-10"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-14 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Atmospheric Typography */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-ghost/25 bg-ghost/[0.07] px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-ghost mb-5">
              <Sparkles size={13} />
              The Graveyard Manifesto
            </div>

            <h2 className="font-display text-4xl font-extrabold leading-tight text-moonlight md:text-5xl lg:text-6xl">
              A graveyard
              <br />
              isn’t the end.
              <br />
              <span className="text-revival">It’s a beginning.</span>
            </h2>

            <p className="mt-6 text-base leading-relaxed text-ash md:text-lg">
              Every engineer and designer harbors a digital cemetery in their
              `~/Projects` folder. Half-configured repos, designs frozen in
              Figma drafts, domains registered at 3 AM that never saw daylight.
            </p>

            <div className="relative mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md">
              <p className="font-display text-lg italic text-moonlight/95 leading-relaxed">
                “An unfinished project is not a failed project. It is an
                unfolding story waiting for the author to return with fresh eyes.”
              </p>
              <span className="mt-3 block text-xs tracking-wider uppercase text-revival font-semibold">
                — Codex of the Digital Sanctuary
              </span>
            </div>
          </div>

          {/* Right Column: The 3 Pillars */}
          <div className="space-y-5 lg:col-span-7">
            {pillars.map((pillar) => {
              const Icon = pillar.icon
              return (
                <div
                  key={pillar.title}
                  className="group relative rounded-2xl border border-white/[0.08] bg-[#0c1221]/60 p-6 md:p-8 backdrop-blur-xl transition-all duration-300 hover:border-revival/40 hover:bg-[#0e1628]/80 hover:shadow-[0_0_30px_rgba(52,211,153,0.15)]"
                >
                  <div className="flex items-start gap-5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-revival transition-transform duration-300 group-hover:scale-110 group-hover:border-revival/30 group-hover:bg-revival/10">
                      <Icon size={24} />
                    </div>

                    <div>
                      <div className="flex items-center gap-3">
                        <span className="text-[11px] font-bold uppercase tracking-widest text-ash/80">
                          {pillar.tag}
                        </span>
                      </div>
                      <h3 className="mt-1 font-display text-xl font-bold text-moonlight group-hover:text-revival transition-colors">
                        {pillar.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-ash">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
