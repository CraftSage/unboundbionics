import { EffectComposer, Bloom, Vignette, Noise } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import { ThermalEffect } from './ThermalEffect'

// Neon glow + thermal remap + cinematic darkening.
export function Effects() {
  return (
    <EffectComposer enableNormalPass={false}>
      <Bloom intensity={0.7} luminanceThreshold={0.3} luminanceSmoothing={0.5} mipmapBlur radius={0.65} />
      <ThermalEffect />
      <Vignette offset={0.25} darkness={0.92} eskil={false} />
      <Noise opacity={0.025} blendFunction={BlendFunction.OVERLAY} />
    </EffectComposer>
  )
}
