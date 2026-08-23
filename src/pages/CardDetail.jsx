import { Link, useParams } from 'react-router-dom'
import products, { findBySlug, priceOf, LOW_STOCK } from '../data/cards'
import CardTile, { StockChip } from '../components/CardTile/CardTile'
import { useBasket } from '../store/basket-context'
import { money } from '../lib/format'
import './CardDetail.css'

export default function CardDetail() {
  const { slug } = useParams()
  const card = findBySlug(slug)
  const { add, countOf } = useBasket()

  // A bad slug is a normal thing to happen — someone edits the URL, or a link
  // rots — so it gets a real page rather than a crash.
  if (!card) {
    return (
      <div className="shell detail-missing">
        <div className="empty">
          <p className="empty-title">No such card</p>
          <p>Nothing in the case matches that address.</p>
          <Link to="/" className="btn" style={{ marginTop: '1rem' }}>
            Back to the shop
          </Link>
        </div>
      </div>
    )
  }

  const held = countOf(card)
  const soldOut = card.quantity === 0
  const maxed = held >= card.quantity
  const price = priceOf(card)
  const saving = card.isOnSale && card.salePrice ? card.price - card.salePrice : 0

  /* Related = same character or same set, which is exactly how someone
     shopping for a Shanks wants to browse. */
  const related = products
    .filter((other) => other.id !== card.id && (other.name === card.name || other.set === card.set))
    .slice(0, 4)

  const facts = [
    ['Set', card.set],
    ['Rarity', card.rarity],
    ['Condition', card.condition],
    ['Finish', card.foil ? 'Foil' : 'Non-foil'],
  ]

  return (
    <div className="detail">
      <div className="shell">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link to="/">Shop</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">
            {card.name} — {card.set}
          </span>
        </nav>

        <div className="detail-grid">
          <div className="detail-art">
            {/* The art is the product, so it gets the largest thing on the
                page and is not cropped here the way the grid tiles are. */}
            <img
              src={card.image}
              alt={`${card.name} — ${card.description}`}
              decoding="async"
            />
          </div>

          <div className="detail-buy">
            <div className="row detail-tags">
              <span className="tag">{card.set}</span>
              <span className="tag">{card.rarity}</span>
              {card.foil && <span className="tag foil-text">Foil</span>}
            </div>

            <h1 className="detail-name">{card.name}</h1>
            <p className="detail-desc">{card.description}</p>

            <div className="detail-price">
              <span className="price">{money(price)}</span>
              {saving > 0 && (
                <>
                  <span className="price-was">{money(card.price)}</span>
                  <span className="chip chip-sale">Save {money(saving)}</span>
                </>
              )}
            </div>

            <div className="row detail-stock">
              <StockChip card={card} />
              {!soldOut && card.quantity > LOW_STOCK && (
                <span className="detail-note">Ships next working day</span>
              )}
            </div>

            <button
              type="button"
              className="btn btn-block detail-add"
              disabled={soldOut || maxed}
              onClick={() => add(card)}
            >
              {soldOut
                ? 'Sold out'
                : maxed
                  ? `All ${card.quantity} in your basket`
                  : 'Add to basket'}
            </button>

            {held > 0 && (
              <p className="detail-inbasket" role="status">
                {held} in your basket.{' '}
                <Link to="/basket" className="detail-link">
                  View basket
                </Link>
              </p>
            )}

            <p className="detail-blurb">{card.blurb}</p>

            <dl className="detail-facts">
              {facts.map(([label, value]) => (
                <div key={label} className="detail-fact">
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {related.length > 0 && (
          <section className="detail-related">
            <h2 className="related-title">Also in the case</h2>
            <ul className="card-grid">
              {related.map((other) => (
                <li key={other.id}>
                  <CardTile card={other} />
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  )
}
