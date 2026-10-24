import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, FastForward } from "lucide-react";
import { ThreePageCurl } from "./ThreePageCurl";
import { HalloweenHouseCanvas } from "./HalloweenHouseCanvas";
import mascotImg from "../assets/mascot-grim.png";
import mistyForestBg from "../assets/bg-misty-forest.jpg";

export function OpeningSceneHero() {
  const navigate = useNavigate();

  // Reduced motion preference determined on initial state
  const [prefersReducedMotion] = useState(() => {
    if (typeof window !== "undefined" && window.matchMedia) {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    return false;
  });

  // Intro Stages: 'bats' -> 'greeting' -> 'docked'
  const [introStage, setIntroStage] = useState(() => (prefersReducedMotion ? "docked" : "bats"));
  const [scrollProgress, setScrollProgress] = useState(() => (prefersReducedMotion ? 1 : 0));

  // Sequence: Bats burst (0-1.2s), Grim rises with greeting (1.2s+)
  useEffect(() => {
    if (prefersReducedMotion) return;

    const t1 = setTimeout(() => {
      setIntroStage((prev) => (prev === "bats" ? "greeting" : prev));
    }, 1200);

    return () => clearTimeout(t1);
  }, [prefersReducedMotion]);

  // Skip Intro Handler
  const handleSkipIntro = useCallback(() => {
    setIntroStage("docked");
    setScrollProgress(1);
  }, []);

  // Continue Button Handler
  const handleContinue = useCallback(() => {
    setIntroStage("docked");
    setScrollProgress(1);
  }, []);

  // Scroll Tracker for Grim's Zig-Zag Physics
  useEffect(() => {
    const handleWheel = (e) => {
      setScrollProgress((prev) => {
        const next = Math.max(0, Math.min(1, prev + (e.deltaY > 0 ? 0.2 : -0.2)));
        if (next > 0.25 && introStage !== "docked") {
          setIntroStage("docked");
        }
        return next;
      });
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [introStage]);

  // Zig-Zag Grim Coordinates across sections
  // In greeting: Grim is centered at bottom.
  // In docked: Grim settles cleanly between the left & right sections, leaning with scroll.
  const isGreeting = introStage === "greeting";
  const isDocked = introStage === "docked";

  const zigZagX = isDocked
    ? Math.sin(scrollProgress * Math.PI * 3.5) * 5.5 // rem
    : 0;
  const grimY = isDocked
    ? scrollProgress * 11 // rem
    : isGreeting
    ? 0
    : -18; // rem (below screen during bats)
  const grimRot = isDocked
    ? Math.cos(scrollProgress * Math.PI * 3.5) * 12 // deg
    : 0;

  return (
    <div className="relative w-screen h-dvh max-h-dvh bg-[#070b14] text-slate-100 flex flex-col justify-between overflow-hidden select-none p-[0.75rem] sm:p-[1rem]">
      
      {/* ===================================================================
          ATMOSPHERIC UNSPLASH BACKGROUND LAYER (Subtle misty forest)
          =================================================================== */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20 bg-cover bg-center mix-blend-screen"
        style={{ backgroundImage: `url(${mistyForestBg})` }}
      />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#070b14] via-transparent to-[#070b14]/70" />

      {/* ===================================================================
          1. SKIP INTRO BUTTON (Always Accessible on Top Right)
          =================================================================== */}
      {introStage !== "docked" && (
        <button
          type="button"
          onClick={handleSkipIntro}
          className="fixed top-[1rem] right-[1rem] z-50 flex items-center gap-[0.4rem] px-[0.85rem] py-[0.35rem] rounded-full bg-[#10192a]/85 border border-amber-400/50 text-amber-200 hover:text-white hover:border-amber-300 transition text-[0.7rem] font-cinzel uppercase tracking-wider backdrop-blur-md shadow-lg cursor-pointer"
        >
          <span>Skip Intro</span>
          <FastForward className="w-[0.75rem] h-[0.75rem]" />
        </button>
      )}

      {/* ===================================================================
          2. 3D BATS OPENING BURST (Flying Out from Screen toward Camera)
          =================================================================== */}
      {introStage === "bats" && !prefersReducedMotion && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {[...Array(14)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-[batFlyTowardCamera_3s_cubic-bezier(0.16,1,0.3,1)_forwards]"
              style={{
                top: `${42 + (i % 4) * 6}%`,
                left: `${46 + ((i * 7) % 15) - 7}%`,
                animationDelay: `${i * 0.18}s`,
              }}
            >
              {/* Detailed Vector Silhouette Bat */}
              <svg
                className="w-[2.75rem] h-[2rem] text-slate-900 drop-shadow-[0_0.2rem_0.5rem_rgba(0,0,0,0.95)]"
                viewBox="0 0 64 40"
                fill="currentColor"
              >
                <path d="M 32 18 C 30 12, 22 6, 12 8 C 16 16, 8 26, 2 30 C 12 30, 20 26, 26 22 C 28 28, 36 28, 38 22 C 44 26, 52 30, 62 30 C 56 26, 48 16, 52 8 C 42 6, 34 12, 32 18 Z" />
              </svg>
            </div>
          ))}
        </div>
      )}

      {/* ===================================================================
          3. FLOATING MASCOT GRIM WITH ZIG-ZAG NAVIGATION PHYSICS
          Rises from bottom, greets user with Halloween message, zig-zags on scroll
          =================================================================== */}
      <div
        className="fixed z-40 pointer-events-auto transition-all duration-700 ease-out flex flex-col items-center"
        style={{
          left: isDocked ? `calc(50% + ${zigZagX}rem - 3.5rem)` : "calc(50% - 3.5rem)",
          bottom: isDocked ? `calc(1.5rem - ${grimY * 0.25}rem)` : "3.5rem",
          transform: `translateY(${-grimY}rem) rotate(${grimRot}deg)`,
        }}
      >
        {/* Grim Speech Bubble Dialogue */}
        <div className="relative mb-[0.5rem] max-w-[19rem] p-[0.75rem] px-[1rem] rounded-2xl bg-[#091526]/95 border-2 border-amber-400/60 shadow-[0_0.5rem_2rem_rgba(0,0,0,0.9)] backdrop-blur-md text-center animate-in fade-in duration-500">
          <div className="flex items-center justify-center gap-[0.35rem] text-amber-300 font-cinzel text-[0.62rem] uppercase tracking-wider font-bold">
            <Sparkles className="w-[0.75rem] h-[0.75rem]" />
            <span>Mascot Grim</span>
          </div>
          <p className="font-snell text-[1.15rem] sm:text-[1.3rem] text-amber-100 italic leading-snug mt-[0.2rem]">
            {isGreeting
              ? '"Hi! I\'m Grim, caretaker of unfinished projects. Welcome to ProjectGrim!"'
              : isDocked && scrollProgress > 0.35
              ? '"Here are your projects. Scroll or peel the book page to open the archive!"'
              : '"Scroll down to guide me, or flip the page to enter."'}
          </p>

          {/* Scroll Cue */}
          {introStage !== "docked" && (
            <div
              className="mt-[0.65rem] inline-flex items-center gap-[0.4rem] px-[1.15rem] py-[0.35rem] rounded-full bg-amber-950/80 border border-amber-400/50 text-amber-200 font-cinzel text-[0.68rem] tracking-wider pointer-events-none"
            >
              <span>Scroll to Guide Grim ▾</span>
            </div>
          )}

          <div className="absolute -bottom-[0.45rem] left-[50%] -translate-x-[50%] w-[0.8rem] h-[0.45rem] bg-[#091526] border-b-2 border-r-2 border-amber-400/60 rotate-45" />
        </div>

        {/* Real Mascot Grim Avatar (User Artwork) */}
        <div
          onClick={handleContinue}
          className="relative flex flex-col items-center cursor-pointer group"
          title="Grim, Caretaker of Abandoned Projects"
        >
          <div className="relative w-[5.5rem] h-[5.5rem] flex items-center justify-center group-hover:scale-105 transition-transform">
            <img
              src={mascotImg}
              alt="Mascot Grim"
              className="w-full h-full object-contain drop-shadow-[0_0_1.25rem_rgba(251,191,36,0.65)] select-none filter contrast-105"
            />
          </div>

          {/* Swinging Amber Soul Lantern */}
          <div className="mt-[-0.25rem] w-[1rem] h-[1.3rem] rounded-sm bg-gradient-to-b from-amber-200 via-amber-400 to-amber-700 shadow-[0_0_1.2rem_#f59e0b] border border-amber-100 animate-[subtleLanternPulse_2.5s_ease-in-out_infinite]" />
        </div>
      </div>

      {/* ===================================================================
          4. HERO SECTION: FLEX CONTAINER (LEFT DIV: BOOK, RIGHT DIV: HOUSE)
          Left side: Clean, readable text with high contrast, no blocking trees
          Right side: Haunted Victorian mansion with moonlight, trees, tombstones
          =================================================================== */}
      <main className="relative z-10 flex-1 w-full h-full flex flex-col lg:flex-row items-center justify-between gap-[1rem] p-[0.25rem] sm:p-[0.75rem] overflow-hidden">
        
        {/* -----------------------------------------------------------------
            LEFT DIV: INTERACTIVE 3D BOOK FOLIO WITH 3D PAGE TURNING EFFECT
            Clean, uncluttered headline, description, primary action
            ----------------------------------------------------------------- */}
        <section className="relative flex-1 w-full h-full min-h-[22rem] lg:min-h-0 flex flex-col justify-between rounded-3xl border-2 border-[#d69a62]/35 bg-[#091220]/80 backdrop-blur-md shadow-2xl overflow-hidden p-[0.75rem] sm:p-[1rem]">
          {/* Header Annotation */}
          <div className="relative z-20 flex items-center justify-between pb-[0.35rem] border-b border-[#d69a62]/30">
            <div className="flex items-center gap-[0.5rem]">
              <span className="w-[0.5rem] h-[0.5rem] rounded-full bg-[#d69a62] animate-pulse shadow-[0_0_0.5rem_#d69a62]" />
              <span className="font-cinzel text-[0.7rem] uppercase tracking-[0.25em] text-[#d69a62] font-bold">
                Grim's Interactive Folio · Section I
              </span>
            </div>
            <span className="font-snell text-[1rem] text-[#d8d0c4] italic hidden sm:inline">
              "Drag corner or leaf to turn page"
            </span>
          </div>

          {/* 3D WebGL Page Curl Viewport */}
          <div className="relative flex-1 w-full h-full flex items-center justify-center overflow-hidden my-[0.25rem]">
            <ThreePageCurl
              onPageChange={(page) => {
                if (page === 1) {
                  navigate("/archive");
                }
              }}
            />
          </div>

          {/* Folio Turn Guidance */}
          <div className="relative z-20 pt-[0.35rem] border-t border-[#d69a62]/20 flex items-center justify-between text-[0.65rem] text-slate-400">
            <span className="font-cormorant italic text-[0.85rem] text-sky-200/80">
              Peel the leaf to visit the Fairy Lights Archive
            </span>
            <span className="font-snell text-[1rem] text-[#d69a62] italic">
              Drag leaf or dog-ear to turn ➔
            </span>
          </div>
        </section>

        {/* -----------------------------------------------------------------
            RIGHT DIV: HAUNTED HALLOWEEN HOUSE 3D SCENE
            (Haunted mansion, tree on right, R.I.P. tombstone, pumpkins, moonlight)
            ----------------------------------------------------------------- */}
        <section className="relative flex-1 w-full h-full min-h-[22rem] lg:min-h-0 rounded-3xl border-2 border-sky-900/50 bg-[#060c16]/90 backdrop-blur-md shadow-2xl overflow-hidden flex flex-col justify-between">
          <HalloweenHouseCanvas />
        </section>

      </main>

      {/* Subtle Scroll Hint Indicator at Center Bottom */}
      <div className="relative z-20 pb-[0.25rem] flex items-center justify-center gap-[0.5rem] pointer-events-none opacity-80">
        <span className="font-cormorant italic text-[0.85rem] text-slate-300">
          Scroll to guide Grim · Peel page corner to visit the Archive
        </span>
      </div>
    </div>
  );
}

export default OpeningSceneHero;
