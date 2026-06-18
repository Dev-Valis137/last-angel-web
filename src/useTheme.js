import { useState, useEffect, useCallback } from 'react'

function getSystemTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function applyTheme(resolved) {
  if (resolved === 'dark') {
    document.documentElement.classList.add('dark')
    document.documentElement.classList.remove('light')
  } else {
    document.documentElement.classList.remove('dark')
    document.documentElement.classList.add('light')
  }
}

export default function useTheme() {
  const [theme, setThemeState] = useState(() => {
    const stored = localStorage.getItem('valis-theme')
    return stored === 'light' || stored === 'dark' || stored === 'system' ? stored : 'dark'
  })

  const resolvedTheme = theme === 'system' ? getSystemTheme() : theme

  const setTheme = useCallback((next) => {
    setThemeState(next)
    localStorage.setItem('valis-theme', next)
    const resolved = next === 'system' ? getSystemTheme() : next
    applyTheme(resolved)
  }, [])

  useEffect(() => {
    applyTheme(resolvedTheme)
  }, [resolvedTheme])

  useEffect(() => {
    if (theme !== 'system') return
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = () => applyTheme(mq.matches ? 'dark' : 'light')
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [theme])

  return { theme, setTheme, resolvedTheme }
}
