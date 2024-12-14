import './App.css'
import LoginSignup from './components/pages/LoginSignup'
import UserReview from './components/pages/UserReview'
import Landing from './components/pages/Landing'
import Home from './components/pages/Home'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from './components/ui/sidebar'
import Dashboard from './components/pages/Dashboard'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<SidebarProvider><Home /></SidebarProvider>} >
            <Route index element={<Dashboard/>} />
            <Route path="home/roadmaps" element={<div>Roadmaps</div>} />
            <Route path="home/profile" element={<div>Profile</div>} />
            <Route path="home/signout" element={<div>Signout</div>} />
          </Route>
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

      {/* <Landing/> */}
    </>
  )
}

export default App
