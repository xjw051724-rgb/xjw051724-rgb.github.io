import { Music2, VolumeX } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

type AmbientSoundToggleProps = {
  className?: string
}

const AMBIENT_AUDIO_SRC = '/assets/portfolio-ambient.mp4'
const AMBIENT_VOLUME = .12
const AMBIENT_PLAYBACK_RATE = .8

export function AmbientSoundToggle({ className }: AmbientSoundToggleProps) {
  const [isEnabled, setIsEnabled] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => () => {
    const audio = audioRef.current
    if (!audio) return
    audio.pause()
    audio.currentTime = 0
  }, [])

  const toggleSound = async () => {
    const audio = audioRef.current
    if (!audio) return

    if (isEnabled) {
      audio.pause()
      audio.currentTime = 0
      setIsEnabled(false)
      return
    }

    audio.volume = AMBIENT_VOLUME
    audio.defaultPlaybackRate = AMBIENT_PLAYBACK_RATE
    audio.playbackRate = AMBIENT_PLAYBACK_RATE
    setIsEnabled(true)

    try {
      await audio.play()
    } catch {
      setIsEnabled(false)
    }
  }

  return (
    <>
      <audio data-testid="portfolio-ambient-audio" loop preload="none" ref={audioRef} src={AMBIENT_AUDIO_SRC} />
      <button
        aria-label={isEnabled ? '关闭环境音' : '打开环境音'}
        aria-pressed={isEnabled}
        className={`portfolio-sound-toggle${className ? ` ${className}` : ''}`}
        onClick={() => void toggleSound()}
        title={isEnabled ? '关闭环境音' : '打开环境音'}
        type="button"
      >
        {isEnabled ? <Music2 aria-hidden="true" size={18} strokeWidth={1.8} /> : <VolumeX aria-hidden="true" size={18} strokeWidth={1.8} />}
      </button>
    </>
  )
}
