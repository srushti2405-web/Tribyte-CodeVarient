import * as THREE from 'three'

// Memoized procedural textures to prevent recreation
let glowTextureCache = null
let fogTextureCache = null
let particleTextureCache = null

export function getParticleTexture() {
  if (particleTextureCache) return particleTextureCache

  const canvas = document.createElement('canvas')
  canvas.width = 64
  canvas.height = 64
  const ctx = canvas.getContext('2d')

  if (ctx) {
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)')
    gradient.addColorStop(0.2, 'rgba(167, 243, 208, 0.9)')
    gradient.addColorStop(0.5, 'rgba(196, 181, 253, 0.4)')
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')

    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 64, 64)
  }

  particleTextureCache = new THREE.CanvasTexture(canvas)
  return particleTextureCache
}

export function getMoonGlowTexture() {
  if (glowTextureCache) return glowTextureCache

  const canvas = document.createElement('canvas')
  canvas.width = 256
  canvas.height = 256
  const ctx = canvas.getContext('2d')

  if (ctx) {
    const gradient = ctx.createRadialGradient(128, 128, 10, 128, 128, 128)
    gradient.addColorStop(0, 'rgba(230, 245, 255, 0.95)')
    gradient.addColorStop(0.3, 'rgba(180, 215, 255, 0.45)')
    gradient.addColorStop(0.65, 'rgba(147, 197, 253, 0.15)')
    gradient.addColorStop(0.85, 'rgba(196, 181, 253, 0.06)')
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')

    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 256, 256)
  }

  glowTextureCache = new THREE.CanvasTexture(canvas)
  return glowTextureCache
}

export function getFogTexture() {
  if (fogTextureCache) return fogTextureCache

  const canvas = document.createElement('canvas')
  canvas.width = 256
  canvas.height = 256
  const ctx = canvas.getContext('2d')

  if (ctx) {
    const gradient = ctx.createRadialGradient(128, 128, 20, 128, 128, 128)
    gradient.addColorStop(0, 'rgba(180, 205, 225, 0.35)')
    gradient.addColorStop(0.4, 'rgba(160, 185, 215, 0.22)')
    gradient.addColorStop(0.7, 'rgba(196, 181, 253, 0.10)')
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')

    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 256, 256)
  }

  fogTextureCache = new THREE.CanvasTexture(canvas)
  return fogTextureCache
}
