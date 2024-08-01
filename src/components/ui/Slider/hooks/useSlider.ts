import { useEffect, useState } from 'react'
import { useKeenSlider } from 'keen-slider/react'
import { useWindowSize } from '@/helpers/hooks/useWindowSize'
import { Breakpoints } from '@/helpers/constants/breakpoints'

const sliderSettings = {
  initialSlide: 0,
  mobile: { slidesPerView: 1, spacing: 16 },
  tablet: { slidesPerView: 2, spacing: 24 },
  tabletLandscape: { slidesPerView: 3, spacing: 32 },
}

export const useSlider = (mode: 'single' | 'multiple') => {
  const [isSliderCreated, setIsSliderCreated] = useState(false)
  const [currentSlideIndex, setCurrentSlideIndex] = useState(sliderSettings.initialSlide)
  const [sliderConfig, setSliderConfig] = useState(sliderSettings.mobile)

  const windowSize = useWindowSize()

  const [sliderRef, instanceRef] = useKeenSlider({
    mode: 'free-snap',
    loop: true,
    initial: sliderSettings.initialSlide,
    slides: {
      origin: mode === 'multiple' ? 'center' : 'auto',
      perView: mode === 'multiple' ? sliderConfig.slidesPerView : 1,
      spacing: sliderConfig.spacing,
    },
    created() {
      setIsSliderCreated(true)
    },
    slideChanged(slider) {
      setCurrentSlideIndex(slider.track.details.rel)
    },
  })

  useEffect(() => {
    if (instanceRef.current)
      setCurrentSlideIndex(instanceRef.current.track.details.rel)
  }, [instanceRef])

  useEffect(() => {
    switch (true) {
      case windowSize.width >= Breakpoints.TABLET_LANDSCAPE:
        setSliderConfig(sliderSettings.tabletLandscape)
        break
      case windowSize.width >= Breakpoints.TABLET:
        setSliderConfig(sliderSettings.tablet)
        break
      default:
        setSliderConfig(sliderSettings.mobile)
    }
  }, [windowSize.width])

  return {
    sliderRef,
    instanceRef,
    currentSlideIndex,
    isSliderCreated,
  }
}
