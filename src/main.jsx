import React from 'react'
import ReactDOM from 'react-dom/client'
import { SmoothCursor } from 'smooth-cursor'
import GravityStarsBackground from './GravityStarsBackground.jsx'
import ThemeTogglerButton from './ThemeTogglerButton.jsx'

const CursorRing = () => (
  <svg width="32" height="32" viewBox="0 0 32 32">
    <circle
      cx="16" cy="16" r="12"
      fill="none"
      stroke="var(--accent, #00FFFF)"
      strokeWidth="2"
      style={{ filter: 'drop-shadow(0 0 6px var(--accent, #00FFFF))' }}
    />
  </svg>
)

ReactDOM.createRoot(document.getElementById('react-root')).render(
  <>
    <GravityStarsBackground />
    <SmoothCursor cursor={<CursorRing />} />
  </>
)

const toggleTarget = document.getElementById('theme-toggle-target')
if (toggleTarget) {
  ReactDOM.createRoot(toggleTarget).render(<ThemeTogglerButton />)
}
