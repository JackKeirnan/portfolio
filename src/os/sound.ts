/** Interface sounds JackOS can play. */
export type SoundName = "open" | "close" | "startup";

/** One square-wave tone: its pitch, when it starts and how long it lasts, in seconds. */
type Note = { frequency: number; start: number; duration: number };

// Short square-wave jingles; synthesised, so there are no audio files to download.
const SOUNDS: Record<SoundName, Note[]> = {
  open: [{ frequency: 660, start: 0, duration: 0.06 }, { frequency: 880, start: 0.06, duration: 0.08 }],
  close: [{ frequency: 880, start: 0, duration: 0.06 }, { frequency: 660, start: 0.06, duration: 0.08 }],
  startup: [
    { frequency: 523, start: 0, duration: 0.14 },
    { frequency: 659, start: 0.14, duration: 0.14 },
    { frequency: 784, start: 0.28, duration: 0.14 },
    { frequency: 1047, start: 0.42, duration: 0.3 },
  ],
};

// Shared across plays; created lazily so browsers that never play sound never allocate one.
let audioContext: AudioContext | null = null;

/** Plays a sound. The AudioContext is only created the first time sound is used. */
export function playSound(name: SoundName): void {
  try {
    // Create the context on first use; browsers may reject it, which the catch handles.
    audioContext ??= new AudioContext();
    // Schedule every note relative to now so the jingle plays in one go.
    const now = audioContext.currentTime;
    for (const note of SOUNDS[name]) {
      // One oscillator per note, each with its own gain envelope.
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();
      oscillator.type = "square";
      oscillator.frequency.value = note.frequency;
      // Quiet, with a fast fade so notes do not click.
      gain.gain.setValueAtTime(0.04, now + note.start);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + note.start + note.duration);
      // Route the note to the speakers and schedule its start and stop.
      oscillator.connect(gain).connect(audioContext.destination);
      oscillator.start(now + note.start);
      oscillator.stop(now + note.start + note.duration);
    }
  } catch {
    // No Web Audio (old browser or blocked): stay silent.
  }
}
