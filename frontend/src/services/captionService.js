export async function loadVttFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsText(file);
  });
}

let trackElements = [];
let trackUrl = null;

export function enableSubtitles(vttText, lang = "es") {
  removeSubtitles();
  trackUrl = URL.createObjectURL(new Blob([vttText], { type: "text/vtt" }));
  document.querySelectorAll("video").forEach((video) => {
    const track = document.createElement("track");
    track.kind = "subtitles";
    track.label = "Subtítulos";
    track.srclang = lang;
    track.src = trackUrl;
    track.default = true;
    track.dataset.ccGenerated = "true";
    video.appendChild(track);
    trackElements.push(track);
  });
}

export function removeSubtitles() {
  trackElements.forEach((t) => t.remove());
  trackElements = [];
  if (trackUrl) {
    URL.revokeObjectURL(trackUrl);
    trackUrl = null;
  }
}

export async function generateSubtitlesFromVideo(video) {
  // Placeholder implementation. In a real scenario this would use speech
  // recognition or an external service to transcribe the audio track.
  return (
    "WEBVTT\n\n" +
    "00:00.000 --> 00:05.000\n" +
    "[Generación automática de subtítulos]\n"
  );
}
