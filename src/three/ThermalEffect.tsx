import { Effect, BlendFunction } from 'postprocessing'
import { Uniform } from 'three'
import { wrapEffect } from '@react-three/postprocessing'
import { thermalState } from './thermalState'
import React from 'react'

const fragment = /* glsl */ `
uniform float uIntensity;

vec3 thermal(float t){
  vec3 c0 = vec3(0.02, 0.02, 0.10); // cold - deep blue/black
  vec3 c1 = vec3(0.18, 0.02, 0.45); // indigo
  vec3 c2 = vec3(0.65, 0.05, 0.55); // magenta
  vec3 c3 = vec3(0.95, 0.12, 0.10); // red
  vec3 c4 = vec3(1.00, 0.55, 0.00); // orange
  vec3 c5 = vec3(1.00, 0.90, 0.20); // yellow
  vec3 c6 = vec3(1.00, 1.00, 1.00); // hot - white
  float s = t * 6.0;
  if (s < 1.0) return mix(c0, c1, s);
  if (s < 2.0) return mix(c1, c2, s - 1.0);
  if (s < 3.0) return mix(c2, c3, s - 2.0);
  if (s < 4.0) return mix(c3, c4, s - 3.0);
  if (s < 5.0) return mix(c4, c5, s - 4.0);
  return mix(c5, c6, clamp(s - 5.0, 0.0, 1.0));
}

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor){
  float l = dot(inputColor.rgb, vec3(0.299, 0.587, 0.114));
  l = clamp(pow(l, 0.7), 0.0, 1.0);
  vec3 t = thermal(l);
  outputColor = vec4(mix(inputColor.rgb, t, uIntensity), inputColor.a);
}
`

class ThermalEffectImpl extends Effect {
  constructor() {
    super('ThermalEffect', fragment, {
      blendFunction: BlendFunction.NORMAL,
      uniforms: new Map([['uIntensity', new Uniform(0)]]),
    })
  }
  update() {
    ;(this.uniforms.get('uIntensity') as Uniform).value = thermalState.value
  }
}

export const ThermalEffect = wrapEffect(ThermalEffectImpl) as unknown as React.FC<{ blendFunction?: BlendFunction }>
