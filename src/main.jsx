import ReactDOM from 'react-dom/client'
import GravityStarsBackground from './GravityStarsBackground.jsx'
import ThemeTogglerButton from './ThemeTogglerButton.jsx'
import { SmoothCursor } from './components/ui/smooth-cursor.jsx'

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
