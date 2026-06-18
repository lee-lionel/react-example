import Profile from './components/Profile/Profile'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Interests from './components/Interests/Interests'

import Products from './components/Products/Products'
import Reviews from './components/Reviews/Reviews'

function App() {


  return (
    <>
     <BrowserRouter>
     <div className='page'>
      <Header/>
        <Routes>
          <Route path='/' element={<Profile/>}/>
          <Route path='/reviews' element={<Reviews/>}/>
          <Route path='/products' element={<Products/>}/>
          <Route path='/interests' element= {<Interests/>}/>
        </Routes>
        </div>
        <Footer className='footer'/>
     </BrowserRouter>
      
    </>
  )
}

export default App
