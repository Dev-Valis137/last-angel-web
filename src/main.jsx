import React from 'react'
import ReactDOM from 'react-dom/client'
import GravityStarsBackground from './GravityStarsBackground.jsx'
import ThemeTogglerButton from './ThemeTogglerButton.jsx'
import { SmoothCursor } from './components/ui/smooth-cursor.jsx'

const CursorDot = () => (
  <svg width="16" height="16" viewBox="0 0 16 16">
    <circle cx="8" cy="8" r="3" fill="var(--accent, #00FFFF)" opacity="0.9" />
    <circle
      cx="8" cy="8" r="7"
      fill="none"
      stroke="var(--accent, #00FFFF)"
      strokeWidth="1"
      opacity="0.4"
      style={{ filter: 'drop-shadow(0 0 4px var(--accent, #00FFFF))' }}
    />
  </svg>
)

ReactDOM.createRoot(document.getElementById('react-root')).render(
  <>
    <GravityStarsBackground />
    <SmoothCursor cursor={<CursorDot />} />
  </>
)

const toggleTarget = document.getElementById('theme-toggle-target')
if (toggleTarget) {
  ReactDOM.createRoot(toggleTarget).render(<ThemeTogglerButton />)
}
