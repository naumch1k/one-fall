import { MONTHS } from '@/helpers/constants'
import { getFormatDateParts } from './FormattedDate.utils'

interface IFormattedDateProps {
  dateString: string
  outputFormat: 'month dd, yyyy' | 'month dd'
  className?: string
}

export const FormattedDate = ({
  dateString,
  outputFormat,
  className,
}: IFormattedDateProps) => {
  const { Year, Month, Day } = getFormatDateParts(dateString)

  if (outputFormat === 'month dd, yyyy') {
    return (
      <span className={className}>{`${MONTHS[Month]}  ${Day}, ${Year}`}</span>
    )
  }

  return <span className={className}>{`${MONTHS[Month]} ${Day}`}</span>
}
