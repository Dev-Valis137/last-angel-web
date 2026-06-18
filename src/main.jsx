import ReactDOM from 'react-dom/client'
import { SmoothCursor } from 'smooth-cursor'
import GravityStarsBackground from './GravityStarsBackground.jsx'
import ThemeTogglerButton from './ThemeTogglerButton.jsx'

ReactDOM.createRoot(document.getElementById('react-root')).render(
  <>
    <GravityStarsBackground />
    <SmoothCursor />
  </>
)

const toggleTarget = document.getElementById('theme-toggle-target')
if (toggleTarget) {
  ReactDOM.createRoot(toggleTarget).render(<ThemeTogglerButton />)
}
