import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useBasket } from '../store/basket'
import { priceOf } from '../data/cards'
import { money, plural } from '../lib/format'
import './Basket.css'

const SHIPPING = 5
const FREE_OVER = 100

function Stepper({ line }) {
  const { setCount } = useBasket()
  const { card, count } = line
  return (
    <div className="stepper">
      <button
        type="button"
        onClick={() => setCount(card, count - 1)}
        aria-label={`Remove one ${card.name}`}
      >
        &minus;
      </button>
      <span className="stepper-count" aria-live="polite">
        {count}
      </span>
      <button
        type="button"
        onClick={() => setCount(card, count + 1)}
        disabled={count >= card.quantity}
        aria-label={
          count >= card.quantity
            ? `No more ${card.name} in stock`
            : `Add another ${card.name}`
        }
      >
        +
      </button>
    </div>
  )
}

export default function Basket() {
  const { items, count, subtotal, remove, clear } = useBasket()
  const [placed, setPlaced] = useState(null)

  /* Checkout is deliberately a mock — there is no payment provider behind
     this shop, and pretending otherwise would be worse than saying so. */
  const checkout = () => {
    setPlaced({ count, total: subtotal + (subtotal >= FREE_OVER ? 0 : SHIPPING) })
    clear()
  }

  if (placed) {
    return (
      <div className="shell basket-done">
        <div className="empty">
          <p className="empty-title">That would be {money(placed.total)}</p>
          <p>
            {plural(placed.count, 'card', 'cards')} — and this is where a real
            shop would take your money. There is no payment provider wired up,
            so nothing was charged and nothing is on its way.
          </p>
          <div className="row basket-done-actions">
            <Link to="/" className="btn">
              Back to the shop
            </Link>
            <button type="button" className="btn btn-quiet" onClick={() => setPlaced(null)}>
              Start again
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="shell basket-done">
        <header className="page-head">
          <p className="eyebrow">Basket</p>
          <h1 className="page-title">Nothing in here yet</h1>
        </header>
        <div className="empty">
          <p className="empty-title">Your basket is empty</p>
          <p>Pick something out of the case and it will show up here.</p>
          <Link to="/" className="btn" style={{ marginTop: '1rem' }}>
            Browse the stock list
          </Link>
        </div>
      </div>
    )
  }

  const shipping = subtotal >= FREE_OVER ? 0 : SHIPPING
  const total = subtotal + shipping

  return (
    <div className="basket">
      <div className="shell">
        <header className="page-head">
          <p className="eyebrow">Basket</p>
          <h1 className="page-title">{plural(count, 'card', 'cards')}</h1>
        </header>

        <div className="basket-grid">
          <ul className="basket-lines">
            {items.map((line) => (
              <li key={line.card.id} className="line">
                <Link to={`/card/${line.card.slug}`} className="line-art">
                  <div className="card-well">
                    <img
                      src={line.card.image}
                      alt={`${line.card.name} — ${line.card.description}`}
                      loading="lazy"
                    />
                  </div>
                </Link>

                <div className="line-body">
                  <div className="line-meta">
                    {line.card.set}
                    {line.card.set !== line.card.rarity && ` · ${line.card.rarity}`}
                  </div>
                  <h2 className="line-name">
                    <Link to={`/card/${line.card.slug}`}>{line.card.name}</Link>
                  </h2>
                  <p className="line-desc">{line.card.description}</p>

                  <div className="line-controls">
                    <Stepper line={line} />
                    <button
                      type="button"
                      className="line-remove"
                      onClick={() => remove(line.card)}
                    >
                      Remove
                    </button>
                  </div>
                </div>

                <p className="line-price">
                  <span className="price">{money(priceOf(line.card) * line.count)}</span>
                  {line.count > 1 && (
                    <span className="line-each">{money(priceOf(line.card))} each</span>
                  )}
                </p>
              </li>
            ))}
          </ul>

          <aside className="summary" aria-label="Order summary">
            <h2 className="summary-title">Summary</h2>

            <dl className="summary-rows">
              <div>
                <dt>Subtotal</dt>
                <dd>{money(subtotal)}</dd>
              </div>
              <div>
                <dt>Shipping</dt>
                <dd>{shipping === 0 ? 'Free' : money(shipping)}</dd>
              </div>
            </dl>

            {shipping > 0 && (
              <p className="summary-nudge">
                {money(FREE_OVER - subtotal)} more for free shipping.
              </p>
            )}

            <div className="summary-total">
              <span>Total</span>
              <span className="price">{money(total)}</span>
            </div>

            <button type="button" className="btn btn-block summary-go" onClick={checkout}>
              Checkout
            </button>
            <button type="button" className="btn btn-quiet btn-block" onClick={clear}>
              Empty basket
            </button>

            <p className="summary-fine">
              A demo shop — checkout does not take payment.
            </p>
          </aside>
        </div>
      </div>
    </div>
  )
}
