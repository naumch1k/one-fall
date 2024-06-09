interface INetlifyLoaderParams {
  src: string
  width: number
  quality?: number
}

export default function netlifyLoader({ 
  src,
  width,
  quality = 75,
 }: INetlifyLoaderParams) {
  return `/.netlify/images?url=${src}&w=${width}&q=${quality}`
}