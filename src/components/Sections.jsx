import { COLORS, VARIANTS, money, monthly } from '../data'

export function Hero() {
  return (
    <section className="hero">
      <h1 className="rv">Hear <span>everything.</span></h1>
      <p className="rv">Adaptive noise cancelling, 60-hour battery and studio-grade sound. Scroll down and watch the 3D headphones come to life.</p>
      <a className="btn rv" href="#models">Shop the Collection</a>
    </section>
  )
}

const Card = ({ big, title, text }) => (
  <div className="card rv">
    {big && <div className="big">{big}</div>}
    <h3>{title}</h3>
    <p>{text}</p>
  </div>
)

export function Features() {
  return (
    <section id="features" className="right">
      <span className="tag rv">01 · PERFORMANCE</span>
      <h2 className="rv">Engineered for silence.</h2>
      <div className="grid">
        <Card big="60h" title="Battery" text="One charge lasts a full week." />
        <Card big="-45dB" title="Adaptive ANC" text="Blocks out the noise around you, automatically." />
        <Card big="40mm" title="Drivers" text="Deep bass and crystal-clear highs." />
      </div>
    </section>
  )
}

export function Comfort() {
  return (
    <section id="cushion">
      <span className="tag rv">02 · COMFORT</span>
      <h2 className="rv">Cushions you forget you're wearing.</h2>
      <div className="grid">
        <Card title="Memory foam" text="Soft protein-leather ear cushions for all-day comfort." />
        <Card title="Aluminium cups" text="Precision-machined, weighing just 250g." />
      </div>
    </section>
  )
}

export function Build() {
  return (
    <section id="band" className="right">
      <span className="tag rv">03 · BUILD</span>
      <h2 className="rv">A headband built to last.</h2>
      <div className="grid">
        <Card title="Flex-steel arch" text="Bends thousands of times and always springs back." />
        <Card title="Auto-fit sliders" text="Adjusts itself to fit any head size." />
      </div>
    </section>
  )
}

export function Models({ selected, onSelect, onOrder }) {
  const v = VARIANTS[selected]
  return (
    <section id="models">
      <span className="tag rv">04 · COLLECTION</span>
      <h2 className="rv">Find your AURA.</h2>
      <div className="grid">
        {VARIANTS.map((m, i) => (
          <button key={m.name} className={'card model rv' + (i === selected ? ' on' : '')} onClick={() => onSelect(i)}>
            <h3>{m.name}</h3>
            <p>{money(m.price)}</p>
          </button>
        ))}
      </div>
      <div className="card detail">
        <h3>{v.name}</h3>
        <p>{v.tagline}</p>
        <p className="price sm">{money(v.price)}</p>
        <p>{v.specs} · or {monthly(v.price)}/month × 12</p>
        <button className="btn" onClick={onOrder}>Order this model</button>
      </div>
    </section>
  )
}

export function Colors({ colorIdx, onPick }) {
  return (
    <section id="colors">
      <span className="tag rv">05 · FINISH</span>
      <h2 className="rv">Scroll on and watch the color change.</h2>
      <p className="live rv">{COLORS[colorIdx].name}</p>
      <div className="sw rv">
        {COLORS.map((c, i) => (
          <button
            key={c.name}
            aria-label={c.name}
            className={i === colorIdx ? 'on' : ''}
            style={{ background: '#' + c.hex.toString(16).padStart(6, '0') }}
            onClick={() => onPick(i)}
          />
        ))}
      </div>
      <p className="rv note">Four premium finishes. Click any color, or just keep scrolling.</p>
    </section>
  )
}

export function Buy({ selected, onOrder }) {
  const v = VARIANTS[selected]
  return (
    <section id="buy" className="cta">
      <span className="tag rv">06 · ORDER</span>
      <h2 className="rv">{v.name}</h2>
      <p className="price rv">{money(v.price)}<small>or {monthly(v.price)}/month × 12 months (0% markup)</small></p>
      <p className="rv">Free delivery across Pakistan · 30-day returns · 2-year warranty · Cash on Delivery</p>
      <button className="btn rv" onClick={onOrder}>Order Now</button>
      <a className="back" href="#models">← Choose another model</a>
    </section>
  )
}
