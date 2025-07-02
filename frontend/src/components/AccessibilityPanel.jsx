import React from "react";
import { icons } from "../data/icons";
import { useAccessibility } from "../hooks/useAccessibility";

function AccessibilityPanel() {
  const {
    visible,
    setVisible,
    collapse,
    setCollapse,
    active,
    toggleProfile,
    toggleOption,
    colorTab,
    setColorTab,
    hue,
    handleColorChange,
    resetColors,
    speak,
    dict,
  } = useAccessibility();

  const DropIcon = icons.drop;

  function Card({ icon: Icon, label, keyName, onClick, profile }) {
    return (
      <button
        onClick={() =>
          profile ? toggleProfile(profile) : onClick ? onClick() : toggleOption(keyName)
        }
        style={{
          width: 120,
          height: 80,
          border: active[keyName] || (profile && active[profile]) ? "2px solid #08c" : "2px solid #ccc",
          background: active[keyName] || (profile && active[profile]) ? "#e6f8ff" : "#f6f8fa",
          borderRadius: 14,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 28,
          cursor: "pointer",
          outline: active[keyName] || (profile && active[profile]) ? "3px solid #22bdf0" : "none",
          marginBottom: 10,
          marginRight: 12,
          boxShadow: active[keyName] || (profile && active[profile]) ? "0 0 8px #22bdf0" : "none",
          userSelect: "none",
          transition: "all 0.15s",
        }}
        aria-pressed={active[keyName] || (profile && active[profile])}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            profile ? toggleProfile(profile) : onClick ? onClick() : toggleOption(keyName);
          }
        }}
      >
        <Icon size={32} />
        <span style={{ fontSize: 13, marginTop: 4 }}>{label}</span>
      </button>
    );
  }

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
              marginLeft: 8,
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
      <button
        style={{
          position: "fixed",
          bottom: 32,
          left: 32,
          zIndex: 9999,
          background: "#0086c3",
          color: "#fff",
          borderRadius: "50%",
          width: 56,
          height: 56,
          border: "none",
          fontSize: 30,
          cursor: "pointer",
          boxShadow: "2px 2px 12px #0003",
        }}
        aria-label="Abrir panel de accesibilidad"
        onClick={() => setVisible(true)}
        tabIndex={0}
      >
        <icons.access size={28} />
      </button>

      {visible && (
        <div
          id="panel-accesibilidad"
          tabIndex={-1}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: 450,
            height: "100vh",
            background: "#fff",
            boxShadow: "3px 0 24px #0005",
            zIndex: 10000,
            padding: 20,
            overflowY: "auto",
            outline: "none",
          }}
          aria-modal="true"
          role="dialog"
        >
          <button
            onClick={() => setVisible(false)}
            style={{
              position: "absolute",
              top: 16,
              right: 16,
              background: "none",
              border: "none",
              fontSize: 28,
              cursor: "pointer",
              color: "#0086c3",
            }}
            aria-label="Cerrar panel"
            tabIndex={0}
            autoFocus
          >
            &times;
          </button>

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

          <Section
            title="Ajustes de voz y navegación"
            open={!collapse.voice}
            onToggle={() => setCollapse((s) => ({ ...s, voice: !s.voice }))}
          >
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              <Card icon={icons.screen} label="Lector de pantalla" keyName="screen" />
              <Card icon={icons.keyboard} label="Navegación teclado" keyName="keyboard" />
              <Card icon={icons.smartnav} label="Navegación inteligente" keyName="smartnav" />
              <Card icon={icons.speaker} label="Lector de texto" keyName="speaker" onClick={speak} />
              <Card icon={icons.mic} label="Comandos de voz" keyName="mic" />
            </div>
          </Section>

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
            <div
              style={{
                marginTop: 18,
                border: "1px solid #d0e8f3",
                borderRadius: 12,
                padding: 18,
                background: "#fafcfd",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", marginBottom: 10 }}>
                <DropIcon size={26} style={{ marginRight: 8 }} />
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
                    fontWeight: 600,
                    border: "none",
                    borderRadius: 12,
                    padding: "6px 20px",
                    cursor: "pointer",
                    fontSize: 16,
                  }}
                >
                  Fondos
                </button>
                <button
                  onClick={() => setColorTab("encabezados")}
                  style={{
                    background: colorTab === "encabezados" ? "#0086c3" : "#e5f5fa",
                    color: colorTab === "encabezados" ? "#fff" : "#0086c3",
                    fontWeight: 600,
                    border: "none",
                    borderRadius: 12,
                    padding: "6px 14px",
                    cursor: "pointer",
                    fontSize: 16,
                  }}
                >
                  Encabezados
                </button>
                <button
                  onClick={() => setColorTab("contenido")}
                  style={{
                    background: colorTab === "contenido" ? "#0086c3" : "#e5f5fa",
                    color: colorTab === "contenido" ? "#fff" : "#0086c3",
                    fontWeight: 600,
                    border: "none",
                    borderRadius: 12,
                    padding: "6px 14px",
                    cursor: "pointer",
                    fontSize: 16,
                  }}
                >
                  Contenido
                </button>
              </div>
              <input
                type="range"
                min={0}
                max={360}
                value={hue}
                aria-label="Color personalizado"
                style={{
                  width: "98%",
                  marginBottom: 8,
                  accentColor: "#0086c3",
                  background:
                    "linear-gradient(90deg, #ff0080, #7928ca, #2d9fff, #2ee59d, #fff600, #ff1e00, #808080)",
                  height: 7,
                  borderRadius: 4,
                }}
                onChange={(e) => handleColorChange(Number(e.target.value))}
              />
              <div
                style={{
                  marginTop: 6,
                  fontSize: 15,
                  border: "1px solid #c7e0f1",
                  borderRadius: 8,
                  background: "#f8fbff",
                  padding: "6px 10px",
                  color: "#055a7d",
                }}
              >
                Actual: <span
                  style={{
                    display: "inline-block",
                    width: 22,
                    height: 22,
                    background: hueToHex(hue),
                    borderRadius: "50%",
                    border: "1.5px solid #ccc",
                    marginLeft: 4,
                    verticalAlign: "middle",
                  }}
                ></span>{" "}
                {hueToHex(hue)}
                <button
                  style={{
                    marginLeft: 16,
                    fontSize: 13,
                    background: "#ffe6e6",
                    border: "none",
                    color: "#a00",
                    borderRadius: 7,
                    padding: "3px 10px",
                    marginTop: -2,
                    cursor: "pointer",
                  }}
                  onClick={resetColors}
                  type="button"
                >
                  Restablecer colores
                </button>
              </div>
            </div>
          </Section>

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
              <Card icon={icons.dict} label="Diccionario" keyName="dict" onClick={dict} />
              <Card icon={icons.virtualkb} label="Teclado virtual" keyName="virtualkb" />
            </div>
          </Section>

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
              cursor: "pointer",
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

function hueToHex(hue) {
  const h = hue / 360,
    s = 1,
    l = 0.5;
  const f = (n) => {
    const k = (n + h * 12) % 12;
    const a = s * Math.min(l, 1 - l);
    const color = l - a * Math.max(-1, Math.min(k - 3, Math.min(9 - k, 1)));
    return Math.round(255 * color);
  };
  return "#" + [f(0), f(8), f(4)].map((v) => v.toString(16).padStart(2, "0")).join("");
}
