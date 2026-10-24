import { useState, useRef, useEffect } from 'react'
import { Volume2, VolumeX } from 'lucide-react'

export default function AmbientAudio() {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioCtxRef = useRef(null)
  const masterGainRef = useRef(null)
  const oscillatorsRef = useRef([])

  const stopAudio = () => {
    if (audioCtxRef.current) {
      if (masterGainRef.current) {
        masterGainRef.current.gain.setTargetAtTime(0, audioCtxRef.current.currentTime, 0.4)
      }
      setTimeout(() => {
        try {
          audioCtxRef.current?.close()
        } catch {
          // ignore
        }
        audioCtxRef.current = null
        oscillatorsRef.current = []
        setIsPlaying(false)
      }, 450)
    }
  }

  const startAudio = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext
      if (!AudioCtx) return

      const ctx = new AudioCtx()
      audioCtxRef.current = ctx

      const masterGain = ctx.createGain()
      masterGain.gain.setValueAtTime(0.01, ctx.currentTime)
      masterGain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 2.0)
      masterGain.connect(ctx.destination)
      masterGainRef.current = masterGain

      // Gentle midnight wind bandpass noise
      const bufferSize = ctx.sampleRate * 2
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
      const output = noiseBuffer.getChannelData(0)
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1
      }

      const whiteNoise = ctx.createBufferSource()
      whiteNoise.buffer = noiseBuffer
      whiteNoise.loop = true

      const filter = ctx.createBiquadFilter()
      filter.type = 'bandpass'
      filter.frequency.setValueAtTime(220, ctx.currentTime)
      filter.Q.setValueAtTime(2.5, ctx.currentTime)

      const noiseGain = ctx.createGain()
      noiseGain.gain.setValueAtTime(0.08, ctx.currentTime)

      whiteNoise.connect(filter)
      filter.connect(noiseGain)
      noiseGain.connect(masterGain)
      whiteNoise.start()

      // Ethereal low drone (mystical organ / crystal resonance)
      const freqs = [65.41, 98.0, 130.81, 196.0] // C2, G2, C3, G3
      const oscs = freqs.map((freq) => {
        const osc = ctx.createOscillator()
        const oscGain = ctx.createGain()
        osc.type = 'sine'
        osc.frequency.setValueAtTime(freq, ctx.currentTime)

        // Detune slightly for lush chorusing
        osc.detune.setValueAtTime((Math.random() - 0.5) * 8, ctx.currentTime)

        oscGain.gain.setValueAtTime(0.035, ctx.currentTime)
        osc.connect(oscGain)
        oscGain.connect(masterGain)
        osc.start()
        return osc
      })

      oscillatorsRef.current = [whiteNoise, ...oscs]
      setIsPlaying(true)
    } catch (err) {
      console.warn('Ambient audio could not start:', err)
      setIsPlaying(false)
    }
  }

  const toggleAudio = () => {
    if (isPlaying) {
      stopAudio()
    } else {
      startAudio()
    }
  }

  useEffect(() => {
    return () => {
      stopAudio()
    }
  }, [])

  return (
    <button
      type="button"
      onClick={toggleAudio}
      className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all duration-300 ${
        isPlaying
          ? 'border-revival/40 bg-revival/10 text-revival shadow-[0_0_15px_rgba(52,211,153,0.25)]'
          : 'border-white/10 bg-white/[0.03] text-ash hover:border-white/20 hover:text-moonlight'
      }`}
      title={isPlaying ? 'Mute eerie graveyard atmosphere' : 'Play eerie graveyard atmosphere'}
      aria-label={isPlaying ? 'Mute eerie graveyard atmosphere' : 'Play eerie graveyard atmosphere'}
    >
      {isPlaying ? (
        <>
          <Volume2 size={14} className="animate-pulse text-revival" />
          <span className="hidden sm:inline">Graveyard Winds: On</span>
          <span className="sm:hidden">Sound: On</span>
        </>
      ) : (
        <>
          <VolumeX size={14} />
          <span className="hidden sm:inline">Graveyard Winds: Off</span>
          <span className="sm:hidden">Sound: Off</span>
        </>
      )}
    </button>
  )
}
