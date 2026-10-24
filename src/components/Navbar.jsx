import { useState, useEffect } from 'react'
import { Ghost, Plus, Menu, X, ArrowUpRight } from 'lucide-react'
import AmbientAudio from './AmbientAudio'

export default function Navbar({ onOpenCreateModal }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'Sanctuary', href: '#home' },
    { label: '5-Step Journey', href: '#journey-experience' },
    { label: 'Philosophy', href: '#about' },
    { label: 'The 4 Fates', href: '#fates' },
    { label: 'The Archive', href: '#archive' },
    { label: 'Graveyard Shrine', href: '#stats' },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'border-b border-white/[0.08] bg-[#050811]/85 backdrop-blur-md shadow-2xl shadow-black/50 py-3.5'
          : 'border-b border-transparent bg-transparent py-5'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-10">
        {/* Brand */}
        <a
          href="#home"
          className="group flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-revival rounded-xl p-1"
        >
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-revival/30 bg-gradient-to-br from-revival/20 to-ghost/10 transition-transform duration-300 group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(52,211,153,0.35)]">
            <Ghost className="text-revival transition-transform group-hover:-translate-y-0.5" size={22} />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-revival opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-revival" />
            </span>
          </div>
          <div>
            <span className="font-display text-lg font-bold tracking-tight text-moonlight block">
              Project <span className="text-revival">Graveyard</span>
            </span>
            <span className="text-[10px] tracking-[0.2em] uppercase text-ash font-medium hidden sm:block">
              Sanctuary for Ideas
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-7 text-sm font-medium text-ash md:flex" aria-label="Main navigation">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative transition hover:text-revival focus:outline-none focus-visible:text-revival py-1"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="hidden items-center gap-4 md:flex">
          <AmbientAudio />

          <button
            type="button"
            onClick={onOpenCreateModal}
            className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-revival to-emerald-400 px-5 py-2.5 text-xs font-bold tracking-wide uppercase text-[#050811] shadow-[0_0_25px_rgba(52,211,153,0.3)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_35px_rgba(52,211,153,0.5)] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-revival active:scale-95"
          >
            <Plus size={16} className="transition-transform group-hover:rotate-90 duration-300" />
            <span>Bury or Revive</span>
          </button>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-3 md:hidden">
          <AmbientAudio />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-moonlight hover:bg-white/10 focus:outline-none"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-b border-white/10 bg-[#070b14]/98 px-6 py-6 md:hidden backdrop-blur-2xl animate-in slide-in-from-top duration-300">
          <nav className="flex flex-col gap-4 text-base font-medium text-moonlight">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between border-b border-white/[0.05] pb-3 text-ash hover:text-revival transition"
              >
                <span>{link.label}</span>
                <ArrowUpRight size={16} className="text-ash/60" />
              </a>
            ))}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false)
                  onOpenCreateModal()
                }}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-revival px-5 py-3 text-xs font-bold tracking-wide uppercase text-[#050811] shadow-lg shadow-revival/20"
              >
                <Plus size={16} />
                Bury or Revive an Idea
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
