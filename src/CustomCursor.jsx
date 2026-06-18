import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'

const DESKTOP_QUERY = '(pointer: fine) and (hover: hover)'
const MAX_TRAIL = 25
const MAX_PARTICLES = 80

export default function CustomCursor() {
  const [isEnabled, setIsEnabled] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [bursts, setBursts] = useState([])
  const burstIdRef = useRef(0)
  const trailRef = useRef([])
  const particlesRef = useRef([])
  const canvasRef = useRef(null)
  const rafRef = useRef(null)
  const lastPosRef = useRef({})
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const outerX = useSpring(mouseX, { damping: 25, stiffness: 150, mass: 0.8 })
  const outerY = useSpring(mouseY, { damping: 25, stiffness: 150, mass: 0.8 })
  const innerX = useSpring(mouseX, { damping: 40, stiffness: 500, mass: 0.3 })
  const innerY = useSpring(mouseY, { damping: 40, stiffness: 500, mass: 0.3 })

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_QUERY)
    const update = () => setIsEnabled(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (!isEnabled) return
    const handleMove = (e) => {
      const { clientX: x, clientY: y } = e
      mouseX.set(x)
      mouseY.set(y)
      trailRef.current.push({ x, y })
      if (trailRef.current.length > MAX_TRAIL) trailRef.current.splice(0, trailRef.current.length - MAX_TRAIL)
      if (lastPosRef.current.x != null) {
        const dx = x - lastPosRef.current.x
        const dy = y - lastPosRef.current.y
        const speed = Math.sqrt(dx * dx + dy * dy)
        if (speed > 3) {
          const count = Math.min(Math.floor(speed / 5), 4)
          for (let i = 0; i < count; i++) {
            particlesRef.current.push({
              x, y,
              vx: (Math.random() - 0.5) * 5 - dx * 0.05,
              vy: (Math.random() - 0.5) * 5 - dy * 0.05,
              size: Math.random() * 2.5 + 0.5,
              life: 1,
            })
          }
          if (particlesRef.current.length > MAX_PARTICLES) particlesRef.current.splice(0, particlesRef.current.length - MAX_PARTICLES)
        }
      }
      lastPosRef.current = { x, y }
    }
    document.addEventListener('mousemove', handleMove)
    return () => document.removeEventListener('mousemove', handleMove)
  }, [isEnabled, mouseX, mouseY])

  useEffect(() => {
    if (!isEnabled) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    resize()
    window.addEventListener('resize', resize)
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const trail = trailRef.current
      for (let i = 0; i < trail.length; i++) {
        const t = i / trail.length
        ctx.beginPath()
        ctx.arc(trail[i].x, trail[i].y, 1.5 * t, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0, 255, 255, ${t * 0.25})`
        ctx.fill()
      }
      const particles = particlesRef.current
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.x += p.vx; p.y += p.vy; p.vy += 0.02; p.life -= 0.015
        if (p.life <= 0) { particles.splice(i, 1); continue }
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(176, 0, 255, ${p.life * 0.7})`
        ctx.fill()
      }
      rafRef.current = requestAnimationFrame(animate)
    }
    animate()
    return () => { cancelAnimationFrame(rafRef.current); window.removeEventListener('resize', resize) }
  }, [isEnabled])

  useEffect(() => {
    if (!isEnabled) return
    const handleOver = (e) => {
      const target = e.target.closest('a, button, .card, [data-cursor], input, textarea, select, nav, footer, label')
      setHovered(!!target)
    }
    document.addEventListener('mouseover', handleOver)
    return () => document.removeEventListener('mouseover', handleOver)
  }, [isEnabled])

  useEffect(() => {
    if (!isEnabled) return
    const handleClick = (e) => {
      const id = ++burstIdRef.current
      setBursts(prev => [...prev, { id, x: e.clientX, y: e.clientY }])
      setTimeout(() => setBursts(prev => prev.filter(b => b.id !== id)), 600)
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [isEnabled])

  if (!isEnabled) return null

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 99999, pointerEvents: 'none' }}>
      <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, pointerEvents: 'none' }} />

      <motion.div
        style={{
          position: 'fixed', top: -16, left: -16, width: 32, height: 32,
          x: outerX, y: outerY,
        }}
      >
        <svg width="32" height="32" viewBox="0 0 32 32">
          <motion.circle
            cx="16" cy="16"
            animate={{ r: hovered ? 20 : 12 }}
            fill="none"
            stroke={`var(${hovered ? '--accent-secondary' : '--accent'}, ${hovered ? '#B000FF' : '#00FFFF'})`}
            strokeWidth="1.5"
            style={{ filter: `drop-shadow(0 0 ${hovered ? 10 : 4}px var(--accent, #00FFFF))` }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          />
          <motion.circle
            cx="16" cy="16"
            animate={{ r: hovered ? 14 : 8, opacity: hovered ? 0.4 : 0 }}
            fill="none"
            stroke={`var(${hovered ? '--accent-secondary' : '--accent'}, ${hovered ? '#B000FF' : '#00FFFF'})`}
            strokeWidth="0.5"
            strokeDasharray="3 3"
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          />
        </svg>
      </motion.div>

      <motion.div
        style={{
          position: 'fixed', top: -3, left: -3, width: 6, height: 6, borderRadius: '50%',
          x: innerX, y: innerY,
        }}
        animate={{
          scale: hovered ? 1.5 : 1,
          background: `var(${hovered ? '--accent-secondary' : '--accent'}, ${hovered ? '#B000FF' : '#00FFFF'})`,
          boxShadow: `0 0 ${hovered ? 10 : 4}px var(--accent, #00FFFF)`,
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      />

      <AnimatePresence>
        {bursts.map(burst => (
          <motion.div
            key={burst.id}
            initial={{ opacity: 0.8, scale: 0.3 }}
            animate={{ opacity: 0, scale: 2.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{
              position: 'fixed', left: burst.x - 20, top: burst.y - 20,
              width: 40, height: 40, borderRadius: '50%',
              border: '1px solid var(--accent, #00FFFF)',
              pointerEvents: 'none',
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}
