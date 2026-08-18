import { Link } from 'react-router-dom'
import { priceOf, LOW_STOCK } from '../../data/cards'
import { useBasket } from '../../store/basket'
import { money } from '../../lib/format'
import './CardTile.css'

/** The stock line, which is a state and so is the one place colour appears. */
export function StockChip({ card }) {
  if (card.quantity === 0) return <span className="chip chip-out">Sold out</span>
  if (card.quantity <= LOW_STOCK)
    return (
      <span className="chip chip-low">
        {card.quantity === 1 ? 'Last one' : `Only ${card.quantity} left`}
      </span>
    )
  return <span className="chip chip-in">{card.quantity} in stock</span>
}

export default function CardTile({ card }) {
  const { add, countOf } = useBasket()
  const held = countOf(card)
  const soldOut = card.quantity === 0
  const maxed = held >= card.quantity
  const price = priceOf(card)

  return (
    <article className={soldOut ? 'tile is-out' : 'tile'}>
      <Link to={`/card/${card.slug}`} className="tile-art" aria-label={`${card.name}, ${card.description}`}>
        <div className="card-well">
          <img
            src={card.image}
            alt={`${card.name} — ${card.description}`}
            loading="lazy"
            decoding="async"
          />
          {soldOut && (
            <span className="tile-veil" aria-hidden="true">
              Sold out
            </span>
          )}
        </div>

        {card.isOnSale && !soldOut && (
          <span className="tile-flag chip chip-sale">Sale</span>
        )}
      </Link>

      <div className="tile-body">
        {/* Set and rarity first: on a shelf of ten cards where three are
            called Shanks, the set code is what actually distinguishes them. */}
        <div className="tile-meta">
          <span className="tile-set">{card.set}</span>
          {/* A promo whose set and rarity are the same word rendered as
              "PROMO · PROMO"; say it once instead. */}
          {card.set !== card.rarity && (
            <>
              <span className="tile-dot" aria-hidden="true">·</span>
              <span className="tile-rarity">{card.rarity}</span>
            </>
          )}
          {card.foil && (
            <span className="tile-foil foil-text" title="Foil">
              Foil
            </span>
          )}
        </div>

        <h3 className="tile-name">
          <Link to={`/card/${card.slug}`}>{card.name}</Link>
        </h3>
        <p className="tile-desc">{card.description}</p>

        <div className="tile-foot">
          <p className="tile-price">
            <span className="price">{money(price)}</span>
            {card.isOnSale && card.salePrice && (
              <span className="price-was">{money(card.price)}</span>
            )}
          </p>
          <StockChip card={card} />
        </div>

        <button
          type="button"
          className="btn btn-block"
          disabled={soldOut || maxed}
          onClick={() => add(card)}
        >
          {soldOut
            ? 'Sold out'
            : maxed
              ? `All ${card.quantity} in basket`
              : held > 0
                ? `In basket (${held}) — add another`
                : 'Add to basket'}
        </button>
      </div>
    </article>
  )
}
