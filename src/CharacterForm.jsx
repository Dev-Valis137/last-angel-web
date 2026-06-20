import { useState } from 'react'

const INITIAL_POINTS = 150
const MAX_INITIAL = 50
const ATTR_NAMES = {
  fisico: 'Físico', agilidad: 'Agilidad', intelecto: 'Intelecto',
  carisma: 'Carisma', percepcion: 'Percepción', intuicion: 'Intuición', temple: 'Temple',
}

export default function CharacterForm() {
  const [attrs, setAttrs] = useState(Object.fromEntries(Object.keys(ATTR_NAMES).map(k => [k, 1])))
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
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
    }
  }

  const total = Object.values(attrs).reduce((a, b) => a + b, 0)
  const remaining = INITIAL_POINTS - total

  const updateAttr = (key, val) => {
    const v = Math.max(1, Math.min(MAX_INITIAL, Number(val) || 1))
    const current = attrs[key]
    const diff = v - current
    if (diff > remaining) return
    setAttrs(prev => ({ ...prev, [key]: v }))
  }

  if (success) {
    return (
      <section id="web" style={{ marginTop: '2rem' }}>
        <div class="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
          <h3 style={{ color: 'var(--accent)', marginBottom: '1rem' }}>¡Ficha enviada!</h3>
          <p style={{ color: 'var(--text-secondary)' }}>Un miembro del staff revisará tu solicitud. Pronto recibirás respuesta.</p>
        </div>
      </section>
    )
  }

  return (
    <section id="web" style={{ marginTop: '2rem' }}>
      {error && (
        <div className="card" style={{ borderColor: '#ff4444', textAlign: 'center', padding: '1rem', marginBottom: '1rem' }}>
          <p style={{ color: '#ff4444' }}>Error al enviar. Intenta de nuevo o contacta al staff.</p>
        </div>
      )}
      <form name="character-sheet" method="POST" data-netlify="true" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <input type="hidden" name="form-name" value="character-sheet" />

        {/* I. DATOS BÁSICOS */}
        <div className="card">
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
        <div className="card">
          <h3>👤 II. Aspecto Físico y Estilo</h3>
          <label>Descripción física<textarea name="descripcion" rows={4} required placeholder="Mínimo 3 líneas" /></label>
          <label>Estilo de vestir<textarea name="vestir" rows={2} placeholder="¿Cómo te vistes para trabajar, robar o ir a una gala?" /></label>
        </div>

        {/* III. PSICOLOGÍA */}
        <div className="card">
          <h3>🧠 III. Psicología</h3>
          <label>Personalidad<textarea name="personalidad" rows={4} required placeholder="Mínimo 3 líneas" /></label>
          <div className="form-grid">
            <label>Virtudes (mín. 2)<textarea name="virtudes" rows={2} required /></label>
            <label>Defectos (mín. 2)<textarea name="defectos" rows={2} required /></label>
          </div>
          <label>Miedos/Fobias<textarea name="miedos" rows={2} /></label>
        </div>

        {/* IV. HISTORIA */}
        <div className="card">
          <h3>📖 IV. Historia y Motivaciones</h3>
          <label>Trasfondo<textarea name="trasfondo" rows={6} required placeholder="¿De dónde vienes? ¿Cómo llegaste a Arkham? Mínimo 5 líneas" /></label>
          <label>Motivación actual<textarea name="motivacion" rows={2} required placeholder="Dinero, venganza, poder, sobrevivir, justicia…" /></label>
        </div>

        {/* V. ATRIBUTOS */}
        <div className="card">
          <h3>🧬 V. Atributos (1–{MAX_INITIAL})</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
            Reparte <strong style={{ color: 'var(--accent)' }}>{INITIAL_POINTS} puntos</strong> entre los 7 atributos.
            Usados: <strong style={{ color: remaining < 0 ? '#ff4444' : 'var(--accent)' }}>{total}</strong> / {INITIAL_POINTS}
            {remaining >= 0 && <span> — Restantes: <strong style={{ color: 'var(--accent-secondary)' }}>{remaining}</strong></span>}
            {remaining < 0 && <span style={{ color: '#ff4444' }}> — ¡Te pasaste!</span>}
          </p>
          <div className="stat-grid">
            {Object.entries(ATTR_NAMES).map(([key, label]) => (
              <div key={key} className="stat-item">
                <div className="stat-label"><span>{label}</span><span style={{ fontFamily: 'var(--font-mono)' }}>{attrs[key]}</span></div>
                <input type="range" min={1} max={MAX_INITIAL} value={attrs[key]} onChange={e => updateAttr(key, e.target.value)} style={{ width: '100%' }} />
                <input type="hidden" name={`attr_${key}`} value={attrs[key]} />
              </div>
            ))}
          </div>
        </div>

        {/* VI. PERKS */}
        <div className="card">
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
        <div className="card">
          <h3>📈 VII. Progresión</h3>
          <div className="form-grid">
            <label>PD actuales<input type="number" name="pd_actuales" min={0} /></label>
            <label>PD totales ganados<input type="number" name="pd_totales" min={0} /></label>
          </div>
          <label>Historial de mejoras<textarea name="historial" rows={3} placeholder="Atributos subidos y perks comprados con fechas" /></label>
        </div>

        {/* VIII. PV */}
        <div className="card">
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
        <div className="card">
          <h3>💰 IX. Economía y Recursos</h3>
          <div className="form-grid">
            <label>Créditos actuales<input type="number" name="creditos" min={0} /></label>
            <label>Deudas<textarea name="deudas" rows={1} placeholder="¿Con quién y cuánto?" /></label>
          </div>
        </div>

        {/* X. INVENTARIO */}
        <div className="card">
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
        <div className="card">
          <h3>📝 XI. Notas Adicionales</h3>
          <textarea name="notas" rows={4} placeholder="Contactos, secretos, enemigos, etc." />
        </div>

        <button type="submit" className="btn-submit">
          Enviar Ficha
        </button>
      </form>
    </section>
  )
}
