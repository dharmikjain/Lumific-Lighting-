/**
 * Shader utilities and helpers
 */

export const vertexShader = `
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying float vWave;

  uniform float uTime;

  void main() {
    vNormal = normalize(normalMatrix * normal);
    vPosition = position;
    
    vec3 pos = position;
    pos.y += sin(pos.x * 0.5 + uTime) * 0.1;
    pos.z += cos(pos.y * 0.5 + uTime) * 0.1;
    
    vWave = sin(length(position) - uTime) * 0.5;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`

export const fragmentShader = `
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying float vWave;

  uniform float uTime;
  uniform vec3 uColor;

  void main() {
    vec3 normal = normalize(vNormal);
    vec3 lightDir = normalize(vec3(1.0, 1.0, 1.0));
    
    float diffuse = max(dot(normal, lightDir), 0.0);
    float fresnel = pow(1.0 - abs(dot(normal, normalize(vPosition))), 2.0);
    
    vec3 color = uColor * diffuse + vec3(0.2) * fresnel;
    color += vec3(0.1) * vWave;
    
    gl_FragColor = vec4(color, 1.0);
  }
`

export const glow = (intensity: number = 1.0): string => {
  return `
    uniform float uGlowIntensity;
    
    void main() {
      gl_FragColor.a *= uGlowIntensity * ${intensity};
    }
  `
}
