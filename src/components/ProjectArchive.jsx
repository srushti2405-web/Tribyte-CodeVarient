import { useState, useMemo } from 'react'
import {
  Search,
  Filter,
  Plus,
  ArrowUpDown,
  X,
  Archive,
  RotateCcw,
} from 'lucide-react'
import ProjectCard from './ProjectCard'

export default function ProjectArchive({
  projects,
  onInspect,
  onEdit,
  onDelete,
  onToggleResurrect,
  onOpenCreateModal,
  selectedFateFilter,
  onClearFateFilter,
}) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedStatus, setSelectedStatus] = useState('All')
  const [sortBy, setSortBy] = useState('newest')

  // Categories list derived dynamically + defaults
  const categories = useMemo(() => {
    const set = new Set(['All'])
    projects.forEach((p) => {
      if (p.category) set.add(p.category)
    })
    return Array.from(set)
  }, [projects])

  // Filter & Sort logic
  const filteredProjects = useMemo(() => {
    return projects
      .filter((project) => {
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase()
          const matchTitle = project.title.toLowerCase().includes(q)
          const matchDesc = (project.description || '').toLowerCase().includes(q)
          const matchTagline = (project.tagline || '').toLowerCase().includes(q)
          const matchEpitaph = (project.epitaph || '').toLowerCase().includes(q)
          const matchCause = (project.causeOfDeath || '').toLowerCase().includes(q)
          const matchTech = (project.techStack || []).some((t) =>
            t.toLowerCase().includes(q)
          )

          if (
            !matchTitle &&
            !matchDesc &&
            !matchTagline &&
            !matchEpitaph &&
            !matchCause &&
            !matchTech
          ) {
            return false
          }
        }

        // Category filter
        if (selectedCategory !== 'All' && project.category !== selectedCategory) {
          return false
        }

        // Status filter
        if (selectedStatus !== 'All' && project.status !== selectedStatus) {
          return false
        }

        // Fate filter (if passed from FateSection)
        if (selectedFateFilter && selectedFateFilter !== 'All') {
          if (project.fate !== selectedFateFilter) {
            return false
          }
        }

        return true
      })
      .sort((a, b) => {
        if (sortBy === 'newest') {
          return (b.lastUpdated || '').localeCompare(a.lastUpdated || '')
        }
        if (sortBy === 'oldest') {
          return (a.lastUpdated || '').localeCompare(b.lastUpdated || '')
        }
        if (sortBy === 'title') {
          return a.title.localeCompare(b.title)
        }
        if (sortBy === 'revival') {
          const order = { 'Ready for Revival': 1, 'Resting': 2, 'Resurrected': 3 }
          return (order[a.status] || 9) - (order[b.status] || 9)
        }
        return 0
      })
  }, [
    projects,
    searchQuery,
    selectedCategory,
    selectedStatus,
    selectedFateFilter,
    sortBy,
  ])

  const clearAllFilters = () => {
    setSearchQuery('')
    setSelectedCategory('All')
    setSelectedStatus('All')
    if (onClearFateFilter) onClearFateFilter()
  }

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedCategory !== 'All' ||
    selectedStatus !== 'All' ||
    (selectedFateFilter && selectedFateFilter !== 'All')

  return (
    <section
      id="archive"
      className="relative mx-auto max-w-7xl px-6 py-28 md:px-10"
    >
      {/* Archive Header */}
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-revival/25 bg-revival/[0.07] px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-revival mb-4">
            <Archive size={13} />
            The Catacombs
          </div>
          <h2 className="font-display text-4xl font-extrabold text-moonlight md:text-5xl">
            Whispers from the Archive
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ash">
            Browse through the entombed projects, inspect their original architecture,
            and discover the missing spark needed to revive them.
          </p>
        </div>

        {/* Action Button */}
        <button
          type="button"
          onClick={onOpenCreateModal}
          className="flex w-fit items-center gap-2 rounded-full bg-gradient-to-r from-revival to-emerald-400 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-[#050811] shadow-[0_0_25px_rgba(52,211,153,0.3)] transition-all duration-300 hover:scale-105 active:scale-95"
        >
          <Plus size={16} />
          <span>Entomb New Idea</span>
        </button>
      </div>

      {/* Control Bar: Search, Category, Status, Sort */}
      <div className="mt-12 rounded-3xl border border-white/[0.08] bg-[#0c1222]/70 p-5 md:p-6 backdrop-blur-2xl shadow-2xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-ash/70"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, cause of demise, tech, epitaph..."
              className="w-full rounded-2xl border border-white/10 bg-white/[0.03] pl-11 pr-10 py-3 text-sm text-moonlight placeholder-ash/50 focus:border-revival/50 focus:outline-none focus:ring-2 focus:ring-revival/20 transition"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 rounded-full p-1 text-ash hover:text-moonlight"
                aria-label="Clear search query"
              >
                <X size={15} />
              </button>
            )}
          </div>

          {/* Filters Row */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Status Filter */}
            <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5">
              <Filter size={14} className="text-ash" />
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="bg-transparent text-xs font-medium text-moonlight focus:outline-none cursor-pointer"
                aria-label="Filter by sanctuary status"
              >
                <option value="All" className="bg-[#0b101c]">All Statuses</option>
                <option value="Resting" className="bg-[#0b101c]">Resting</option>
                <option value="Ready for Revival" className="bg-[#0b101c]">Ready for Revival</option>
                <option value="Resurrected" className="bg-[#0b101c]">Resurrected</option>
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5">
              <ArrowUpDown size={14} className="text-ash" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-xs font-medium text-moonlight focus:outline-none cursor-pointer"
                aria-label="Sort projects"
              >
                <option value="newest" className="bg-[#0b101c]">Newest Buried</option>
                <option value="oldest" className="bg-[#0b101c]">Oldest Buried</option>
                <option value="title" className="bg-[#0b101c]">Title (A-Z)</option>
                <option value="revival" className="bg-[#0b101c]">Revival Readiness</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Pills & Active Fate Indicator */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.06] pt-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-ash/80 mr-1 hidden sm:inline">
              Category:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                  selectedCategory === cat
                    ? 'border border-revival/40 bg-revival/15 text-revival shadow-[0_0_12px_rgba(52,211,153,0.2)]'
                    : 'border border-white/5 bg-white/[0.03] text-ash hover:border-white/15 hover:text-moonlight'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Active Fate filter pill if active */}
          {selectedFateFilter && (
            <div className="flex items-center gap-2 rounded-full border border-revival/30 bg-revival/10 px-3 py-1 text-xs text-revival">
              <span>Fate: {selectedFateFilter}</span>
              <button
                type="button"
                onClick={onClearFateFilter}
                className="hover:text-moonlight"
                aria-label="Remove fate filter"
              >
                <X size={13} />
              </button>
            </div>
          )}

          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearAllFilters}
              className="flex items-center gap-1.5 text-xs font-medium text-ash hover:text-rose-400 transition ml-auto"
            >
              <RotateCcw size={13} />
              <span>Reset All Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onInspect={onInspect}
              onEdit={onEdit}
              onDelete={onDelete}
              onToggleResurrect={onToggleResurrect}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="mt-16 rounded-3xl border border-dashed border-white/15 bg-[#0b101c]/50 p-12 text-center backdrop-blur-xl">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-3xl">
            🪦
          </div>
          <h3 className="mt-4 font-display text-xl font-bold text-moonlight">
            No Resting Ideas Found
          </h3>
          <p className="mx-auto mt-2 max-w-md text-sm text-ash leading-relaxed">
            No projects matched your tombstone search criteria. Try relaxing your filters
            or bury a new idea to populate this corner of the graveyard.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={clearAllFilters}
              className="rounded-full border border-white/20 bg-white/[0.05] px-6 py-2.5 text-xs font-bold text-moonlight hover:bg-white/10 transition"
            >
              Clear Filters
            </button>
            <button
              type="button"
              onClick={onOpenCreateModal}
              className="flex items-center gap-2 rounded-full bg-revival px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-[#050811] shadow-lg shadow-revival/20 hover:scale-105 transition"
            >
              <Plus size={15} />
              <span>Bury an Idea Now</span>
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
