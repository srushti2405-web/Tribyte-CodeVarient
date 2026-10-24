
import {
  Ghost,
  ArrowRight,
  Archive,
  Sparkles,
  RefreshCw,
  Shuffle,
  Heart,
  BookOpen,
  Plus,
  Moon,
  ChevronRight,
} from 'lucide-react'

const features = [
  {
    icon: Archive,
    number: '01',
    title: 'Preserve',
    description:
      'Give unfinished ideas a home. Save your notes, links, files, and the story behind every project.',
    color: 'text-ghost',
  },
  {
    icon: RefreshCw,
    number: '02',
    title: 'Revive',
    description:
      'Return to a project with fresh eyes. Pick up where you left off and turn almost into accomplished.',
    color: 'text-revival',
  },
  {
    icon: Shuffle,
    number: '03',
    title: 'Transform',
    description:
      'An old idea can become something new. Change direction, explore a new purpose, and experiment.',
    color: 'text-ghost',
  },
  {
    icon: Heart,
    number: '04',
    title: 'Release',
    description:
      'Not every idea needs finishing. Let go intentionally, celebrate what you learned, and move forward.',
    color: 'text-revival',
  },
]

const projects = [
  {
    symbol: '✳',
    title: 'The Habit Garden',
    category: 'PERSONAL GROWTH',
    description: 'A tiny garden that grows with every habit you keep.',
    status: 'Ready to revive',
    color: 'text-revival',
  },
  {
    symbol: '☾',
    title: 'Midnight Letters',
    category: 'CREATIVE WRITING',
    description: 'A collection of letters to the people we used to be.',
    status: 'Resting peacefully',
    color: 'text-ghost',
  },
  {
    symbol: '⌘',
    title: 'Sound of Somewhere',
    category: 'EXPERIMENTAL',
    description: 'A sound map of places that feel like home.',
    status: 'Waiting for you',
    color: 'text-revival',
  },
]

function App() {
  return (
    <main className="min-h-screen overflow-hidden bg-transparent text-moonlight">
      {/* Navigation */}
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 md:px-10">
        <a href="#home" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-revival/20 bg-revival/10">
            <Ghost className="text-revival" size={24} />
          </div>
          <span className="font-display text-lg font-bold tracking-tight">
            Project <span className="text-revival">Graveyard</span>
          </span>
        </a>

        <div className="hidden items-center gap-8 text-sm text-ash md:flex">
          <a href="#home" className="transition hover:text-revival">Home</a>
          <a href="#about" className="transition hover:text-revival">About</a>
          <a href="#archive" className="transition hover:text-revival">The Archive</a>
        </div>

        <a
          href="#archive"
          className="flex items-center gap-2 rounded-full bg-revival px-5 py-2.5 text-sm font-bold text-graveyard transition hover:scale-105"
        >
          Enter Archive <ArrowRight size={16} />
        </a>
      </nav>

      {/* Hero */}
      <section
        id="home"
        className="relative mx-auto flex min-h-[650px] max-w-7xl flex-col items-center justify-center px-6 py-24 text-center"
      >
        <div className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ghost/10 blur-[110px]" />

        <div className="relative mb-8 inline-flex items-center gap-2 rounded-full border border-ghost/20 bg-ghost/5 px-4 py-2 text-xs tracking-wide text-ghost md:text-sm">
          <Sparkles size={14} />
          A sanctuary for unfinished ideas
        </div>

        <div className="relative mb-5 flex h-24 w-24 items-center justify-center rounded-[2rem] border border-revival/20 bg-gradient-to-br from-revival/10 to-ghost/10 shadow-2xl shadow-ghost/5">
          <Ghost size={56} strokeWidth={1.3} className="text-revival" />
          <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full border border-graveyard bg-ghost text-graveyard">
            <Moon size={14} />
          </span>
        </div>

        <p className="relative mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-ash">
          Every ending holds a beginning
        </p>

        <h1 className="relative max-w-4xl font-display text-5xl font-bold leading-[1.08] tracking-tight md:text-7xl lg:text-8xl">
          Your ideas
          <br />
          deserve a <span className="text-revival">second life.</span>
        </h1>

        <p className="relative mt-7 max-w-2xl text-base leading-8 text-ash md:text-lg">
          Not every project gets finished. That doesn't mean it has to be
          forgotten. Give your abandoned ideas a place to rest, rediscover
          their spark, and choose what happens next.
        </p>

        <div className="relative mt-9 flex flex-wrap justify-center gap-4">
          <a
            href="#archive"
            className="flex items-center gap-2 rounded-full bg-revival px-7 py-3.5 font-bold text-graveyard transition hover:scale-105"
          >
            Explore the Archive <ArrowRight size={18} />
          </a>
          <a
            href="#about"
            className="flex items-center gap-2 rounded-full border border-white/15 px-7 py-3.5 font-semibold text-moonlight transition hover:border-ghost/60 hover:text-ghost"
          >
            <BookOpen size={17} /> Our Philosophy
          </a>
        </div>

        <div className="relative mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-ash">
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-revival" />
            No idea left behind
          </span>
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-ghost" />
            Progress without pressure
          </span>
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-amber-300" />
            Every ending is a choice
          </span>
        </div>
      </section>

      {/* Philosophy */}
      <section id="about" className="border-y border-white/[0.07] bg-white/[0.015] px-6 py-24 md:px-10">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[0.8fr_1.2fr] md:items-center">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-revival">
              A different perspective
            </p>
            <h2 className="font-display text-3xl font-bold leading-tight md:text-5xl">
              A graveyard
              <br />
              isn't the end.
              <br />
              <span className="text-ghost">It's a beginning.</span>
            </h2>
          </div>

          <div className="space-y-5 text-base leading-8 text-ash">
            <p>
              We all have them. The half-built app, the notebook full of
              ideas, the design that never made it past the first draft.
            </p>
            <p>
              Project Graveyard is a home for the things you started but
              couldn't finish. No guilt. No pressure. Just a quiet space
              to remember why you began and decide what comes next.
            </p>
            <p className="font-display text-lg italic text-moonlight">
              “An unfinished project is not a failed project. It's a story
              waiting for its next chapter.”
            </p>
          </div>
        </div>
      </section>

      {/* Four actions */}
      <section id="features" className="mx-auto max-w-7xl px-6 py-24 md:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-revival">
            Your ideas, your choice
          </p>
          <h2 className="font-display text-3xl font-bold md:text-5xl">
            What will you do with the past?
          </h2>
          <p className="mt-5 leading-7 text-ash">
            Every project has a story. Choose how yours continues.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <article
                key={feature.number}
                className="group rounded-2xl border border-white/[0.08] bg-archive p-6 transition duration-300 hover:-translate-y-1 hover:border-revival/30"
              >
                <div className="mb-8 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.04]">
                    <Icon size={23} className={feature.color} />
                  </div>
                  <span className="font-display text-sm text-ash/60">
                    {feature.number}
                  </span>
                </div>
                <h3 className="font-display text-xl font-semibold">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-ash">
                  {feature.description}
                </p>
                <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-revival opacity-0 transition group-hover:opacity-100">
                  Discover more <ChevronRight size={14} />
                </div>
              </article>
            )
          })}
        </div>
      </section>

      {/* Example projects */}
      <section id="archive" className="border-y border-white/[0.07] bg-white/[0.015] px-6 py-24 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-ghost">
                The forgotten collection
              </p>
              <h2 className="font-display text-3xl font-bold md:text-5xl">
                Whispers from the archive
              </h2>
              <p className="mt-4 max-w-xl leading-7 text-ash">
                Every project here once began with a spark. Here are a few
                waiting for their next chapter.
              </p>
            </div>
            <button
              type="button"
              onClick={() => document.getElementById('add-project')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex w-fit items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-semibold transition hover:border-revival/50 hover:text-revival"
            >
              <Plus size={17} /> Add an idea
            </button>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {projects.map((project) => (
              <article
                key={project.title}
                className="rounded-2xl border border-white/[0.08] bg-archive p-6 transition hover:border-ghost/30"
              >
                <div className="mb-8 flex h-36 items-center justify-center overflow-hidden rounded-xl border border-white/[0.05] bg-gradient-to-br from-ghost/[0.08] to-revival/[0.04]">
                  <span className={`font-display text-6xl ${project.color}`}>
                    {project.symbol}
                  </span>
                </div>
                <p className="text-[10px] font-semibold tracking-[0.2em] text-ash">
                  {project.category}
                </p>
                <h3 className="mt-2 font-display text-xl font-semibold">
                  {project.title}
                </h3>
                <p className="mt-3 min-h-12 text-sm leading-6 text-ash">
                  {project.description}
                </p>
                <div className="mt-6 flex items-center justify-between border-t border-white/[0.08] pt-4">
                  <span className="text-xs text-ash">{project.status}</span>
                  <button
                    type="button"
                    onClick={() => alert(`${project.title}: Imagine its next chapter. Add revival actions here!`)}
                    className="flex items-center gap-1 text-xs font-bold text-revival transition hover:text-ghost"
                  >
                    Revisit <ArrowRight size={14} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section id="add-project" className="px-6 py-24 text-center">
        <div className="mx-auto max-w-3xl rounded-3xl border border-ghost/15 bg-gradient-to-br from-ghost/[0.08] to-revival/[0.04] px-6 py-14 md:px-14 md:py-20">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-revival/10">
            <Sparkles className="text-revival" size={28} />
          </div>
          <h2 className="font-display text-3xl font-bold md:text-5xl">
            Something still on your mind?
          </h2>
          <p className="mx-auto mt-5 max-w-xl leading-7 text-ash">
            That idea you can't quite let go of? It deserves a place here.
            Give it a home, even if you're not ready to finish it.
          </p>
          <button
            type="button"
            onClick={() => alert('Project creation form coming next!')}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-revival px-7 py-3.5 font-bold text-graveyard transition hover:scale-105"
          >
            <Plus size={18} /> Give an idea a home
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.08] px-6 py-8 md:px-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 text-center sm:flex-row sm:text-left">
          <a href="#home" className="flex items-center gap-2 font-display font-bold">
            <Ghost className="text-revival" size={22} />
            Project Graveyard
          </a>
          <p className="text-xs text-ash">
            Made for the ideas that deserve another chance.
          </p>
          <a
            href="#home"
            className="flex items-center gap-2 text-xs text-ash transition hover:text-revival"
          >
            Back to the surface ↑
          </a>
        </div>
      </footer>
    </main>
  )
}

export default App
