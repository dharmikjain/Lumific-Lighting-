/**
 * GLSL Shaders for advanced lighting effects
 */

// Vertex shader with wave distortion
export const waveVertexShader = `
  precision highp float;
  
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec2 vUv;
  
  uniform float uTime;
  uniform float uWaveAmplitude;
  
  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    
    vec3 pos = position;
    pos += normal * sin(uTime + position.y) * uWaveAmplitude;
    
    vPosition = pos;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`

// Fragment shader with advanced lighting
export const advancedLightingShader = `
  precision highp float;
  
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec2 vUv;
  
  uniform float uTime;
  uniform vec3 uLightColor;
  uniform sampler2D uTexture;
  
  void main() {
    vec3 normal = normalize(vNormal);
    vec3 lightDir = normalize(vec3(sin(uTime), 1.0, cos(uTime)));
    
    float diffuse = max(dot(normal, lightDir), 0.0);
    float specular = pow(max(dot(normal, lightDir), 0.0), 32.0);
    
    vec3 color = uLightColor * (diffuse * 0.7 + specular * 0.3);
    color += vec3(0.1) * normal;
    
    gl_FragColor = vec4(color, 1.0);
  }
`

// Iridescent shader
export const iridescentShader = `
  precision highp float;
  
  varying vec3 vNormal;
  varying vec3 vViewDir;
  
  uniform float uTime;
  
  vec3 iridescence(vec3 normal, vec3 viewDir) {
    float fresnel = pow(1.0 - abs(dot(normal, viewDir)), 2.0);
    float angle = atan(normal.y, normal.x);
    
    vec3 color = vec3(
      sin(angle + uTime) * 0.5 + 0.5,
      sin(angle + uTime + 2.094) * 0.5 + 0.5,
      sin(angle + uTime + 4.188) * 0.5 + 0.5
    );
    
    return mix(color, vec3(1.0), fresnel);
  }
  
  void main() {
    vec3 normal = normalize(vNormal);
    vec3 viewDir = normalize(vViewDir);
    
    vec3 color = iridescence(normal, viewDir);
    gl_FragColor = vec4(color, 1.0);
  }
`
// Holographic shader
export const holographicShader = `
  precision highp float;
  
  varying vec2 vUv;
  uniform sampler2D uTexture;
  uniform float uTime;
  
  void main() {
    vec2 uv = vUv;
    uv.y += sin(uv.y * 10.0 + uTime * 2.0) * 0.02; // Scanline distortion
    vec4 color = texture2D(uTexture, uv);
    
    float intensity = 1.0 - abs(uv.y - 0.5) * 2.0;
    color.rgb += vec3(0.1, 0.2, 1.0) * intensity * 0.5; // Blue tint
    color.a *= smoothstep(0.0, 0.5, intensity); // Fade edges
    
    gl_FragColor = color;
  }
`

// Dissolve shader
export const dissolveShader = `
  precision highp float;
  
  varying vec2 vUv;
  uniform sampler2D uTexture;
  uniform float uDissolveFactor;
  uniform float uTime;
  
  // 2D noise function
  float rand(vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
  }
  
  void main() {
    vec4 color = texture2D(uTexture, vUv);
    float noise = rand(vUv * uTime);
    
    if (noise < uDissolveFactor) {
      discard;
    }
    
    gl_FragColor = color;
  }
`

// Simple Glow Shader
export const glowShader = `
    precision highp float;
    varying vec2 vUv;
    uniform sampler2D uTexture;
    uniform float uGlowIntensity;

    void main() {
        vec4 baseColor = texture2D(uTexture, vUv);
        vec3 bloom = baseColor.rgb * uGlowIntensity;
        gl_FragColor = vec4(baseColor.rgb + bloom, baseColor.a);
    }
`;
