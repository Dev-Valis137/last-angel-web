export const documentationData = [
  {
    id: "economia",
    title: "Economía y Supervivencia",
    subtitle: "Créditos, gastos, licencias y mercado negro en las calles de Arkham.",
    icon: "💼",
    content: [
      {
        type: "grid",
        items: [
          {
            title: "💼 Ingresos",
            type: "list",
            items: [
              "**Trabajo legal** — 200–1000 créd/semana",
              "**Trabajo ilegal** — 300–3000 créd/semana",
              "**Comercio / trueque** — Variable",
              "**Juegos de azar** — Variable",
              "**Hackeo / fraude** — Variable",
              "**Protección** — 200–1000 créd/semana"
            ]
          },
          {
            title: "📉 Gastos Pasivos (c/15 días)",
            type: "table",
            headers: ["Concepto", "Coste", "Consecuencia"],
            rows: [
              ["Alquiler zona baja", "400–800", "Desalojo 48h"],
              ["Alquiler zona media", "800–2000", "Desalojo + demanda"],
              ["Alquiler zona alta", "2000–6000", "Embargo"],
              ["Comida básica", "300", "Hambre"],
              ["Comida normal", "600–1000", "—"],
              ["Seguro público", "200", "Sin hospital"],
              ["Seguro privado", "800–2000", "Atención élite"]
            ]
          }
        ]
      },
      {
        type: "grid",
        items: [
          {
            title: "📜 Licencias",
            type: "table",
            headers: ["Tipo", "Coste", "Requisitos", "Sin licencia"],
            rows: [
              ["Porte de arma", "500", "Examen + 3 meses", "Multa 2000 o 1 año prisión"],
              ["Conducción comercial", "300", "Curso 40h", "Multa 1000 + inmovilización"],
              ["Negocio", "1000", "Registro + inspección", "Clausura + multa 5000"],
              ["Clínica privada", "5000", "Acreditación + seguro", "Prisión 2–5 años"],
              ["Taxi", "800", "Antecedentes + ruta", "Multa 1500 + retirada"]
            ]
          },
          {
            title: "🖤 Mercado Negro",
            type: "table",
            headers: ["Artículo", "Precio (créd)"],
            rows: [
              ["Pistola sin serial", "800"],
              ["Fusil", "3000"],
              ["Documentos falsos", "1000–5000"],
              ["Medicamentos", "50–200"],
              ["Datos bancarios", "2000–10000"],
              ["Chip de rastreo", "500"]
            ]
          }
        ]
      }
    ]
  },
  {
    id: "atributos",
    title: "Atributos y Progresión",
    subtitle: "Siete atributos en escala 1–100. 150 puntos iniciales, cap 50, límite global 555.",
    icon: "📊",
    content: [
      {
        type: "stats",
        title: "📊 Los 7 Atributos",
        items: [
          { name: "💪 Físico", value: 35, desc: "Fuerza, daño cuerpo a cuerpo, resistencia" },
          { name: "🏃 Agilidad", value: 35, desc: "Velocidad, reflejos, sigilo, puntería" },
          { name: "🧠 Intelecto", value: 35, desc: "Ciencia, hacking, medicina" },
          { name: "🗣️ Carisma", value: 35, desc: "Influencia, persuasión, liderazgo" },
          { name: "👁️ Percepción", value: 35, desc: "Observación, puntería francotirador" },
          { name: "🔮 Intuición", value: 35, desc: "Sentido común, detectar mentiras" },
          { name: "🧊 Temple", value: 35, desc: "Calma, resistencia a tortura" }
        ]
      },
      {
        type: "grid",
        items: [
          {
            title: "📈 Escala de Poder",
            type: "scale",
            items: [
              { range: "1–10", label: "Deficiente" },
              { range: "11–25", label: "Promedio" },
              { range: "26–40", label: "Competente" },
              { range: "41–50", label: "Élite" },
              { range: "51–75", label: "Sobrehumano" },
              { range: "76–100", label: "Pico humano" }
            ]
          },
          {
            title: "⚙️ Creación y Progresión",
            type: "list",
            items: [
              "**Creación:** 150 puntos iniciales, mínimo 1 por atributo, cap inicial **50**, límite global **555**",
              "**PD base:** **5 PD/semana**",
              "**PD por escenas:** 1–10 PD según participación",
              "**PD por hitos:** 20–50 PD por arcos argumentales",
              "**Subir atributo:** valor actual × 2 PD",
              "**Perk nuevo:** **20 PD**"
            ]
          }
        ]
      }
    ]
  },
  {
    id: "perks",
    title: "Sistema de Perks",
    subtitle: "Cuatro ramas con requisitos mínimos de atributo. Perks personalizados disponibles con aprobación del staff.",
    icon: "🧠",
    content: [
      {
        type: "grid",
        items: [
          {
            title: "🧠 Rama Mental — Intelecto 30+",
            type: "list",
            items: [
              "**Caja de chatarra** — Usar Intelecto para crear gadgets improvisados",
              "**Cirujano de datos** — Hackeos mucho más difíciles de rastrear",
              "**Médico de campo** — Curar heridas graves sin necesidad de hospital"
            ]
          },
          {
            title: "🗣️ Rama Social — Carisma 30+",
            type: "list",
            items: [
              "**Tío Sam** — 500 créd extra/semana (con riesgo)",
              "**Zorro de la ley** — Evitar arrestos 1 vez al mes",
              "**Cara de póker** — Nadie puede detectar tus mentiras"
            ]
          },
          {
            title: "💪 Rama Física — Físico/Agilidad 30+",
            type: "list",
            items: [
              "**Reflejos de combate** — Actuar primero en iniciativa",
              "**Puño de hierro** — +10 de daño cuerpo a cuerpo",
              "**Puntería quirúrgica** — Ignorar penalizaciones al disparar"
            ]
          },
          {
            title: "🔮 Rama Instinto — Intuición/Temple 30+",
            type: "list",
            items: [
              "**Ojo de halcón** — Detectar emboscadas automáticamente",
              "**Corazón de hielo** — Inmune a intimidación",
              "**Fantasma** — +10 en sigilo"
            ]
          }
        ]
      },
      {
        type: "infobox",
        text: "⚡ **Perks personalizados** permitidos con aprobación del staff. Máximo **2 perks** iniciales + **20 PD extra** para perks al crear personaje."
      }
    ]
  },
  {
    id: "resolucion",
    title: "Resolución de Acciones",
    subtitle: "Sistema híbrido: narrativa con apoyo de dados en momentos de tensión.",
    icon: "🎯",
    content: [
      {
        type: "formula",
        expression: "Atributo + 1d100",
        description: "Compara contra la dificultad establecida por el master / narrador."
      },
      {
        type: "grid",
        items: [
          {
            title: "🎯 Dificultades",
            type: "table",
            headers: ["Dificultad", "CD"],
            rows: [
              ["Fácil", "40"],
              ["Normal", "70"],
              ["Difícil", "100"],
              ["Extrema", "140"]
            ]
          },
          {
            title: "⚔️ PvP",
            type: "text",
            body: "Enfrentamiento directo: el resultado **más alto** gana. Ambos tiran *Atributo + 1d100*.\n\n📌 Los dados solo se usan en **momentos de tensión** donde el resultado sea incierto. El resto es narrativo."
          }
        ]
      }
    ]
  },
  {
    id: "juicios",
    title: "Juicios y Sistema Legal",
    subtitle: "Proceso judicial completo en 6 pasos. La ley de Arkham es implacable.",
    icon: "⚖️",
    content: [
      {
        type: "steps",
        items: [
          { title: "Apertura del caso", body: "El fiscal presenta los cargos formalmente." },
          { title: "Defensa", body: "El abogado presenta la versión del acusado." },
          { title: "Testigos", body: "Declaraciones y contrainterrogatorio." },
          { title: "Veredicto", body: "El juez decide: absolución, multa, trabajos, prisión, cadena perpetua o ejecución **(solo con consenso)**." },
          { title: "Apelación", body: "Una única apelación con un juez diferente." },
          { title: "Prisiones", body: "Rol de Encarcelado. Libertad condicional tras cumplir la mitad de la condena." }
        ]
      }
    ]
  },
  {
    id: "combate",
    title: "Combate",
    subtitle: "Sistema principalmente narrativo. Los dados solo entran en tensión extrema.",
    icon: "⚔️",
    content: [
      {
        type: "grid-3",
        items: [
          { title: "🗡️ Iniciativa", body: "**Agilidad + 1d100**. El orden de mayor a menor determina los turnos." },
          { title: "🎯 Ataque", body: "**Agilidad o Físico + 1d100** vs CD 70. Superar la CD es acertar." },
          { title: "🛡️ Defensa", body: "**Esquivar:** Agilidad + 1d100. **Bloquear:** Físico + 1d100. Debe superar el ataque." }
        ]
      },
      {
        type: "grid",
        items: [
          {
            title: "💥 Daño",
            type: "table",
            headers: ["Tipo", "Fórmula"],
            rows: [
              ["Cuerpo a cuerpo", "Físico ÷ 10 + modificador"],
              ["Arma de fuego", "Agilidad ÷ 10 + modificador"]
            ]
          },
          {
            title: "❤️ Puntos de Vida",
            type: "text",
            body: "**PV = 50 + (Físico × 2)**\n\n0 PV = **inconsciente**. La muerte solo ocurre con **consenso** de todas las partes."
          }
        ]
      }
    ]
  },
  {
    id: "fichas",
    title: "Fichas de Personaje",
    subtitle: "Creación, aprobación y gestión de tu personaje en LAST ANGEL.",
    icon: "📝",
    content: [
      {
        type: "grid",
        items: [
          {
            title: "📝 Creación",
            type: "list",
            items: [
              "Nombre, edad, profesión",
              "Trasfondo **(500 palabras)**",
              "**150 puntos** en atributos (cap **50**)",
              "Máx. **2 perks** iniciales + **20 PD extra**"
            ]
          },
          {
            title: "✅ Aprobación y Hilo",
            type: "list",
            items: [
              "Un miembro del **staff** revisa y aprueba la ficha",
              "Se abre un hilo en **#fichas-aprobadas**",
              "Las actualizaciones se solicitan mediante **nuevo ticket**"
            ]
          }
        ]
      }
    ]
  },
  {
    id: "web",
    title: "Web de Fichas",
    subtitle: "Plataforma externa para gestión de personajes — próximamente.",
    icon: "🌐",
    content: [
      {
        type: "coming-soon",
        icon: "🚧",
        title: "En desarrollo",
        body: "Estamos construyendo una plataforma web con **GitHub Pages** y **Formspree** para que puedas crear, enviar y recibir notificaciones sobre tu ficha de personaje directamente desde el navegador.\n\n📢 El lanzamiento se anunciará en **#anuncios**.\n\nFormulario de envío • Notificaciones • Integración con Discord"
      }
    ]
  }
];
