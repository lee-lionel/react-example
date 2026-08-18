/* The stock list.

   The original rows carried a name, a price, a count and a sentence. That is
   enough to render a tile and nothing else — you cannot filter by rarity,
   sort by set, warn that a card is nearly gone, or say why one Shanks costs
   six times another. The set, rarity and condition were already sitting in
   those description strings; they are fields now so the shop can use them. */

/** Rarity, rarest first. Order here is the order everywhere. */
export const RARITIES = ['Serial', 'Special', 'Alt art', 'Super rare', 'Promo']

/** Below this many left, the card is called out as nearly gone. */
export const LOW_STOCK = 2

const products = [
  {
    id: 1,
    slug: 'marco-ex-01',
    name: 'Marco',
    price: 25,
    quantity: 4,
    image: '/cards/01-marco.webp',
    description: 'EX Pack Vol 1 Marco',
    set: 'EX-01',
    rarity: 'Super rare',
    condition: 'Near mint',
    foil: true,
    isOnSale: false,
    blurb:
      'The Whitebeard first mate from the first EX pack. A staple in Phoenix decks and one of the few cards here that still sees competitive play.',
  },
  {
    id: 2,
    slug: 'izou-td-alt',
    name: 'Izou',
    price: 25,
    quantity: 0,
    image: '/cards/02-izou.jpg',
    description: 'TD Alternate Art Izou',
    set: 'ST-20',
    rarity: 'Alt art',
    condition: 'Near mint',
    foil: false,
    isOnSale: false,
    blurb:
      'Deck-build alternate art. Quiet card, striking print — the ink work on the kimono is the reason people chase this one.',
  },
  {
    id: 3,
    slug: 'shanks-op11-sp',
    name: 'Shanks',
    price: 120,
    quantity: 4,
    image: '/cards/03-shanks.png',
    description: 'OP11 Shanks SP',
    set: 'OP-11',
    rarity: 'Special',
    condition: 'Near mint',
    foil: true,
    isOnSale: true,
    salePrice: 96,
    blurb:
      'The SP treatment, full-bleed and heavily foiled. The most wanted Shanks in the set and the card most people arrive here looking for.',
  },
  {
    id: 4,
    slug: 'enel-flagship',
    name: 'Enel',
    price: 48,
    quantity: 1,
    image: '/cards/04-enel.jpg',
    description: 'Flagship Enel',
    set: 'Flagship',
    rarity: 'Promo',
    condition: 'Near mint',
    foil: true,
    isOnSale: true,
    salePrice: 39,
    blurb:
      'Flagship tournament promo. Handed out at store championships, never in a retail pack, which is the whole reason it holds its price.',
  },
  {
    id: 5,
    slug: 'shanks-op09-alt',
    name: 'Shanks',
    price: 20,
    quantity: 8,
    image: '/cards/05-shanks.jpg',
    description: 'OP09 Shanks Alternate Art',
    set: 'OP-09',
    rarity: 'Alt art',
    condition: 'Lightly played',
    foil: false,
    isOnSale: false,
    blurb:
      'The affordable Shanks. Lightly played — a soft corner and light edge wear, sleeved from new. If you want the art rather than the grade, this is the one.',
  },
  {
    id: 6,
    slug: 'yamato-flagship',
    name: 'Yamato',
    price: 100,
    quantity: 0,
    image: '/cards/06-yamato.jpg',
    description: 'Flagship Yamato',
    set: 'Flagship',
    rarity: 'Promo',
    condition: 'Near mint',
    foil: true,
    isOnSale: false,
    blurb:
      'Flagship promo in the same run as the Enel. Sold out here; listed so you can see what has moved.',
  },
  {
    id: 7,
    slug: 'luffy-op12-alt',
    name: 'Luffy',
    price: 17,
    quantity: 4,
    image: '/cards/07-luffy.png',
    description: 'OP12 Luffy Alternate Art',
    set: 'OP-12',
    rarity: 'Alt art',
    condition: 'Near mint',
    foil: false,
    isOnSale: true,
    salePrice: 14,
    blurb:
      'Newest of the Luffy alternate arts and still cheap, because supply has not dried up yet. It will.',
  },
  {
    id: 8,
    slug: 'law-eb03-alt',
    name: 'Law',
    price: 30,
    quantity: 4,
    image: '/cards/08-law.webp',
    description: 'EB03 Law Alternate Art',
    set: 'EB-03',
    rarity: 'Alt art',
    condition: 'Near mint',
    foil: true,
    isOnSale: true,
    salePrice: 24,
    blurb:
      'Extra Booster alt art. Foiled across the whole frame rather than just the art box, which is what separates the EB prints from the base set.',
  },
  {
    id: 9,
    slug: 'uta-eb03-alt',
    name: 'Uta',
    price: 25,
    quantity: 5,
    image: '/cards/09-uta.jpg',
    description: 'EB03 Uta Alternate Art',
    set: 'EB-03',
    rarity: 'Alt art',
    condition: 'Near mint',
    foil: true,
    isOnSale: true,
    salePrice: 20,
    blurb:
      'From the same Extra Booster as the Law. The most reprinted card in this list, which is why it is also the easiest to actually get hold of.',
  },
  {
    id: 10,
    slug: 'luffy-serial',
    name: 'Luffy',
    price: 10000,
    quantity: 0,
    image: '/cards/10-luffy.webp',
    description: 'Flagship Serial Luffy',
    set: 'Flagship',
    rarity: 'Serial',
    condition: 'Near mint',
    foil: true,
    isOnSale: false,
    blurb:
      'Serial-numbered flagship prize card. One of a handful in existence and not really for sale — it is on the page because a shop should show you its best card, not hide it.',
  },
]

/** What a card actually costs right now. */
export function priceOf(card) {
  return card.isOnSale && card.salePrice ? card.salePrice : card.price
}

export function findBySlug(slug) {
  return products.find((card) => card.slug === slug)
}

export function findById(id) {
  return products.find((card) => card.id === id)
}

export default products
