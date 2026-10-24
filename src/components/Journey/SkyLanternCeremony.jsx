import { useState, useEffect } from 'react'
import { Sparkles, Heart, CheckCircle2 } from 'lucide-react'

export default function SkyLanternCeremony({ project, onComplete, onCancel }) {
  const [isIgnited, setIsIgnited] = useState(false)
  const [hasFlown, setHasFlown] = useState(false)

  // Floating background lanterns in the sky
  const backgroundLanterns = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    left: `${8 + (i * 5.2) % 84}%`,
    duration: `${6 + (i % 5) * 1.5}s`,
    delay: `${(i * 0.35) % 3}s`,
    scale: 0.35 + (i % 4) * 0.18,
    opacity: 0.4 + (i % 3) * 0.25,
  }))

  const handleIgniteAndRelease = () => {
    setIsIgnited(true)
    setTimeout(() => {
      setHasFlown(true)
      if (onComplete) {
        onComplete(project)
      }
    }, 2800)
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && onCancel) {
        onCancel()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onCancel])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-hidden bg-[#03060c]/90 backdrop-blur-xl animate-in fade-in duration-300"
      role="dialog"
      aria-modal="true"
    >
      {/* Background Starry Sky with Ascending Sky Lanterns */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft moonlight glow */}
        <div className="absolute top-[10%] right-[15%] h-64 w-64 rounded-full bg-gradient-to-br from-slate-100 to-sky-200 shadow-[0_0_140px_60px_rgba(186,230,253,0.3)] opacity-70" />

        {/* Ambient celestial haze */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_90%,rgba(245,158,11,0.15)_0%,transparent_60%)]" />

        {/* Background drifting lanterns */}
        {backgroundLanterns.map((l) => (
          <div
            key={l.id}
            className="absolute bottom-[-60px] animate-lantern-float"
            style={{
              left: l.left,
              animationDuration: l.duration,
              animationDelay: l.delay,
              transform: `scale(${l.scale})`,
              opacity: l.opacity,
            }}
          >
            <div className="flex flex-col items-center">
              <div className="h-10 w-8 rounded-t-lg rounded-b-sm bg-gradient-to-t from-amber-400 via-orange-300 to-amber-100 shadow-[0_0_20px_rgba(251,191,36,0.8)] opacity-90" />
              <div className="h-2 w-2 rounded-full bg-yellow-100 shadow-[0_0_10px_#fff]" />
            </div>
          </div>
        ))}
      </div>

      {/* Main Ceremony Card */}
      <div className="relative my-8 w-full max-w-xl rounded-[2.5rem] border border-amber-400/30 bg-[#090e1c]/95 p-6 sm:p-10 shadow-[0_0_70px_rgba(245,158,11,0.25)] backdrop-blur-2xl text-center text-moonlight z-10">
        {/* Release Rite Header */}
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-amber-300 mb-4 shadow-[0_0_15px_rgba(251,191,36,0.2)]">
          <Heart size={14} className="text-amber-300" />
          <span>The Rite of Departure</span>
        </div>

        <h3 className="font-display text-3xl sm:text-4xl font-extrabold text-moonlight">
          Release <span className="text-amber-300">“{project?.title}”</span>
        </h3>

        <p className="mt-3 text-sm text-ash leading-relaxed max-w-md mx-auto">
          Send a glowing lantern into the starry sky while honoring everything this project taught you.
        </p>

        {/* The 3 Guarantees from User Flow */}
        <div className="mt-6 grid gap-2.5 text-left text-xs sm:text-sm">
          <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3 text-moonlight">
            <span className="text-lg">📖</span>
            <span>Your project’s history and lessons are eternally preserved.</span>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3 text-moonlight">
            <span className="text-lg">🏺</span>
            <span>All resources, code, and links remain in your vault.</span>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3 text-moonlight">
            <span className="text-lg">✨</span>
            <span>Mental space and creative energy are cleared for what’s next.</span>
          </div>
        </div>

        {/* Central Rising Lantern Animation Stage */}
        <div className="relative my-8 flex h-52 items-center justify-center overflow-hidden rounded-2xl border border-white/[0.06] bg-[#050811]/70">
          <div
            className={`transition-all duration-[2400ms] ease-in-out ${
              isIgnited
                ? '-translate-y-48 scale-75 opacity-90'
                : 'translate-y-4 scale-100'
            }`}
          >
            {/* The Main Sky Lantern */}
            <div className="relative flex flex-col items-center">
              {/* Paper body */}
              <div
                className={`w-24 h-32 rounded-t-2xl rounded-b-md border transition-all duration-700 flex items-center justify-center ${
                  isIgnited
                    ? 'border-amber-300 bg-gradient-to-t from-amber-500 via-orange-400 to-amber-200 shadow-[0_0_50px_20px_rgba(251,191,36,0.85)]'
                    : 'border-white/20 bg-gradient-to-t from-amber-700/40 via-amber-800/30 to-slate-800/60 shadow-[0_0_20px_rgba(0,0,0,0.5)]'
                }`}
              >
                {/* Inscribed project symbol on lantern */}
                <span className="text-3xl opacity-80 select-none">
                  {project?.symbol || '🏮'}
                </span>
              </div>

              {/* Glowing candle flame core */}
              <div
                className={`mt-1 h-3 w-3 rounded-full transition-all duration-500 ${
                  isIgnited
                    ? 'bg-yellow-100 shadow-[0_0_25px_10px_#fef08a] animate-pulse'
                    : 'bg-amber-900/40'
                }`}
              />

              {/* Stone Pedestal before takeoff */}
              {!isIgnited && (
                <div className="mt-3 h-4 w-32 rounded-full border border-white/10 bg-white/[0.04]" />
              )}
            </div>
          </div>

          {/* Celebration Success overlay */}
          {hasFlown && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#070b16]/90 p-6 animate-in fade-in duration-500">
              <CheckCircle2 size={36} className="text-amber-300" />
              <h4 className="mt-2 font-display text-xl font-bold text-amber-200">
                Ascended in Peace
              </h4>
              <p className="mt-1 text-xs text-ash max-w-xs">
                “{project?.title}” has ascended into the digital constellations. Its memory is honored forever.
              </p>
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {!hasFlown ? (
            <>
              <button
                type="button"
                onClick={onCancel}
                disabled={isIgnited}
                className="rounded-full border border-white/15 bg-white/[0.04] px-5 py-2.5 text-xs font-semibold text-ash hover:bg-white/10 hover:text-moonlight transition disabled:opacity-50"
              >
                Hold in Crypt
              </button>

              <button
                type="button"
                onClick={handleIgniteAndRelease}
                disabled={isIgnited}
                className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 px-7 py-3 text-xs font-bold uppercase tracking-wider text-[#050811] shadow-[0_0_25px_rgba(251,191,36,0.4)] hover:scale-105 active:scale-95 transition-all disabled:opacity-70"
              >
                <Sparkles size={16} className="transition-transform group-hover:rotate-12" />
                <span>{isIgnited ? 'Ascending to the Stars...' : 'Ignite & Release Lantern'}</span>
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={onCancel}
              className="flex items-center gap-2 rounded-full bg-revival px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-[#050811] shadow-lg shadow-revival/20 hover:scale-105 transition"
            >
              <span>Return to Sanctum</span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
