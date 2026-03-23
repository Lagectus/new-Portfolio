'use client'
import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let mx = 0, my = 0, rx = 0, ry = 0
    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY
      if (dot.current) { dot.current.style.left = mx + 'px'; dot.current.style.top = my + 'px' }
    }
    const tick = () => {
      rx += (mx - rx) * 0.1; ry += (my - ry) * 0.1
      if (ring.current) { ring.current.style.left = rx + 'px'; ring.current.style.top = ry + 'px' }
      requestAnimationFrame(tick)
    }
    const grow = () => { if(ring.current){ring.current.style.width='52px';ring.current.style.height='52px';ring.current.style.opacity='0.25'} }
    const shrink = () => { if(ring.current){ring.current.style.width='32px';ring.current.style.height='32px';ring.current.style.opacity='0.45'} }

    document.addEventListener('mousemove', onMove)
    document.querySelectorAll('a,button').forEach(el => { el.addEventListener('mouseenter', grow); el.addEventListener('mouseleave', shrink) })
    const raf = requestAnimationFrame(tick)
    return () => { document.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf) }
  }, [])

  return (
    <>
      <div ref={dot} className="cursor-dot" />
      <div ref={ring} className="cursor-ring" />
    </>
  )
}
