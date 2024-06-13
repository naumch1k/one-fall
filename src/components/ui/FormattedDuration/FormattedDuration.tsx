import {
  getFormattedMinutes,
  getFormattedSeconds,
} from './FormattedDuration.utils'

interface IFormattedDurationProps {
  durationInSeconds: number
  outputFormat: 'colon-separated' | 'with-units'
  className?: string
}

export const FormattedDuration = ({
  durationInSeconds,
  outputFormat,
  className,
}: IFormattedDurationProps) => {
  const minutes = getFormattedMinutes(durationInSeconds)
  const seconds = getFormattedSeconds(durationInSeconds)

  if (outputFormat === 'colon-separated') {
    return (
      <span className={className}>
        {minutes}:{seconds}
      </span>
    )
  } else {
    return (
      <span className={className}>
        {minutes} min {seconds} sec
      </span>
    )
  }
}
