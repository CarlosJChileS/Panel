import React, { useState, useEffect } from "react";

// Helpers para color personalizado
function hueToHex(hue) {
  const h = hue / 360, s = 1, l = 0.5;
  const f = (n) => {
    const k = (n + h * 12) % 12;
    const a = s * Math.min(l, 1 - l);
    const color =
      l - a * Math.max(-1, Math.min(k - 3, Math.min(9 - k, 1)));
    return Math.round(255 * color);
  };
  return (
    "#" +
    [f(0), f(8), f(4)]
      .map((v) => v.toString(16).padStart(2, "0"))
      .join("")
  );
}

// Íconos (emojis)
const icons = {
  blindness: "🦯", motor: "🦾", daltonism: "🌈", visual: "👓", epilepsy: "⚡",
  adhd: "💡", learning: "📚", elder: "🧓", dyslexia: "🔤", screen: "🦻",
  keyboard: "⌨️", smartnav: "↔️", speaker: "🔊", mic: "🎙️", eye: "👁️",
  moon: "🌙", sun: "☀️", drop: "💧", contrast: "🟪", font: "🔤", cursor: "🖱️",
  block: "🚫", cc: "📝", zoom: "🔍", readable: "🔠", image: "🖼️", link: "🔗",
  heading: "🅷", enlarge: "⬆️", doc: "📄", mute: "🔇", focus: "🔲", guide: "📕",
  dict: "📖", virtualkb: "🖥️"
};

// Perfiles y qué activa cada uno
const accessibilityProfiles = {
  blindness: [
    "screen", "eye", "moon", "contrast", "readable", "link", "heading"
  ],
  motor: [
    "keyboard", "smartnav", "virtualkb", "enlarge"
  ],
  daltonism: [
    "contrast"
  ],
  visual: [
    "zoom", "eye", "readable", "fontIncrease"
  ],
  epilepsy: [
    "block"
  ],
  adhd: [
    "guide", "focus", "heading", "link"
  ],
  learning: [
    "speaker", "dict", "doc"
  ],
  elder: [
    "zoom", "readable", "fontIncrease"
  ],
  dyslexia: [
    "readable", "fontIncrease", "lineSpace"
  ]
};

function AccessibilityPanel() {
  const [visible, setVisible] = useState(false);
  const [collapse, setCollapse] = useState({
    profiles: false, voice: false, color: false, content: false, advanced: false
  });
  const [active, setActive] = useState({
    blindness: false, motor: false, daltonism: false, visual: false,
    epilepsy: false, adhd: false, learning: false, elder: false, dyslexia: false,
    screen: false, keyboard: false, smartnav: false, speaker: false, mic: false,
    eye: false, moon: false, sun: false, lowSaturation: false, highSaturation: false,
    contrast: false, customColor: false, fontIncrease: false, fontDecrease: false,
    lineSpace: false, wordSpace: false, letterSpace: false, cursorWhite: false,
    cursorBlack: false, block: false, cc: false, zoom: false, readable: false,
    image: false, link: false, heading: false, enlarge: false, doc: false,
    textZoom: false, mute: false, focus: false, guide: false, dict: false, virtualkb: false
  });
  // Color personalizado
  const [colorTab, setColorTab] = useState("fondos");
  const [hue, setHue] = useState(180);
  const [customColors, setCustomColors] = useState({
    fondos: "", encabezados: "", contenido: ""
  });

  // --- EFECTOS ACCESIBILIDAD SOBRE TODA LA PÁGINA ---
  useEffect(() => {
    // Selecciona el contenedor de la app o el body
    const root = document.querySelector('.dashboard-bg') || document.body;

    // Fondos y colores personalizados
    root.style.background = customColors.fondos || (active.moon ? "#222" : active.sun ? "#fff" : "#fff");
    root.style.color = customColors.contenido || (active.moon ? "#fff" : active.sun ? "#111" : "#222");

    // Cambia encabezados
    root.querySelectorAll("h1,h2,h3,h4,h5,h6").forEach(h => {
      h.style.background = customColors.encabezados || (active.heading ? "#ffff80" : "");
    });

    // Filtros
    let f = "";
    if (active.eye) f += " grayscale(1)";
    if (active.lowSaturation) f += " saturate(0.4)";
    if (active.highSaturation) f += " saturate(2)";
    if (active.contrast) f += " contrast(1.7)";
    root.style.filter = f.trim();

    // Resalta enlaces
    root.querySelectorAll("a").forEach(a => {
      a.style.outline = active.link ? "3px solid #0af" : "";
      a.style.background = active.link ? "#eafffc" : "";
    });
    // Letra legible
    root.style.fontFamily = active.readable ? "Arial, Verdana, sans-serif" : "";
    // Zoom y fuentes
    root.style.zoom = active.zoom ? 1.5 : 1;
    root.style.fontSize = active.fontIncrease
      ? "1.4em"
      : active.fontDecrease
      ? "0.9em"
      : "1em";
    root.style.lineHeight = active.lineSpace ? 2 : 1.4;
    root.style.wordSpacing = active.wordSpace ? "8px" : "";
    root.style.letterSpacing = active.letterSpace ? "3px" : "";
    root.querySelectorAll("audio,video").forEach(
      (el) => (el.muted = !!active.mute)
    );

    // Cursor blanco/negro
    if (active.cursorWhite) {
      document.body.style.cursor = "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2224%22 height=%2224%22><rect width=%2224%22 height=%2224%22 fill=%22white%22 stroke=%22black%22/></svg>') 0 0, auto";
    } else if (active.cursorBlack) {
      document.body.style.cursor = "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2224%22 height=%2224%22><rect width=%2224%22 height=%2224%22 fill=%22black%22 stroke=%22white%22/></svg>') 0 0, auto";
    } else {
      document.body.style.cursor = "";
    }

    // Limpieza al desmontar/cambio
    return () => {
      root.style.background = "";
      root.style.color = "";
      root.style.filter = "";
      root.style.fontFamily = "";
      root.style.zoom = "";
      root.style.fontSize = "";
      root.style.lineHeight = "";
      root.style.wordSpacing = "";
      root.style.letterSpacing = "";
      document.body.style.cursor = "";
      root.querySelectorAll("a").forEach((a) => {
        a.style.outline = "";
        a.style.background = "";
      });
      root.querySelectorAll("h1, h2, h3, h4, h5, h6").forEach((h) => {
        h.style.background = "";
      });
      root.querySelectorAll("audio,video").forEach(
        (el) => (el.muted = false)
      );
    };
  }, [active, customColors]);

  // --- Lógica de perfiles ---
  const handleProfile = (profile) => {
    setActive((old) => {
      // Activa/desactiva (toggle)
      const activar = !old[profile];
      const set = { ...old, [profile]: activar };
      accessibilityProfiles[profile].forEach(k => { set[k] = activar; });
      return set;
    });
  };

  // --- Lógica de botones individuales ---
  const handleToggle = (key) => {
    setActive((a) => ({ ...a, [key]: !a[key] }));
  };

  // --- Color personalizado ---
  const handleColorChange = (newHue) => {
    setHue(newHue);
    const hex = hueToHex(newHue);
    setCustomColors((c) => ({
      ...c,
      [colorTab]: hex
    }));
    setActive((a) => ({ ...a, customColor: true }));
  };
  const resetColors = () => {
    setCustomColors({ fondos: "", encabezados: "", contenido: "" });
    setActive((a) => ({ ...a, customColor: false }));
  };

  // Lector de texto
  const handleSpeak = () => {
    const root = document.querySelector('.dashboard-bg') || document.body;
    window.speechSynthesis.cancel();
    const utter = new window.SpeechSynthesisUtterance(root.innerText);
    utter.lang = "es-ES";
    const voice = window.speechSynthesis
      .getVoices()
      .find((v) => v.lang.startsWith("es"));
    if (voice) utter.voice = voice;
    window.speechSynthesis.speak(utter);
  };

  // Diccionario
  const handleDict = () => window.open("https://www.rae.es/", "_blank");

  // Card botón
  function Card({ icon, label, keyName, onClick, profile }) {
    return (
      <button
        onClick={() => profile ? handleProfile(profile) : (onClick ? onClick() : handleToggle(keyName))}
        style={{
          width: 120, height: 80,
          border: active[keyName] || (profile && active[profile]) ? "2px solid #08c" : "2px solid #ccc",
          background: active[keyName] || (profile && active[profile]) ? "#e6f8ff" : "#f6f8fa",
          borderRadius: 14,
          display: "flex", flexDirection: "column", alignItems: "center",
          justifyContent: "center", fontSize: 28, cursor: "pointer",
          outline: active[keyName] || (profile && active[profile]) ? "3px solid #22bdf0" : "none",
          marginBottom: 10, marginRight: 12,
          boxShadow: active[keyName] || (profile && active[profile]) ? "0 0 8px #22bdf0" : "none",
          userSelect: "none", transition: "all 0.15s"
        }}
        aria-pressed={active[keyName] || (profile && active[profile])}
        tabIndex={0}
        onKeyDown={e => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            profile ? handleProfile(profile) : (onClick ? onClick() : handleToggle(keyName));
          }
        }}
      >
        <span style={{ fontSize: 32 }}>{icon}</span>
        <span style={{ fontSize: 13, marginTop: 4 }}>{label}</span>
      </button>
    );
  }

  // Categoría colapsable
  function Section({ title, children, open, onToggle }) {
    return (
      <section style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 4 }}>
          <h3 style={{ flex: 1, color: "#0086c3" }}>{title}</h3>
          <button
            aria-label={open ? "Colapsar sección" : "Expandir sección"}
            style={{
              background: "#eee",
              border: "none",
              borderRadius: 6,
              width: 28,
              height: 28,
              fontSize: 22,
              cursor: "pointer",
              marginLeft: 8
            }}
            onClick={onToggle}
          >
            {open ? "−" : "+"}
          </button>
        </div>
        {open && <div>{children}</div>}
      </section>
    );
  }

  return (
    <>
      {/* Botón flotante izquierdo */}
      <button
        style={{
          position: "fixed", bottom: 32, left: 32, zIndex: 9999,
          background: "#0086c3", color: "#fff", borderRadius: "50%",
          width: 56, height: 56, border: "none", fontSize: 30, cursor: "pointer",
          boxShadow: "2px 2px 12px #0003"
        }}
        aria-label="Abrir panel de accesibilidad"
        onClick={() => setVisible(true)}
        tabIndex={0}
      >♿</button>

      {/* Panel superpuesto izquierdo */}
      {visible && (
        <div
          id="panel-accesibilidad"
          tabIndex={-1}
          style={{
            position: "fixed", top: 0, left: 0, width: 450, height: "100vh",
            background: "#fff", boxShadow: "3px 0 24px #0005", zIndex: 10000,
            padding: 20, overflowY: "auto", outline: "none"
          }}
          aria-modal="true"
          role="dialog"
        >
          <button
            onClick={() => setVisible(false)}
            style={{
              position: "absolute", top: 16, right: 16, background: "none",
              border: "none", fontSize: 28, cursor: "pointer", color: "#0086c3"
            }}
            aria-label="Cerrar panel"
            tabIndex={0}
            autoFocus
          >
            &times;
          </button>

          {/* Perfiles de accesibilidad */}
          <Section
            title="Perfiles de accesibilidad"
            open={!collapse.profiles}
            onToggle={() => setCollapse((s) => ({ ...s, profiles: !s.profiles }))}
          >
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              <Card icon={icons.blindness} label="Ceguera" profile="blindness" keyName="blindness" />
              <Card icon={icons.motor} label="Trastornos motores" profile="motor" keyName="motor" />
              <Card icon={icons.daltonism} label="Daltonismo" profile="daltonism" keyName="daltonism" />
              <Card icon={icons.visual} label="Discapacidad visual" profile="visual" keyName="visual" />
              <Card icon={icons.epilepsy} label="Epilepsia" profile="epilepsy" keyName="epilepsy" />
              <Card icon={icons.adhd} label="TDAH" profile="adhd" keyName="adhd" />
              <Card icon={icons.learning} label="Aprendizaje" profile="learning" keyName="learning" />
              <Card icon={icons.elder} label="Mayor" profile="elder" keyName="elder" />
              <Card icon={icons.dyslexia} label="Dislexia" profile="dyslexia" keyName="dyslexia" />
            </div>
          </Section>

          {/* Voz y navegación */}
          <Section
            title="Ajustes de voz y navegación"
            open={!collapse.voice}
            onToggle={() => setCollapse((s) => ({ ...s, voice: !s.voice }))}
          >
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              <Card icon={icons.screen} label="Lector de pantalla" keyName="screen" />
              <Card icon={icons.keyboard} label="Navegación teclado" keyName="keyboard" />
              <Card icon={icons.smartnav} label="Navegación inteligente" keyName="smartnav" />
              <Card icon={icons.speaker} label="Lector de texto" keyName="speaker" onClick={handleSpeak} />
              <Card icon={icons.mic} label="Comandos de voz" keyName="mic" />
            </div>
          </Section>

          {/* Ajuste de color */}
          <Section
            title="Ajuste de color"
            open={!collapse.color}
            onToggle={() => setCollapse((s) => ({ ...s, color: !s.color }))}
          >
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              <Card icon={icons.eye} label="Monocromo" keyName="eye" />
              <Card icon={icons.moon} label="Contraste oscuro" keyName="moon" />
              <Card icon={icons.sun} label="Contraste claro" keyName="sun" />
              <Card icon={icons.drop} label="Baja saturación" keyName="lowSaturation" />
              <Card icon={icons.drop} label="Alta saturación" keyName="highSaturation" />
              <Card icon={icons.contrast} label="Modo contraste" keyName="contrast" />
            </div>
            {/* COLOR PERSONALIZADO */}
            <div style={{
              marginTop: 18, border: "1px solid #d0e8f3", borderRadius: 12, padding: 18,
              background: "#fafcfd"
            }}>
              <div style={{ display: "flex", alignItems: "center", marginBottom: 10 }}>
                <span style={{ fontSize: 26, marginRight: 8 }}>{icons.drop}</span>
                <span>
                  <b style={{ color: "#0086c3" }}>Color personalizado</b>
                  <div style={{ fontSize: 15, color: "#444" }}>Cambiar los colores del sitio</div>
                </span>
              </div>
              <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
                <button
                  onClick={() => setColorTab("fondos")}
                  style={{
                    background: colorTab === "fondos" ? "#0086c3" : "#e5f5fa",
                    color: colorTab === "fondos" ? "#fff" : "#0086c3",
                    fontWeight: 600, border: "none", borderRadius: 12,
                    padding: "6px 20px", cursor: "pointer", fontSize: 16
                  }}
                >Fondos</button>
                <button
                  onClick={() => setColorTab("encabezados")}
                  style={{
                    background: colorTab === "encabezados" ? "#0086c3" : "#e5f5fa",
                    color: colorTab === "encabezados" ? "#fff" : "#0086c3",
                    fontWeight: 600, border: "none", borderRadius: 12,
                    padding: "6px 14px", cursor: "pointer", fontSize: 16
                  }}
                >Encabezados</button>
                <button
                  onClick={() => setColorTab("contenido")}
                  style={{
                    background: colorTab === "contenido" ? "#0086c3" : "#e5f5fa",
                    color: colorTab === "contenido" ? "#fff" : "#0086c3",
                    fontWeight: 600, border: "none", borderRadius: 12,
                    padding: "6px 14px", cursor: "pointer", fontSize: 16
                  }}
                >Contenido</button>
              </div>
              <input
                type="range"
                min={0}
                max={360}
                value={hue}
                aria-label="Color personalizado"
                style={{
                  width: "98%", marginBottom: 8, accentColor: "#0086c3",
                  background:
                    "linear-gradient(90deg, #ff0080, #7928ca, #2d9fff, #2ee59d, #fff600, #ff1e00, #808080)",
                  height: 7, borderRadius: 4
                }}
                onChange={(e) => handleColorChange(Number(e.target.value))}
              />
              <div style={{
                marginTop: 6, fontSize: 15, border: "1px solid #c7e0f1",
                borderRadius: 8, background: "#f8fbff", padding: "6px 10px", color: "#055a7d"
              }}>
                Actual: <span style={{
                  display: "inline-block", width: 22, height: 22,
                  background: hueToHex(hue), borderRadius: "50%",
                  border: "1.5px solid #ccc", marginLeft: 4, verticalAlign: "middle"
                }}></span> {hueToHex(hue)}
                <button
                  style={{
                    marginLeft: 16, fontSize: 13, background: "#ffe6e6",
                    border: "none", color: "#a00", borderRadius: 7,
                    padding: "3px 10px", marginTop: -2, cursor: "pointer"
                  }}
                  onClick={resetColors}
                  type="button"
                >Restablecer colores</button>
              </div>
            </div>
          </Section>

          {/* Ajuste de contenido */}
          <Section
            title="Ajuste de contenido"
            open={!collapse.content}
            onToggle={() => setCollapse((s) => ({ ...s, content: !s.content }))}
          >
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              <Card icon={icons.font} label="Aumentar letra" keyName="fontIncrease" />
              <Card icon={icons.font} label="Disminuir letra" keyName="fontDecrease" />
              <Card icon={icons.font} label="Espacio entre líneas" keyName="lineSpace" />
              <Card icon={icons.font} label="Espacio entre palabras" keyName="wordSpace" />
              <Card icon={icons.font} label="Espacio entre letras" keyName="letterSpace" />
              <Card icon={icons.cursor} label="Cursor blanco" keyName="cursorWhite" />
              <Card icon={icons.cursor} label="Cursor negro" keyName="cursorBlack" />
              <Card icon={icons.block} label="Bloquear parpadeos" keyName="block" />
              <Card icon={icons.cc} label="Añadir subtítulos" keyName="cc" />
              <Card icon={icons.zoom} label="Lupa" keyName="zoom" />
            </div>
          </Section>

          {/* Opciones avanzadas */}
          <Section
            title="Opciones avanzadas"
            open={!collapse.advanced}
            onToggle={() => setCollapse((s) => ({ ...s, advanced: !s.advanced }))}
          >
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              <Card icon={icons.readable} label="Letra legible" keyName="readable" />
              <Card icon={icons.image} label="Descripción imágenes" keyName="image" />
              <Card icon={icons.link} label="Resaltar enlaces" keyName="link" />
              <Card icon={icons.heading} label="Resaltar títulos" keyName="heading" />
              <Card icon={icons.enlarge} label="Botones para ampliar" keyName="enlarge" />
              <Card icon={icons.doc} label="Modo legible" keyName="doc" />
              <Card icon={icons.zoom} label="Lupa de texto" keyName="textZoom" />
              <Card icon={icons.mute} label="Silenciar medios" keyName="mute" />
              <Card icon={icons.focus} label="Leer enfoque" keyName="focus" />
              <Card icon={icons.guide} label="Guía de lectura" keyName="guide" />
              <Card icon={icons.dict} label="Diccionario" keyName="dict" onClick={handleDict} />
              <Card icon={icons.virtualkb} label="Teclado virtual" keyName="virtualkb" />
            </div>
          </Section>

          {/* Desactivar todo */}
          <button
            style={{
              margin: "30px auto 0 auto",
              display: "block",
              background: "#f33",
              color: "#fff",
              border: "none",
              borderRadius: 12,
              padding: "10px 24px",
              fontSize: 18,
              cursor: "pointer"
            }}
            onClick={() => window.location.reload()}
            tabIndex={-1}
          >
            Desactivar accesibilidad
          </button>
        </div>
      )}
    </>
  );
}

export default AccessibilityPanel;
