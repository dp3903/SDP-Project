import './App.css'
import LoginSignup from './components/pages/LoginSignup'
import UserReview from './components/pages/NonAdmin/UserReview'
import Landing from './components/pages/Landing'
import Home from './components/pages/NonAdmin/Home'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from './components/ui/sidebar'
import Dashboard from './components/pages/NonAdmin/Dashboard'
import ResourceDetails from './components/pages/NonAdmin/ResourceDetails'
import Trending from './components/pages/NonAdmin/Trending'
import ProfilePage from './components/pages/NonAdmin/Profile'
import Roadmaps from './components/pages/NonAdmin/Roadmaps'
import Test from './components/pages/NonAdmin/Test'
import AdminHome from './components/pages/Admin/AdminHome'
import AdminNavigator from './components/pages/Admin/AdminNavigator'
import AllUsers from './components/pages/Admin/AllUsers'
import AllItems from './components/pages/Admin/AllItems'
import { AuthProvider } from './components/pages/AuthContext'
import { Toaster } from 'sonner'

function App() {

  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />

              <Route
                path="home"
                element={
                  <div className="bg-gradient-to-br from-cyan-500 to-fuchsia-500 min-h-screen">
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

              <Route
                path="Admin"
                element={
                  <div className="bg-gradient-to-br from-cyan-500 to-fuchsia-500 min-h-screen">
                    <SidebarProvider defaultOpen={false}>
                      <AdminNavigator />
                    </SidebarProvider>
                  </div>
                }
              >
                <Route index element={<AdminHome/>} />
                <Route path='users' element={<AllUsers/>} />
                <Route path='items' element={<AllItems/>} />
              </Route>

              <Route path="/authenticate" element={<LoginSignup />} />
              <Route path='/userReview' element={
                <div className='flex flex-row flex-nowrap justify-center bg-gradient-to-br from-cyan-500 to-fuchsia-500'>
                    <UserReview/>
                  </div>
                }
              />

            <Route path="/about" element={<div>About us page</div>} />
            <Route path="/contact" element={<div>Contact us page</div>} />
            <Route path="*" element={<div>Error: 404 page not found</div>} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
      
      <Toaster />

      {/* <LoginSignup></LoginSignup> */}
      
      {/* <div className='flex flex-row flex-nowrap justify-center'>
        <UserReview></UserReview>
      </div> */}

      {/* <Landing/> */}
    </>
  )
}

export default App
