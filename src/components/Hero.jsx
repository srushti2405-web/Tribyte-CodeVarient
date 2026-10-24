import { Sparkles, ArrowRight, ChevronDown, Moon, RefreshCw, Compass } from 'lucide-react'
import PumpkinLantern from './Halloween/PumpkinLantern'

export default function Hero({
  onOpenCreateModal,
  totalProjects = 6,
  readyToReviveCount = 2,
  resurrectedCount = 1,
}) {
  const scrollToJourney = (e) => {
    e.preventDefault()
    const target = document.getElementById('journey-experience') || document.getElementById('archive')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      id="home"
      className="relative mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-6 pt-16 pb-16 text-center md:pt-20 md:pb-20"
    >
      {/* Background ethereal radial aura */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ghost/10 blur-[130px]" />
      <div className="pointer-events-none absolute left-1/2 top-2/3 -z-0 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-revival/10 blur-[120px]" />

      {/* Eyebrow Pill with Pumpkin */}
      <div className="relative mb-7 inline-flex items-center gap-2.5 rounded-full border border-revival/25 bg-revival/[0.07] px-4 py-2 text-xs font-semibold tracking-[0.25em] uppercase text-revival shadow-[0_0_20px_rgba(52,211,153,0.15)] backdrop-blur-md md:text-xs">
        <Sparkles size={14} className="text-revival animate-pulse" />
        <span>THE CEMETERY OF UNFINISHED IDEAS</span>
      </div>

      {/* Crypt Relic Emblem with Halloween Lanterns Flanking */}
      <div className="relative mb-6 flex items-center justify-center gap-6">
        <PumpkinLantern size={48} withWitchHat={true} flicker={true} className="hidden sm:inline-block" />

        <div className="relative flex h-20 w-20 items-center justify-center rounded-[2rem] border border-white/15 bg-gradient-to-b from-white/[0.08] to-white/[0.02] shadow-[0_0_40px_rgba(167,139,250,0.2)] backdrop-blur-md">
          <span className="text-3xl select-none animate-pulse">🪦</span>
          <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full border border-[#050811] bg-revival text-[#050811] shadow-md">
            <Moon size={12} className="fill-current" />
          </span>
        </div>

        <PumpkinLantern size={48} withWitchHat={true} flicker={true} className="hidden sm:inline-block" />
      </div>

      {/* Main Heading */}
      <h1 className="relative max-w-4xl font-display text-5xl font-extrabold leading-[1.06] tracking-tight text-moonlight md:text-7xl lg:text-8xl">
        Not every ending
        <br />
        <span className="bg-gradient-to-r from-revival via-emerald-300 to-ghost bg-clip-text text-transparent">
          is the end.
        </span>
      </h1>

      {/* Supporting Text */}
      <p className="relative mt-7 max-w-2xl text-base leading-relaxed text-ash md:text-xl">
        A sanctuary for unfinished projects, forgotten experiments, and ideas
        waiting for their second life. Step past the iron gates, explore the catacombs,
        and decide whether to revive or peacefully release your creations.
      </p>

      {/* Primary & Secondary Action CTAs */}
      <div className="relative mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-5">
        <a
          href="#journey-experience"
          onClick={scrollToJourney}
          className="group flex items-center gap-2.5 rounded-full bg-gradient-to-r from-revival to-emerald-400 px-8 py-4 text-sm font-bold uppercase tracking-wider text-[#050811] shadow-[0_0_30px_rgba(52,211,153,0.35)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_45px_rgba(52,211,153,0.55)] focus:outline-none focus-visible:ring-2 focus-visible:ring-revival active:scale-95"
        >
          <Compass size={18} className="transition-transform duration-300 group-hover:rotate-45" />
          <span>Enter the Graveyard (3D Gates)</span>
          <ArrowRight
            size={18}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </a>

        <button
          type="button"
          onClick={onOpenCreateModal}
          className="group flex items-center gap-2.5 rounded-full border border-white/20 bg-white/[0.04] px-8 py-4 text-sm font-semibold tracking-wide text-moonlight backdrop-blur-md transition-all duration-300 hover:border-ghost/60 hover:bg-ghost/10 hover:text-ghost-light focus:outline-none focus-visible:ring-2 focus-visible:ring-ghost active:scale-95"
        >
          <RefreshCw size={17} className="transition-transform group-hover:rotate-180 duration-500" />
          <span>Resurrect an Idea</span>
        </button>
      </div>

      {/* Live Cemetery Status Badges */}
      <div className="relative mt-16 flex flex-wrap items-center justify-center gap-4 md:gap-8">
        <div className="flex items-center gap-2.5 rounded-full border border-white/10 bg-[#070b16]/70 px-4 py-2 text-xs font-medium text-ash backdrop-blur-md">
          <span className="h-2 w-2 rounded-full bg-ghost animate-pulse" />
          <span className="text-moonlight font-semibold">{totalProjects}</span> Ideas Entombed
        </div>

        <div className="flex items-center gap-2.5 rounded-full border border-white/10 bg-[#070b16]/70 px-4 py-2 text-xs font-medium text-ash backdrop-blur-md">
          <span className="h-2 w-2 rounded-full bg-revival shadow-[0_0_8px_#34d399]" />
          <span className="text-revival font-semibold">{readyToReviveCount}</span> Ready for Revival
        </div>

        <div className="flex items-center gap-2.5 rounded-full border border-white/10 bg-[#070b16]/70 px-4 py-2 text-xs font-medium text-ash backdrop-blur-md">
          <span className="h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_8px_#fbbf24]" />
          <span className="text-amber-300 font-semibold">{resurrectedCount}</span> Resurrected
        </div>
      </div>

      {/* Atmospheric Scroll Down Indicator */}
      <div className="mt-14 flex flex-col items-center gap-2">
        <a
          href="#about"
          className="group flex flex-col items-center text-xs font-medium tracking-widest uppercase text-ash/70 hover:text-revival transition-colors"
          aria-label="Scroll to philosophy section"
        >
          <span>Descend Deeper</span>
          <ChevronDown
            size={18}
            className="mt-1 animate-bounce text-ash group-hover:text-revival"
          />
        </a>
      </div>
    </section>
  )
}
