import { Link } from 'react-router-dom'
import { TOTAL_STOCK } from '../store/basket'
import products from '../data/cards'
import './About.css'

const INTERESTS = [
  { src: '/interests/anime.webp', label: 'Anime', note: 'Where the cards came from in the first place.' },
  { src: '/interests/mobile-legends.webp', label: 'Mobile Legends', note: 'The other thing that eats the evenings.' },
  { src: '/cards/03-shanks.png', label: 'One Piece TCG', note: 'Collecting since the OP01 release.' },
]

export default function About() {
  const sets = new Set(products.map((card) => card.set)).size

  return (
    <div className="about">
      <div className="shell">
        <header className="page-head">
          <p className="eyebrow">About</p>
          <h1 className="page-title">Who you are buying from</h1>
        </header>

        <div className="about-grid">
          <div className="about-copy">
            <p className="lede">
              I am Lionel, a software engineer in Singapore who collects One Piece
              singles and sells the doubles. This shop is the doubles.
            </p>
            <p>
              Everything listed is a card I own and have in hand — no
              pre-orders, no drop-shipping, nothing listed that I have not
              looked at under a light. Condition is called honestly: if a card
              is lightly played it says so on the listing rather than in the
              small print, because the one thing that ruins a card sale is
              finding out after it arrives.
            </p>
            <p>
              Cards ship in a penny sleeve inside a toploader inside a bubble
              mailer, tracked. Free over $100.
            </p>
            <Link to="/" className="btn about-cta">
              See what is in the case
            </Link>
          </div>

          <dl className="about-stats">
            <div>
              <dt>Cards listed</dt>
              <dd className="price">{products.length}</dd>
            </div>
            <div>
              <dt>Pieces in hand</dt>
              <dd className="price">{TOTAL_STOCK}</dd>
            </div>
            <div>
              <dt>Sets represented</dt>
              <dd className="price">{sets}</dd>
            </div>
          </dl>
        </div>

        <section className="about-interests">
          <h2 className="about-h2">Other things I am into</h2>
          <ul className="interest-grid">
            {INTERESTS.map((item) => (
              <li key={item.label} className="interest">
                <div className="interest-art">
                  <img src={item.src} alt={item.label} loading="lazy" />
                </div>
                <div className="interest-body">
                  <h3 className="interest-label">{item.label}</h3>
                  <p className="interest-note">{item.note}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}
