import './NavBar.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function NavBar() {
    const [open, setOpen] = useState(false);

    return (
        <nav className="nav">
            <div className="logo">Lionel's Site</div>

            <div className={`nav-links ${open ? "active" : ""}`}>
                <Link to="/" onClick={() => setOpen(false)}>Home</Link>
                <Link to="/reviews" onClick={() => setOpen(false)}>Reviews</Link>
                <Link to="/products" onClick={() => setOpen(false)}>Products</Link>
                <Link to="/interests" onClick={() => setOpen(false)}>Interests</Link>
            </div>

            <div className="hamburger" onClick={() => setOpen(!open)}>
                ☰
            </div>
        </nav>
    );
}

export default NavBar;