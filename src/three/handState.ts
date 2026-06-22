// Shared, mutable hand state — written by the Journey section, read every
// frame by the 3D hand. No React re-renders.
export const handState = {
  // per-finger curl 0..1 — [thumb, index, middle, ring, pinky]
  curls: [0, 0, 0, 0, 0] as number[],
  // 0 = drifting with the page, 1 = centred & posing for the journey beat
  focus: 0,
  // 0 = visible, 1 = faded out (during the warp tunnel & contact section)
  hidden: 0,
}

if (typeof window !== 'undefined') (window as any).handState = handState
