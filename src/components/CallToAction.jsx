import { Sparkles, Plus, Shuffle } from 'lucide-react'
import PumpkinLantern from './Halloween/PumpkinLantern'

export default function CallToAction({ onOpenCreateModal, onRandomProject }) {
  return (
    <section className="relative px-6 py-28 md:px-10">
      <div className="relative mx-auto max-w-4xl overflow-hidden rounded-[3rem] border border-white/15 bg-gradient-to-b from-[#0e1526]/90 to-[#070b16]/95 px-8 py-16 text-center backdrop-blur-2xl shadow-[0_0_80px_rgba(0,0,0,0.8)] md:px-16 md:py-20">
        {/* Glow orb */}
        <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-revival/15 blur-[90px]" />
        <div className="pointer-events-none absolute right-10 bottom-0 h-48 w-48 rounded-full bg-ghost/15 blur-[80px]" />

        {/* Halloween Jack-o'-Lantern Mascot */}
        <div className="relative mx-auto mb-6 flex items-center justify-center gap-4">
          <PumpkinLantern size={56} withWitchHat={true} flicker={true} />
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-revival/30 bg-revival/10 shadow-[0_0_25px_rgba(52,211,153,0.25)]">
            <Sparkles className="text-revival animate-pulse" size={30} />
          </div>
          <PumpkinLantern size={56} withWitchHat={true} flicker={true} />
        </div>

        {/* Heading */}
        <h2 className="relative font-display text-4xl font-extrabold tracking-tight text-moonlight md:text-5xl">
          Something still haunting your mind?
        </h2>

        {/* Subtitle */}
        <p className="relative mx-auto mt-5 max-w-xl text-base leading-relaxed text-ash md:text-lg">
          That repo gathering digital dust? The weekend hackathon experiment you
          never deployed? Give it a dignified resting place here, or awaken it
          when the moon is right.
        </p>

        {/* Action Buttons */}
        <div className="relative mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={onOpenCreateModal}
            className="flex items-center gap-2.5 rounded-full bg-gradient-to-r from-revival to-emerald-400 px-8 py-4 text-xs font-bold uppercase tracking-wider text-[#050811] shadow-[0_0_30px_rgba(52,211,153,0.35)] transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <Plus size={17} />
            <span>Give an Idea a Home</span>
          </button>

          <button
            type="button"
            onClick={onRandomProject}
            className="flex items-center gap-2.5 rounded-full border border-white/20 bg-white/[0.04] px-7 py-4 text-xs font-semibold uppercase tracking-wider text-moonlight backdrop-blur-md transition-all duration-300 hover:border-ghost/60 hover:bg-ghost/10 hover:text-ghost-light active:scale-95"
          >
            <Shuffle size={16} />
            <span>Summon Random Relic</span>
          </button>
        </div>
      </div>
    </section>
  )
}
