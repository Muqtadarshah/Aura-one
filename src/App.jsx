import { useEffect, useRef, useState } from 'react'
import Scene from './components/Scene'
import Nav from './components/Nav'
import OrderDialog from './components/OrderDialog'
import { Hero, Features, Comfort, Build, Models, Colors, Buy } from './components/Sections'
import { VARIANTS } from './data'

export default function App() {
  const [selected, setSelected] = useState(0)   // chosen headphone model
  const [override, setOverride] = useState(null) // color chosen by click (null = automatic)
  const [colorIdx, setColorIdx] = useState(0)   // color currently shown
  const dialog = useRef(null)
  const bar = useRef(null)

  // Fade-in on scroll
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && e.target.classList.add('in')),
      { threshold: 0.2 }
    )
    document.querySelectorAll('.rv').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  // Scroll progress bar
  useEffect(() => {
    const onScroll = () => {
      const max = Math.max(1, document.body.scrollHeight - innerHeight)
      bar.current.style.width = (scrollY / max) * 100 + '%'
    }
    addEventListener('scroll', onScroll, { passive: true })
    return () => removeEventListener('scroll', onScroll)
  }, [])

  const openOrder = () => dialog.current.showModal()
  const pickModel = (i) => { setSelected(i); setOverride(null) }

  return (
    <>
      <div id="bar" ref={bar} />
      <Scene selected={selected} override={override} onOverrideClear={() => setOverride(null)} onColorChange={setColorIdx} />
      <Nav />
      <main>
        <Hero />
        <Features />
        <Comfort />
        <Build />
        <Models selected={selected} onSelect={pickModel} onOrder={openOrder} />
        <Colors colorIdx={colorIdx} onPick={setOverride} />
        <Buy selected={selected} onOrder={openOrder} />
      </main>
      <footer>© 2026 AURA Audio. Demo website.</footer>
      <OrderDialog ref={dialog} variant={VARIANTS[selected]} />
    </>
  )
}
