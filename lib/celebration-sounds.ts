// ============================================
// Celebration Sound - Web Audio API
// ============================================

export function playCelebrationSound(): void {
  try {
    const ctx = new AudioContext()

    function playNote(
      freq: number,
      startTime: number,
      duration: number,
      volume: number,
      type: OscillatorType = "sine"
    ) {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = type
      osc.frequency.setValueAtTime(freq, ctx.currentTime + startTime)
      gain.gain.setValueAtTime(0, ctx.currentTime + startTime)
      gain.gain.linearRampToValueAtTime(
        volume,
        ctx.currentTime + startTime + 0.05
      )
      gain.gain.setValueAtTime(
        volume,
        ctx.currentTime + startTime + duration - 0.1
      )
      gain.gain.linearRampToValueAtTime(
        0,
        ctx.currentTime + startTime + duration
      )
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(ctx.currentTime + startTime)
      osc.stop(ctx.currentTime + startTime + duration)
    }

    // Triumphant fanfare melody
    const melody: [number, number, number, number][] = [
      [523, 0.0, 0.2, 0.3],
      [659, 0.2, 0.2, 0.3],
      [784, 0.4, 0.2, 0.35],
      [1047, 0.6, 0.5, 0.4],
      [880, 1.2, 0.2, 0.3],
      [1047, 1.4, 0.2, 0.35],
      [1175, 1.6, 0.2, 0.35],
      [1319, 1.8, 0.6, 0.4],
      [1175, 2.5, 0.15, 0.25],
      [1319, 2.7, 0.15, 0.25],
      [1397, 2.9, 0.15, 0.3],
      [1568, 3.1, 0.8, 0.35],
    ]

    melody.forEach(([freq, start, dur, vol]) => {
      playNote(freq, start, dur, vol, "triangle")
    })

    // Background harmony chords
    const chords: [number, number, number, number][] = [
      [262, 0.0, 1.0, 0.08],
      [330, 0.0, 1.0, 0.08],
      [392, 1.2, 1.0, 0.08],
      [494, 1.2, 1.0, 0.08],
      [523, 2.5, 1.5, 0.1],
      [659, 2.5, 1.5, 0.1],
    ]

    chords.forEach(([freq, start, dur, vol]) => {
      playNote(freq, start, dur, vol, "sine")
    })

    // Sparkle effects
    const sparkles: [number, number, number, number][] = [
      [2093, 0.6, 0.1, 0.08],
      [2637, 1.8, 0.1, 0.08],
      [3136, 3.1, 0.15, 0.1],
    ]

    sparkles.forEach(([freq, start, dur, vol]) => {
      playNote(freq, start, dur, vol, "sine")
    })

    setTimeout(() => ctx.close(), 5000)
  } catch {
    // Silently fail if audio is not supported
  }
}
