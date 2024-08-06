import { useEffect, useState } from 'react'
import { useKeenSlider } from 'keen-slider/react'
import { useWindowSize } from '@/helpers/hooks/useWindowSize'
import { Breakpoints } from '@/helpers/constants/breakpoints'

const carouselSettings = {
  initialSlide: 0,
  mobile: { slidesPerView: 1, spacing: 16 },
  tablet: { slidesPerView: 2, spacing: 24 },
  tabletLandscape: { slidesPerView: 3, spacing: 32 },
}

export const useCarousel = (mode: 'single' | 'multiple') => {
  const [isCarouselCreated, setIsCarouselCreated] = useState(false)
  const [currentSlideIndex, setCurrentSlideIndex] = useState(carouselSettings.initialSlide)
  const [carouselConfig, setCarouselConfig] = useState(carouselSettings.mobile)

  const windowSize = useWindowSize()

  const [sliderRef, instanceRef] = useKeenSlider({
    mode: 'free-snap',
    loop: true,
    initial: carouselSettings.initialSlide,
    slides: {
      origin: mode === 'multiple' ? 'center' : 'auto',
      perView: mode === 'multiple' ? carouselConfig.slidesPerView : 1,
      spacing: carouselConfig.spacing,
    },
    created() {
      setIsCarouselCreated(true)
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
        setCarouselConfig(carouselSettings.tabletLandscape)
        break
      case windowSize.width >= Breakpoints.TABLET:
        setCarouselConfig(carouselSettings.tablet)
        break
      default:
        setCarouselConfig(carouselSettings.mobile)
    }
  }, [windowSize.width])

  return {
    carouselRef: sliderRef,
    instanceRef,
    currentSlideIndex,
    isCarouselCreated,
  }
}
