import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Flame,
  Sparkles,
  ArrowLeft,
  RotateCcw,
  CheckCircle2,
  Feather,
} from "lucide-react";
import { CelestialSkyCanvas } from "./CelestialSkyCanvas";
import mascotImg from "../assets/mascot-grim.png";
import darkNightBg from "../assets/bg-dark-night.jpg";

// Initial sky lanterns drifting in the celestial night (Torii Gate & Blood Moon - A Thousand Lights)
const INITIAL_SKY_LANTERNS = [
  {
    id: "lantern-relic-1",
    projectId: "relic-1",
    projectTitle: "ShadowCast — Ephemeral Audio Rooms",
    note: "A voice sanctuary where rooms self-destructed at dawn. High server costs brought quiet, but its harmonic echo lives forever in the celestial cosmos.",
    x: 22,
    y: 19,
    scale: 1.0,
    delay: 0,
  },
  {
    id: "lantern-relic-2",
    projectId: "relic-2",
    projectTitle: "PhantomGrid — 2D Dungeon Engine",
    note: "A pixel procedural labyrinth engine. Freelance duties stole the hours, yet its stone corridors remain etched in celestial starlight.",
    x: 75,
    y: 17,
    scale: 0.9,
    delay: 1.5,
  },
  {
    id: "lantern-relic-3",
    projectId: "relic-3",
    projectTitle: "MoonlightJournal — Dream Cartography",
    note: "Night-mode ambient audio notes that mapped subconscious murmurings. Now released into the cosmos to whisper among the constellations.",
    x: 48,
    y: 13,
    scale: 1.15,
    delay: 3,
  },
  {
    id: "lantern-relic-4",
    projectId: "relic-4",
    projectTitle: "AuraSynthesizer — Modular Ambient Engine",
    note: "Granular sound generator built for meditation. Paused when Web Audio memory bottlenecks arose, now drifting peacefully in the starlight.",
    x: 34,
    y: 27,
    scale: 0.85,
    delay: 0.8,
  },
  {
    id: "lantern-relic-5",
    projectId: "relic-5",
    projectTitle: "ConstellationMap — Stargazing Ledger",
    note: "An interactive astronomical tracker connecting skywatchers worldwide. Shelved during graduation, its light shines forever.",
    x: 62,
    y: 23,
    scale: 0.95,
    delay: 2.2,
  },
  {
    id: "lantern-relic-6",
    projectId: "relic-6",
    projectTitle: "ChronoGlyph — Time Capsule Journal",
    note: "Encrypted memory capsules meant to open in ten years. Preserved as an indelible spark in the celestial heavens.",
    x: 14,
    y: 15,
    scale: 0.8,
    delay: 1.2,
  },
];

export function LanternSkyPage() {
  const navigate = useNavigate();

  // Projects list for drafting letters
  const [projects, setProjects] = useState(() => {
    try {
      const saved = localStorage.getItem("projectgrim_relics");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Active Letter Draft State
  const [draftProject, setDraftProject] = useState(() => (projects.length > 0 ? projects[0] : null));
  const [letterStage, setLetterStage] = useState(() => (projects.length > 0 ? "written" : "floating"));
  const [isFolding, setIsFolding] = useState(false);
  const [isLighting, setIsLighting] = useState(false);
  const [floatingLanterns, setFloatingLanterns] = useState(INITIAL_SKY_LANTERNS);

  // Inspected lantern for reading handwritten Snell Roundhand memorial note
  const [inspectedLantern, setInspectedLantern] = useState(null);
  const [isOverBasket, setIsOverBasket] = useState(false);
  const [isOverFoldZone, setIsOverFoldZone] = useState(false);
  const [isOverSkyPortal, setIsOverSkyPortal] = useState(false);
  const [toast, setToast] = useState(null);

  // Handle Dragging Project onto Genie Letter
  const handleLetterDrop = (e) => {
    e.preventDefault();
    const projectId = e.dataTransfer.getData("text/plain");
    const proj = projects.find((p) => p.id === projectId);
    if (proj) {
      setDraftProject(proj);
      setLetterStage("written");
      setToast({
        title: proj.title,
        message: "penned onto the Genie Parchment in Snell typography.",
      });
      setTimeout(() => setToast(null), 3000);
    }
  };

  const handleLetterDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  };

  // 3D Origami Letter Fold
  const handleFoldLetter = () => {
    setIsFolding(true);
    setLetterStage("folding");
    setTimeout(() => {
      setIsFolding(false);
      setLetterStage("lantern");
    }, 950);
  };

  // Light the Sky Lantern with Flame & Release into 3D Sky
  const handleLightAndRelease = () => {
    if (!draftProject) return;
    setIsLighting(true);

    setTimeout(() => {
      // Add new floating lantern into the 3D celestial sky
      const newLantern = {
        id: `lantern-${Date.now()}`,
        projectId: draftProject.id,
        projectTitle: draftProject.title,
        note: `"${draftProject.vision}" — Abandoned because: ${draftProject.stopReason}. Released into celestial peace.`,
        x: 35 + Math.random() * 30,
        y: 20 + Math.random() * 15,
        scale: 1.0,
        delay: 0,
      };

      setFloatingLanterns((prev) => [newLantern, ...prev]);
      setLetterStage("released");
      setIsLighting(false);

      setToast({
        title: draftProject.title,
        message: "lit and ascended past the 3D Torii Gate into the celestial sky!",
      });

      // Update project status to 'archive' (Letting it go) via Canvas Protocol
      const updated = projects.map((p) =>
        p.id === draftProject.id
          ? {
              ...p,
              status: "archive",
              history: [
                ...(p.history || []),
                {
                  action: "Released as 3D Sky Lantern (Let Go)",
                  date: new Date().toISOString().split("T")[0],
                  note: "Letter folded and released past Torii gate into celestial starlight.",
                },
              ],
            }
          : p
      );
      setProjects(updated);
      try {
        localStorage.setItem("projectgrim_relics", JSON.stringify(updated));
      } catch (e) { void e; }

      setTimeout(() => {
        setLetterStage("floating");
        setToast(null);
      }, 4000);
    }, 1200);
  };

  // Dragging floating lantern to Revive Basket
  const handleLanternDragStart = (e, lantern) => {
    e.dataTransfer.setData("application/json", JSON.stringify(lantern));
    e.dataTransfer.setData("text/plain", lantern.projectId);
  };

  const handleBasketDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (!isOverBasket) setIsOverBasket(true);
  };

  const handleBasketDragLeave = () => {
    setIsOverBasket(false);
  };

  const handleBasketDrop = (e, targetAction = "revive") => {
    e.preventDefault();
    setIsOverBasket(false);

    let lanternData = null;
    try {
      const raw = e.dataTransfer.getData("application/json");
      if (raw) lanternData = JSON.parse(raw);
    } catch (e) { void e; }

    const projectId = lanternData?.projectId || e.dataTransfer.getData("text/plain");
    if (!projectId) return;

    // Rescue project from celestial sky
    const updated = projects.map((p) => {
      if (p.id !== projectId) return p;
      return {
        ...p,
        status: targetAction,
        history: [
          ...(p.history || []),
          {
            action: `Rescued via Revive Basket (${targetAction.toUpperCase()})`,
            date: new Date().toISOString().split("T")[0],
            note: "Sky lantern caught in basket and rekindled.",
          },
        ],
      };
    });

    setProjects(updated);
    try {
      localStorage.setItem("projectgrim_relics", JSON.stringify(updated));
    } catch (e) { void e; }

    // Remove lantern from sky
    setFloatingLanterns((prev) => prev.filter((l) => l.projectId !== projectId));
    if (inspectedLantern?.projectId === projectId) setInspectedLantern(null);

    setToast({
      title: lanternData?.projectTitle || "Project",
      message: `caught in Revive Basket and restored to ${targetAction.toUpperCase()}!`,
    });
    setTimeout(() => setToast(null), 4000);
  };

  return (
    <div className="relative w-screen h-dvh max-h-dvh bg-[#030611] text-slate-100 flex flex-col justify-between overflow-hidden select-none p-[0.75rem] sm:p-[1rem]">
      {/* ===================================================================
          1. 3D CELESTIAL CANVAS (Drei + Three.js: Torii Gate & Blood Moon)
          Strictly responds to user: "and for celestial use drei and 3 js"
          =================================================================== */}
      <CelestialSkyCanvas
        lanterns={floatingLanterns}
        hoveredLantern={inspectedLantern}
        onLanternSelect={(l) => setInspectedLantern(l)}
        onLanternHover={(l) => setInspectedLantern(l)}
        onLanternLeave={() => {}}
      />

      {/* Subtle Fog Vignette Overlay for Depth */}
      <div className="fixed inset-0 pointer-events-none z-10 bg-radial from-transparent via-[#030712]/30 to-[#02050e]/85" />

      {/* Toast Notification */}
      {toast && (
        <div
          role="status"
          className="fixed top-[1.25rem] right-[1.25rem] z-50 flex items-center gap-[0.75rem] rounded-2xl border border-amber-400/60 bg-[#091526]/95 px-[1.25rem] py-[0.65rem] shadow-2xl backdrop-blur-md animate-in fade-in"
        >
          <CheckCircle2 className="w-[1.2rem] h-[1.2rem] text-amber-400" />
          <div className="text-[0.75rem]">
            <span className="font-bold text-white">{toast.title} </span>
            <span className="text-amber-200">{toast.message}</span>
          </div>
        </div>
      )}

      {/* Atmospheric Unsplash Night Background Layer */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-20 bg-cover bg-center mix-blend-screen"
        style={{ backgroundImage: `url(${darkNightBg})` }}
      />

      {/* ===================================================================
          2. HEADER BAR (Navigation & Title)
          =================================================================== */}
      <header className="relative z-20 flex items-center justify-between pb-[0.5rem] border-b border-rose-950/40">
        <div className="flex items-center gap-[0.75rem]">
          <button
            type="button"
            onClick={() => navigate("/graveyard")}
            className="flex items-center gap-[0.45rem] px-[1rem] py-[0.4rem] rounded-full border border-rose-800/50 bg-[#160608]/85 text-rose-200 hover:text-white hover:border-amber-400 transition-all cursor-pointer shadow-lg backdrop-blur-md text-[0.72rem] font-cinzel uppercase tracking-wider"
          >
            <ArrowLeft className="w-[0.85rem] h-[0.85rem]" />
            <span>The Graveyard</span>
          </button>

          <img
            src={mascotImg}
            alt="Mascot Grim"
            className="w-[2.4rem] h-[2.4rem] object-contain drop-shadow-[0_0_0.75rem_#fbbf24]"
          />

          <div>
            <div className="flex items-center gap-[0.45rem]">
              <span className="w-[0.45rem] h-[0.45rem] rounded-full bg-rose-500 animate-pulse shadow-[0_0_0.5rem_#f43f5e]" />
              <span className="font-cinzel text-[0.65rem] uppercase tracking-[0.25em] text-[#d69a62] font-bold">
                A Thousand Lights · Sky Sanctuary
              </span>
            </div>
            <h1 className="font-cinzel text-[1.4rem] sm:text-[1.8rem] font-black text-white leading-none">
              THE CELESTIAL SANCTUARY
            </h1>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-[0.5rem] text-[0.75rem] text-rose-200/90 bg-[#1e070a]/85 px-[1rem] py-[0.35rem] rounded-full border border-rose-600/40 backdrop-blur-md">
          <span className="font-cormorant italic text-[0.85rem]">
            Hover to zoom lantern · Drag to Revive Basket or Sky Ascent
          </span>
        </div>
      </header>

      {/* ===================================================================
          3. 2D DRAGGABLE LANTERN HANDLES & ZOOM INSPECTION OVERLAY
          (Inspired by A Thousand Lights — hover/enter zooms lantern & displays note)
          =================================================================== */}
      <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
        {floatingLanterns.map((lantern) => {
          const isHovered = inspectedLantern?.id === lantern.id;
          return (
            <div
              key={lantern.id}
              draggable
              onDragStart={(e) => handleLanternDragStart(e, lantern)}
              onMouseEnter={() => setInspectedLantern(lantern)}
              onMouseLeave={() => setInspectedLantern(null)}
              className="absolute pointer-events-auto cursor-grab active:cursor-grabbing transition-all duration-300"
              style={{
                top: `${lantern.y}%`,
                left: `${lantern.x}%`,
                transform: isHovered
                  ? `scale(${lantern.scale * 1.35})`
                  : `scale(${lantern.scale})`,
                zIndex: isHovered ? 40 : 25,
              }}
              title="Hover to zoom eulogy · Drag to Revive Basket"
            >
              <div
                className={`relative flex flex-col items-center transition-all duration-300 ${
                  isHovered
                    ? "drop-shadow-[0_0_2rem_#fbbf24]"
                    : "drop-shadow-[0_0_0.75rem_#d97706]"
                }`}
              >
                {/* 3D Paper Lantern Silhouette */}
                <div
                  className={`relative w-[2.2rem] h-[3.2rem] rounded-t-xl rounded-b-md bg-gradient-to-b from-amber-100 via-amber-400 to-amber-700 border border-amber-200/80 shadow-[0_0_1.5rem_rgba(251,191,36,0.6)] flex flex-col justify-between items-center p-[0.25rem] transition-all duration-300 ${
                    isHovered
                      ? "ring-2 ring-amber-300 scale-110"
                      : "animate-[subtleLanternPulse_3s_ease-in-out_infinite]"
                  }`}
                >
                  <span className="w-[0.8rem] h-[0.12rem] rounded-full bg-amber-950/70" />

                  {/* Glowing Core Flame */}
                  <div className="w-[0.75rem] h-[1.1rem] rounded-full bg-gradient-to-t from-white via-amber-200 to-amber-500 shadow-[0_0_0.8rem_#ffffff] flex items-center justify-center animate-pulse">
                    <span className="w-[0.25rem] h-[0.35rem] rounded-full bg-white" />
                  </div>

                  <span className="w-[1.1rem] h-[0.12rem] rounded-full bg-amber-950/70" />
                </div>

                {/* Floating Project Label on Hover */}
                <span
                  className={`mt-[0.25rem] font-cinzel text-[0.62rem] font-bold uppercase tracking-wider text-amber-100 whitespace-nowrap bg-black/85 px-[0.45rem] py-[0.1rem] rounded-full border border-amber-400/40 shadow-md transition-opacity duration-300 ${
                    isHovered ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {lantern.projectTitle.split(" ")[0]}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Hovered / Inspected Lantern Memorial Note (Auto-opens on Hover, Auto-closes on Leave) */}
      {inspectedLantern && (
        <div
          onMouseEnter={() => {}}
          onMouseLeave={() => setInspectedLantern(null)}
          className="fixed top-[5.5rem] left-[50%] -translate-x-[50%] z-40 max-w-[34rem] w-[92%] p-[1.25rem] rounded-3xl bg-[#faf6ed]/95 text-[#1a2332] shadow-[0_2rem_6rem_rgba(0,0,0,0.95)] border-2 border-amber-500/70 backdrop-blur-md animate-in zoom-in-95 duration-200 pointer-events-auto"
        >
          <div className="flex items-center justify-between pb-[0.35rem] border-b border-stone-300">
            <span className="font-cinzel text-[0.65rem] uppercase tracking-widest text-[#b45309] font-bold flex items-center gap-[0.35rem]">
              <Feather className="w-[0.8rem] h-[0.8rem]" />
              Celestial Memorial Note
            </span>
            <span className="font-mono text-[0.6rem] text-stone-500">
              [Auto-dismiss on mouse leave]
            </span>
          </div>

          <h3 className="mt-[0.5rem] font-cinzel text-[1.1rem] font-black text-stone-900">
            {inspectedLantern.projectTitle}
          </h3>

          <p className="mt-[0.35rem] font-snell text-[1.4rem] sm:text-[1.6rem] text-[#78350f] italic leading-snug">
            "{inspectedLantern.note}"
          </p>

          <div className="mt-[0.65rem] pt-[0.35rem] border-t border-stone-300 flex items-center justify-between text-[0.62rem] text-stone-600 font-mono">
            <span className="text-emerald-800 font-bold">
              DRAG LANTERN TO REVIVE BASKET TO BRING BACK
            </span>
            <span className="text-amber-800 font-bold">
              ✧ Living in A Thousand Lights Sky
            </span>
          </div>
        </div>
      )}

      {/* ===================================================================
          4. MAIN WORKSPACE: GENIE MAT PARCHMENT & REVIVE BASKET
          =================================================================== */}
      <main className="relative z-30 flex-1 flex flex-col lg:flex-row items-center justify-between gap-[1.25rem] w-full max-w-[85rem] mx-auto my-auto py-[0.5rem] overflow-visible">
        
        {/* -----------------------------------------------------------------
            A. RELICS RACK (Drag any project card to write its letter)
            ----------------------------------------------------------------- */}
        <section className="w-full lg:w-[17rem] p-[0.75rem] rounded-2xl border border-rose-900/40 bg-[#0e0406]/85 backdrop-blur-md shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-[0.35rem] border-b border-rose-800/30">
              <span className="font-cinzel text-[0.7rem] uppercase tracking-wider text-rose-300 font-bold">
                Relics to Let Go
              </span>
              <span className="text-[0.6rem] font-mono text-stone-400">
                {projects.length} Available
              </span>
            </div>

            <p className="text-[0.65rem] text-slate-300 mt-[0.35rem] italic">
              Drag any relic onto the Genie Letter to compose its final eulogy:
            </p>

            <div className="mt-[0.6rem] space-y-[0.45rem] max-h-[14rem] overflow-y-auto">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.setData("text/plain", proj.id);
                  }}
                  className={`p-[0.5rem] rounded-xl border transition cursor-grab active:cursor-grabbing ${
                    draftProject?.id === proj.id
                      ? "border-amber-400 bg-amber-950/60 shadow-md"
                      : "border-slate-800/60 bg-[#160608]/70 hover:border-amber-400/60"
                  }`}
                  title="Drag onto Genie Letter to compose memorial scroll"
                >
                  <div className="font-cinzel text-[0.75rem] font-bold text-white truncate">
                    {proj.title}
                  </div>
                  <div className="font-snell text-[0.85rem] text-amber-300 italic truncate">
                    {proj.vision}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-[0.6rem] pt-[0.4rem] border-t border-rose-900/40 text-[0.58rem] font-mono text-rose-300/70 text-center">
            Canvas Protocol: Drag to Mutate
          </div>
        </section>

        {/* -----------------------------------------------------------------
            B. THE GENIE MAT LETTER (Animated 3D undulating wave parchment)
            ----------------------------------------------------------------- */}
        <section
          onDragOver={handleLetterDragOver}
          onDrop={handleLetterDrop}
          className="relative flex-1 w-full max-w-[38rem] flex flex-col items-center justify-center p-[0.5rem]"
          style={{ perspective: "50rem" }}
        >
          {letterStage !== "lantern" && letterStage !== "released" && (
            <div
              className={`relative w-full max-w-[34rem] p-[1.25rem] sm:p-[1.75rem] rounded-3xl bg-[#faf6ed] text-[#1b2533] shadow-[0_2.5rem_6rem_rgba(0,0,0,0.95)] border-2 border-[#d69a62] transition-all duration-700 ${
                isFolding
                  ? "scale-50 rotate-x-[85deg] rotate-y-[75deg] opacity-20"
                  : "animate-[genieMatWave_6s_ease-in-out_infinite]"
              }`}
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              {/* Vintage Parchment Watermark & Header */}
              <div className="flex items-center justify-between pb-[0.5rem] border-b-2 border-stone-300">
                <span className="font-cinzel text-[0.75rem] uppercase tracking-[0.25em] text-[#b45309] font-black">
                  LIBER LETTING GO · MEMORIAL SCROLL
                </span>
                <span className="font-mono text-[0.6rem] text-stone-500">
                  GENIE PARCHMENT
                </span>
              </div>

              {/* Handwritten Content in Snell Roundhand Font Typography */}
              {draftProject ? (
                <div className="my-[1.25rem] space-y-[0.65rem]">
                  <div className="font-cinzel text-[1rem] sm:text-[1.2rem] font-bold text-stone-900">
                    To the Memory of: {draftProject.title}
                  </div>

                  <p className="font-snell text-[1.4rem] sm:text-[1.8rem] text-[#78350f] font-semibold italic leading-snug">
                    "We dreamed that {draftProject.vision}. Though paused because {draftProject.stopReason}, this project leaves a proud spark behind."
                  </p>

                  <div className="p-[0.65rem] rounded-xl bg-amber-100/60 border border-amber-300/50 text-[0.72rem] text-stone-700 font-body">
                    <strong>Work Preserved: </strong>
                    {draftProject.completedWork}
                  </div>
                </div>
              ) : (
                <div className="my-[2.5rem] text-center text-stone-500">
                  <Feather className="w-[2rem] h-[2rem] mx-auto text-amber-600 animate-pulse" />
                  <p className="font-snell text-[1.4rem] text-amber-900 italic mt-[0.5rem]">
                    "Drop any project card here to write its farewell note..."
                  </p>
                </div>
              )}

              {/* Action: 3D Origami Letter Fold (Canvas Protocol Drag & Drop) */}
              <div className="pt-[0.75rem] border-t-2 border-stone-300 flex flex-col sm:flex-row items-center justify-between gap-[0.5rem]">
                <span className="text-[0.65rem] font-mono text-stone-600">
                  ✧ Action Zone: Fold Parchment
                </span>

                <div className="flex items-center gap-[0.5rem]">
                  {/* Draggable Wax Seal */}
                  <div
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.setData("text/action", "fold-parchment");
                      e.dataTransfer.effectAllowed = "move";
                    }}
                    className="px-[0.85rem] py-[0.35rem] rounded-full bg-gradient-to-r from-red-800 to-amber-800 text-amber-100 border border-amber-300 shadow-[0_0_0.75rem_rgba(180,83,9,0.5)] font-cinzel text-[0.68rem] tracking-wider font-bold cursor-grab active:cursor-grabbing flex items-center gap-[0.35rem] select-none hover:scale-105 transition-transform"
                    title="Drag this crimson wax seal into the origami crease zone"
                  >
                    <span>⚜ Drag Wax Seal</span>
                  </div>

                  {/* Origami Crease Drop Zone */}
                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                      e.dataTransfer.dropEffect = "move";
                      if (!isOverFoldZone) setIsOverFoldZone(true);
                    }}
                    onDragLeave={() => setIsOverFoldZone(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setIsOverFoldZone(false);
                      handleFoldLetter();
                    }}
                    className={`px-[0.85rem] py-[0.35rem] rounded-full border-2 border-dashed transition-all duration-200 text-[0.65rem] font-cinzel tracking-wider uppercase font-bold flex items-center gap-[0.35rem] ${
                      isOverFoldZone
                        ? "border-amber-600 bg-amber-400 text-amber-950 scale-105 shadow-[0_0_1rem_#f59e0b]"
                        : "border-stone-400/80 bg-stone-200/60 text-stone-700"
                    }`}
                  >
                    <span>➔ Drop on Crease to Fold</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Lantern Preparation Stage (Letter folded inside paper lantern) */}
          {(letterStage === "lantern" || isLighting) && (
            <div className="flex flex-col items-center gap-[1rem] p-[1.5rem] rounded-3xl bg-[#140508]/90 border-2 border-amber-400 shadow-2xl backdrop-blur-md animate-in zoom-in-95">
              <div
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData("text/action", "release-lantern");
                  e.dataTransfer.setData("application/json", JSON.stringify(draftProject));
                  e.dataTransfer.effectAllowed = "move";
                }}
                className="relative w-[6rem] h-[8.5rem] rounded-t-2xl rounded-b-md bg-gradient-to-b from-amber-200 via-amber-400 to-amber-700 p-[0.5rem] shadow-[0_0_3rem_#f59e0b] border-2 border-amber-100 flex flex-col justify-between items-center cursor-grab active:cursor-grabbing hover:scale-105 transition-transform"
                title="Drag lantern into the Celestial Ascent Action Zone below"
              >
                <span className="font-cinzel text-[0.6rem] font-black uppercase text-amber-950">
                  Sky Lantern
                </span>

                <div
                  className={`w-[1.75rem] h-[2.5rem] rounded-full transition-all duration-500 flex items-center justify-center ${
                    isLighting
                      ? "bg-gradient-to-t from-white via-amber-200 to-amber-500 shadow-[0_0_2rem_#ffffff] scale-125"
                      : "bg-amber-950/60"
                  }`}
                >
                  <Flame className="w-[1.25rem] h-[1.25rem] text-amber-500 animate-pulse" />
                </div>

                <span className="font-snell text-[0.75rem] text-amber-950 font-bold truncate max-w-[5rem]">
                  {draftProject?.title}
                </span>
              </div>

              <div className="text-center">
                <h3 className="font-cinzel text-[1.1rem] font-bold text-white">
                  {draftProject?.title}
                </h3>
                <p className="font-snell text-[1.1rem] text-amber-200 italic">
                  Letter folded safely inside lantern chamber.
                </p>
              </div>

              {/* ACTION ZONE: CELESTIAL SKY RELEASE PORTAL */}
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  e.dataTransfer.dropEffect = "move";
                  if (!isOverSkyPortal) setIsOverSkyPortal(true);
                }}
                onDragLeave={() => setIsOverSkyPortal(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsOverSkyPortal(false);
                  handleLightAndRelease();
                }}
                className={`w-full max-w-[22rem] p-[0.75rem] rounded-2xl border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center gap-[0.35rem] text-center select-none ${
                  isOverSkyPortal
                    ? "border-amber-300 bg-amber-400/40 text-white scale-105 shadow-[0_0_2.5rem_#f59e0b]"
                    : "border-amber-400/60 bg-amber-950/40 text-amber-200"
                }`}
              >
                <div className="flex items-center gap-[0.4rem]">
                  <Flame className="w-[1.1rem] h-[1.1rem] text-amber-400 animate-pulse" />
                  <span className="font-cinzel text-[0.72rem] font-black uppercase tracking-wider">
                    Action Zone: Celestial Ascent
                  </span>
                </div>
                <p className="font-snell text-[1rem] text-amber-100 italic">
                  "Drag Lantern here to ignite sacred flame & release to 3D heavens"
                </p>
              </div>
            </div>
          )}
        </section>

        {/* -----------------------------------------------------------------
            C. THE REVIVE BASKET (Drop floating lanterns here to continue/restart)
            ----------------------------------------------------------------- */}
        <section
          onDragOver={handleBasketDragOver}
          onDragLeave={handleBasketDragLeave}
          onDrop={(e) => handleBasketDrop(e, "revive")}
          className={`w-full lg:w-[18rem] p-[1rem] rounded-3xl border-2 transition-all duration-300 flex flex-col justify-between text-center select-none backdrop-blur-md ${
            isOverBasket
              ? "border-emerald-400 bg-emerald-950/90 scale-105 shadow-[0_0_3rem_rgba(16,185,129,0.7)]"
              : "border-sky-500/50 bg-[#071322]/85 shadow-2xl"
          }`}
        >
          <div>
            {/* Woven Celestial Ropes Header */}
            <div className="w-[0.125rem] h-[2rem] mx-auto bg-gradient-to-b from-sky-400 to-amber-300" />

            <div className="inline-flex items-center gap-[0.4rem] px-[0.75rem] py-[0.25rem] rounded-full bg-emerald-950/80 border border-emerald-400/50 text-emerald-300 text-[0.65rem] font-cinzel uppercase tracking-widest font-bold mb-[0.5rem]">
              <RotateCcw className="w-[0.75rem] h-[0.75rem]" />
              Sacred Sanctuary
            </div>

            <h2 className="font-cinzel text-[1.2rem] font-black text-white">
              THE REVIVE BASKET
            </h2>

            <p className="font-cormorant italic text-[0.85rem] text-slate-300 mt-[0.35rem] leading-relaxed">
              Changed your mind? Drag any drifting sky lantern into this wicker basket to rekindle its flame and grant it a second life.
            </p>
          </div>

          {/* Glowing Wicker Basket Visual */}
          <div className="my-[1rem] p-[1.25rem] rounded-2xl bg-gradient-to-b from-[#1c2c40] via-[#0f1d2e] to-[#08121f] border-2 border-emerald-400/40 shadow-inner flex flex-col items-center justify-center">
            <div className="w-[3.5rem] h-[3.5rem] rounded-full border-2 border-emerald-300/80 border-dashed flex items-center justify-center animate-[spin_12s_linear_infinite]">
              <Sparkles className="w-[1.6rem] h-[1.6rem] text-emerald-400" />
            </div>
            <span className="font-snell text-[1.1rem] text-emerald-200 italic mt-[0.5rem]">
              "No idea is truly lost."
            </span>
          </div>

          <div className="text-[0.6rem] font-mono text-emerald-300/80 uppercase">
            Drop Lantern to Revive / Restart
          </div>
        </section>

      </main>

      {/* Footer Navigation Back to Sanctuary */}
      <footer className="relative z-30 pt-[0.5rem] border-t border-rose-950/40 flex items-center justify-between text-[0.7rem] text-slate-400">
        <span className="font-cinzel uppercase tracking-widest text-rose-300/70">
          PROJECTGRIM · DREI CELESTIAL SANCTUARY
        </span>
        <button
          type="button"
          onClick={() => navigate("/graveyard")}
          className="flex items-center gap-[0.3rem] text-[#d69a62] hover:text-white font-cinzel uppercase tracking-wider text-[0.7rem] cursor-pointer"
        >
          <span>The Project Graveyard</span>
          <ArrowLeft className="w-[0.8rem] h-[0.8rem] rotate-180" />
        </button>
      </footer>
    </div>
  );
}

export default LanternSkyPage;
