import type { SVGProps } from 'react'
import icons from '../../../../public/images/icons'

export interface IIconProps extends SVGProps<SVGSVGElement> {
  glyph: keyof typeof icons
}

export const Icon = ({
  glyph,
  fill = 'currentColor',
  ...restIconProps
}: IIconProps) => {
  const IconComponent = icons[glyph]

  return (
    <IconComponent
      fill={fill}
      focusable={false}
      aria-hidden
      {...restIconProps}
    />
  )
}
