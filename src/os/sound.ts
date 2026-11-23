/** Interface sounds JackOS can play. */
export type SoundName = "open" | "close" | "minimize" | "maximize" | "error" | "startup";

// Recorded UI sounds from Kenney's Interface Sounds (CC0), served from public/sounds.
const FILES: Partial<Record<SoundName, string>> = {
  open: "/sounds/open.wav",
  close: "/sounds/close.wav",
  minimize: "/sounds/minimize.wav",
  maximize: "/sounds/maximize.wav",
  error: "/sounds/error.wav",
};

/** One square-wave tone: its pitch, when it starts and how long it lasts, in seconds. */
type Note = { frequency: number; start: number; duration: number };

// The startup chime stays synthesised: no original CC0 boot chime was found.
const STARTUP: Note[] = [
  { frequency: 523, start: 0, duration: 0.14 },
  { frequency: 659, start: 0.14, duration: 0.14 },
  { frequency: 784, start: 0.28, duration: 0.14 },
  { frequency: 1047, start: 0.42, duration: 0.3 },
];

// Created lazily so visitors who never turn sound on never download or allocate anything.
let audioContext: AudioContext | null = null;
const players = new Map<string, HTMLAudioElement>();

/** Plays a recorded sound, reusing one Audio element per file. */
function playFile(src: string): void {
  // Load each file once, on first use.
  let player = players.get(src);
  if (!player) {
    player = new Audio(src);
    player.volume = 0.5;
    players.set(src, player);
  }
  // Restart from the top so rapid repeats still sound; autoplay refusals are ignored.
  player.currentTime = 0;
  void player.play().catch(() => {});
}

/** Plays the synthesised startup chime with Web Audio. */
function playChime(): void {
  // Create the context on first use and wake it if the browser started it suspended.
  audioContext ??= new AudioContext();
  if (audioContext.state === "suspended") void audioContext.resume();
  // Schedule every note relative to now so the jingle plays in one go.
  const now = audioContext.currentTime;
  for (const note of STARTUP) {
    // One oscillator per note, each with a quiet gain envelope that fades to avoid clicks.
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    oscillator.type = "square";
    oscillator.frequency.value = note.frequency;
    gain.gain.setValueAtTime(0.04, now + note.start);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + note.start + note.duration);
    oscillator.connect(gain).connect(audioContext.destination);
    oscillator.start(now + note.start);
    oscillator.stop(now + note.start + note.duration);
  }
}

/** Plays a sound by name: recorded file when there is one, otherwise the chime. */
export function playSound(name: SoundName): void {
  try {
    const src = FILES[name];
    if (src) playFile(src);
    else playChime();
  } catch {
    // No audio support (old browser or blocked): stay silent.
  }
}
