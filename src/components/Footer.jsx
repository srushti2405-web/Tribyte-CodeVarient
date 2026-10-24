import { Ghost, ArrowUp } from 'lucide-react'

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative border-t border-white/[0.08] bg-[#050811]/90 px-6 py-14 backdrop-blur-xl md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:items-start">
          {/* Brand & Dedication */}
          <div className="text-center md:text-left">
            <a
              href="#home"
              className="inline-flex items-center gap-2.5 font-display text-xl font-bold tracking-tight text-moonlight"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-revival/30 bg-revival/10 text-revival">
                <Ghost size={18} />
              </div>
              <span>
                Project <span className="text-revival">Graveyard</span>
              </span>
            </a>
            <p className="mt-3 max-w-sm text-xs leading-relaxed text-ash">
              A digital sanctuary honoring the ideas, prototypes, and experiments
              waiting for their rightful second life.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-medium text-ash">
            <a href="#home" className="hover:text-revival transition">Sanctuary</a>
            <a href="#about" className="hover:text-revival transition">Philosophy</a>
            <a href="#fates" className="hover:text-revival transition">The 4 Fates</a>
            <a href="#archive" className="hover:text-revival transition">The Archive</a>
            <a href="#stats" className="hover:text-revival transition">Vital Signs</a>
          </div>

          {/* Back to Top */}
          <button
            type="button"
            onClick={scrollToTop}
            className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 text-xs font-semibold text-moonlight hover:border-revival/40 hover:bg-revival/10 hover:text-revival transition-all"
            aria-label="Scroll back to the surface"
          >
            <span>Back to the Surface</span>
            <ArrowUp size={14} className="transition-transform group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-8 text-center text-[11px] text-ash/80 sm:flex-row">
          <p>© {new Date().getFullYear()} Project Graveyard. Built for Hackathon Excellence.</p>
          <p className="flex items-center gap-1.5">
            <span>Preserve</span> • <span>Revive</span> • <span>Transform</span> • <span>Release</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
