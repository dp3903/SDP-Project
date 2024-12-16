import './App.css'
import LoginSignup from './components/pages/LoginSignup'
import UserReview from './components/pages/UserReview'
import Landing from './components/pages/Landing'
import Home from './components/pages/Home'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from './components/ui/sidebar'
import Dashboard from './components/pages/Dashboard'
import ResourceDetails from './components/pages/ResourceDetails'
import Trending from './components/pages/Trending'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route
            path="home"
            element={
              <div className="bg-bg-3 bg-cover bg-no-repeat min-h-screen">
                <SidebarProvider defaultOpen={false}>
                  <Home />
                </SidebarProvider>
              </div>
            }
          >
            <Route index element={<Dashboard/>} />
            <Route path="roadmaps" element={<div>Roadmaps</div>} />
            <Route path="profile" element={<div>Profile</div>} />
            <Route path="treanding" element={<Trending/>} />
            <Route path="details" element={<ResourceDetails /> } />
            <Route path="signout" element={<div>Signout</div>} />
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
