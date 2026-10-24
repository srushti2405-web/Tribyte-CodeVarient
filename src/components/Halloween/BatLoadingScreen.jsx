import { useState, useEffect } from 'react'
import PumpkinLantern from './PumpkinLantern'
import { Ghost, Sparkles } from 'lucide-react'

export default function BatLoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [isFading, setIsFading] = useState(false)

  useEffect(() => {
    // Smooth progress counter
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setIsFading(true)
            setTimeout(onComplete, 650)
          }, 350)
          return 100
        }
        return prev + 4
      })
    }, 45)

    return () => clearInterval(interval)
  }, [onComplete])

  const handleSkip = () => {
    setIsFading(true)
    setTimeout(onComplete, 400)
  }

  // Generate swarm of bats with staggered delays and trajectories
  const bats = Array.from({ length: 16 }, (_, i) => ({
    id: i,
    top: `${10 + (i * 5.5) % 75}%`,
    duration: `${1.4 + (i * 0.15) % 1.2}s`,
    delay: `${(i * 0.12) % 1.5}s`,
    scale: 0.6 + (i % 5) * 0.22,
    startY: `${(i % 3 - 1) * 35}px`,
  }))

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#03060c] transition-opacity duration-700 select-none overflow-hidden ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin="0"
      aria-valuemax="100"
    >
      {/* Background moon glow */}
      <div className="absolute top-[18%] h-56 w-56 rounded-full bg-gradient-to-br from-slate-100 to-sky-200 shadow-[0_0_120px_50px_rgba(186,230,253,0.35),0_0_200px_90px_rgba(196,181,253,0.2)] opacity-80" />

      {/* Atmospheric Fog Drift */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_75%,rgba(52,211,153,0.12)_0%,transparent_60%)] animate-pulse" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(167,139,250,0.15)_0%,transparent_70%)]" />

      {/* Flying Bat Swarm across the screen */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {bats.map((bat) => (
          <div
            key={bat.id}
            className="absolute left-[-100px] text-3xl md:text-5xl drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] animate-bat-fly"
            style={{
              top: bat.top,
              animationDuration: bat.duration,
              animationDelay: bat.delay,
              transform: `scale(${bat.scale})`,
            }}
          >
            🦇
          </div>
        ))}
      </div>

      {/* Skip Button */}
      <button
        type="button"
        onClick={handleSkip}
        className="absolute top-6 right-6 z-20 rounded-full border border-white/15 bg-white/[0.05] px-4 py-1.5 text-xs font-semibold text-ash hover:border-revival/40 hover:bg-revival/10 hover:text-revival transition-all backdrop-blur-md"
      >
        Skip Transition →
      </button>

      {/* Central Halloween Relic & Loading Information */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        {/* Pumpkin Lantern with Witch Hat */}
        <div className="relative mb-5 transform hover:scale-105 transition-transform duration-300">
          <PumpkinLantern size={110} withWitchHat={true} flicker={true} />
          {/* Subtle glowing ghost floating above */}
          <div className="absolute -top-3 -right-3 animate-bounce">
            <Ghost size={26} className="text-revival drop-shadow-[0_0_12px_#34d399]" />
          </div>
        </div>

        {/* Title */}
        <div className="inline-flex items-center gap-2 rounded-full border border-revival/30 bg-revival/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-revival shadow-[0_0_20px_rgba(52,211,153,0.2)] mb-3">
          <Sparkles size={13} className="animate-spin-slow" />
          <span>The Sanctum Awakens</span>
        </div>

        <h1 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight text-slate-100">
          Project <span className="text-revival">Graveyard</span>
        </h1>

        <p className="mt-2 text-xs md:text-sm text-ash max-w-sm">
          Summoning forgotten ideas, lighting the crypt lanterns, and unlocking the iron gates...
        </p>

        {/* Progress bar container */}
        <div className="mt-7 w-64 md:w-80">
          <div className="relative h-2 w-full overflow-hidden rounded-full border border-white/10 bg-white/[0.05] p-0.5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-revival via-emerald-400 to-ghost transition-all duration-100 shadow-[0_0_15px_#34d399]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-ash/80">
            <span>
              {progress < 40
                ? 'Unlocking Iron Gates...'
                : progress < 80
                ? 'Awakening Caretaker Grimm...'
                : 'The Graveyard Awaits.'}
            </span>
            <span className="text-revival font-bold">{progress}%</span>
          </div>
        </div>
      </div>
    </div>
  )
}
