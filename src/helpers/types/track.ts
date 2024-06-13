export interface ITrack {
  number: number
  name: string
  duration: {
    totalMilliseconds: number
  }
  dataFileUrl: string
}
