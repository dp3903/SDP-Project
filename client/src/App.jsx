import './App.css'
import LoginSignup from './components/pages/LoginSignup'
import UserReview from './components/pages/UserReview'
import Home from './components/pages/Home'
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/authenticate" element={<LoginSignup />} />
          <Route path="/about" element={<div>About us page</div>} />
          <Route path="/contact" element={<div>Contact us page</div>} />
          <Route path="*" element={<div>Error: 404 page not found</div>} />
        </Routes>
      </BrowserRouter>

      {/* <LoginSignup></LoginSignup> */}
      
      {/* <div className='flex flex-row flex-nowrap justify-center'>
        <UserReview></UserReview>
      </div> */}

      {/* <Home/> */}
    </>
  )
}

export default App
