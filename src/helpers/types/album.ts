import { ITrack } from './track'

export interface IAlbum {
  name: string
  type: string
  date: {
    year: number
  }
  duration: {
    totalMilliseconds: number
  }
  sharingInfo: {
    shareId: string
    shareUrl: string
  }
  purchaseInfo: {
    purchaseUrl: string
  }
  tracks: {
    items: ITrack[]
    totalCount: number
  }
  coverArt: {
    sources: {
      height: number
      url: string
      width: number
    }[]
  }
}
