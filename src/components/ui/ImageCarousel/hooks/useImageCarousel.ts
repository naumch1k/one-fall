import { useState } from 'react'
import { useKeenSlider } from 'keen-slider/react'
import { TImage, TImageCarousel } from '@/helpers/types'

export const useImageCarousel = <T extends TImage>({ 
  images, 
  currentImageIndex,
}: TImageCarousel<T>) => {
  const [opacities, setOpacities] = useState<number[]>([])
  const [isCarouselCreated, setIsCarouselCreated] = useState(false)

  const [sliderRef, instanceRef] = useKeenSlider<HTMLUListElement>({
    loop: true,
    initial: currentImageIndex,
    slides: images.length,
    created() {
      setIsCarouselCreated(true)
    },
    detailsChanged(slider) {
      const newOpacities = slider.track.details.slides.map(
        slide => slide.portion
      )
      setOpacities(newOpacities)
    },
  })

  return {
    carouselRef: sliderRef,
    instanceRef,
    isCarouselCreated,
    opacities,
  }
}
