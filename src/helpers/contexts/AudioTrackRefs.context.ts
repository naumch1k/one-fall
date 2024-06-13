import { createContext, useContext } from 'react'
import { TAudioRef } from '@/helpers/types'

const AudioTrackRefsContext = createContext<Record<string, TAudioRef> | undefined>(undefined)

export const AudioTrackRefsProvider = AudioTrackRefsContext.Provider

export const useAudioTrackRefs = () => {
  const context = useContext(AudioTrackRefsContext)

  if (context === undefined) {
    throw new Error(
      'The useAudioTrack hook must be used within a AudioTrackProvider'
    )
  }

  return context
}
