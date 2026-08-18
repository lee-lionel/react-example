import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import products, { findById, priceOf } from '../data/cards'

/* The basket used to be useState inside the product list, which meant it was
   destroyed the moment you navigated to any other route and the header could
   never show a count. A shop whose basket empties when you click "Reviews" is
   not a shop, so it lives here and survives a reload. */

const KEY = 'lionels-cards-basket'
const BasketContext = createContext(null)

function read() {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object') return {}
    // Drop anything that no longer exists or is not a sane count — stored
    // state outlives the stock list and should not be trusted on the way in.
    return Object.fromEntries(
      Object.entries(parsed).filter(([id, n]) => findById(Number(id)) && Number.isInteger(n) && n > 0),
    )
  } catch {
    return {}
  }
}

export function BasketProvider({ children }) {
  const [lines, setLines] = useState(read)

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(lines))
    } catch {
      /* Full or blocked storage should not break the basket in memory. */
    }
  }, [lines])

  /** Adds one, but never more than the shop actually holds. */
  const add = useCallback((card, n = 1) => {
    setLines((current) => {
      const held = current[card.id] ?? 0
      const next = Math.min(held + n, card.quantity)
      if (next <= 0) return current
      return { ...current, [card.id]: next }
    })
  }, [])

  const setCount = useCallback((card, n) => {
    setLines((current) => {
      const next = Math.max(0, Math.min(n, card.quantity))
      const copy = { ...current }
      if (next === 0) delete copy[card.id]
      else copy[card.id] = next
      return copy
    })
  }, [])

  const remove = useCallback((card) => {
    setLines((current) => {
      const copy = { ...current }
      delete copy[card.id]
      return copy
    })
  }, [])

  const clear = useCallback(() => setLines({}), [])

  const value = useMemo(() => {
    const items = Object.entries(lines)
      .map(([id, count]) => ({ card: findById(Number(id)), count }))
      .filter((line) => line.card)
    const count = items.reduce((sum, line) => sum + line.count, 0)
    const subtotal = items.reduce((sum, line) => sum + priceOf(line.card) * line.count, 0)
    return { lines, items, count, subtotal, add, setCount, remove, clear, countOf: (card) => lines[card.id] ?? 0 }
  }, [lines, add, setCount, remove, clear])

  return <BasketContext.Provider value={value}>{children}</BasketContext.Provider>
}

export function useBasket() {
  const value = useContext(BasketContext)
  if (!value) throw new Error('useBasket must be used inside a BasketProvider')
  return value
}

/** Total pieces the shop holds, for the header stat. */
export const TOTAL_STOCK = products.reduce((sum, card) => sum + card.quantity, 0)
