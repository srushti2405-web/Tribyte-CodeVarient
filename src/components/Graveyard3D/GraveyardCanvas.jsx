import { Component, useState, useEffect, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import GraveyardScene from './GraveyardScene'
import GraveyardFallback from './GraveyardFallback'

class WebGLErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.warn('3D Graveyard Canvas fallback triggered:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return <GraveyardFallback />
    }
    return this.props.children
  }
}

export default function GraveyardCanvas() {
  const [webglSupported] = useState(() => {
    if (typeof window === 'undefined') return true
    try {
      const canvas = document.createElement('canvas')
      const gl =
        canvas.getContext('webgl2') ||
        canvas.getContext('webgl') ||
        canvas.getContext('experimental-webgl')
      return !!gl
    } catch {
      return false
    }
  })

  const [reducedMotion, setReducedMotion] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  const [tabActive, setTabActive] = useState(true)

  useEffect(() => {
    // Check reduced motion updates
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handleMotionChange = (e) => setReducedMotion(e.matches)
    motionQuery.addEventListener('change', handleMotionChange)

    // Visibility change
    const handleVisibility = () => {
      setTabActive(document.visibilityState === 'visible')
    }
    document.addEventListener('visibilitychange', handleVisibility)

    return () => {
      motionQuery.removeEventListener('change', handleMotionChange)
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [])

  if (!webglSupported) {
    return <GraveyardFallback />
  }

  return (
    <div
      className="fixed inset-0 pointer-events-none -z-10 overflow-hidden bg-[#03060c]"
      aria-hidden="true"
    >
      <WebGLErrorBoundary>
        <Suspense fallback={<GraveyardFallback />}>
          <Canvas
            camera={{ position: [0, 1.4, 7.5], fov: 55 }}
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: 'high-performance',
            }}
            dpr={[1, 1.5]}
            frameloop={tabActive ? 'always' : 'never'}
            className="w-full h-full"
          >
            <GraveyardScene reducedMotion={reducedMotion} />
          </Canvas>
        </Suspense>
      </WebGLErrorBoundary>

      {/* Atmospheric dark contrast vignette to ensure text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#03060c]/70 via-transparent to-[#03060c]/90 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,transparent_30%,#03060c_95%)] pointer-events-none opacity-85" />
    </div>
  )
}
