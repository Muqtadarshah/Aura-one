import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { COLORS, VARIANTS, KEYFRAMES } from '../data'

const smooth = (t) => t * t * (3 - 2 * t)

export default function Scene({ selected, override, onOverrideClear, onColorChange }) {
  const canvasRef = useRef(null)
  // Always-fresh props, readable from the animation loop without re-creating the scene.
  const live = useRef({})
  live.current = { selected, override, onOverrideClear, onColorChange }

  useEffect(() => {
    const canvas = canvasRef.current
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
    camera.position.set(0, 0, 6.5)

    scene.add(new THREE.AmbientLight(0xffffff, 0.5))
    const sun = new THREE.DirectionalLight(0xffffff, 1)
    sun.position.set(3, 4, 5)
    scene.add(sun)
    const p1 = new THREE.PointLight(0x7c5cff, 2, 20)
    p1.position.set(-4, 2, 3)
    scene.add(p1)
    const p2 = new THREE.PointLight(0x33d6ff, 2, 20)
    p2.position.set(4, -2, 3)
    scene.add(p2)

    // ---------- Headphones ----------
    const metal = new THREE.MeshStandardMaterial({ color: COLORS[0].hex, metalness: 0.75, roughness: 0.22 })
    const foam = new THREE.MeshStandardMaterial({ color: 0x15151c, roughness: 0.95 })
    const dark = new THREE.MeshStandardMaterial({ color: 0x08080c, metalness: 0.4, roughness: 0.5 })
    const glow = new THREE.MeshBasicMaterial({ color: 0x33d6ff })
    const rig = new THREE.Group()

    const band = new THREE.Mesh(new THREE.TorusGeometry(1.5, 0.09, 16, 80, Math.PI), metal)
    rig.add(band)
    const pad = new THREE.Mesh(new THREE.TorusGeometry(1.5, 0.14, 12, 60, Math.PI * 0.5), foam)
    pad.rotation.z = Math.PI / 4
    pad.scale.set(0.82, 0.82, 1)
    pad.position.y = -0.02
    rig.add(pad)

    ;[-1, 1].forEach((s) => {
      const cup = new THREE.Mesh(new THREE.CylinderGeometry(0.75, 0.75, 0.45, 48), metal)
      cup.rotation.z = Math.PI / 2
      cup.position.set(s * 1.5, -0.15, 0)
      const cushion = new THREE.Mesh(new THREE.TorusGeometry(0.55, 0.17, 16, 48), foam)
      cushion.rotation.y = Math.PI / 2
      cushion.position.set(s * 1.27, -0.15, 0)
      const disc = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.06, 48), dark)
      disc.rotation.z = Math.PI / 2
      disc.position.set(s * 1.74, -0.15, 0)
      const yoke = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.55, 0.16), dark)
      yoke.position.set(s * 1.5, 0.12, 0)
      rig.add(cup, cushion, disc, yoke)
      for (let r = 1; r <= 3; r++) {
        const ring = new THREE.Mesh(new THREE.TorusGeometry(r * 0.14, 0.012, 6, 40), glow)
        ring.rotation.y = Math.PI / 2
        ring.position.set(s * 1.78, -0.15, 0)
        rig.add(ring)
      }
    })
    scene.add(rig)

    // ---------- Particles ----------
    const N = 700
    const arr = new Float32Array(N * 3).map(() => (Math.random() - 0.5) * 24)
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(arr, 3))
    const particles = new THREE.Points(geo, new THREE.PointsMaterial({ size: 0.04, color: 0x9a8cff, transparent: true, opacity: 0.7 }))
    scene.add(particles)

    // ---------- Interaction ----------
    const resize = () => {
      renderer.setSize(innerWidth, innerHeight, false)
      camera.aspect = innerWidth / innerHeight
      camera.updateProjectionMatrix()
    }
    resize()
    let mx = 0, my = 0, lastY = 0
    const onMove = (e) => { mx = e.clientX / innerWidth - 0.5; my = e.clientY / innerHeight - 0.5 }
    const onScroll = () => {
      if (Math.abs(scrollY - lastY) > 30) live.current.onOverrideClear?.()
      lastY = scrollY
    }
    addEventListener('resize', resize)
    addEventListener('mousemove', onMove)
    addEventListener('scroll', onScroll, { passive: true })

    const sections = () => [...document.querySelectorAll('main section')]
    const sectionProgress = (secs) => {
      const y = scrollY + innerHeight * 0.15
      let i = 0
      while (i < secs.length - 1 && secs[i + 1].offsetTop <= y) i++
      const next = secs[Math.min(i + 1, secs.length - 1)]
      const h = next === secs[i] ? 1 : next.offsetTop - secs[i].offsetTop
      return Math.min(secs.length - 1, i + Math.min(1, (y - secs[i].offsetTop) / h))
    }

    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
    const cur = KEYFRAMES[0].slice()
    const ve = { scale: 1, band: 1 }
    const color = new THREE.Color(COLORS[0].hex)
    let lastIdx = -1, raf
    const t0 = performance.now()

    const loop = () => {
      raf = requestAnimationFrame(loop)
      const t = (performance.now() - t0) / 1000
      const { selected, override, onColorChange } = live.current
      const secs = sections()
      const f = secs.length ? sectionProgress(secs) : 0
      const i = Math.min(Math.floor(f), KEYFRAMES.length - 2)
      const u = smooth(Math.min(1, f - i))
      const wide = innerWidth > 700

      for (let k = 0; k < 5; k++) {
        const target = KEYFRAMES[i][k] + (KEYFRAMES[i + 1][k] - KEYFRAMES[i][k]) * u
        cur[k] += (target - cur[k]) * 0.08
      }
      const v = VARIANTS[selected]
      ve.scale += (v.scale - ve.scale) * 0.1
      ve.band += (v.band - ve.band) * 0.1
      foam.color.setHex(v.foam)
      glow.color.setHex(v.glow)

      rig.position.set(wide ? cur[0] : 0, cur[1] + (reduced ? 0 : Math.sin(t * 1.2) * 0.08), 0)
      rig.scale.setScalar((wide ? 1.1 : 0.75) * ve.scale)
      band.scale.z = ve.band
      camera.position.z = cur[2] * (wide ? 1 : 1.25)
      rig.rotation.y = cur[3] + mx * 0.5
      rig.rotation.x = cur[4] + my * 0.3

      // Color: manual override > selected model (in the collection area) > automatic scroll blend
      let idx = override
      if (idx === null && f > 3.6 && f < 5.1) idx = v.color
      let target
      if (idx !== null) {
        target = new THREE.Color(COLORS[idx].hex)
      } else {
        const q = (f / (KEYFRAMES.length - 1)) * COLORS.length
        const a = Math.floor(q) % COLORS.length
        const b = (a + 1) % COLORS.length
        target = new THREE.Color(COLORS[a].hex).lerp(new THREE.Color(COLORS[b].hex), smooth(q - Math.floor(q)))
        idx = Math.round(q) % COLORS.length
      }
      color.lerp(target, 0.12)
      metal.color.copy(color)
      p1.color.copy(color)
      particles.material.color.copy(color)
      particles.rotation.y = t * 0.03 + f * 0.3

      if (idx !== lastIdx) { lastIdx = idx; onColorChange?.(idx) }
      renderer.render(scene, camera)
    }
    loop()

    return () => {
      cancelAnimationFrame(raf)
      removeEventListener('resize', resize)
      removeEventListener('mousemove', onMove)
      removeEventListener('scroll', onScroll)
      renderer.dispose()
    }
  }, [])

  return <canvas ref={canvasRef} id="scene" aria-hidden="true" />
}
