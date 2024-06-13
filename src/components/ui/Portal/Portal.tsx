import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

interface IPortalProps {
  children: React.ReactNode
}

export const Portal = ({ children }: IPortalProps) => {
  const [mounted, setMounted] = useState(false)
  const ref = useRef<HTMLDivElement>()

  useEffect(() => {
    // Since SSR delays the availability of the document until after the component mounts,
    // we need to use useRef and useEffect to handle this
    ref.current = document.createElement('div')
    setMounted(true)
  }, [])

  useEffect(() => {
    ref.current && document.body.appendChild(ref.current)

    return () => {
      ref.current && document.body.removeChild(ref.current)
    }
  }, [])

  return mounted && ref.current ? createPortal(children, ref.current) : null
}
