import { useEffect, useReducer } from 'react'
import { TAudioRef } from '@/helpers/types'

type TMusicPlayerState = {
  prevTrackName: string
  currentTrackName: string
  isPlaying: boolean
  playbackPaused: boolean
  currentTrackTimeProgress: number
}

enum MusicPlayerActionTypes {
  Play,
  Pause,
  UpdateProgress,
  ResetProgress,
}

const { Play, Pause, UpdateProgress, ResetProgress } = MusicPlayerActionTypes

type MusicPlayerAction =
  | { type: MusicPlayerActionTypes.Play; payload: { trackName: string } }
  | { type: MusicPlayerActionTypes.Pause }
  | { type: MusicPlayerActionTypes.UpdateProgress; payload: { time: number } }
  | { type: MusicPlayerActionTypes.ResetProgress }

const initialState: TMusicPlayerState = {
  prevTrackName: '',
  currentTrackName: '',
  isPlaying: false,
  playbackPaused: false,
  currentTrackTimeProgress: 0,
}

const reducer = (state: TMusicPlayerState, action: MusicPlayerAction) => {
  switch (action.type) {
    case Play:
      return {
        ...state,
        isPlaying: true,
        playbackPaused: false,
        currentTrackName: action.payload.trackName,
      }
    case Pause:
      return {
        ...state,
        isPlaying: false,
        playbackPaused: true,
        prevTrackName: state.currentTrackName,
        currentTrackName: '',
      }
    case UpdateProgress:
      return {
        ...state,
        currentTrackTimeProgress: action.payload.time,
      }
    case ResetProgress:
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
  const [
    { prevTrackName, currentTrackName, isPlaying, playbackPaused, currentTrackTimeProgress },
    dispatch,
  ] = useReducer(reducer, initialState)

  useEffect(() => {
    const updateProgress = () => {
      const currentTrackElement = audioTrackRefs[currentTrackName]?.current

      if (currentTrackElement) {
        dispatch({
          type: UpdateProgress,
          payload: { time: currentTrackElement.currentTime },
        })
      }
    }

    if (isPlaying) {
      const intervalId = setInterval(updateProgress, 1000)
      return () => clearInterval(intervalId)
    }
  }, [isPlaying, currentTrackName, audioTrackRefs])

  const handlePlayPauseClick = (newTrackName: string) => {
    const newTrackElement = audioTrackRefs[newTrackName]?.current

    if (newTrackElement) {
      if (isPlaying) {
        if (currentTrackName !== newTrackName) {
          Object.values(audioTrackRefs).forEach(ref => ref.current?.pause())

          dispatch({ type: ResetProgress })
          dispatch({
            type: Play,
            payload: { trackName: newTrackName },
          })

          newTrackElement.currentTime = 0
          newTrackElement.play()
        } else {
          dispatch({ type: Pause })

          newTrackElement.pause()
        }
      } else {
        if (prevTrackName !== newTrackName) {
          dispatch({ type: ResetProgress })
          newTrackElement.currentTime = 0
        }

        dispatch({
          type: Play,
          payload: { trackName: newTrackName },
        })
        newTrackElement.play()
      }
    }
  }

  return {
    prevTrackName,
    currentTrackName,
    currentTrackTimeProgress,
    playbackPaused,
    handlePlayPauseClick,
  }
}
