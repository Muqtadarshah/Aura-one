// All product data, colors and 3D camera keyframes live here.
export const COLORS = [
  { hex: 0x7c5cff, name: 'Nebula Violet' },
  { hex: 0xff4d6d, name: 'Crimson Red' },
  { hex: 0x2ee6a6, name: 'Emerald' },
  { hex: 0xf5b942, name: 'Solar Gold' },
]

export const VARIANTS = [
  { name: 'AURA One', tagline: 'Flagship · Adaptive ANC · 60h battery', price: 84999, color: 0, scale: 1, band: 1, foam: 0x15151c, glow: 0x33d6ff, specs: 'Bluetooth 5.4 · LDAC · USB-C fast charge' },
  { name: 'AURA Studio', tagline: 'Pro studio monitoring · Hi-Res wired + wireless', price: 119999, color: 3, scale: 1.12, band: 1.5, foam: 0x3b2a1a, glow: 0xf5b942, specs: '50mm drivers · Detachable cable · 45h battery' },
  { name: 'AURA Air', tagline: 'Ultra-light everyday headphones · 190g', price: 54999, color: 2, scale: 0.92, band: 0.7, foam: 0x1c2a24, glow: 0x2ee6a6, specs: 'Bluetooth 5.3 · 40h battery · Foldable design' },
  { name: 'AURA Sport', tagline: 'Sweat-proof · Secure fit for workouts', price: 39999, color: 1, scale: 0.95, band: 1.2, foam: 0x2a1216, glow: 0xff4d6d, specs: 'IPX5 rating · 30h battery · Quick-dry pads' },
]

// One keyframe per <section>: [x, y, cameraZ, rotationY, rotationX]
export const KEYFRAMES = [
  [1.6, 0, 6.5, -0.4, 0.1],   // hero
  [-1.7, 0, 6.5, 1.1, 0.05],  // performance
  [1.5, 0, 3.4, 1.45, 0],     // comfort (close-up on the ear cup)
  [-1.3, -0.5, 4.4, 0.1, 0.95], // build (headband from above)
  [1.6, 0, 5.4, 0.5, 0.1],    // collection
  [1.5, 0, 5.6, 3.3, 0.1],    // colors
  [0, 0.2, 9, 6.28, 0],       // order
]

export const money = (n) => 'Rs ' + n.toLocaleString('en-US')
export const monthly = (n) => money(Math.round(n / 12))
