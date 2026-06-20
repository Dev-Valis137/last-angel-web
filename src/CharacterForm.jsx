import { useState } from 'react'

const INITIAL_POINTS = 130
const MAX_ATTR = 75
const MIN_ATTR = 11
const COMPETENTE_MAX = 50
const ELITE_MIN = 51
const ELITE_MAX = 75
const ATTR_NAMES = {
  fisico: 'Físico', agilidad: 'Agilidad', intelecto: 'Intelecto',
  carisma: 'Carisma', percepcion: 'Percepción', intuicion: 'Intuición', temple: 'Temple',
}

const STEPS = [
  { num: 1, label: 'Datos', icon: '📌' },
  { num: 2, label: 'Aspecto', icon: '👤' },
  { num: 3, label: 'Psicología', icon: '🧠' },
  { num: 4, label: 'Historia', icon: '📖' },
  { num: 5, label: 'Atributos', icon: '🧬' },
  { num: 6, label: 'Perks', icon: '🛠️' },
  { num: 7, label: 'Progresión', icon: '📈' },
  { num: 8, label: 'Vida', icon: '❤️' },
  { num: 9, label: 'Economía', icon: '💰' },
  { num: 10, label: 'Inventario', icon: '🎒' },
  { num: 11, label: 'Notas', icon: '📝' },
]

export default function CharacterForm() {
  const [step, setStep] = useState(1)
  const [completed, setCompleted] = useState(new Set())
  const [loading, setLoading] = useState(false)
  const [attrs, setAttrs] = useState(Object.fromEntries(Object.keys(ATTR_NAMES).map(k => [k, MIN_ATTR])))

  const vals = Object.values(attrs)
  const total = vals.reduce((a, b) => a + b, 0)
  const spent = total - 7 * MIN_ATTR
  const remaining = INITIAL_POINTS - spent

  const countElite = vals.filter(v => v >= ELITE_MIN && v <= ELITE_MAX).length
  const countAbove50 = vals.filter(v => v > COMPETENTE_MAX).length
  const hasElite = vals.some(v => v >= ELITE_MIN && v <= ELITE_MAX)
  const hasDeficient = vals.some(v => v < MIN_ATTR)

  const warnings = []
  if (remaining < 0) warnings.push(`Te pasaste por ${-remaining} puntos (gastaste ${spent} de ${INITIAL_POINTS})`)
  if (countElite > 2) warnings.push('Solo puede haber hasta 2 atributos Élite (51-75)')
  if (countAbove50 > 0 && !hasElite) warnings.push('Debes tener al menos 1 atributo Élite (51-75)')
  if (hasDeficient) warnings.push('No puede haber atributos por debajo de 11 (rango Deficiente no disponible en creación)')
  if (vals.some(v => v > MAX_ATTR)) warnings.push('Los atributos no pueden superar 75 en creación (Sobrehumano y Pico Humano se obtienen con PD)')

  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const [submitWarnings, setSubmitWarnings] = useState([])

  const isDef = (id) => {
    const el = document.querySelector(`[name="${id}"]`)
    return el && !el.value.trim()
  }

  const requiredMissing = () => {
    const reqs = [
      [1, 'nombre'], [1, 'edad'], [1, 'origen'], [1, 'estado'],
      [2, 'descripcion'],
      [3, 'personalidad'], [3, 'virtudes'], [3, 'defectos'],
      [4, 'trasfondo'], [4, 'motivacion'],
    ]
    return reqs.filter(([s]) => s === step).some(([, id]) => isDef(id))
  }

  const canJump = (n) => n <= step || completed.has(n - 1) || (n === step + 1)

  const goNext = () => {
    if (requiredMissing()) return
    if (step === 5 && warnings.length > 0) return
    if (step < STEPS.length) {
      setCompleted(prev => new Set(prev).add(step))
      setStep(step + 1)
    }
  }

  const goPrev = () => { if (step > 1) setStep(step - 1) }

  const goToStep = (n) => { if (canJump(n)) setStep(n) }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (warnings.length > 0) {
      setSubmitWarnings(warnings)
      return
    }
    setSubmitWarnings([])
    setLoading(true)
    const form = e.target
    const data = new URLSearchParams()
    for (const field of form.elements) {
      if (field.name) data.append(field.name, field.value)
    }
    data.append('form-name', 'character-sheet')
    try {
      const res = await fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: data })
      if (res.ok) setSuccess(true)
      else setError(true)
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  const updateAttr = (key, val) => {
    const v = Math.max(MIN_ATTR, Math.min(MAX_ATTR, Number(val) || MIN_ATTR))
    const current = attrs[key]
    const diff = v - current
    if (diff > remaining) return
    setAttrs(prev => ({ ...prev, [key]: v }))
  }

  if (success) {
    return (
      <section id="web" style={{ marginTop: '2rem' }}>
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
          <h3 style={{ color: 'var(--accent)', marginBottom: '1rem' }}>¡Ficha enviada!</h3>
          <p style={{ color: 'var(--text-secondary)' }}>Un miembro del staff revisará tu solicitud. Pronto recibirás respuesta.</p>
        </div>
      </section>
    )
  }

  const s = (n) => step === n ? 'block' : 'none'

  return (
    <section id="web" style={{ marginTop: '2rem' }}>
      {error && (
        <div className="card" style={{ borderColor: '#ff4444', textAlign: 'center', padding: '1rem', marginBottom: '1rem' }}>
          <p style={{ color: '#ff4444' }}>Error al enviar. Intenta de nuevo o contacta al staff.</p>
        </div>
      )}

      {/* Stepper */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0,
        marginBottom: '1.5rem', overflowX: 'auto', paddingBottom: '0.5rem',
      }}>
        {STEPS.map((st, i) => (
          <div key={st.num} style={{ display: 'flex', alignItems: 'center' }}>
            <button type="button" onClick={() => goToStep(st.num)}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.2rem',
                cursor: canJump(st.num) ? 'pointer' : 'not-allowed', border: 'none', background: 'transparent', padding: '0.25rem 0.5rem',
                minWidth: '60px', opacity: canJump(st.num) ? 1 : 0.4, transition: 'opacity 0.2s',
              }}>
              <div style={{
                width: 32, height: 32, borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700,
                background: step === st.num ? 'var(--accent)' : step > st.num ? 'var(--accent-secondary)' : 'var(--border)',
                color: step >= st.num ? '#000' : 'var(--text-secondary)',
                transition: 'all 0.2s',
              }}>
                {step > st.num ? '✓' : st.icon}
              </div>
              <span style={{
                fontSize: '0.6rem', color: step === st.num ? 'var(--text)' : 'var(--text-secondary)',
                fontWeight: step === st.num ? 600 : 400, whiteSpace: 'nowrap',
              }}>{st.label}</span>
            </button>
            {i < STEPS.length - 1 && (
              <div style={{
                width: 12, height: 2, background: step > st.num ? 'var(--accent-secondary)' : 'var(--border)',
                transition: 'background 0.2s', flexShrink: 0,
              }} />
            )}
          </div>
        ))}
      </div>

      <form name="character-sheet" method="POST" data-netlify="true" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <input type="hidden" name="form-name" value="character-sheet" />

        {/* I. DATOS BÁSICOS */}
        <div className="card" style={{ display: s(1) }}>
          <h3>📌 I. Datos Básicos</h3>
          <div className="form-grid">
            <label>Nombre completo<input type="text" name="nombre" required /></label>
            <label>Apodo/Alias<input type="text" name="alias" /></label>
            <label>Edad<input type="number" name="edad" required min={14} max={120} /></label>
            <label>Género<input type="text" name="genero" /></label>
            <label>Lugar de origen<select name="origen" required><option value="">Seleccionar</option><option>Arkham</option><option>Forastero</option></select></label>
            <label>Facción<select name="faccion"><option value="">Ninguna</option><option>Sindicato Kestrel</option><option>Hijos del Pantano</option><option>El Eco</option><option>Hermandad del Silencio</option><option>Policía</option><option>Fiscalía</option><option>Defensoría</option><option>Prensa</option><option>Civil</option></select></label>
            <label>Rango en la facción<input type="text" name="rango" /></label>
            <label>Estado<select name="estado" required><option value="">Seleccionar</option><option>Vivo</option><option>Herido</option><option>Encarcelado</option><option>Prófugo</option><option>Otro</option></select></label>
          </div>
        </div>

        {/* II. ASPECTO */}
        <div className="card" style={{ display: s(2) }}>
          <h3>👤 II. Aspecto Físico y Estilo</h3>
          <label>Descripción física<textarea name="descripcion" rows={4} required placeholder="Mínimo 3 líneas" /></label>
          <label>Estilo de vestir<textarea name="vestir" rows={2} placeholder="¿Cómo te vistes para trabajar, robar o ir a una gala?" /></label>
        </div>

        {/* III. PSICOLOGÍA */}
        <div className="card" style={{ display: s(3) }}>
          <h3>🧠 III. Psicología</h3>
          <label>Personalidad<textarea name="personalidad" rows={4} required placeholder="Mínimo 3 líneas" /></label>
          <div className="form-grid">
            <label>Virtudes (mín. 2)<textarea name="virtudes" rows={2} required /></label>
            <label>Defectos (mín. 2)<textarea name="defectos" rows={2} required /></label>
          </div>
          <label>Miedos/Fobias<textarea name="miedos" rows={2} /></label>
        </div>

        {/* IV. HISTORIA */}
        <div className="card" style={{ display: s(4) }}>
          <h3>📖 IV. Historia y Motivaciones</h3>
          <label>Trasfondo<textarea name="trasfondo" rows={6} required placeholder="¿De dónde vienes? ¿Cómo llegaste a Arkham? Mínimo 5 líneas" /></label>
          <label>Motivación actual<textarea name="motivacion" rows={2} required placeholder="Dinero, venganza, poder, sobrevivir, justicia…" /></label>
        </div>

        {/* V. ATRIBUTOS */}
        <div className="card" style={{ display: s(5) }}>
          <h3>🧬 V. Atributos (11–{MAX_ATTR})</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
            Reparte <strong style={{ color: 'var(--accent)' }}>{INITIAL_POINTS} puntos</strong> entre los 7 atributos.
            Gastados (sobre base 11): <strong style={{ color: remaining < 0 ? '#ff4444' : 'var(--accent)' }}>{spent}</strong> / {INITIAL_POINTS}
            {remaining >= 0 && <span> — Restantes: <strong style={{ color: 'var(--accent-secondary)' }}>{remaining}</strong></span>}
            {remaining < 0 && <span style={{ color: '#ff4444' }}> — ¡Te pasaste por {-remaining}!</span>}
          </p>
          <div style={{ fontSize: '0.82rem', marginBottom: '1rem', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: 'var(--radius)', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            <span style={{ color: 'var(--accent-secondary)' }}>◉ Élite (51-75)</span>
            <span style={{ color: '#FFD700' }}>◉ Competente (31-50)</span>
            <span style={{ color: 'var(--text-secondary)' }}>◉ Promedio (11-30)</span>
          </div>
          {warnings.length > 0 && (
            <div style={{ marginBottom: '1rem', padding: '0.75rem', border: '1px solid #ff4444', borderRadius: 'var(--radius)', background: 'rgba(255,68,68,0.05)' }}>
              {warnings.map((w, i) => <p key={i} style={{ color: '#ff4444', fontSize: '0.82rem' }}>⚠ {w}</p>)}
            </div>
          )}
          {submitWarnings.length > 0 && (
            <div style={{ marginBottom: '1rem', padding: '0.75rem', border: '1px solid #ff4444', borderRadius: 'var(--radius)', background: 'rgba(255,68,68,0.05)' }}>
              {submitWarnings.map((w, i) => <p key={i} style={{ color: '#ff4444', fontSize: '0.82rem' }}>⚠ {w}</p>)}
            </div>
          )}
          <div className="stat-grid">
            {Object.entries(ATTR_NAMES).map(([key, label]) => {
              const v = attrs[key]
              let tierColor = 'var(--text-secondary)'
              if (v >= ELITE_MIN) tierColor = 'var(--accent-secondary)'
              else if (v >= 31) tierColor = '#FFD700'
              return (
                <div key={key} className="stat-item">
                  <div className="stat-label"><span>{label}</span><span style={{ fontFamily: 'var(--font-mono)', color: tierColor }}>{v}</span></div>
                  <input type="range" min={MIN_ATTR} max={MAX_ATTR} value={v} onChange={e => updateAttr(key, e.target.value)} style={{ width: '100%', accentColor: tierColor }} />
                  <input type="hidden" name={`attr_${key}`} value={v} />
                </div>
              )
            })}
          </div>
        </div>

        {/* VI. PERKS */}
        <div className="card" style={{ display: s(6) }}>
          <h3>🛠️ VI. Perks <span className="sub">(máx. 2)</span></h3>
          {[1, 2].map(i => (
            <div key={i} style={{ marginBottom: '1rem', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: 'var(--radius)' }}>
              <h4 style={{ color: 'var(--accent)', marginBottom: '0.5rem' }}>Perk {i}</h4>
              <label>Nombre<input type="text" name={`perk_${i}_nombre`} /></label>
              <label>Rama<select name={`perk_${i}_rama`}><option value="">Seleccionar</option><option>Mental</option><option>Social</option><option>Física</option><option>Instinto</option></select></label>
              <label>Efecto<textarea name={`perk_${i}_efecto`} rows={2} /></label>
            </div>
          ))}
        </div>

        {/* VII. PROGRESIÓN */}
        <div className="card" style={{ display: s(7) }}>
          <h3>📈 VII. Progresión</h3>
          <div className="form-grid">
            <label>PD actuales<input type="number" name="pd_actuales" min={0} /></label>
            <label>PD totales ganados<input type="number" name="pd_totales" min={0} /></label>
          </div>
          <label>Historial de mejoras<textarea name="historial" rows={3} placeholder="Atributos subidos y perks comprados con fechas" /></label>
        </div>

        {/* VIII. PV */}
        <div className="card" style={{ display: s(8) }}>
          <h3>❤️ VIII. Puntos de Vida</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
            PV máximos: <strong style={{ color: 'var(--accent)' }}>50 + ({attrs.fisico} × 2) = {50 + attrs.fisico * 2}</strong>
          </p>
          <div className="form-grid">
            <label>PV actuales<input type="number" name="pv_actuales" min={0} /></label>
            <label>Heridas / Estado<textarea name="heridas" rows={1} placeholder="Heridas leves, graves, inconsciencia…" /></label>
          </div>
          <input type="hidden" name="pv_maximos" value={50 + attrs.fisico * 2} />
        </div>

        {/* IX. ECONOMÍA */}
        <div className="card" style={{ display: s(9) }}>
          <h3>💰 IX. Economía y Recursos</h3>
          <div className="form-grid">
            <label>Créditos actuales<input type="number" name="creditos" min={0} /></label>
            <label>Deudas<textarea name="deudas" rows={1} placeholder="¿Con quién y cuánto?" /></label>
          </div>
        </div>

        {/* X. INVENTARIO */}
        <div className="card" style={{ display: s(10) }}>
          <h3>🎒 X. Inventario</h3>
          <div className="form-grid">
            <label>Arma principal<input type="text" name="arma_principal" /></label>
            <label>Arma secundaria / Defensa<input type="text" name="arma_secundaria" /></label>
            <label>Objetos clave / Gadgets<textarea name="objetos" rows={2} /></label>
            <label>Vehículo<input type="text" name="vehiculo" /></label>
            <label>Vivienda<input type="text" name="vivienda" placeholder="Ubicación y tipo" /></label>
          </div>
        </div>

        {/* XI. NOTAS */}
        <div className="card" style={{ display: s(11) }}>
          <h3>📝 XI. Notas Adicionales</h3>
          <textarea name="notas" rows={4} placeholder="Contactos, secretos, enemigos, etc." />
        </div>

        {/* Navigation */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          gap: '1rem', marginTop: '0.5rem',
        }}>
          <button type="button" onClick={goPrev} disabled={step === 1}
            style={{
              padding: '0.6rem 1.5rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)',
              background: 'transparent', color: 'var(--text)', cursor: step === 1 ? 'not-allowed' : 'pointer',
              opacity: step === 1 ? 0.4 : 1, transition: 'all 0.2s',
            }}>
            ← Volver
          </button>

          <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
            {step} / {STEPS.length}
          </span>

          {step < STEPS.length ? (
            <button type="button" onClick={goNext}
              style={{
                padding: '0.6rem 1.5rem', borderRadius: 'var(--radius)', border: 'none',
                background: 'var(--accent)', color: '#000', cursor: 'pointer', fontWeight: 600,
                opacity: (step === 5 && warnings.length > 0) || requiredMissing() ? 0.5 : 1,
                transition: 'all 0.2s',
              }}>
              Continuar →
            </button>
          ) : (
            <button type="submit" className="btn-submit" style={{ margin: 0 }} disabled={loading}>
              {loading ? 'Enviando...' : 'Enviar Ficha'}
            </button>
          )}
        </div>
      </form>
    </section>
  )
}
