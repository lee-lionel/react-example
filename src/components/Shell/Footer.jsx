import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="ftr">
      <div className="shell ftr-inner">
        <p className="ftr-brand">
          <span className="foil-text" aria-hidden="true">◆</span> Lionel&rsquo;s Cards
        </p>
        <p className="ftr-note">
          A demo shop built with React and Vite. No payment is taken and nothing
          ships.
        </p>
        <nav className="ftr-links" aria-label="Footer">
          <Link to="/">Shop</Link>
          <Link to="/reviews">Reviews</Link>
          <Link to="/about">About</Link>
        </nav>
      </div>
    </footer>
  )
}
