import { useState } from 'react'
import {
  Compass,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  RotateCcw,
  Shuffle,
  Play,
  Eye,
  X,
} from 'lucide-react'
import PumpkinLantern from '../Halloween/PumpkinLantern'
import SkyLanternCeremony from './SkyLanternCeremony'

export default function GraveyardJourney({
  projects = [],
  onUpdateProject,
  onShowToast,
  onExitJourney,
}) {
  const [currentStep, setCurrentStep] = useState(1)
  const [gatesOpen, setGatesOpen] = useState(false)
  const [selectedProjectId, setSelectedProjectId] = useState(
    projects[0]?.id || 'habit-garden'
  )
  const [showLanternCeremony, setShowLanternCeremony] = useState(false)
  const [showBlueprintModal, setShowBlueprintModal] = useState(false)

  // Find currently selected project
  const currentProject =
    projects.find((p) => p.id === selectedProjectId) || projects[0]

  // Handle Gates Opening
  const handleOpenGates = () => {
    setGatesOpen(true)
    if (onShowToast) {
      onShowToast(
        'The Iron Gates Creak Open... 🗝️',
        'Grimm welcomes you into the catacombs of unfinished works.',
        'info'
      )
    }
    setTimeout(() => {
      setCurrentStep(2)
    }, 1200)
  }

  // Handle selecting a project on the stairs
  const handleSelectProjectFromStairs = (projId) => {
    setSelectedProjectId(projId)
    setCurrentStep(3)
  }

  // Handle Revive Actions
  const handleReviveAction = (actionType) => {
    if (!currentProject) return

    let fateLabel = 'Revive'
    let message = ''

    if (actionType === 'continue') {
      message = `“${currentProject.title}” is marked active. Pick up where you left off!`
    } else if (actionType === 'restart') {
      message = `“${currentProject.title}” has been granted a fresh restart with clean clarity!`
    } else if (actionType === 'transform') {
      fateLabel = 'Transform'
      message = `“${currentProject.title}” will evolve into something new!`
    }

    const updated = {
      ...currentProject,
      status: 'Ready for Revival',
      fate: fateLabel,
      lastUpdated: new Date().toISOString().split('T')[0],
    }

    if (onUpdateProject) {
      onUpdateProject(updated)
    }

    if (onShowToast) {
      onShowToast('Destiny Chosen! 🌿', message, 'resurrect')
    }
  }

  // Handle Release Ceremony Complete
  const handleReleaseComplete = (proj) => {
    const updated = {
      ...proj,
      status: 'Resting',
      fate: 'Release',
      lastUpdated: new Date().toISOString().split('T')[0],
    }

    if (onUpdateProject) {
      onUpdateProject(updated)
    }

    if (onShowToast) {
      onShowToast(
        'Lantern Released into the Sky 🏮',
        `“${proj.title}” has been released peacefully with all history preserved.`,
        'resurrect'
      )
    }
    setShowLanternCeremony(false)
  }

  return (
    <section
      id="journey-experience"
      className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 md:px-10 overflow-hidden"
    >
      {/* Journey Header with Stepper & Blueprint Pill */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/[0.08] pb-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-revival/30 bg-revival/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-revival mb-3">
            <Compass size={14} className="animate-spin-slow" />
            <span>The 5-Step Sacred Journey</span>
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-extrabold text-moonlight">
            Guided Sanctuary Flow
          </h2>
          <p className="mt-2 text-sm text-ash max-w-xl">
            Pass the iron gates, descend the stone archive staircase, consult the ancient grimoire,
            unlock the curiosity cabinet, and decide the fate of your idea.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setShowBlueprintModal(true)}
            className="flex items-center gap-2 rounded-full border border-ghost/30 bg-ghost/10 px-4 py-2 text-xs font-semibold text-ghost hover:border-ghost hover:text-ghost-light transition backdrop-blur-md"
          >
            <Eye size={14} />
            <span>View Flow Blueprint</span>
          </button>

          {onExitJourney && (
            <button
              type="button"
              onClick={onExitJourney}
              className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-semibold text-ash hover:text-moonlight transition"
            >
              Back to Overview
            </button>
          )}
        </div>
      </div>

      {/* Interactive Step Indicator Bar (Steps 1 through 5) */}
      <div className="mt-8 flex items-center justify-between overflow-x-auto py-2">
        {[
          { num: 1, label: 'Iron Gates', desc: 'Guided by Grimm' },
          { num: 2, label: 'Archive Staircase', desc: 'Browse Categories' },
          { num: 3, label: 'The Grimoire', desc: 'Revisit Project' },
          { num: 4, label: 'Curiosity Cabinet', desc: 'Tools & Tutorials' },
          { num: 5, label: 'Crossroads of Fate', desc: 'Revive or Release' },
        ].map((step, idx) => (
          <div key={step.num} className="flex items-center shrink-0">
            <button
              type="button"
              onClick={() => {
                if (step.num === 1) {
                  setGatesOpen(false)
                }
                setCurrentStep(step.num)
              }}
              className={`flex items-center gap-3 rounded-2xl px-3.5 py-2 transition text-left ${
                currentStep === step.num
                  ? 'border border-revival/40 bg-revival/15 text-revival shadow-[0_0_15px_rgba(52,211,153,0.25)]'
                  : currentStep > step.num
                  ? 'border border-white/10 bg-white/[0.03] text-moonlight hover:bg-white/[0.06]'
                  : 'border border-transparent text-ash/60 hover:text-ash'
              }`}
            >
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-xl text-xs font-bold ${
                  currentStep === step.num
                    ? 'bg-revival text-[#050811]'
                    : currentStep > step.num
                    ? 'border border-revival/40 text-revival'
                    : 'border border-white/10 text-ash'
                }`}
              >
                {step.num}
              </span>
              <div>
                <span className="block text-xs font-bold leading-tight">
                  {step.label}
                </span>
                <span className="text-[10px] text-ash hidden sm:block">
                  {step.desc}
                </span>
              </div>
            </button>

            {idx < 4 && (
              <ChevronRight
                size={16}
                className={`mx-2 ${
                  currentStep > step.num ? 'text-revival/70' : 'text-white/10'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* ========================================================= */}
      {/* STEP 1: ENTER THE GRAVEYARD (THE 3D IRON GATES) */}
      {/* ========================================================= */}
      {currentStep === 1 && (
        <div className="relative mt-10 rounded-[3rem] border border-white/15 bg-gradient-to-b from-[#0a1122]/95 via-[#060a14]/98 to-[#03060c] p-8 md:p-14 shadow-2xl backdrop-blur-2xl text-center overflow-hidden">
          {/* Eerie Ambient Moon Glow */}
          <div className="pointer-events-none absolute -top-10 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-revival/15 blur-[100px]" />

          {/* Grimm caretaker & Halloween Jack-o'-Lanterns */}
          <div className="relative mx-auto flex items-center justify-center gap-6 mb-6">
            <PumpkinLantern size={80} withWitchHat={true} flicker={true} />

            {/* Grimm figure avatar */}
            <div className="relative flex flex-col items-center">
              <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl border border-ghost/30 bg-[#12182b] shadow-[0_0_30px_rgba(167,139,250,0.3)]">
                <span className="text-5xl select-none">🧙‍♂️</span>
                {/* Glowing lantern in hand */}
                <span className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full border border-amber-400 bg-amber-400/20 text-base shadow-[0_0_15px_#f59e0b] animate-pulse">
                  🏮
                </span>
              </div>
              <span className="mt-2 text-xs font-bold uppercase tracking-widest text-ghost">
                Caretaker Grimm
              </span>
            </div>

            <PumpkinLantern size={80} withWitchHat={true} flicker={true} />
          </div>

          <h3 className="font-display text-3xl md:text-5xl font-extrabold text-moonlight">
            Enter the Graveyard
          </h3>

          <p className="mx-auto mt-3 max-w-xl text-sm md:text-base leading-relaxed text-ash">
            “Halt, creator. Beyond these iron gates rest the projects and codebases you once
            breathed life into. Are you ready to cross the threshold?”
          </p>

          {/* 3D Interactive Iron Gates Stage */}
          <div className="relative mx-auto my-10 h-72 md:h-80 w-full max-w-2xl overflow-hidden rounded-3xl border border-white/15 bg-[#04070e] [perspective:1200px]">
            {/* Cemetery view behind the gates */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[radial-gradient(ellipse_at_50%_40%,rgba(167,139,250,0.2)_0%,rgba(3,6,12,0.95)_75%)]">
              <span className="text-5xl select-none animate-pulse">🪦</span>
              <span className="mt-3 text-xs tracking-widest uppercase text-revival font-semibold">
                The Whispering Catacombs Await
              </span>
            </div>

            {/* Left Iron Gate Leaf */}
            <div
              className="absolute top-0 bottom-0 left-0 w-1/2 border-r border-amber-400/40 bg-gradient-to-r from-[#0d1424] to-[#0a0f1b] transition-transform duration-1000 ease-out origin-left flex flex-col items-center justify-between p-6 shadow-2xl z-10"
              style={{
                transformStyle: 'preserve-3d',
                transform: gatesOpen
                  ? 'perspective(1000px) rotateY(-85deg)'
                  : 'perspective(1000px) rotateY(0deg)',
              }}
            >
              <div className="h-full w-full rounded-2xl border-2 border-white/20 p-4 flex flex-col justify-between bg-black/40 shadow-inner">
                <div className="flex justify-between text-2xl opacity-75">
                  <span>⚜️</span>
                  <span>☠️</span>
                </div>
                {/* Wrought iron filigree grill */}
                <div className="space-y-3.5 opacity-60">
                  <div className="h-1 w-full bg-gradient-to-r from-amber-400/40 via-white/40 to-transparent rounded-full" />
                  <div className="h-0.5 w-full bg-white/40" />
                  <div className="h-1 w-full bg-gradient-to-r from-transparent via-white/40 to-amber-400/40 rounded-full" />
                  <div className="h-0.5 w-full bg-white/40" />
                </div>
                <div className="text-right text-xs font-mono font-bold tracking-widest text-amber-300/80">
                  PORTAL SINISTER
                </div>
              </div>
            </div>

            {/* Right Iron Gate Leaf */}
            <div
              className="absolute top-0 bottom-0 right-0 w-1/2 border-l border-amber-400/40 bg-gradient-to-l from-[#0d1424] to-[#0a0f1b] transition-transform duration-1000 ease-out origin-right flex flex-col items-center justify-between p-6 shadow-2xl z-10"
              style={{
                transformStyle: 'preserve-3d',
                transform: gatesOpen
                  ? 'perspective(1000px) rotateY(85deg)'
                  : 'perspective(1000px) rotateY(0deg)',
              }}
            >
              <div className="h-full w-full rounded-2xl border-2 border-white/20 p-4 flex flex-col justify-between bg-black/40 shadow-inner">
                <div className="flex justify-between text-2xl opacity-75">
                  <span>☠️</span>
                  <span>⚜️</span>
                </div>
                <div className="space-y-3.5 opacity-60">
                  <div className="h-1 w-full bg-gradient-to-l from-amber-400/40 via-white/40 to-transparent rounded-full" />
                  <div className="h-0.5 w-full bg-white/40" />
                  <div className="h-1 w-full bg-gradient-to-l from-transparent via-white/40 to-amber-400/40 rounded-full" />
                  <div className="h-0.5 w-full bg-white/40" />
                </div>
                <div className="text-left text-xs font-mono font-bold tracking-widest text-amber-300/80">
                  PORTAL DEXTER
                </div>
              </div>
            </div>

            {/* Center Lock Ornament */}
            {!gatesOpen && (
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-14 w-14 items-center justify-center rounded-full border-2 border-amber-400 bg-[#090e1a] shadow-[0_0_25px_rgba(251,191,36,0.5)] z-20">
                <span className="text-2xl select-none">🗝️</span>
              </div>
            )}
          </div>

          {/* Action Trigger */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={handleOpenGates}
              disabled={gatesOpen}
              className="group flex items-center gap-3 rounded-full bg-gradient-to-r from-revival to-emerald-400 px-8 py-4 text-xs font-bold uppercase tracking-wider text-[#050811] shadow-[0_0_30px_rgba(52,211,153,0.35)] hover:scale-105 active:scale-95 transition-all"
            >
              <Sparkles size={17} className="transition-transform group-hover:rotate-12" />
              <span>{gatesOpen ? 'Gates Opening...' : 'Open the Iron Gates (3D Transition)'}</span>
              <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* STEP 2: EXPLORE THE ARCHIVE (THE ARCHIVE STAIRCASE) */}
      {/* ========================================================= */}
      {currentStep === 2 && (
        <div className="relative mt-10 rounded-[3rem] border border-white/15 bg-gradient-to-b from-[#0a1122]/95 via-[#060a14]/98 to-[#03060c] p-6 sm:p-10 md:p-14 shadow-2xl backdrop-blur-2xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/[0.08] pb-6 mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-revival">
                Stage 02 • Depth & Elevation
              </span>
              <h3 className="font-display text-3xl md:text-4xl font-extrabold text-moonlight mt-1">
                The Interactive Archive Staircase
              </h3>
              <p className="mt-2 text-sm text-ash max-w-xl">
                Descend the stone steps into the catacombs. Each stair niche holds an unfinished
                work waiting for a creator to inspect its remains.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-xs font-semibold text-ash hover:text-moonlight transition"
              >
                <ArrowLeft size={14} /> Back to Gates
              </button>
            </div>
          </div>

          {/* 3D Perspective Spiral Stone Staircase */}
          <div className="relative [perspective:1000px] my-6">
            <div className="space-y-4">
              {projects.map((proj, idx) => {
                const stepDepth = idx * 6 // visual depth offset
                const isSelected = proj.id === selectedProjectId

                return (
                  <div
                    key={proj.id}
                    onClick={() => handleSelectProjectFromStairs(proj.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        handleSelectProjectFromStairs(proj.id)
                      }
                    }}
                    className={`group cursor-pointer relative flex flex-col md:flex-row items-start md:items-center justify-between rounded-2xl border p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-revival ${
                      isSelected
                        ? 'border-revival/50 bg-[#0e1628] shadow-[0_0_30px_rgba(52,211,153,0.2)]'
                        : 'border-white/[0.08] bg-[#090e1c]/80 hover:border-ghost/40 hover:bg-[#0c1224]'
                    }`}
                    style={{
                      transform: `translateZ(-${stepDepth}px)`,
                    }}
                  >
                    {/* Stair Step Index & Rune */}
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-2xl shadow-inner group-hover:scale-105 transition-transform">
                        {proj.symbol || '🪦'}
                      </div>

                      <div>
                        <div className="flex items-center gap-2.5">
                          <span className="font-mono text-[11px] font-bold text-revival uppercase tracking-wider">
                            Stair {idx + 1} • {proj.category}
                          </span>
                          <span className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] text-ash">
                            {proj.status}
                          </span>
                        </div>

                        <h4 className="mt-1 font-display text-xl font-bold text-moonlight group-hover:text-revival transition-colors">
                          {proj.title}
                        </h4>

                        <p className="mt-1 text-xs text-ash line-clamp-1 max-w-xl">
                          {proj.tagline || proj.description}
                        </p>
                      </div>
                    </div>

                    {/* Progress indicator on stair & Inspect CTA */}
                    <div className="mt-4 md:mt-0 flex items-center gap-4 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-white/[0.06] pt-3 md:pt-0">
                      <div className="text-right">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-ash block">
                          Progress
                        </span>
                        <span className="text-sm font-extrabold text-revival">
                          {proj.progress || 60}%
                        </span>
                      </div>

                      <button
                        type="button"
                        className="flex items-center gap-1.5 rounded-full bg-white/[0.06] px-4 py-2 text-xs font-bold text-moonlight group-hover:bg-revival group-hover:text-[#050811] transition-all"
                      >
                        <span>Revisit (Step 3)</span>
                        <ArrowRight size={13} />
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* STEP 3: REVISIT A PROJECT (THE ANCIENT GRIMOIRE) */}
      {/* ========================================================= */}
      {currentStep === 3 && currentProject && (
        <div className="relative mt-10 rounded-[3rem] border border-white/15 bg-gradient-to-b from-[#0a1122]/95 via-[#060a14]/98 to-[#03060c] p-6 sm:p-10 md:p-14 shadow-2xl backdrop-blur-2xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/[0.08] pb-6 mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-revival">
                Stage 03 • Illuminated Tome
              </span>
              <h3 className="font-display text-3xl md:text-4xl font-extrabold text-moonlight mt-1">
                The Grimoire of Unfinished Works
              </h3>
              <p className="mt-2 text-sm text-ash max-w-xl">
                Open the sacred codex to examine original goals, the progress achieved, remaining
                obstacles, and why work halted.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-xs font-semibold text-ash hover:text-moonlight transition"
              >
                <ArrowLeft size={14} /> Back to Stairs
              </button>

              <button
                type="button"
                onClick={() => setCurrentStep(4)}
                className="flex items-center gap-2 rounded-full bg-gradient-to-r from-revival to-emerald-400 px-5 py-2 text-xs font-bold uppercase tracking-wider text-[#050811] shadow-[0_0_20px_rgba(52,211,153,0.3)] hover:scale-105 transition"
              >
                <span>Curiosity Cabinet (Step 4)</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* Ancient Leather-bound Book / Grimoire Presentation */}
          <div className="relative mx-auto my-6 grid gap-6 rounded-3xl border-2 border-amber-500/30 bg-[#070b16] p-6 sm:p-10 shadow-[0_0_50px_rgba(245,158,11,0.15)] lg:grid-cols-2">
            {/* Candle decor */}
            <div className="absolute -top-5 right-8 flex items-center gap-2">
              <span className="text-2xl animate-pulse">🕯️</span>
            </div>

            {/* Left Page of Grimoire */}
            <div className="rounded-2xl border border-white/[0.08] bg-[#0c1222]/80 p-6 md:p-8 backdrop-blur-md">
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-ash">
                  FOLIO #{currentProject.id.toUpperCase().slice(0, 8)}
                </span>
                <span className="text-xs font-semibold text-revival">
                  {currentProject.category}
                </span>
              </div>

              <div className="mt-5 flex items-center gap-3">
                <span className="text-3xl select-none">{currentProject.symbol || '🪦'}</span>
                <div>
                  <h4 className="font-display text-2xl font-bold text-moonlight">
                    {currentProject.title}
                  </h4>
                  <p className="text-xs text-ash mt-0.5">
                    Buried: {currentProject.dateBuried || 'Ancient Era'}
                  </p>
                </div>
              </div>

              {/* Progress Bar Meter */}
              <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-bold text-ash uppercase tracking-wider">
                    Progress Completed
                  </span>
                  <span className="font-extrabold text-revival">
                    {currentProject.progress || 62}%
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-revival to-emerald-400 shadow-[0_0_12px_#34d399]"
                    style={{ width: `${currentProject.progress || 62}%` }}
                  />
                </div>
              </div>

              {/* Tagline & Original Goal */}
              <div className="mt-6">
                <span className="text-xs font-bold uppercase tracking-wider text-ash">
                  Original Goal
                </span>
                <p className="mt-1 text-sm text-moonlight/90 leading-relaxed font-serif italic">
                  “{currentProject.tagline || currentProject.description}”
                </p>
              </div>

              {/* Cause of Demise */}
              {currentProject.causeOfDeath && (
                <div className="mt-6 rounded-xl border border-rose-500/20 bg-rose-500/[0.06] p-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-rose-300">
                    Reason for Stopping
                  </span>
                  <p className="mt-1 text-xs text-rose-100/90 leading-relaxed">
                    {currentProject.causeOfDeath}
                  </p>
                </div>
              )}
            </div>

            {/* Right Page of Grimoire */}
            <div className="rounded-2xl border border-white/[0.08] bg-[#0c1222]/80 p-6 md:p-8 backdrop-blur-md flex flex-col justify-between">
              <div>
                <div className="border-b border-white/[0.06] pb-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-ash">
                    UNFINISHED WORK & REMAINING ROADMAP
                  </span>
                </div>

                {/* Checklist */}
                <div className="mt-5 space-y-2.5">
                  {(currentProject.checklist || []).map((item, idx) => (
                    <div
                      key={idx}
                      className={`flex items-start gap-3 rounded-xl p-3 text-xs ${
                        item.done
                          ? 'border border-revival/20 bg-revival/[0.05] text-ash line-through'
                          : 'border border-white/10 bg-white/[0.02] text-moonlight'
                      }`}
                    >
                      <span className="mt-0.5">
                        {item.done ? (
                          <CheckCircle2 size={15} className="text-revival" />
                        ) : (
                          <span className="h-3.5 w-3.5 rounded-sm border border-ash/50 block" />
                        )}
                      </span>
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Stack Artifacts */}
                <div className="mt-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-ash block mb-2">
                    Artifact Technologies
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {(currentProject.techStack || []).map((t) => (
                      <span
                        key={t}
                        className="rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs text-moonlight"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Advance CTA */}
              <div className="mt-8 pt-4 border-t border-white/[0.08] flex items-center justify-between">
                <span className="text-xs text-ash">
                  Saved tools & inspiration await
                </span>
                <button
                  type="button"
                  onClick={() => setCurrentStep(4)}
                  className="flex items-center gap-2 rounded-full bg-revival px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#050811] hover:scale-105 transition"
                >
                  <span>Open Cabinet</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* STEP 4: REDISCOVER RESOURCES (THE CURIOSITY CABINET) */}
      {/* ========================================================= */}
      {currentStep === 4 && currentProject && (
        <div className="relative mt-10 rounded-[3rem] border border-white/15 bg-gradient-to-b from-[#0a1122]/95 via-[#060a14]/98 to-[#03060c] p-6 sm:p-10 md:p-14 shadow-2xl backdrop-blur-2xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/[0.08] pb-6 mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-revival">
                Stage 04 • Apothecary of Inspiration
              </span>
              <h3 className="font-display text-3xl md:text-4xl font-extrabold text-moonlight mt-1">
                The Curiosity Cabinet
              </h3>
              <p className="mt-2 text-sm text-ash max-w-xl">
                Explore the tools, tutorials, bookmarked libraries, and visual references that were
                preserved when this project was active.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-xs font-semibold text-ash hover:text-moonlight transition"
              >
                <ArrowLeft size={14} /> Back to Grimoire
              </button>

              <button
                type="button"
                onClick={() => setCurrentStep(5)}
                className="flex items-center gap-2 rounded-full bg-gradient-to-r from-revival to-emerald-400 px-5 py-2 text-xs font-bold uppercase tracking-wider text-[#050811] shadow-[0_0_20px_rgba(52,211,153,0.3)] hover:scale-105 transition"
              >
                <span>Decide Fate (Step 5)</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* Curiosity Cabinet Shelving Display */}
          <div className="rounded-3xl border-2 border-amber-600/30 bg-[#0d1322] p-6 sm:p-9 shadow-[0_0_60px_rgba(0,0,0,0.8)]">
            {/* Shelf 1: Saved Tools */}
            <div className="mb-8">
              <div className="flex items-center justify-between border-b border-amber-500/20 pb-2 mb-4">
                <h4 className="text-sm font-bold uppercase tracking-wider text-amber-300 flex items-center gap-2">
                  <span>🛠️</span>
                  <span>Shelf I: Saved Developer Tools & Engines</span>
                </h4>
                <span className="text-[11px] text-ash">Preserved in Cabinet</span>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {(currentProject.resources?.tools || [
                  { name: 'Core Engine', desc: 'Installed runtime & framework', badge: 'Stack' },
                ]).map((tool, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] p-3.5 hover:border-revival/40 transition"
                  >
                    <div>
                      <h5 className="text-sm font-bold text-moonlight">{tool.name}</h5>
                      <p className="text-xs text-ash mt-0.5">{tool.desc}</p>
                    </div>
                    <span className="rounded-md border border-revival/30 bg-revival/10 px-2 py-0.5 text-[10px] text-revival font-semibold">
                      {tool.badge || 'Tool'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Shelf 2: Saved Tutorials & Documentation */}
            <div className="mb-8">
              <div className="flex items-center justify-between border-b border-amber-500/20 pb-2 mb-4">
                <h4 className="text-sm font-bold uppercase tracking-wider text-amber-300 flex items-center gap-2">
                  <span>📜</span>
                  <span>Shelf II: Tutorials, Articles & Specifications</span>
                </h4>
                <span className="text-[11px] text-ash">Knowledge Vault</span>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {(currentProject.resources?.tutorials || [
                  { title: 'System Architecture Reference', type: 'Documentation' },
                ]).map((tut, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] p-3.5 hover:border-ghost/40 transition"
                  >
                    <div>
                      <h5 className="text-sm font-bold text-moonlight">{tut.title}</h5>
                      <span className="text-[10px] text-ghost font-medium">
                        {tut.type}
                      </span>
                    </div>
                    <span className="text-xs text-ash">🔖 Bookmarked</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Shelf 3: Inspirations & Moodboards */}
            <div>
              <div className="flex items-center justify-between border-b border-amber-500/20 pb-2 mb-4">
                <h4 className="text-sm font-bold uppercase tracking-wider text-amber-300 flex items-center gap-2">
                  <span>🔮</span>
                  <span>Shelf III: Inspirations & Creative Sparks</span>
                </h4>
                <span className="text-[11px] text-ash">Aesthetic Archives</span>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {(currentProject.resources?.inspirations || [
                  { title: 'Original Concept Inspiration', note: 'Saved concept notes' },
                ]).map((insp, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] p-3.5 hover:border-sky-400/40 transition"
                  >
                    <div>
                      <h5 className="text-sm font-bold text-moonlight">{insp.title}</h5>
                      <p className="text-xs text-ash mt-0.5">{insp.note}</p>
                    </div>
                    <span className="text-xl">✨</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* STEP 5: CHOOSE WHAT HAPPENS NEXT (THE CROSSROADS SIGNPOST) */}
      {/* ========================================================= */}
      {currentStep === 5 && currentProject && (
        <div className="relative mt-10 rounded-[3rem] border border-white/15 bg-gradient-to-b from-[#0a1122]/95 via-[#060a14]/98 to-[#03060c] p-6 sm:p-10 md:p-14 shadow-2xl backdrop-blur-2xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/[0.08] pb-6 mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-revival">
                Stage 05 • Crossroads of Destiny
              </span>
              <h3 className="font-display text-3xl md:text-4xl font-extrabold text-moonlight mt-1">
                Choose What Happens Next
              </h3>
              <p className="mt-2 text-sm text-ash max-w-xl">
                Decide whether to revive, restart, transform, or release <strong className="text-moonlight">“{currentProject.title}”</strong>.
                Every choice creates space for what comes next.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setCurrentStep(4)}
              className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-xs font-semibold text-ash hover:text-moonlight transition"
            >
              <ArrowLeft size={14} /> Back to Cabinet
            </button>
          </div>

          {/* The Crossroads Two Main Branches: REVIVE vs RELEASE */}
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Branch A: REVIVE */}
            <div className="rounded-3xl border border-revival/30 bg-[#0c1626]/80 p-6 md:p-8 backdrop-blur-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-revival/20 pb-4 mb-6">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">🌱</span>
                    <div>
                      <h4 className="font-display text-2xl font-bold text-revival">
                        REVIVE
                      </h4>
                      <p className="text-xs text-ash">
                        Continue, restart, or transform the idea
                      </p>
                    </div>
                  </div>
                  <span className="rounded-full border border-revival/40 bg-revival/10 px-3 py-1 text-xs font-bold text-revival">
                    Awakening
                  </span>
                </div>

                {/* Sub-actions */}
                <div className="space-y-4">
                  {/* CONTINUE */}
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-revival/40">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Play size={16} className="text-revival" />
                        <h5 className="text-sm font-bold text-moonlight">Continue</h5>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleReviveAction('continue')}
                        className="rounded-full bg-revival px-3 py-1 text-xs font-bold text-[#050811] hover:scale-105 transition"
                      >
                        Select
                      </button>
                    </div>
                    <p className="text-xs text-ash mt-1.5">
                      Pick up where you left off and keep building with your existing repo and stack.
                    </p>
                  </div>

                  {/* RESTART */}
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-ghost/40">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <RotateCcw size={16} className="text-ghost" />
                        <h5 className="text-sm font-bold text-moonlight">Restart</h5>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleReviveAction('restart')}
                        className="rounded-full bg-ghost px-3 py-1 text-xs font-bold text-[#050811] hover:scale-105 transition"
                      >
                        Select
                      </button>
                    </div>
                    <p className="text-xs text-ash mt-1.5">
                      Start fresh with new direction, cleared technical roadblocks, and renewed vision.
                    </p>
                  </div>

                  {/* TRANSFORM */}
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-sky-400/40">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Shuffle size={16} className="text-sky-300" />
                        <h5 className="text-sm font-bold text-moonlight">Transform</h5>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleReviveAction('transform')}
                        className="rounded-full bg-sky-400 px-3 py-1 text-xs font-bold text-[#050811] hover:scale-105 transition"
                      >
                        Select
                      </button>
                    </div>
                    <p className="text-xs text-ash mt-1.5">
                      Evolve the best feature into a new standalone tool, widget, or art experiment.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Branch B: RELEASE */}
            <div className="rounded-3xl border border-amber-400/30 bg-[#16121f]/80 p-6 md:p-8 backdrop-blur-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-amber-400/20 pb-4 mb-6">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">🏮</span>
                    <div>
                      <h4 className="font-display text-2xl font-bold text-amber-300">
                        RELEASE
                      </h4>
                      <p className="text-xs text-ash">
                        Send a glowing lantern into the starry sky
                      </p>
                    </div>
                  </div>
                  <span className="rounded-full border border-amber-400/40 bg-amber-400/10 px-3 py-1 text-xs font-bold text-amber-300">
                    Peaceful Departure
                  </span>
                </div>

                <div className="rounded-2xl border border-amber-400/20 bg-amber-400/[0.05] p-5 space-y-3 text-xs text-moonlight/90">
                  <div className="flex items-center gap-2">
                    <span className="text-base">📖</span>
                    <span>Your project’s history, lessons, and code are safely preserved.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-base">🏺</span>
                    <span>All resources and links remain in the Curiosity Cabinet forever.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-base">✨</span>
                    <span>Space and creative peace are cleared for what’s next.</span>
                  </div>
                </div>
              </div>

              {/* Release Action Trigger */}
              <div className="mt-8 pt-4 border-t border-amber-400/20">
                <button
                  type="button"
                  onClick={() => setShowLanternCeremony(true)}
                  className="w-full group flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 px-7 py-4 text-xs font-bold uppercase tracking-wider text-[#050811] shadow-[0_0_30px_rgba(251,191,36,0.4)] hover:scale-105 active:scale-95 transition-all"
                >
                  <Sparkles size={16} />
                  <span>Send Sky Lantern Ceremony (Fly into Sky)</span>
                </button>
              </div>
            </div>
          </div>

          {/* Footer Motto from User Flow Image */}
          <div className="mt-12 rounded-2xl border border-white/10 bg-[#050811]/70 p-5 text-center">
            <h5 className="font-display text-sm font-bold uppercase tracking-widest text-moonlight">
              A Conscious Decision
            </h5>
            <p className="mt-1 text-xs text-ash">
              Every idea deserves closure. Every conscious choice creates fertile ground for what’s next.
            </p>
          </div>
        </div>
      )}

      {/* Sky Lantern Interactive Ceremony Dialog */}
      {showLanternCeremony && (
        <SkyLanternCeremony
          project={currentProject}
          onComplete={handleReleaseComplete}
          onCancel={() => setShowLanternCeremony(false)}
        />
      )}

      {/* Blueprint Diagram Modal */}
      {showBlueprintModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative max-w-4xl w-full rounded-3xl border border-white/20 bg-[#070b16] p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
              <h4 className="font-display text-lg font-bold text-moonlight flex items-center gap-2">
                <span>🗺️</span>
                <span>User Flow Architecture Blueprint</span>
              </h4>
              <button
                type="button"
                onClick={() => setShowBlueprintModal(false)}
                className="p-1.5 rounded-full text-ash hover:text-white"
                aria-label="Close blueprint"
              >
                <X size={18} />
              </button>
            </div>
            <div className="rounded-xl overflow-hidden border border-white/10 bg-black flex items-center justify-center">
              <img
                src="/user-flow.png"
                alt="User Flow diagram"
                className="max-h-[75vh] w-auto object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
