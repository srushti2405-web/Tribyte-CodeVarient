import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ArrowLeft,
  Sparkles,
  BookOpen,
  Wrench,
  Layers,
  CheckCircle2,
  RotateCcw,
  Trash2,
  ChevronRight,
} from "lucide-react";
import { PROJECT_VISION_DATA } from "../utils/projectVisionData";
import mascotImg from "../assets/mascot-grim.png";
import darkNightBg from "../assets/bg-dark-night.jpg";

// Initial mini-library storage
const DEFAULT_CABINET_STORAGE = {
  resources: [
    {
      id: "res-1",
      title: "De Re Metallica (1556) Alchemy Treatise",
      type: "Rare Manuscript",
      source: "ShadowCast Relic",
      note: "Vellum parchment containing diagrams of transmutation and early metallurgy.",
    },
    {
      id: "res-2",
      title: "Uranometria 1603 Celestial Atlas",
      type: "Historical Reference",
      source: "MoonlightJournal Relic",
      note: "High-resolution copperplate star charts.",
    },
  ],
  tools: [
    {
      id: "tool-1",
      title: "CRT Phosphor Persistence Shader",
      type: "GLSL Shader",
      source: "ShadowCast Relic",
      note: "WebGL vertex & fragment shader for retro waveforms.",
    },
    {
      id: "tool-2",
      title: "A* Cellular Automata Pathfinder",
      type: "Algorithmic Engine",
      source: "PhantomGrid Relic",
      note: "Procedural labyrinth generator and obstacle solver.",
    },
  ],
  components: [
    {
      id: "comp-1",
      title: "Gothic Masonry 16-Bit Tilemap",
      type: "Sprite Sheet",
      source: "PhantomGrid Relic",
      note: "32x32 modular dungeon tiles with normal maps.",
    },
    {
      id: "comp-2",
      title: "Terminal ANSI Box-Drawing Toolkit",
      type: "UI Component",
      source: "CryptKeeper Relic",
      note: "Command-line ASCII border and epigraph parser.",
    },
  ],
};

// Selectable curiosity objects that can be placed into the cabinet
const PLACEABLE_CURIOSITIES = [
  {
    id: "curio-scroll",
    title: "Enchanted Scroll of Sparks",
    type: "Spell Manuscript",
    category: "resources",
    icon: "📜",
    note: "Contains handwritten incantations for reviving dormant prototypes.",
  },
  {
    id: "curio-potion",
    title: "Bioluminescent Shader Elixir",
    type: "Alchemical Catalyst",
    category: "tools",
    icon: "🧪",
    note: "Brewed from phosphorescent moss for rendering real-time CRT glows.",
  },
  {
    id: "curio-crystal",
    title: "Cosmic Nebula Geode",
    type: "Component Relic",
    category: "components",
    icon: "🔮",
    note: "Vibrates at 432 Hz to synchronize procedural audio waveforms.",
  },
  {
    id: "curio-key",
    title: "Skeleton Crypt Key",
    type: "Access Artifact",
    category: "tools",
    icon: "🗝️",
    note: "Forged in ancient iron to unlock forbidden GraphQL rate limits.",
  },
];

export function CuriosityCabinet({ project: propProject, onBackToArchive }) {
  const navigate = useNavigate();
  const location = useLocation();
  const project = propProject || location.state?.project || null;

  // Stored items in mini-library
  const [cabinetItems, setCabinetItems] = useState(() => {
    try {
      const saved = localStorage.getItem("projectgrim_cabinet_library");
      return saved ? JSON.parse(saved) : DEFAULT_CABINET_STORAGE;
    } catch {
      return DEFAULT_CABINET_STORAGE;
    }
  });

  // Slider door open state (0.0 = closed, 1.0 = fully open)
  const [doorProgress, setDoorProgress] = useState({
    resources: 0.7,
    tools: 0.35,
    components: 0.25,
  });

  // Ether Void Drop Zone State
  const [isOverVoidZone, setIsOverVoidZone] = useState(false);

  // Mascot Teacher State
  const [mascotDialogue, setMascotDialogue] = useState(
    "Welcome! I am Professor Grim. Slide open each door to inspect your saved resources, tools, and components. Drag any artifact onto a shelf to store it!"
  );
  const [mascotChalkRune, setMascotChalkRune] = useState("✦ Mini-Library Guide ✦");
  const [activeDragDrawer, setActiveDragDrawer] = useState(null);
  const [toast, setToast] = useState(null);

  // 3D Door to "Us" State
  const [isDoorOpen, setIsDoorOpen] = useState(false);
  const [isEnteringDoor, setIsEnteringDoor] = useState(false);

  // Dragging slider tracking
  const draggingSliderRef = useRef(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("projectgrim_cabinet_library", JSON.stringify(cabinetItems));
    } catch (e) {
      void e;
    }
  }, [cabinetItems]);

  // RESET BUTTON HANDLER (Step 7 Requirement)
  const handleResetCabinet = () => {
    setCabinetItems(DEFAULT_CABINET_STORAGE);
    setDoorProgress({
      resources: 0.7,
      tools: 0.35,
      components: 0.25,
    });
    setMascotDialogue(
      "Cabinet restored! All shelves and relics are safely reset."
    );
    setMascotChalkRune("✦ Cabinet Reset ✦");
    setToast({
      title: "Cabinet Library",
      drawer: "Restored to default relics",
    });
    setTimeout(() => setToast(null), 3000);
  };

  // Toggle Door Open/Close via Button (Step 7 Requirement)
  const toggleDoor = (drawerId) => {
    setDoorProgress((prev) => {
      const isCurrentlyOpen = prev[drawerId] > 0.45;
      const nextProgress = isCurrentlyOpen ? 0.05 : 0.85;
      return {
        ...prev,
        [drawerId]: nextProgress,
      };
    });

    setMascotDialogue(
      `Door for Bay ${drawerId.toUpperCase()} has been toggled! Inspect the treasures nestled within.`
    );
  };

  const handleSliderDragStart = (e, drawerId) => {
    e.stopPropagation();
    draggingSliderRef.current = {
      drawerId,
      startX: e.clientX,
      startProgress: doorProgress[drawerId],
    };

    if (drawerId === "resources") {
      setMascotDialogue(
        "Bay 1: Resources — manuscripts, research notes, and color palettes."
      );
      setMascotChalkRune("📖 I. Resources & Blueprints");
    } else if (drawerId === "tools") {
      setMascotDialogue(
        "Bay 2: Tools — compilers, engines, audio files, and shaders."
      );
      setMascotChalkRune("⚙ II. Tools & Shaders");
    } else {
      setMascotDialogue(
        "Bay 3: Components — UI widgets, sprites, and code assets ready to reuse."
      );
      setMascotChalkRune("🧩 III. Components & Assets");
    }
  };

  const handleGlobalPointerMove = (e) => {
    if (!draggingSliderRef.current) return;
    const { drawerId, startX, startProgress } = draggingSliderRef.current;
    const deltaX = e.clientX - startX;
    const progressDelta = deltaX / (window.innerWidth * 0.16);
    const newProgress = Math.max(0, Math.min(1, startProgress + progressDelta));

    setDoorProgress((prev) => ({
      ...prev,
      [drawerId]: newProgress,
    }));
  };

  const handleGlobalPointerUp = () => {
    draggingSliderRef.current = null;
  };

  const handleItemDragStart = (e, item) => {
    e.dataTransfer.setData("application/json", JSON.stringify(item));
    e.dataTransfer.setData("text/plain", item.title);
    setMascotDialogue(
      `Splendid, apprentice! Now drag "${item.title}" into any open cabinet shelf to store it as your permanent mini-library copy!`
    );
  };

  const handleDrawerDragOver = (e, drawerId) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
    if (activeDragDrawer !== drawerId) setActiveDragDrawer(drawerId);
  };

  const handleDrawerDragLeave = () => {
    setActiveDragDrawer(null);
  };

  // Place object into shelf (via drag into Action Zone)
  const placeObjectIntoBay = (drawerId, itemToPlace) => {
    if (!itemToPlace) return;

    const newItem = {
      id: `stored-${Date.now()}`,
      title: itemToPlace.title,
      type: itemToPlace.type || "Preserved Relic",
      source: project?.title || "Vision Board",
      note: itemToPlace.note || "Placed securely onto cabinet shelf.",
    };

    setCabinetItems((prev) => ({
      ...prev,
      [drawerId]: [...prev[drawerId], newItem],
    }));

    setDoorProgress((prev) => ({
      ...prev,
      [drawerId]: Math.max(0.65, prev[drawerId]),
    }));

    setMascotDialogue(
      `Saved! "${itemToPlace.title}" has been filed away into Bay ${drawerId.toUpperCase()}!`
    );
    setMascotChalkRune(`✓ Saved to ${drawerId.toUpperCase()}`);

    setToast({
      title: itemToPlace.title,
      drawer: drawerId.toUpperCase(),
    });
    setTimeout(() => setToast(null), 3500);
  };

  const handleDrawerDrop = (e, drawerId) => {
    e.preventDefault();
    setActiveDragDrawer(null);

    let droppedData = null;
    try {
      const raw = e.dataTransfer.getData("application/json");
      if (raw) droppedData = JSON.parse(raw);
    } catch (err) {
      void err;
    }

    const title = droppedData?.title || e.dataTransfer.getData("text/plain") || "Archived Artifact";
    placeObjectIntoBay(drawerId, {
      title,
      type: droppedData?.type || "Preserved Relic",
      note: droppedData?.note || "Copied into cabinet mini-library.",
    });
  };

  // Remove item from shelf (via Drag to Void Action Zone)
  const handleRemoveItem = (drawerId, itemId) => {
    setCabinetItems((prev) => ({
      ...prev,
      [drawerId]: prev[drawerId].filter((i) => i.id !== itemId),
    }));
    setMascotDialogue("Relic removed from shelf and returned to the ether.");
    setMascotChalkRune("✦ Relic Removed ✦");
  };

  // Drag handlers for Ether Void Action Zone
  const handleVoidDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (!isOverVoidZone) setIsOverVoidZone(true);
  };

  const handleVoidDragLeave = () => {
    setIsOverVoidZone(false);
  };

  const handleVoidDrop = (e) => {
    e.preventDefault();
    setIsOverVoidZone(false);

    let droppedData = null;
    try {
      const raw = e.dataTransfer.getData("application/json");
      if (raw) droppedData = JSON.parse(raw);
    } catch (err) {
      void err;
    }

    const drawer = droppedData?.sourceDrawer;
    const itemId = droppedData?.id || e.dataTransfer.getData("text/plain");

    if (drawer && itemId) {
      handleRemoveItem(drawer, itemId);
      setToast({
        title: droppedData?.title || "Relic",
        drawer: "Returned to the celestial ether",
      });
      setTimeout(() => setToast(null), 3500);
    }
  };

  // 3D Door Entrance to Graveyard
  const handleEnterDoor = () => {
    if (isEnteringDoor) return;
    setIsDoorOpen(true);
    setIsEnteringDoor(true);
    setMascotDialogue("Step through the 3D door to visit the Project Graveyard!");
    setMascotChalkRune("✦ Entering Graveyard ✦");

    setTimeout(() => {
      navigate("/graveyard");
    }, 850);
  };

  const currentRelicData = PROJECT_VISION_DATA[project?.id || "relic-1"] || PROJECT_VISION_DATA["relic-1"];

  return (
    <div
      onPointerMove={handleGlobalPointerMove}
      onPointerUp={handleGlobalPointerUp}
      className="relative w-screen h-dvh max-h-dvh bg-[#0d0705] text-slate-100 flex flex-col justify-between overflow-hidden select-none p-[0.75rem] sm:p-[1rem]"
    >
      {/* Subtle Woodgrain & Amber Vignette Layer */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-radial from-transparent via-[#140806]/40 to-[#070302]/95" />
      {/* Atmospheric Unsplash Night Background Layer */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-15 bg-cover bg-center mix-blend-screen"
        style={{ backgroundImage: `url(${darkNightBg})` }}
      />

      {/* Toast Notification */}
      {toast && (
        <div
          role="status"
          className="fixed top-[1.25rem] right-[1.25rem] z-50 flex items-center gap-[0.75rem] rounded-2xl border border-amber-400/60 bg-[#160d07]/95 px-[1.25rem] py-[0.65rem] shadow-2xl backdrop-blur-md animate-in fade-in"
        >
          <CheckCircle2 className="w-[1.2rem] h-[1.2rem] text-amber-400" />
          <div className="text-[0.75rem]">
            <span className="font-bold text-white">{toast.title} </span>
            <span className="text-amber-200">stored in {toast.drawer} Mini-Library!</span>
          </div>
        </div>
      )}

      {/* ===================================================================
          1. HEADER BAR
          =================================================================== */}
      <header className="relative z-20 flex items-center justify-between pb-[0.5rem] border-b border-amber-900/40">
        <div className="flex items-center gap-[0.75rem]">
          <button
            type="button"
            onClick={() => {
              if (onBackToArchive) onBackToArchive();
              else navigate("/archive");
            }}
            className="flex items-center gap-[0.45rem] px-[0.95rem] py-[0.35rem] rounded-full border border-amber-600/50 bg-[#1a0f08]/85 text-amber-300 hover:text-white hover:border-amber-300 transition-all cursor-pointer shadow-lg backdrop-blur-md text-[0.72rem] font-cinzel uppercase tracking-wider"
          >
            <ArrowLeft className="w-[0.85rem] h-[0.85rem]" />
            <span>Return to Archive</span>
          </button>

          <div>
            <span className="font-cinzel text-[0.65rem] uppercase tracking-[0.25em] text-[#d69a62] font-bold">
              Immersive Antique Relic Sanctuary
            </span>
            <h1 className="font-cinzel text-[1.4rem] sm:text-[1.8rem] font-black text-white leading-none">
              THE CURIOSITY CABINET
            </h1>
          </div>
        </div>

        {/* Action Controls: Reset Button & Interaction Guide */}
        <div className="flex items-center gap-[0.65rem]">
          <button
            type="button"
            onClick={handleResetCabinet}
            className="flex items-center gap-[0.4rem] px-[0.95rem] py-[0.35rem] rounded-full bg-amber-950/70 border border-amber-500/50 text-amber-200 hover:text-white hover:border-amber-300 transition text-[0.7rem] font-cinzel uppercase tracking-wider backdrop-blur-md shadow-md cursor-pointer"
            title="Reset cabinet shelves and sliding doors to initial state"
          >
            <RotateCcw className="w-[0.8rem] h-[0.8rem] text-amber-400" />
            <span>Reset Cabinet</span>
          </button>

          <div className="hidden md:flex items-center gap-[0.45rem] text-[0.75rem] text-amber-200/80 bg-[#140b06]/85 px-[0.95rem] py-[0.35rem] rounded-full border border-amber-500/30">
            <span className="w-[0.45rem] h-[0.45rem] rounded-full bg-amber-400 animate-pulse shadow-[0_0_0.5rem_#fbbf24]" />
            <span className="font-cormorant italic text-[0.85rem]">
              Slide doors · Click or drag objects to shelves · 3D door on right
            </span>
          </div>
        </div>
      </header>

      {/* ===================================================================
          2. MAIN INTERACTION: 3-BAY CLASSICAL CABINET + PROFESSOR GRIM + 3D DOOR
          =================================================================== */}
      <main className="relative z-10 flex-1 flex flex-col lg:flex-row items-center justify-between gap-[1.25rem] w-full max-w-[88rem] mx-auto my-auto overflow-y-auto py-[0.5rem]">

        {/* -----------------------------------------------------------------
            A. THE 3-BAY CLASSICAL MAHOGANY CABINET (curiosity-cabinet-wood.jpg)
            ----------------------------------------------------------------- */}
        <section className="relative flex-1 w-full max-w-[48rem] flex flex-col items-center">
          
          {/* Ornate Classical Frieze Top Header */}
          <div className="w-full relative flex items-center justify-between px-[1.5rem] py-[0.6rem] bg-gradient-to-r from-[#3b0d11] via-[#5c161c] to-[#3b0d11] border-2 border-b-0 border-[#d69a62]/60 rounded-t-2xl shadow-2xl">
            <div className="flex items-center gap-[0.5rem]">
              <span className="w-[0.6rem] h-[0.6rem] rounded-full bg-[#d69a62] border border-amber-200" />
              <span className="font-cinzel text-[0.75rem] tracking-[0.25em] uppercase text-amber-200 font-bold">
                Classical Apothecary of Relics · Anno MMXXVI
              </span>
            </div>
            <span className="font-snell text-[1.1rem] text-[#d69a62] italic hidden sm:inline">
              "Curiosity preserved forever."
            </span>
          </div>

          {/* Continuous Classical Architrave Rail */}
          <div className="w-full h-[0.5rem] bg-gradient-to-r from-[#7a1c22] via-[#d69a62] to-[#7a1c22] shadow-md" />

          {/* 3-Bay Cabinet Body with Sliding Doors */}
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-[0.5rem] p-[0.75rem] bg-gradient-to-b from-[#24080a] via-[#1a0507] to-[#0f0304] border-2 border-t-0 border-[#d69a62]/50 shadow-2xl">
            
            {/* -------------------- BAY 1: RESOURCES -------------------- */}
            <div
              onDragOver={(e) => handleDrawerDragOver(e, "resources")}
              onDragLeave={handleDrawerDragLeave}
              onDrop={(e) => handleDrawerDrop(e, "resources")}
              className={`relative h-[19rem] rounded-xl border-2 overflow-hidden flex flex-col justify-between transition-all duration-300 ${
                activeDragDrawer === "resources"
                  ? "border-amber-400 bg-amber-950/70 ring-2 ring-amber-300"
                  : "border-[#5c161c] bg-[#120406]"
              }`}
            >
              {/* Shelf Top Arch & Door Open/Close Toggle */}
              <div className="relative z-10 flex items-center justify-between px-[0.75rem] py-[0.4rem] bg-gradient-to-b from-[#451014] to-[#200709] border-b border-amber-600/40">
                <div className="flex items-center gap-[0.35rem]">
                  <BookOpen className="w-[0.8rem] h-[0.8rem] text-amber-400" />
                  <span className="font-cinzel text-[0.7rem] uppercase tracking-wider font-bold text-amber-200">
                    I. Resources
                  </span>
                </div>
                <div className="flex items-center gap-[0.35rem]">
                  <button
                    type="button"
                    onClick={() => toggleDoor("resources")}
                    className="text-[0.58rem] font-mono px-[0.4rem] py-[0.05rem] rounded bg-black/60 text-amber-300 hover:text-white border border-amber-500/40 transition cursor-pointer"
                  >
                    {doorProgress.resources > 0.45 ? "Close" : "Open"}
                  </button>
                  <span className="font-mono text-[0.6rem] px-[0.35rem] py-[0.05rem] rounded-full bg-black/60 text-amber-300">
                    {cabinetItems.resources.length}
                  </span>
                </div>
              </div>

              {/* Upper & Middle Shelves */}
              <div className="relative flex-1 p-[0.65rem] overflow-y-auto space-y-[0.45rem] bg-[radial-gradient(ellipse_at_top,_#4a1216_0%,_#150406_90%)]">
                {cabinetItems.resources.map((item) => (
                  <div
                    key={item.id}
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.setData("application/json", JSON.stringify({ ...item, sourceDrawer: "resources" }));
                      e.dataTransfer.setData("text/plain", item.id);
                    }}
                    className="group relative p-[0.5rem] rounded-lg border border-amber-500/30 bg-[#290a0d]/85 text-[0.7rem] shadow-md flex flex-col justify-between cursor-grab active:cursor-grabbing hover:border-amber-400 transition"
                    title="Drag down to Ether Void Well to dissolve"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-amber-100 font-cinzel truncate">
                        {item.title}
                      </span>
                      <span className="text-[0.6rem] font-mono text-amber-400/80">
                        [Shelved]
                      </span>
                    </div>
                    <p className="text-[0.65rem] text-stone-300 mt-[0.15rem] line-clamp-2 italic">
                      {item.note}
                    </p>
                  </div>
                ))}
              </div>

              {/* SLIDING MAHOGANY LOWER CUPBOARD DOOR (Mouse Dragged) */}
              <div
                className="absolute inset-y-[1.8rem] inset-x-0 bg-gradient-to-r from-[#380e12] via-[#52151b] to-[#26090c] border-2 border-amber-600/60 shadow-2xl flex flex-col justify-between p-[0.75rem] transition-transform duration-75 cursor-grab active:cursor-grabbing select-none"
                style={{
                  transform: `translateX(-${doorProgress.resources * 82}%)`,
                }}
                onPointerDown={(e) => handleSliderDragStart(e, "resources")}
              >
                <div className="flex-1 rounded-lg border border-amber-600/30 bg-[#1c0608]/70 p-[0.5rem] flex flex-col justify-between">
                  <div className="text-center font-cinzel text-[0.65rem] uppercase tracking-widest text-amber-300 font-bold">
                    Bay I · Resources Scroll Door
                  </div>

                  <div className="self-end my-auto flex flex-col items-center gap-[0.25rem] bg-gradient-to-b from-amber-200 via-amber-500 to-amber-800 p-[0.25rem] px-[0.45rem] rounded-md shadow-lg border border-amber-200">
                    <span className="w-[0.25rem] h-[0.75rem] bg-amber-950 rounded-full" />
                    <span className="text-[0.55rem] font-mono text-amber-950 font-bold uppercase">
                      Slide ⇄
                    </span>
                  </div>

                  <div className="text-right text-[0.55rem] font-mono text-amber-400/70">
                    {Math.round(doorProgress.resources * 100)}% Open
                  </div>
                </div>
              </div>
            </div>

            {/* -------------------- BAY 2: TOOLS -------------------- */}
            <div
              onDragOver={(e) => handleDrawerDragOver(e, "tools")}
              onDragLeave={handleDrawerDragLeave}
              onDrop={(e) => handleDrawerDrop(e, "tools")}
              className={`relative h-[19rem] rounded-xl border-2 overflow-hidden flex flex-col justify-between transition-all duration-300 ${
                activeDragDrawer === "tools"
                  ? "border-sky-400 bg-sky-950/70 ring-2 ring-sky-300"
                  : "border-[#5c161c] bg-[#120406]"
              }`}
            >
              <div className="relative z-10 flex items-center justify-between px-[0.75rem] py-[0.4rem] bg-gradient-to-b from-[#18263e] to-[#0c1422] border-b border-sky-400/40">
                <div className="flex items-center gap-[0.35rem]">
                  <Wrench className="w-[0.8rem] h-[0.8rem] text-sky-400" />
                  <span className="font-cinzel text-[0.7rem] uppercase tracking-wider font-bold text-sky-200">
                    II. Tools
                  </span>
                </div>
                <div className="flex items-center gap-[0.35rem]">
                  <button
                    type="button"
                    onClick={() => toggleDoor("tools")}
                    className="text-[0.58rem] font-mono px-[0.4rem] py-[0.05rem] rounded bg-black/60 text-sky-300 hover:text-white border border-sky-500/40 transition cursor-pointer"
                  >
                    {doorProgress.tools > 0.45 ? "Close" : "Open"}
                  </button>
                  <span className="font-mono text-[0.6rem] px-[0.35rem] py-[0.05rem] rounded-full bg-black/60 text-sky-300">
                    {cabinetItems.tools.length}
                  </span>
                </div>
              </div>

              <div className="relative flex-1 p-[0.65rem] overflow-y-auto space-y-[0.45rem] bg-[radial-gradient(ellipse_at_top,_#082f49_0%,_#091724_90%)]">
                {cabinetItems.tools.map((item) => (
                  <div
                    key={item.id}
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.setData("application/json", JSON.stringify({ ...item, sourceDrawer: "tools" }));
                      e.dataTransfer.setData("text/plain", item.id);
                    }}
                    className="group relative p-[0.5rem] rounded-lg border border-sky-500/30 bg-[#0d1f35]/85 text-[0.7rem] shadow-md flex flex-col justify-between cursor-grab active:cursor-grabbing hover:border-sky-400 transition"
                    title="Drag down to Ether Void Well to dissolve"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sky-100 font-cinzel truncate">
                        {item.title}
                      </span>
                      <span className="text-[0.6rem] font-mono text-sky-400/80">
                        [Shelved]
                      </span>
                    </div>
                    <p className="text-[0.65rem] text-sky-200/70 mt-[0.15rem] line-clamp-2 italic">
                      {item.note}
                    </p>
                  </div>
                ))}
              </div>

              {/* SLIDING MAHOGANY LOWER CUPBOARD DOOR */}
              <div
                className="absolute inset-y-[1.8rem] inset-x-0 bg-gradient-to-r from-[#111e33] via-[#1e293b] to-[#0f172a] border-2 border-sky-600/60 shadow-2xl flex flex-col justify-between p-[0.75rem] transition-transform duration-75 cursor-grab active:cursor-grabbing select-none"
                style={{
                  transform: `translateX(-${doorProgress.tools * 82}%)`,
                }}
                onPointerDown={(e) => handleSliderDragStart(e, "tools")}
              >
                <div className="flex-1 rounded-lg border border-sky-600/30 bg-[#09111e]/70 p-[0.5rem] flex flex-col justify-between">
                  <div className="text-center font-cinzel text-[0.65rem] uppercase tracking-widest text-sky-300 font-bold">
                    Bay II · Tools Vault Panel
                  </div>

                  <div className="self-end my-auto flex flex-col items-center gap-[0.25rem] bg-gradient-to-b from-sky-200 via-sky-500 to-sky-800 p-[0.25rem] px-[0.45rem] rounded-md shadow-lg border border-sky-200">
                    <span className="w-[0.25rem] h-[0.75rem] bg-sky-950 rounded-full" />
                    <span className="text-[0.55rem] font-mono text-sky-950 font-bold uppercase">
                      Slide ⇄
                    </span>
                  </div>

                  <div className="text-right text-[0.55rem] font-mono text-sky-400/70">
                    {Math.round(doorProgress.tools * 100)}% Open
                  </div>
                </div>
              </div>
            </div>

            {/* -------------------- BAY 3: COMPONENTS -------------------- */}
            <div
              onDragOver={(e) => handleDrawerDragOver(e, "components")}
              onDragLeave={handleDrawerDragLeave}
              onDrop={(e) => handleDrawerDrop(e, "components")}
              className={`relative h-[19rem] rounded-xl border-2 overflow-hidden flex flex-col justify-between transition-all duration-300 ${
                activeDragDrawer === "components"
                  ? "border-emerald-400 bg-emerald-950/70 ring-2 ring-emerald-300"
                  : "border-[#5c161c] bg-[#120406]"
              }`}
            >
              <div className="relative z-10 flex items-center justify-between px-[0.75rem] py-[0.4rem] bg-gradient-to-b from-[#102e1c] to-[#08180e] border-b border-emerald-400/40">
                <div className="flex items-center gap-[0.35rem]">
                  <Layers className="w-[0.8rem] h-[0.8rem] text-emerald-400" />
                  <span className="font-cinzel text-[0.7rem] uppercase tracking-wider font-bold text-emerald-200">
                    III. Components
                  </span>
                </div>
                <div className="flex items-center gap-[0.35rem]">
                  <button
                    type="button"
                    onClick={() => toggleDoor("components")}
                    className="text-[0.58rem] font-mono px-[0.4rem] py-[0.05rem] rounded bg-black/60 text-emerald-300 hover:text-white border border-emerald-500/40 transition cursor-pointer"
                  >
                    {doorProgress.components > 0.45 ? "Close" : "Open"}
                  </button>
                  <span className="font-mono text-[0.6rem] px-[0.35rem] py-[0.05rem] rounded-full bg-black/60 text-emerald-300">
                    {cabinetItems.components.length}
                  </span>
                </div>
              </div>

              <div className="relative flex-1 p-[0.65rem] overflow-y-auto space-y-[0.45rem] bg-[radial-gradient(ellipse_at_top,_#064e3b_0%,_#09261a_90%)]">
                {cabinetItems.components.map((item) => (
                  <div
                    key={item.id}
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.setData("application/json", JSON.stringify({ ...item, sourceDrawer: "components" }));
                      e.dataTransfer.setData("text/plain", item.id);
                    }}
                    className="group relative p-[0.5rem] rounded-lg border border-emerald-500/30 bg-[#092b1b]/85 text-[0.7rem] shadow-md flex flex-col justify-between cursor-grab active:cursor-grabbing hover:border-emerald-400 transition"
                    title="Drag down to Ether Void Well to dissolve"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-emerald-100 font-cinzel truncate">
                        {item.title}
                      </span>
                      <span className="text-[0.6rem] font-mono text-emerald-400/80">
                        [Shelved]
                      </span>
                    </div>
                    <p className="text-[0.65rem] text-emerald-200/70 mt-[0.15rem] line-clamp-2 italic">
                      {item.note}
                    </p>
                  </div>
                ))}
              </div>

              {/* SLIDING MAHOGANY LOWER CUPBOARD DOOR */}
              <div
                className="absolute inset-y-[1.8rem] inset-x-0 bg-gradient-to-r from-[#0c2417] via-[#163826] to-[#0a1a10] border-2 border-emerald-600/60 shadow-2xl flex flex-col justify-between p-[0.75rem] transition-transform duration-75 cursor-grab active:cursor-grabbing select-none"
                style={{
                  transform: `translateX(-${doorProgress.components * 82}%)`,
                }}
                onPointerDown={(e) => handleSliderDragStart(e, "components")}
              >
                <div className="flex-1 rounded-lg border border-emerald-600/30 bg-[#05140b]/70 p-[0.5rem] flex flex-col justify-between">
                  <div className="text-center font-cinzel text-[0.65rem] uppercase tracking-widest text-emerald-300 font-bold">
                    Bay III · Components Screen
                  </div>

                  <div className="self-end my-auto flex flex-col items-center gap-[0.25rem] bg-gradient-to-b from-emerald-200 via-emerald-500 to-emerald-800 p-[0.25rem] px-[0.45rem] rounded-md shadow-lg border border-emerald-200">
                    <span className="w-[0.25rem] h-[0.75rem] bg-emerald-950 rounded-full" />
                    <span className="text-[0.55rem] font-mono text-emerald-950 font-bold uppercase">
                      Slide ⇄
                    </span>
                  </div>

                  <div className="text-right text-[0.55rem] font-mono text-emerald-400/70">
                    {Math.round(doorProgress.components * 100)}% Open
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Cabinet Base Plinth with Carved Halloween Pumpkins */}
          <div className="w-full relative flex flex-col gap-[0.5rem] px-[1.5rem] py-[0.6rem] bg-gradient-to-r from-[#240608] via-[#420f13] to-[#240608] border-2 border-t-0 border-[#d69a62]/60 rounded-b-2xl shadow-2xl">
            <div className="w-full flex items-center justify-between">
              <div className="flex items-center gap-[0.65rem]">
                <span className="text-[1.2rem] drop-shadow-[0_0_0.75rem_#f59e0b]">🎃</span>
                <span className="font-cinzel text-[0.65rem] uppercase tracking-wider text-amber-300 font-bold">
                  Cabinet Footing · Haunted Apothecary
                </span>
              </div>

              <div className="flex items-center gap-[0.65rem]">
                <span className="font-snell text-[0.95rem] text-[#d69a62] italic">
                  Slide doors or drag artifacts
                </span>
                <span className="text-[1.2rem] drop-shadow-[0_0_0.75rem_#f59e0b]">🎃</span>
              </div>
            </div>

            {/* ACTION ZONE: ETHER VOID RETURN (Canvas Protocol compliant relic removal) */}
            <div
              onDragOver={handleVoidDragOver}
              onDragLeave={handleVoidDragLeave}
              onDrop={handleVoidDrop}
              className={`w-full p-[0.5rem] rounded-xl border-2 border-dashed transition-all duration-300 flex items-center justify-center gap-[0.45rem] text-center select-none ${
                isOverVoidZone
                  ? "border-rose-400 bg-rose-950/80 text-rose-200 scale-[1.01] shadow-[0_0_1.5rem_#f43f5e]"
                  : "border-rose-800/40 bg-[#120507]/70 text-rose-300/70"
              }`}
            >
              <Trash2 className="w-[0.8rem] h-[0.8rem] text-rose-400" />
              <span className="font-cinzel text-[0.65rem] font-bold uppercase tracking-wider">
                Action Zone: Drag Shelved Relic Here to Dissolve into Ether
              </span>
            </div>
          </div>

        </section>

        {/* -----------------------------------------------------------------
            B. INVENTORY TRAY & PROFESSOR GRIM CHALKBOARD
            ----------------------------------------------------------------- */}
        <aside className="w-full lg:w-[17.5rem] flex flex-col items-center">
          
          {/* PROFESSOR GRIM CHALKBOARD NARRATION */}
          <div className="w-full relative p-[1rem] rounded-2xl border-4 border-[#78350f] bg-[#0c1f17] shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between pb-[0.35rem] border-b border-emerald-800/40">
              <div className="flex items-center gap-[0.55rem]">
                <img
                  src={mascotImg}
                  alt="Professor Grim"
                  className="w-[2.2rem] h-[2.2rem] object-contain drop-shadow-[0_0_0.6rem_#fbbf24]"
                />
                <div>
                  <span className="font-cinzel text-[0.72rem] uppercase tracking-wider text-emerald-200 font-bold block leading-none">
                    Professor Grim
                  </span>
                  <span className="text-[0.58rem] font-mono text-emerald-400/80">
                    Mini-Library Caretaker
                  </span>
                </div>
              </div>
              <span className="font-snell text-[0.95rem] text-emerald-300 italic">
                Guide
              </span>
            </div>

            <div className="mt-[0.65rem] space-y-[0.35rem]">
              <div className="font-mono text-[0.68rem] text-amber-300/90 tracking-widest text-center border-b border-white/10 pb-[0.25rem]">
                {mascotChalkRune}
              </div>
              <p className="font-snell text-[1.15rem] text-white leading-snug italic drop-shadow-sm min-h-[3.5rem]">
                "{mascotDialogue}"
              </p>
            </div>
          </div>

          {/* OBJECTS TO PLACE TRAY (Canvas Protocol: Drag into cabinet shelves) */}
          <div className="w-full mt-[0.75rem] p-[0.75rem] rounded-2xl border border-amber-600/40 bg-[#140b07]/90 backdrop-blur-md">
            <div className="flex items-center justify-between mb-[0.35rem]">
              <span className="font-cinzel text-[0.65rem] uppercase tracking-wider text-amber-300 font-bold flex items-center gap-[0.35rem]">
                <Sparkles className="w-[0.75rem] h-[0.75rem] text-amber-400" />
                Action Zone: Drag to Store
              </span>
              <span className="text-[0.55rem] font-mono text-stone-400">
                Canvas Protocol
              </span>
            </div>

            <p className="text-[0.62rem] text-stone-300 mb-[0.45rem] italic">
              Drag any curiosity artifact into a cabinet shelf to file it away:
            </p>

            <div className="grid grid-cols-2 gap-[0.35rem]">
              {PLACEABLE_CURIOSITIES.map((curio) => (
                <div
                  key={curio.id}
                  draggable
                  onDragStart={(e) => handleItemDragStart(e, curio)}
                  className="p-[0.45rem] rounded-xl border border-amber-700/40 bg-[#221008]/80 hover:border-amber-400 transition cursor-grab active:cursor-grabbing flex flex-col justify-between"
                  title="Drag onto any cabinet bay to store"
                >
                  <div className="flex items-center gap-[0.35rem]">
                    <span className="text-[1rem]">{curio.icon}</span>
                    <span className="font-cinzel text-[0.65rem] font-bold text-amber-100 truncate">
                      {curio.title.split(" ")[0]}
                    </span>
                  </div>
                  <span className="text-[0.55rem] text-amber-400/80 font-mono mt-[0.15rem]">
                    [{curio.category}]
                  </span>
                </div>
              ))}
            </div>

            {/* Vision Board Inspiration Drag Relics */}
            <div className="mt-[0.65rem] pt-[0.45rem] border-t border-amber-800/40">
              <span className="font-cinzel text-[0.62rem] uppercase tracking-wider text-amber-200/80 block mb-[0.25rem]">
                Or Drag from Vision Board:
              </span>
              <div className="flex flex-col gap-[0.25rem]">
                {currentRelicData.inspirations.slice(0, 2).map((item) => (
                  <div
                    key={item.id}
                    draggable
                    onDragStart={(e) => handleItemDragStart(e, item)}
                    className="p-[0.35rem] px-[0.55rem] rounded-lg border border-amber-700/40 bg-[#1c0c06]/80 hover:border-amber-400 transition cursor-grab flex items-center justify-between text-[0.65rem]"
                  >
                    <span className="font-cinzel font-bold text-amber-100 truncate mr-[0.5rem]">
                      {item.title}
                    </span>
                    <span className="text-[0.55rem] font-mono text-amber-300 uppercase shrink-0">
                      ⇄ Drag
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </aside>

        {/* -----------------------------------------------------------------
            C. THE 3D SANCTUM DOOR TO "US"
            ----------------------------------------------------------------- */}
        <section className="w-full lg:w-[14rem] flex flex-col items-center justify-center p-[0.75rem] rounded-2xl border-2 border-amber-600/40 bg-gradient-to-b from-[#180d07]/90 to-[#0a0503]/90 shadow-2xl backdrop-blur-md">
          <div className="text-center mb-[0.5rem]">
            <span className="font-snell text-[1.1rem] text-amber-300 italic block">
              Sanctum Passage
            </span>
            <span className="font-cinzel text-[0.65rem] tracking-widest uppercase text-white font-bold">
              Door to "Us"
            </span>
          </div>

          {/* 3D Perspective Door Frame Container */}
          <div
            onClick={handleEnterDoor}
            className="relative w-[9rem] h-[15.5rem] rounded-t-full border-4 border-[#5c161c] bg-[#030201] shadow-[0_1rem_2.5rem_rgba(0,0,0,0.95)] cursor-pointer overflow-hidden group"
            style={{
              perspective: "62.5rem",
            }}
            title="Click or pull to enter through the 3D Door to Us"
          >
            {/* Luminous Interior Beyond Door */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-[#fde047] via-[#38bdf8] to-[#ffffff] p-[0.5rem] text-center pointer-events-none shadow-inner">
              <Sparkles className="w-[1.75rem] h-[1.75rem] text-amber-900 animate-spin" />
              <span className="font-cinzel text-[0.75rem] font-black text-amber-950 uppercase tracking-widest mt-[0.5rem]">
                Enter Graveyard
              </span>
            </div>

            {/* THE 3D WOODEN DOOR PANEL */}
            <div
              className={`absolute inset-0 rounded-t-full bg-gradient-to-r from-[#2c090c] via-[#4d1318] to-[#1e0608] border-2 border-[#d69a62]/80 shadow-2xl flex flex-col justify-between p-[0.85rem] origin-left transition-transform duration-700 ease-out ${
                isDoorOpen ? "-rotate-y-[85deg]" : "group-hover:-rotate-y-[22deg]"
              }`}
              style={{
                transformStyle: "preserve-3d",
                transform: isDoorOpen ? "perspective(56.25rem) rotateY(-82deg)" : undefined,
              }}
            >
              <div className="w-[4.5rem] h-[4.5rem] mx-auto rounded-full border-2 border-[#d69a62]/60 flex items-center justify-center">
                <span className="font-cinzel text-[1.2rem] text-[#d69a62] font-black">
                  ✦
                </span>
              </div>

              <div className="self-end my-auto w-[1.1rem] h-[1.1rem] rounded-full bg-gradient-to-tr from-[#92400e] via-[#f59e0b] to-[#fef08a] border border-amber-200 shadow-[0_0_0.75rem_#fbbf24] flex items-center justify-center">
                <span className="w-[0.25rem] h-[0.25rem] rounded-full bg-black" />
              </div>

              <div className="text-center font-cinzel text-[0.62rem] uppercase tracking-widest text-amber-200/80 font-bold border-t border-[#d69a62]/40 pt-[0.35rem]">
                Pull to Enter
              </div>
            </div>
          </div>

          <div className="mt-[0.65rem] text-center">
            <span className="text-[0.62rem] font-mono text-amber-300/80 block">
              Step through into the Project Graveyard
            </span>
          </div>
        </section>

      </main>

      {/* 3D Door Transit White-out Flash */}
      {isEnteringDoor && (
        <div className="fixed inset-0 z-50 pointer-events-none bg-white animate-in fade-in duration-700 flex items-center justify-center">
          <span className="font-cinzel text-[2rem] font-black text-stone-900 tracking-[0.3em] uppercase">
            Entering the Project Graveyard...
          </span>
        </div>
      )}

      {/* Footer Navigation to Graveyard */}
      <footer className="relative z-20 pt-[0.5rem] border-t border-amber-900/30 flex items-center justify-between text-[0.7rem] text-slate-400">
        <span className="font-cinzel uppercase tracking-widest text-[#d69a62]">
          PROJECTGRIM · ANTIQUE CURIOSITY CABINET
        </span>
        <button
          type="button"
          onClick={() => navigate("/graveyard")}
          className="flex items-center gap-[0.3rem] text-amber-300 hover:text-white font-cinzel uppercase tracking-wider text-[0.7rem] cursor-pointer"
        >
          <span>Visit Project Graveyard</span>
          <ChevronRight className="w-[0.8rem] h-[0.8rem]" />
        </button>
      </footer>
    </div>
  );
}

export default CuriosityCabinet;
