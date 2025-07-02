export function applyAccessibilityEffects(active, customColors) {
  const root = document.querySelector('.dashboard-bg') || document.body;

  const baseBg = customColors.fondos || (active.moon ? "#222" : active.sun ? "#fff" : "#fff");
  const baseColor = customColors.contenido || (active.moon ? "#fff" : active.sun ? "#111" : "#222");

  root.style.background = active.contrast && !customColors.fondos ? "#fff" : baseBg;
  root.style.color = active.contrast ? "#000" : baseColor;
  root.classList.toggle("contrast-mode", !!active.contrast);

  root.querySelectorAll("h1,h2,h3,h4,h5,h6").forEach((h) => {
    h.style.background = customColors.encabezados || (active.heading ? "#ffff80" : "");
  });

  let f = "";
  if (active.eye) f += " grayscale(1)";
  if (active.lowSaturation) f += " saturate(0.4)";
  if (active.highSaturation) f += " saturate(2)";
  if (active.contrast) f += " contrast(1.7)";
  root.style.filter = f.trim();

  root.querySelectorAll("a").forEach((a) => {
    a.style.outline = active.link ? "3px solid #0af" : "";
    a.style.background = active.link ? "#eafffc" : "";
  });
  root.style.fontFamily = active.readable ? "Arial, Verdana, sans-serif" : "";
  root.style.zoom = active.zoom ? 1.5 : 1;
  root.style.fontSize = active.fontIncrease
    ? "1.4em"
    : active.fontDecrease
    ? "0.9em"
    : "1em";
  root.style.lineHeight = active.lineSpace ? 2 : 1.4;
  root.style.wordSpacing = active.wordSpace ? "8px" : "";
  root.style.letterSpacing = active.letterSpace ? "3px" : "";
  root.querySelectorAll("audio,video").forEach((el) => (el.muted = !!active.mute));

  if (active.cursorWhite) {
    document.body.style.cursor =
      "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2224%22 height=%2224%22><rect width=%2224%22 height=%2224%22 fill=%22white%22 stroke=%22black%22/></svg>') 0 0, auto";
  } else if (active.cursorBlack) {
    document.body.style.cursor =
      "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2224%22 height=%2224%22><rect width=%2224%22 height=%2224%22 fill=%22black%22 stroke=%22white%22/></svg>') 0 0, auto";
  } else {
    document.body.style.cursor = "";
  }

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
    root.querySelectorAll("audio,video").forEach((el) => (el.muted = false));
  };
}
