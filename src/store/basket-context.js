import { createContext, useContext } from 'react'
import products from '../data/cards'

/* The context, the hook and the stock total live apart from the provider
   component. react-refresh/only-export-components fails a file that exports
   both a component and anything else, because fast refresh cannot tell which
   to remount — and it is an error in this project, not a warning. */
export const BasketContext = createContext(null)

export function useBasket() {
  const value = useContext(BasketContext)
  if (!value) throw new Error('useBasket must be used inside a BasketProvider')
  return value
}

/** Total pieces the shop holds, for the About page stat. */
export const TOTAL_STOCK = products.reduce((sum, card) => sum + card.quantity, 0)
