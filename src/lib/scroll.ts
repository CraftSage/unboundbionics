// Module-level scroll state. Updated by Lenis (useLenis), read every frame
// by the 3D scene without triggering React re-renders.
export const scrollState = {
  progress: 0, // 0..1 across the whole page
  velocity: 0,
  raw: 0,
  mouseX: 0, // -1..1
  mouseY: 0, // -1..1
}
