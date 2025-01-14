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
import ProfilePage from './components/pages/Profile'
import Roadmaps from './components/pages/Roadmaps'
import Test from './components/pages/Test'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route
            path="home"
            element={
              <div className="bg-gradient-to-br from-cyan-500 to-fuchsia-500 min-h-screen z-10 relative">
                <SidebarProvider defaultOpen={false}>
                  <Home />
                </SidebarProvider>
              </div>
            }
          >
            <Route index element={<Dashboard/>} />
            <Route path="roadmaps" element={<Roadmaps/>} />
            <Route path="profile" element={<ProfilePage />} />
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
