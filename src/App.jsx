import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Header from './components/Shell/Header'
import Footer from './components/Shell/Footer'
import Shop from './pages/Shop'
import CardDetail from './pages/CardDetail'
import Basket from './pages/Basket'
import Reviews from './pages/Reviews'
import About from './pages/About'
import { BasketProvider } from './store/basket'
import './App.css'

/* Router keeps scroll position between routes, so clicking a card from
   halfway down the grid lands you halfway down its detail page. */
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

export default function App() {
  return (
    <BasketProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="app">
          <Header />
          <main className="app-main">
            <Routes>
              <Route path="/" element={<Shop />} />
              <Route path="/card/:slug" element={<CardDetail />} />
              <Route path="/basket" element={<Basket />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/about" element={<About />} />
              {/* Anything else is the shop rather than a blank screen. */}
              <Route path="*" element={<Shop />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </BasketProvider>
  )
}
