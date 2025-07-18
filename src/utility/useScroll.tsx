import { useEffect, useState } from 'react'
import { useDebounce } from './useDebounce'

const useScroll = () => {
  const [scrollPosition, setScrollPosition] = useState({ x: 0, y: 0 })
  const [scrollDebouncePosition, setScrollDebouncePosition] = useState({ x: 0, y: 0 })
  const checkScrollPosition = () => {
    const x = window?.scrollX ?? 0
    const y = window?.scrollY ?? 0
    setScrollPosition({ x, y })
  }
  const debounceScrollPosition = useDebounce(() => {
    setScrollDebouncePosition({
      x: window.scrollX,
      y: window.scrollY,
    })
  }, 300)
  useEffect(() => {
    window.addEventListener('scroll', () => {
      checkScrollPosition()
      debounceScrollPosition()
    })
    return () =>
      window.removeEventListener('scroll', () => {
        checkScrollPosition()
        debounceScrollPosition()
      })
  }, [])
  return { scrollPosition, scrollDebouncePosition }
}
export default useScroll
