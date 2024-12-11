import './App.css'
import LoginSignup from './components/pages/LoginSignup'
import UserReview from './components/pages/UserReview'

function App() {

  return (
    <>
      {/* <LoginSignup></LoginSignup> */}
      
      <div className='flex flex-row flex-nowrap justify-center'>
        <UserReview></UserReview>
      </div>
    </>
  )
}

export default App
