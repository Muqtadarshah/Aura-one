import { forwardRef, useState } from 'react'
import { money } from '../data'

const OrderDialog = forwardRef(function OrderDialog({ variant }, ref) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [city, setCity] = useState('Karachi')
  const [done, setDone] = useState(false)

  const close = () => { ref.current.close(); setDone(false) }
  const submit = (e) => { e.preventDefault(); setDone(true) }

  return (
    <dialog ref={ref} onClose={() => setDone(false)}>
      {done ? (
        <div>
          <h3>Thank you, {name}! 🎧</h3>
          <p className="note">Your {variant.name} order has been received. We will contact you shortly. (Demo)</p>
          <button className="btn" onClick={close}>Close</button>
        </div>
      ) : (
        <form onSubmit={submit}>
          <h3>Place your order</h3>
          <input required placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} />
          <input required placeholder="Phone (03XX-XXXXXXX)" value={phone} onChange={(e) => setPhone(e.target.value)} />
          <select value={city} onChange={(e) => setCity(e.target.value)}>
            <option>Karachi</option><option>Lahore</option><option>Islamabad</option><option>Other city</option>
          </select>
          <p className="note">{variant.name} · {money(variant.price)} · Cash on Delivery</p>
          <div className="row">
            <button className="btn" type="submit">Confirm Order</button>
            <button className="btn ghost" type="button" onClick={close}>Cancel</button>
          </div>
        </form>
      )}
    </dialog>
  )
})

export default OrderDialog
