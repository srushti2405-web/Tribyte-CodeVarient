import { DEFAULT_PROJECTS } from '../data/defaultProjects'

const STORAGE_KEY = 'project_graveyard_projects_v2'

export function loadProjects() {
  if (typeof window === 'undefined') {
    return DEFAULT_PROJECTS
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      saveProjects(DEFAULT_PROJECTS)
      return DEFAULT_PROJECTS
    }
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed) || parsed.length === 0) {
      saveProjects(DEFAULT_PROJECTS)
      return DEFAULT_PROJECTS
    }
    return parsed
  } catch (err) {
    console.error('Failed to load projects from localStorage:', err)
    return DEFAULT_PROJECTS
  }
}

export function saveProjects(projects) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects))
  } catch (err) {
    console.error('Failed to save projects to localStorage:', err)
  }
}

export function resetToDefaults() {
  saveProjects(DEFAULT_PROJECTS)
  return DEFAULT_PROJECTS
}
