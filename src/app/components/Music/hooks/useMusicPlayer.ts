import { useEffect, useReducer } from 'react'
import { TAudioRef } from '@/helpers/types'

type TMusicPlayerState = {
  prevTrackName: string
  currentTrackName: string
  isPlaying: boolean
  currentTrackTimeProgress: number
}

enum MusicPlayerActionTypes {
  Play,
  Pause,
  UpdateProgress,
  ResetProgress,
}

type MusicPlayerAction =
  | { type: MusicPlayerActionTypes.Play; payload: { trackName: string } }
  | { type: MusicPlayerActionTypes.Pause }
  | { type: MusicPlayerActionTypes.UpdateProgress; payload: { time: number } }
  | { type: MusicPlayerActionTypes.ResetProgress }

const initialState: TMusicPlayerState = {
  prevTrackName: '',
  currentTrackName: '',
  isPlaying: false,
  currentTrackTimeProgress: 0,
}

const reducer = (state: TMusicPlayerState, action: MusicPlayerAction) => {
  switch (action.type) {
    case MusicPlayerActionTypes.Play:
      return {
        ...state,
        isPlaying: true,
        currentTrackName: action.payload.trackName,
      }
    case MusicPlayerActionTypes.Pause:
      return {
        ...state,
        isPlaying: false,
        prevTrackName: state.currentTrackName,
        currentTrackName: '',
      }
    case MusicPlayerActionTypes.UpdateProgress:
      return {
        ...state,
        currentTrackTimeProgress: action.payload.time,
      }
    case MusicPlayerActionTypes.ResetProgress:
      return {
        ...state,
        prevTrackName: state.currentTrackName,
        currentTrackTimeProgress: 0,
      }
    default:
      return state
  }
}

export const useMusicPlayer = (audioTrackRefs: Record<string, TAudioRef>) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    const updateProgress = () => {
      const currentTrackElement = audioTrackRefs[state.currentTrackName]?.current

      if (currentTrackElement) {
        dispatch({
          type: MusicPlayerActionTypes.UpdateProgress,
          payload: { time: currentTrackElement.currentTime },
        })
      }
    }

    if (state.isPlaying) {
      const intervalId = setInterval(updateProgress, 1000)
      return () => clearInterval(intervalId)
    }
  }, [state.isPlaying, state.currentTrackName, audioTrackRefs])

  const handlePlayPauseClick = (newTrackName: string) => {
    const newTrackElement = audioTrackRefs[newTrackName]?.current

    if (newTrackElement) {
      if (state.isPlaying) {
        if (state.currentTrackName !== newTrackName) {
          Object.values(audioTrackRefs).forEach(ref => ref.current?.pause())

          dispatch({ type: MusicPlayerActionTypes.ResetProgress })
          dispatch({ type: MusicPlayerActionTypes.Play, payload: { trackName: newTrackName } })

          newTrackElement.currentTime = 0
          newTrackElement.play()
        } else {
          dispatch({ type: MusicPlayerActionTypes.Pause })

          newTrackElement.pause()
        }
      } else {
        if (state.prevTrackName !== newTrackName) {
          dispatch({ type: MusicPlayerActionTypes.ResetProgress })
          newTrackElement.currentTime = 0
        }

        dispatch({ type: MusicPlayerActionTypes.Play, payload: { trackName: newTrackName } })
        newTrackElement.play()
      }
    }
  }

  return {
    currentTrackName: state.currentTrackName,
    currentTrackTimeProgress: state.currentTrackTimeProgress,
    handlePlayPauseClick,
  }
}
