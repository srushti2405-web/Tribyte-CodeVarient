export default function GraveyardFallback() {
  return (
    <div
      className="fixed inset-0 pointer-events-none -z-10 overflow-hidden bg-[#03060c]"
      aria-hidden="true"
    >
      {/* Background radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(147,197,253,0.18)_0%,rgba(15,23,42,0.6)_45%,#03060c_85%)]" />

      {/* CSS Moon */}
      <div className="absolute top-[12%] right-[16%] h-36 w-36 rounded-full bg-gradient-to-br from-slate-100 to-sky-200 shadow-[0_0_90px_35px_rgba(186,230,253,0.35),0_0_160px_70px_rgba(196,181,253,0.2)] md:h-48 md:w-48" />

      {/* Layered Fog Overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_25%_75%,rgba(167,243,208,0.12)_0%,transparent_60%)] animate-pulse" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_65%,rgba(196,181,253,0.14)_0%,transparent_55%)]" />

      {/* Horizon Fog drift */}
      <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-[#03060c] via-[#070e1b]/80 to-transparent" />

      {/* Silhouettes of Dead Trees & Graves */}
      <svg
        className="absolute bottom-0 w-full text-[#04070e] opacity-85"
        viewBox="0 0 1440 320"
        fill="currentColor"
        preserveAspectRatio="none"
      >
        <path d="M0,288L48,272C96,256,192,224,288,229.3C384,235,480,277,576,272C672,267,768,213,864,208C960,203,1056,245,1152,256C1248,267,1344,245,1392,234.7L1440,224L1440,320L0,320Z" />
      </svg>

      {/* CSS Animated Bats */}
      <div className="bat" style={{ top: '16%' }}>🦇</div>
      <div className="bat bat-two" style={{ top: '24%' }}>🦇</div>
      <div className="bat bat-three" style={{ top: '12%' }}>🦇</div>
    </div>
  )
}
