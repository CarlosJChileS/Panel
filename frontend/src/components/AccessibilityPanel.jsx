import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { icons } from "../data/icons";
import { useAccessibility } from "../hooks/useAccessibility";
import "../AccessibilityPanel.css";
import {
  loadVttFile,
  enableSubtitles,
  removeSubtitles,
  generateSubtitlesFromVideo,
} from "../services/captionService";

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

  const { t } = useTranslation();

  const [vttText, setVttText] = useState("");

  useEffect(() => {
    if (!active.cc) {
      removeSubtitles();
    } else if (vttText) {
      enableSubtitles(vttText);
    }
  }, [active.cc, vttText]);

  const DropIcon = icons.drop;

  const handleCaptionUpload = async (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const text = await loadVttFile(file);
      setVttText(text);
    }
  };

  const handleTranscribe = async () => {
    const video = document.querySelector("video");
    if (video) {
      const text = await generateSubtitlesFromVideo(video);
      setVttText(text);
    } else {
      alert(t('access.videoMissing'));
    }
  };

  function Card({ icon: Icon, label, keyName, onClick, profile }) {
    return (
      <button
        type="button"
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
            type="button"
            aria-label={open ? t('access.collapse') : t('access.expand')}
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
        type="button"
        className="access-btn"
        aria-label={t('access.open')}
        onClick={() => setVisible(true)}
        tabIndex={0}
      >
        <icons.access size={28} />
      </button>
      {visible && (
        <>
          <div className="access-overlay" onClick={() => setVisible(false)} />
          <div
            id="panel-accesibilidad"
            className="access-panel"
            tabIndex={-1}
            aria-modal="true"
            role="dialog"
            onClick={(e) => e.stopPropagation()}
          >
          <button
            type="button"
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
            aria-label={t('access.close')}
            tabIndex={0}
            autoFocus
          >
            &times;
          </button>

          <Section
            title={t('access.profilesTitle')}
            open={!collapse.profiles}
            onToggle={() => setCollapse((s) => ({ ...s, profiles: !s.profiles }))}
          >
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              <Card icon={icons.blindness} label={t('access.profiles.blind')} profile="blindness" keyName="blindness" />
              <Card icon={icons.motor} label={t('access.profiles.motor')} profile="motor" keyName="motor" />
              <Card icon={icons.daltonism} label={t('access.profiles.daltonism')} profile="daltonism" keyName="daltonism" />
              <Card icon={icons.visual} label={t('access.profiles.visual')} profile="visual" keyName="visual" />
              <Card icon={icons.epilepsy} label={t('access.profiles.epilepsy')} profile="epilepsy" keyName="epilepsy" />
              <Card icon={icons.adhd} label={t('access.profiles.adhd')} profile="adhd" keyName="adhd" />
              <Card icon={icons.learning} label={t('access.profiles.learning')} profile="learning" keyName="learning" />
              <Card icon={icons.elder} label={t('access.profiles.elder')} profile="elder" keyName="elder" />
              <Card icon={icons.dyslexia} label={t('access.profiles.dyslexia')} profile="dyslexia" keyName="dyslexia" />
            </div>
          </Section>

          <Section
            title={t('access.voiceTitle')}
            open={!collapse.voice}
            onToggle={() => setCollapse((s) => ({ ...s, voice: !s.voice }))}
          >
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              <Card icon={icons.screen} label={t('access.voice.screen')} keyName="screen" />
              <Card icon={icons.keyboard} label={t('access.voice.keyboard')} keyName="keyboard" />
              <Card icon={icons.smartnav} label={t('access.voice.smartnav')} keyName="smartnav" />
              <Card icon={icons.speaker} label={t('access.voice.speaker')} keyName="speaker" onClick={speak} />
              <Card icon={icons.mic} label={t('access.voice.mic')} keyName="mic" />
            </div>
          </Section>

          <Section
            title={t('access.colorTitle')}
            open={!collapse.color}
            onToggle={() => setCollapse((s) => ({ ...s, color: !s.color }))}
          >
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              <Card icon={icons.eye} label={t('access.color.eye')} keyName="eye" />
              <Card icon={icons.moon} label={t('access.color.moon')} keyName="moon" />
              <Card icon={icons.sun} label={t('access.color.sun')} keyName="sun" />
              <Card icon={icons.drop} label={t('access.color.lowSaturation')} keyName="lowSaturation" />
              <Card icon={icons.drop} label={t('access.color.highSaturation')} keyName="highSaturation" />
              <Card icon={icons.contrast} label={t('access.color.contrast')} keyName="contrast" />
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
                  <b style={{ color: "#0086c3" }}>{t('access.customColor')}</b>
                  <div style={{ fontSize: 15, color: "#444" }}>{t('access.customDesc')}</div>
                </span>
              </div>
              <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
                <button
                  type="button"
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
                  {t('access.backgrounds')}
                </button>
                <button
                  type="button"
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
                  {t('access.headings')}
                </button>
                <button
                  type="button"
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
                  {t('access.contentTab')}
                </button>
              </div>
              <input
                type="range"
                min={0}
                max={360}
                value={hue}
                aria-label={t('access.customColor')}
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
                {t('access.current')}: <span
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
                  {t('access.resetColors')}
                </button>
              </div>
            </div>
          </Section>

          <Section
            title={t('access.contentTitle')}
            open={!collapse.content}
            onToggle={() => setCollapse((s) => ({ ...s, content: !s.content }))}
          >
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              <Card icon={icons.font} label={t('access.content.fontIncrease')} keyName="fontIncrease" />
              <Card icon={icons.font} label={t('access.content.fontDecrease')} keyName="fontDecrease" />
              <Card icon={icons.font} label={t('access.content.lineSpace')} keyName="lineSpace" />
              <Card icon={icons.font} label={t('access.content.wordSpace')} keyName="wordSpace" />
              <Card icon={icons.font} label={t('access.content.letterSpace')} keyName="letterSpace" />
              <Card icon={icons.cursor} label={t('access.content.cursorWhite')} keyName="cursorWhite" />
              <Card icon={icons.cursor} label={t('access.content.cursorBlack')} keyName="cursorBlack" />
              <Card icon={icons.block} label={t('access.content.block')} keyName="block" />
              <Card icon={icons.cc} label={t('access.content.cc')} keyName="cc" />
              <Card icon={icons.zoom} label={t('access.content.zoom')} keyName="zoom" />
            </div>
            {active.cc && (
              <div style={{ marginTop: 10 }}>
                <input
                  type="file"
                  accept=".vtt"
                  onChange={handleCaptionUpload}
                />
                <button
                  type="button"
                  style={{ marginLeft: 8 }}
                  onClick={handleTranscribe}
                >
                  {t('access.transcribe')}
                </button>
              </div>
            )}
          </Section>

          <Section
            title={t('access.advancedTitle')}
            open={!collapse.advanced}
            onToggle={() => setCollapse((s) => ({ ...s, advanced: !s.advanced }))}
          >
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              <Card icon={icons.readable} label={t('access.advanced.readable')} keyName="readable" />
              <Card icon={icons.image} label={t('access.advanced.image')} keyName="image" />
              <Card icon={icons.link} label={t('access.advanced.link')} keyName="link" />
              <Card icon={icons.heading} label={t('access.advanced.heading')} keyName="heading" />
              <Card icon={icons.enlarge} label={t('access.advanced.enlarge')} keyName="enlarge" />
              <Card icon={icons.doc} label={t('access.advanced.doc')} keyName="doc" />
              <Card icon={icons.zoom} label={t('access.advanced.textZoom')} keyName="textZoom" />
              <Card icon={icons.mute} label={t('access.advanced.mute')} keyName="mute" />
              <Card icon={icons.focus} label={t('access.advanced.focus')} keyName="focus" />
              <Card icon={icons.guide} label={t('access.advanced.guide')} keyName="guide" />
              <Card icon={icons.dict} label={t('access.advanced.dict')} keyName="dict" onClick={dict} />
              <Card icon={icons.virtualkb} label={t('access.advanced.virtualkb')} keyName="virtualkb" />
            </div>
          </Section>

          <button
            type="button"
            style={{
              margin: "30px auto 20px auto",
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
            {t('access.resetAll')}
          </button>
        </div>
        </>
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
