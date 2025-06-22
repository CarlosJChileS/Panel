import { useState, useEffect } from "react";
import { accessibilityProfiles } from "../../domain/accessibilityProfiles";
import { applyAccessibilityEffects } from "../../infrastructure/applyAccessibilityEffects";

export function useAccessibility() {
  const [visible, setVisible] = useState(false);
  const [collapse, setCollapse] = useState({
    profiles: false,
    voice: false,
    color: false,
    content: false,
    advanced: false,
  });
  const [active, setActive] = useState({
    blindness: false,
    motor: false,
    daltonism: false,
    visual: false,
    epilepsy: false,
    adhd: false,
    learning: false,
    elder: false,
    dyslexia: false,
    screen: false,
    keyboard: false,
    smartnav: false,
    speaker: false,
    mic: false,
    eye: false,
    moon: false,
    sun: false,
    lowSaturation: false,
    highSaturation: false,
    contrast: false,
    customColor: false,
    fontIncrease: false,
    fontDecrease: false,
    lineSpace: false,
    wordSpace: false,
    letterSpace: false,
    cursorWhite: false,
    cursorBlack: false,
    block: false,
    cc: false,
    zoom: false,
    readable: false,
    image: false,
    link: false,
    heading: false,
    enlarge: false,
    doc: false,
    textZoom: false,
    mute: false,
    focus: false,
    guide: false,
    dict: false,
    virtualkb: false,
  });
  const [colorTab, setColorTab] = useState("fondos");
  const [hue, setHue] = useState(180);
  const [customColors, setCustomColors] = useState({
    fondos: "",
    encabezados: "",
    contenido: "",
  });

  useEffect(() => applyAccessibilityEffects(active, customColors), [active, customColors]);

  const toggleProfile = (profile) => {
    setActive((old) => {
      const activar = !old[profile];
      const set = { ...old, [profile]: activar };
      accessibilityProfiles[profile].forEach((k) => {
        set[k] = activar;
      });
      return set;
    });
  };

  const toggleOption = (key) => {
    setActive((a) => ({ ...a, [key]: !a[key] }));
  };

  const handleColorChange = (newHue) => {
    setHue(newHue);
    const hex = hueToHex(newHue);
    setCustomColors((c) => ({ ...c, [colorTab]: hex }));
    setActive((a) => ({ ...a, customColor: true }));
  };

  const resetColors = () => {
    setCustomColors({ fondos: "", encabezados: "", contenido: "" });
    setActive((a) => ({ ...a, customColor: false }));
  };

  const speak = () => {
    const root = document.querySelector('.dashboard-bg') || document.body;
    window.speechSynthesis.cancel();
    const utter = new window.SpeechSynthesisUtterance(root.innerText);
    utter.lang = "es-ES";
    const voice = window.speechSynthesis.getVoices().find((v) => v.lang.startsWith("es"));
    if (voice) utter.voice = voice;
    window.speechSynthesis.speak(utter);
  };

  const dict = () => window.open("https://www.rae.es/", "_blank");

  return {
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
  };
}

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
