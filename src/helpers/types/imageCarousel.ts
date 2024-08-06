import { TImage } from './image'

export type TImageCarousel<T extends TImage> = {
  images: T[]
  currentImageIndex: number
}
