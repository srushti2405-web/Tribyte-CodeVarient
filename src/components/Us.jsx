import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Sparkles,
  Feather,
  Flame,
  Ghost,
} from "lucide-react";
import graveyardRefImg from "../assets/graveyard-reference.jpg";
import mascotImg from "../assets/mascot-grim.png";

const GRAVEYARD_MONUMENTS = [
  {
    id: "mon-1",
    title: "ShadowCast",
    epitaph: "Ephemeral Audio Rooms that self-destructed at dawn.",
    year: "Anno MMXXVI",
    spark: "Peer-to-peer WebRTC mesh voice rooms",
    status: "Resting in Peace",
    color: "border-emerald-500/60 bg-emerald-950/40 text-emerald-300",
  },
  {
    id: "mon-2",
    title: "PhantomGrid",
    epitaph: "Procedural 2D labyrinth dungeon engine in WebGL.",
    year: "Anno MMXXV",
    spark: "A* cellular pathfinding & 16-bit masonry",
    status: "Resting in Peace",
    color: "border-sky-500/60 bg-sky-950/40 text-sky-300",
  },
  {
    id: "mon-3",
    title: "MoonlightJournal",
    epitaph: "Night-mode ambient audio notes and dream cartography.",
    year: "Anno MMXXV",
    spark: "Whisper speech-to-text subconscious mapper",
    status: "Reimagined Ember",
    color: "border-indigo-500/60 bg-indigo-950/40 text-indigo-300",
  },
  {
    id: "mon-4",
    title: "CryptKeeper",
    epitaph: "Cataloger of dormant repositories and digital memorials.",
    year: "Anno MMXXVI",
    spark: "GitHub GraphQL client & terminal epigraphs",
    status: "Resumed in Tools",
    color: "border-amber-500/60 bg-amber-950/40 text-amber-300",
  },
];

export function Us() {
  const navigate = useNavigate();
  const [activeMonument, setActiveMonument] = useState(GRAVEYARD_MONUMENTS[0]);
  const [stageTilt, setStageTilt] = useState({ rotX: 0, rotY: 0 });
  const [isOverGate, setIsOverGate] = useState(false);
  const stageRef = useRef(null);

  const handleStagePointerMove = (e) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setStageTilt({
      rotX: -ny * 4,
      rotY: nx * 6,
    });
  };

  const handleStagePointerLeave = () => {
    setStageTilt({ rotX: 0, rotY: 0 });
  };

  return (
    <div className="relative min-h-dvh w-full bg-[#070d18] text-slate-100 flex flex-col justify-between overflow-x-hidden select-none p-[0.75rem] sm:p-[1.25rem] md:p-[1.75rem]">
      {/* ===================================================================
          1. FULLSCREEN AMBIENT BACKGROUND
          =================================================================== */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <video
          src="/background-sparks.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover filter blur-[0.35rem] brightness-[0.35] opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b172a]/85 via-[#060c16]/90 to-[#02050b]/95" />
      </div>

      {/* ===================================================================
          2. HEADER BAR (Navigation back to Cabinet / Archive)
          =================================================================== */}
      <header className="relative z-20 flex items-center justify-between pb-[1rem] border-b border-sky-900/40">
        <button
          type="button"
          onClick={() => navigate("/cabinet")}
          className="flex items-center gap-[0.5rem] px-[1.15rem] py-[0.45rem] rounded-full border border-sky-600/50 bg-[#091830]/85 text-sky-200 hover:text-white hover:border-amber-400 transition-all cursor-pointer shadow-lg backdrop-blur-md text-[0.75rem] font-cinzel uppercase tracking-wider"
        >
          <ArrowLeft className="w-[0.9rem] h-[0.9rem]" />
          <span>Return to Cabinet</span>
        </button>

        <div className="text-right">
          <span className="font-cinzel text-[0.65rem] uppercase tracking-[0.25em] text-[#d69a62] font-bold block">
            The Keepers of the Folio
          </span>
          <span className="font-snell text-[1.15rem] text-sky-300 italic">
            "We who honor the uncompleted."
          </span>
        </div>
      </header>

      {/* ===================================================================
          3. MAIN SANCTUARY CONTENT: THE STORY OF "US"
          =================================================================== */}
      <main className="relative z-10 flex-1 w-full max-w-[65rem] mx-auto my-[1.5rem] space-y-[2rem]">
        
        {/* HERO TITLE: THE PROJECT GRAVEYARD */}
        <div className="text-center space-y-[0.5rem]">
          <div className="inline-flex items-center gap-[0.5rem] px-[1rem] py-[0.35rem] rounded-full bg-amber-950/60 border border-amber-500/40 text-amber-300 text-[0.7rem] font-cinzel uppercase tracking-widest font-bold">
            <Sparkles className="w-[0.8rem] h-[0.8rem] text-amber-400" />
            Project Graveyard
          </div>
          <h1 className="font-cinzel text-[2.5rem] sm:text-[3.5rem] md:text-[4rem] font-black text-white tracking-wide leading-none drop-shadow-2xl">
            THE PROJECT GRAVEYARD
          </h1>
          <p className="font-snell text-[1.4rem] sm:text-[1.7rem] text-amber-200 italic max-w-[44rem] mx-auto leading-snug">
            "Here rest the monuments of your creative endeavors. Beyond lies the sacred sky to either revive them or let them go."
          </p>
        </div>

        {/* ===================================================================
            THE MANIFESTO & WHY WE BUILT THIS
            =================================================================== */}
        <section className="p-[1.25rem] sm:p-[1.75rem] rounded-3xl border border-sky-800/50 bg-[#07162d]/85 shadow-2xl backdrop-blur-md space-y-[1.25rem]">
          <div className="flex items-center gap-[0.6rem] text-sky-300 font-cinzel text-[0.8rem] uppercase tracking-widest font-bold">
            <Feather className="w-[1rem] h-[1rem] text-amber-400" />
            <span>The Origin of the Sanctuary</span>
          </div>

          <div className="space-y-[1rem] text-[0.85rem] sm:text-[0.95rem] text-slate-200 leading-relaxed font-body">
            <p>
              We built <strong className="text-white font-cinzel">ProjectGrim</strong> because the digital world treats unfinished projects as embarrassments. In developer culture, dormant repositories are swept under rugs, half-composed symphonies gather digital dust, and dream cartography notebooks end up in forgotten drawers.
            </p>
            <p className="font-cormorant italic text-[1.1rem] text-amber-100/95 border-l-2 border-[#d69a62] pl-[1rem]">
              "Yet it is often our abandoned ideas that hold our most daring, unfiltered creative honesty — the moments where we dared to build without corporate constraints or commercial fear."
            </p>
            <p>
              ProjectGrim is not a graveyard of mourning; it is a sacred conservatory. Here, you hang your polaroid relics along warm fairy lights, inspect their sparks in the Vision Board, store modular discoveries in the Curiosity Cabinet with Professor Grim, and grant each creation one of the Five Destinies.
            </p>
          </div>
        </section>

        {/* ===================================================================
            THE FIVE SACRED DESTINIES
            =================================================================== */}
        <section className="space-y-[1rem]">
          <h2 className="font-cinzel text-[1.1rem] uppercase tracking-[0.2em] text-amber-300 font-bold text-center">
            The Five Destinies of Creative Work
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-[0.85rem]">
            {/* 1. Revive */}
            <div className="p-[1rem] rounded-2xl border border-emerald-500/40 bg-emerald-950/30 text-center flex flex-col justify-between">
              <span className="font-cinzel text-[0.8rem] font-bold text-emerald-300 uppercase block mb-[0.25rem]">
                I. Revive
              </span>
              <p className="text-[0.72rem] text-slate-300 italic">
                When the world has caught up and the ember still pulses with heat.
              </p>
            </div>

            {/* 2. Continue */}
            <div className="p-[1rem] rounded-2xl border border-sky-500/40 bg-sky-950/30 text-center flex flex-col justify-between">
              <span className="font-cinzel text-[0.8rem] font-bold text-sky-300 uppercase block mb-[0.25rem]">
                II. Continue
              </span>
              <p className="text-[0.72rem] text-slate-300 italic">
                When courage returns and the tools lie exactly where you laid them.
              </p>
            </div>

            {/* 3. Reimagine */}
            <div className="p-[1rem] rounded-2xl border border-indigo-500/40 bg-indigo-950/30 text-center flex flex-col justify-between">
              <span className="font-cinzel text-[0.8rem] font-bold text-indigo-300 uppercase block mb-[0.25rem]">
                III. Reimagine
              </span>
              <p className="text-[0.72rem] text-slate-300 italic">
                When the thesis was sound, but the vessel must be completely recast.
              </p>
            </div>

            {/* 4. Repurpose */}
            <div className="p-[1rem] rounded-2xl border border-amber-500/40 bg-amber-950/30 text-center flex flex-col justify-between">
              <span className="font-cinzel text-[0.8rem] font-bold text-amber-300 uppercase block mb-[0.25rem]">
                IV. Repurpose
              </span>
              <p className="text-[0.72rem] text-slate-300 italic">
                When the whole must fall, but the components are priceless gems.
              </p>
            </div>

            {/* 5. Let Go */}
            <div className="p-[1rem] rounded-2xl border border-blue-400/40 bg-blue-950/30 text-center flex flex-col justify-between">
              <span className="font-cinzel text-[0.8rem] font-bold text-blue-200 uppercase block mb-[0.25rem]">
                V. Rest in Peace
              </span>
              <p className="text-[0.72rem] text-slate-300 italic">
                When the lesson has been absorbed, and peace is the true completion.
              </p>
            </div>
          </div>
        </section>

        {/* ===================================================================
            THE 2D-3D MIXED GRAVEYARD SCENE (CAMPUS OF COMMEMORATION)
            =================================================================== */}
        <section className="space-y-[1rem]">
          <div className="text-center space-y-[0.35rem]">
            <div className="inline-flex items-center gap-[0.45rem] px-[0.85rem] py-[0.25rem] rounded-full bg-slate-900/80 border border-[#d69a62]/40 text-[#d69a62] text-[0.68rem] font-cinzel uppercase tracking-widest font-bold">
              <Ghost className="w-[0.8rem] h-[0.8rem]" />
              2D-3D Mixed Sanctuary Scene
            </div>
            <h2 className="font-cinzel text-[1.4rem] sm:text-[1.8rem] font-black text-white tracking-wide">
              THE GRAVEYARD OF INCEPTION
            </h2>
            <p className="font-snell text-[1.15rem] sm:text-[1.35rem] text-amber-200/90 italic">
              "Touch any resting monument to commune with its dormant spark."
            </p>
          </div>

          {/* 3D Perspective Stage Container */}
          <div
            ref={stageRef}
            onPointerMove={handleStagePointerMove}
            onPointerLeave={handleStagePointerLeave}
            className="relative w-full rounded-3xl overflow-hidden border-2 border-[#d69a62]/50 shadow-[0_2rem_5rem_rgba(0,0,0,0.95)] bg-black"
            style={{
              perspective: "50rem",
              transformStyle: "preserve-3d",
            }}
          >
            {/* Layer 1: Painted 2D Gothic Castle Background (graveyard-reference.jpg) */}
            <div className="relative w-full h-[22rem] sm:h-[26rem] md:h-[30rem] overflow-hidden">
              <img
                src={graveyardRefImg}
                alt="Graveyard Gothic Landscape"
                className="w-full h-full object-cover filter brightness-[0.75] contrast-[1.1] transform scale-105 transition-transform duration-700"
              />
              {/* Atmospheric Deep Night Fog Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050b16] via-[#050b16]/50 to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#050b16]/30 to-[#020610]/80 pointer-events-none" />

              {/* Layer 2: 3D Tilting Stage with Tombstones and Grim Caretaker */}
              <div
                className="absolute inset-0 flex flex-col justify-end p-[1rem] sm:p-[1.5rem] transition-transform duration-200 ease-out pointer-events-none"
                style={{
                  transform: `perspective(50rem) rotateX(${stageTilt.rotX}deg) rotateY(${stageTilt.rotY}deg)`,
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Chibi Grim Caretaker Floating in 3D Perspective */}
                <div
                  className="absolute top-[2.5rem] right-[2rem] sm:right-[4rem] pointer-events-none z-30 animate-grim"
                  style={{ transform: "translateZ(3.5rem)" }}
                >
                  <div className="relative flex flex-col items-center">
                    <img
                      src={mascotImg}
                      alt="Mascot Grim"
                      className="w-[4.2rem] h-[4.2rem] object-contain drop-shadow-[0_0_1.25rem_#fbbf24]"
                    />
                    <div className="mt-[-0.25rem] w-[0.85rem] h-[1.1rem] rounded-sm bg-amber-300 shadow-[0_0_1.2rem_#f59e0b] border border-amber-100 animate-[subtleLanternPulse_3s_ease-in-out_infinite]" />
                    <span className="mt-[0.25rem] font-snell text-[0.85rem] text-amber-200 font-bold drop-shadow">
                      Grim
                    </span>
                  </div>
                </div>

                {/* The 4 3D Stone Tombstones */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-[0.75rem] sm:gap-[1rem] w-full z-20 pointer-events-auto">
                  {GRAVEYARD_MONUMENTS.map((mon, idx) => {
                    const isSelected = activeMonument.id === mon.id;
                    const zDepth = isSelected ? "3rem" : `${(idx % 2) * 0.75 + 0.5}rem`;

                    return (
                      <div
                        key={mon.id}
                        onClick={() => setActiveMonument(mon)}
                        className={`group relative flex flex-col items-center cursor-pointer transition-all duration-300 ${
                          isSelected ? "scale-105" : "hover:scale-102"
                        }`}
                        style={{
                          transform: `translateZ(${zDepth})`,
                          transformStyle: "preserve-3d",
                        }}
                      >
                        {/* Jack-o'-lantern candlelight on base */}
                        <div
                          className={`w-[0.6rem] h-[0.6rem] rounded-full mb-[0.25rem] transition-all ${
                            isSelected
                              ? "bg-amber-400 shadow-[0_0_1rem_#fbbf24]"
                              : "bg-amber-600/60 group-hover:bg-amber-400"
                          }`}
                        />

                        {/* Arched Celtic Stone Tombstone */}
                        <div
                          className={`w-full p-[0.75rem] rounded-t-3xl rounded-b-lg border-2 backdrop-blur-md transition-all text-center flex flex-col justify-between shadow-2xl ${
                            isSelected
                              ? "border-amber-400 bg-[#162032]/95 shadow-[0_0_2rem_rgba(251,191,36,0.35)]"
                              : "border-slate-600/70 bg-[#0d1624]/85 hover:border-amber-300/60"
                          }`}
                        >
                          {/* Carved Cross Inscription */}
                          <div className="flex justify-center pb-[0.25rem] text-amber-300/80">
                            <span className="font-cinzel text-[0.85rem] font-bold">☩</span>
                          </div>

                          <h3 className="font-cinzel text-[0.95rem] sm:text-[1.1rem] font-black text-white leading-tight">
                            {mon.title}
                          </h3>
                          <span className="font-mono text-[0.55rem] text-sky-300/80 uppercase tracking-widest mt-[0.15rem]">
                            {mon.year}
                          </span>

                          <div className="mt-[0.5rem] pt-[0.35rem] border-t border-slate-700/60 text-[0.65rem] text-slate-300 line-clamp-2 italic">
                            "{mon.epitaph}"
                          </div>

                          <span
                            className={`mt-[0.35rem] text-[0.55rem] font-bold uppercase tracking-wider px-[0.35rem] py-[0.1rem] rounded-full border ${mon.color}`}
                          >
                            {mon.status}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Commemoration Inscription Tablet for Selected Tombstone */}
            <div className="p-[1rem] sm:p-[1.25rem] bg-[#070e1c] border-t-2 border-[#d69a62]/40 flex flex-col md:flex-row items-center justify-between gap-[1rem]">
              <div className="space-y-[0.25rem] text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-[0.5rem]">
                  <Flame className="w-[0.9rem] h-[0.9rem] text-amber-400 animate-pulse" />
                  <span className="font-cinzel text-[0.7rem] uppercase tracking-widest text-[#d69a62] font-bold">
                    Engraved Epitaph · {activeMonument.title}
                  </span>
                </div>
                <p className="font-snell text-[1.25rem] sm:text-[1.45rem] text-amber-100 font-bold italic leading-snug">
                  "{activeMonument.epitaph}"
                </p>
                <p className="text-[0.75rem] text-slate-300">
                  <strong className="text-sky-300 font-cinzel text-[0.7rem] uppercase">Initial Spark: </strong>
                  {activeMonument.spark}
                </p>
              </div>

              <div className="flex items-center gap-[0.5rem] shrink-0">
                <button
                  type="button"
                  onClick={() => navigate("/archive")}
                  className="px-[1rem] py-[0.4rem] rounded-full bg-sky-950/70 border border-sky-500/60 text-sky-200 hover:text-white hover:border-amber-300 transition text-[0.72rem] font-cinzel uppercase tracking-wider cursor-pointer shadow-md"
                >
                  View in Archive ⟶
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            THE CELESTIAL SKY LANTERN ASCENSION GATEWAY (Revive or Let Go)
            =================================================================== */}
        <section className="p-[1.25rem] sm:p-[1.5rem] rounded-3xl border-2 border-rose-500/50 bg-gradient-to-r from-[#1f090d]/90 via-[#2d0e14]/85 to-[#160609]/90 shadow-[0_0_3rem_rgba(244,63,94,0.3)] flex flex-col md:flex-row items-center justify-between gap-[1.25rem]">
          <div className="space-y-[0.35rem] text-center md:text-left">
            <div className="inline-flex items-center gap-[0.4rem] px-[0.75rem] py-[0.2rem] rounded-full bg-rose-950/80 border border-rose-500/40 text-rose-300 text-[0.65rem] font-cinzel uppercase tracking-widest font-bold">
              <Flame className="w-[0.75rem] h-[0.75rem] text-rose-400 animate-pulse" />
              Final Sanctuary Choice
            </div>
            <h3 className="font-cinzel text-[1.4rem] font-black text-white">
              Ascend to Sky Lanterns: Revive or Let Go
            </h3>
            <p className="font-cormorant italic text-[0.95rem] text-slate-300">
              Beyond the Graveyard lies the living sky of A Thousand Lights. Here, choose each project's destiny: rekindle its flame in the Revive Basket, or release it forever into the stars.
            </p>
          </div>

          {/* ACTION ZONE: DRAG SPIRIT EMBER INTO CELESTIAL GATE */}
          <div className="flex flex-col sm:flex-row items-center gap-[0.75rem] shrink-0">
            <div
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData("text/action", "enter-lanterns");
                e.dataTransfer.effectAllowed = "move";
              }}
              className="px-[0.95rem] py-[0.45rem] rounded-full bg-gradient-to-r from-rose-600 to-amber-600 text-stone-950 font-cinzel text-[0.7rem] font-black uppercase tracking-wider shadow-[0_0_1.5rem_#f43f5e] cursor-grab active:cursor-grabbing hover:scale-105 transition-transform flex items-center gap-[0.35rem] select-none"
              title="Drag this Spirit Ember into the Celestial Gate to enter Sky Lanterns"
            >
              <Flame className="w-[0.85rem] h-[0.85rem] fill-current" />
              <span>Drag Spirit Ember</span>
            </div>

            <div
              onDragOver={(e) => {
                e.preventDefault();
                e.dataTransfer.dropEffect = "move";
                if (!isOverGate) setIsOverGate(true);
              }}
              onDragLeave={() => setIsOverGate(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsOverGate(false);
                navigate("/lantern");
              }}
              className={`px-[1.1rem] py-[0.45rem] rounded-full border-2 border-dashed transition-all duration-300 font-cinzel text-[0.7rem] font-bold uppercase tracking-wider flex items-center gap-[0.4rem] select-none ${
                isOverGate
                  ? "border-amber-300 bg-amber-400 text-stone-950 scale-105 shadow-[0_0_2rem_#fbbf24]"
                  : "border-rose-400/60 bg-rose-950/60 text-rose-200"
              }`}
            >
              <span>➔ Drop on Gate to Ascend</span>
            </div>
          </div>
        </section>

      </main>

      {/* ===================================================================
          4. FOOTER CUE
          =================================================================== */}
      <footer className="relative z-20 pt-[0.75rem] border-t border-sky-900/30 flex items-center justify-between text-[0.7rem] text-slate-400">
        <span className="font-cinzel uppercase tracking-widest text-sky-300/70">
          PROJECTGRIM · LIBER RELIQUIARUM
        </span>
        <span className="font-snell text-[1rem] text-[#d69a62] italic">
          "Memoriae aeternae operum inceptorum."
        </span>
      </footer>
    </div>
  );
}

export default Us;
