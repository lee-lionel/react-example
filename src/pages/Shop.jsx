import { useMemo, useState } from 'react'
import CardTile from '../components/CardTile/CardTile'
import products, { RARITIES, priceOf } from '../data/cards'
import { money, plural } from '../lib/format'
import './Shop.css'

const SORTS = {
  featured: { label: 'Featured', compare: null },
  priceLow: { label: 'Price: low to high', compare: (a, b) => priceOf(a) - priceOf(b) },
  priceHigh: { label: 'Price: high to low', compare: (a, b) => priceOf(b) - priceOf(a) },
  name: { label: 'Name A–Z', compare: (a, b) => a.name.localeCompare(b.name) },
  rarity: {
    label: 'Rarest first',
    compare: (a, b) => RARITIES.indexOf(a.rarity) - RARITIES.indexOf(b.rarity),
  },
}

const cheapest = Math.min(...products.map(priceOf))

/* Bands rather than a slider. The stock runs from $14 to a $10,000 serial,
   so a linear range put every ordinary card inside the first 1.5% of the
   track and made the keyboard step through ~9,986 values. Bands are what a
   shop actually offers, and one outlier cannot distort them. */
const BANDS = {
  all: { label: 'Any price', test: () => true },
  under25: { label: 'Under $25', test: (p) => p < 25 },
  to50: { label: '$25 to $50', test: (p) => p >= 25 && p <= 50 },
  to150: { label: '$50 to $150', test: (p) => p > 50 && p <= 150 },
  over150: { label: '$150 and up', test: (p) => p > 150 },
}

export default function Shop() {
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('featured')
  const [inStockOnly, setInStockOnly] = useState(false)
  const [onSaleOnly, setOnSaleOnly] = useState(false)
  const [rarity, setRarity] = useState('all')
  const [band, setBand] = useState('all')

  const visible = useMemo(() => {
    const term = search.trim().toLowerCase()
    const list = products.filter((card) => {
      if (inStockOnly && card.quantity === 0) return false
      if (onSaleOnly && !card.isOnSale) return false
      if (rarity !== 'all' && card.rarity !== rarity) return false
      if (!BANDS[band].test(priceOf(card))) return false
      if (!term) return true
      // Set code and rarity are searchable too — "eb03" and "alt" are how
      // people actually look for a card.
      return [card.name, card.description, card.set, card.rarity]
        .join(' ')
        .toLowerCase()
        .includes(term)
    })
    const { compare } = SORTS[sort]
    return compare ? [...list].sort(compare) : list
  }, [search, sort, inStockOnly, onSaleOnly, rarity, band])

  const filtered =
    search.trim() !== '' ||
    inStockOnly ||
    onSaleOnly ||
    rarity !== 'all' ||
    band !== 'all'

  const reset = () => {
    setSearch('')
    setInStockOnly(false)
    setOnSaleOnly(false)
    setRarity('all')
    setBand('all')
  }

  return (
    <div className="shop">
      <div className="shell">
        <header className="page-head shop-head">
          <div>
            <p className="eyebrow">The stock list</p>
            <h1 className="page-title">
              Singles, <span className="foil-text">sleeved and tracked</span>
            </h1>
            <p className="lede shop-lede">
              {plural(products.length, 'card', 'cards')} in the case, priced from{' '}
              {money(cheapest)}. Everything ships in a toploader inside a bubble
              mailer, tracked.
            </p>
          </div>
        </header>

        <div className="shop-body">
          {/* The filters are a form so Escape-clearing and Enter behave the way
              a browser already knows how to make them behave. */}
          <form
            className="filters"
            onSubmit={(event) => event.preventDefault()}
            aria-label="Filter the stock list"
          >
            <div className="filter-group">
              <label className="filter-label" htmlFor="q">
                Search
              </label>
              <div className="search-wrap">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <circle cx="11" cy="11" r="7" />
                  <path d="M20 20l-3.5-3.5" />
                </svg>
                <input
                  id="q"
                  type="search"
                  value={search}
                  placeholder="Name, set or rarity"
                  onChange={(event) => setSearch(event.target.value)}
                />
              </div>
            </div>

            <div className="filter-group">
              <label className="filter-label" htmlFor="sort">
                Sort
              </label>
              <select id="sort" value={sort} onChange={(event) => setSort(event.target.value)}>
                {Object.entries(SORTS).map(([key, { label }]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label" htmlFor="rarity">
                Rarity
              </label>
              <select id="rarity" value={rarity} onChange={(event) => setRarity(event.target.value)}>
                <option value="all">Any rarity</option>
                {RARITIES.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label" htmlFor="band">
                Price
              </label>
              <select id="band" value={band} onChange={(event) => setBand(event.target.value)}>
                {Object.entries(BANDS).map(([key, { label }]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            <fieldset className="filter-checks">
              <legend className="sr-only">Availability</legend>
              <label className="check">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(event) => setInStockOnly(event.target.checked)}
                />
                In stock only
              </label>
              <label className="check">
                <input
                  type="checkbox"
                  checked={onSaleOnly}
                  onChange={(event) => setOnSaleOnly(event.target.checked)}
                />
                On sale
              </label>
            </fieldset>

            {filtered && (
              <button type="button" className="btn btn-quiet btn-block" onClick={reset}>
                Clear filters
              </button>
            )}
          </form>

          <div className="shop-results">
            <p className="result-count" role="status">
              {visible.length === products.length
                ? `Showing all ${products.length}`
                : `${plural(visible.length, 'card', 'cards')} of ${products.length}`}
            </p>

            {visible.length === 0 ? (
              <div className="empty">
                <p className="empty-title">Nothing matches that</p>
                <p>
                  No card here fits those filters. Try widening the price or
                  clearing the rarity.
                </p>
                <button type="button" className="btn btn-quiet" onClick={reset} style={{ marginTop: '1rem' }}>
                  Clear filters
                </button>
              </div>
            ) : (
              /* The grid needs a heading of its own: without it the tile
                 names were h3 directly under the page h1, skipping a level. */
              <>
                <h2 className="sr-only">Cards for sale</h2>
                <ul className="card-grid">
                {visible.map((card) => (
                  <li key={card.id}>
                    <CardTile card={card} />
                  </li>
                ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
