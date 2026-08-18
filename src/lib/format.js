/** Prices are whole dollars in this shop, so no cents anywhere. */
export function money(value) {
  return value.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  })
}

export function plural(n, one, many) {
  return `${n} ${n === 1 ? one : many}`
}
