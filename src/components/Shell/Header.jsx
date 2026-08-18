import { NavLink } from 'react-router-dom'
import { useBasket } from '../../store/basket'
import './Header.css'

const LINKS = [
  { to: '/', label: 'Shop' },
  { to: '/reviews', label: 'Reviews' },
  { to: '/about', label: 'About' },
]

export default function Header() {
  const { count } = useBasket()

  return (
    <header className="hdr">
      {/* Brand, nav and basket are siblings of the header row rather than the
          nav wrapping two of them — nesting them meant a phone-width wrap
          resolved against the nav instead of the row and never happened. */}
      <div className="shell hdr-inner">
        <NavLink to="/" className="brand" aria-label="Lionel's Cards, home">
          <span className="brand-mark foil-text" aria-hidden="true">
            ◆
          </span>
          <span className="brand-name">
            Lionel&rsquo;s Cards
            <span className="brand-sub">One Piece TCG singles</span>
          </span>
        </NavLink>

        <nav className="hdr-nav" aria-label="Main">
          <ul className="hdr-links">
            {LINKS.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) => (isActive ? 'hdr-link is-active' : 'hdr-link')}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <NavLink to="/basket" className="basket-btn">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
            <path d="M4 7h16l-1.3 11.2a2 2 0 0 1-2 1.8H7.3a2 2 0 0 1-2-1.8Z" />
            <path d="M9 7V5.5a3 3 0 0 1 6 0V7" />
          </svg>
          <span className="basket-word">Basket</span>
          {/* The count is the whole reason this exists: the old shop let you
              add cards with no visible acknowledgement anywhere. */}
          {count > 0 && <span className="basket-count">{count}</span>}
          <span className="sr-only">
            {count === 0 ? 'empty' : `${count} ${count === 1 ? 'card' : 'cards'}`}
          </span>
        </NavLink>
      </div>
    </header>
  )
}
