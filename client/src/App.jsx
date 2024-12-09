import { useEffect, useRef, useState } from 'react'
import './App.css'
import { SignIn } from './components/pages/SignIn'
import { SignUp } from './components/pages/SignUp'

function App() {

  const [index,setIndex] = useState(0);
  const initref = useRef();

  const [highlightStyle, setHighlightStyle] = useState({ width: 0, left: 0 });
  const [highlightSignIn, setHighlightSignIn] = useState({ width: 25 });
  const [highlightSignUp, setHighlightSignUp] = useState({ width: 0 });

  const handleMouseClick = (e) => {
    const { offsetLeft, offsetWidth } = e.target;
    setHighlightStyle({ width: offsetWidth, left: offsetLeft });
  };

  useEffect(()=>{
    const { offsetLeft, offsetWidth } = initref.current;
    setHighlightStyle({ width: offsetWidth, left: offsetLeft });
  },[]);

  return (
    <>
      <div className='w-full flex flex-col items-center'>

        <div className="nav-bar w-1/4">
          <ul className="nav-items">
            
              <li
                className="nav-item"
                onClick={(e)=>{
                  handleMouseClick(e);
                  setTimeout(()=>{
                    setHighlightSignIn({ width: 25 })
                  },400);
                  setHighlightSignUp({ width: 0 })
                }}
                ref={initref}
              >
                Sign in
              </li>
              
              <li
                className="nav-item"
                onClick={(e)=>{
                  handleMouseClick(e);
                  setHighlightSignIn({ width: 0 })
                  setTimeout(()=>{
                    setHighlightSignUp({ width: 25 })
                  },400);
                }}
                >
                Sign up
              </li>

          </ul>
          <div
            className="nav-highlight"
            style={{
              width: `${highlightStyle.width}px`,
              left: `${highlightStyle.left}px`,
            }}
          />
        </div>

        <div className='flex flex-row w-full mt-2 justify-center overflow-x-hidden flex-nowrap'>
          
            <div className='overflow-hidden'
              style={{
                width: `${highlightSignIn.width}%`,
                transition: "all .3s ease",
                whiteSpace: "nowrap"
              }}
            >
              <SignIn></SignIn>
            </div>
            
          
            <div className='overflow-hidden w-0'
              style={{
                width: `${highlightSignUp.width}%`,
                transition: "all .3s ease",
                whiteSpace: "nowrap"
              }}
            >
              <SignUp></SignUp>
            </div>

        </div>
      </div>
    </>
  )
}

export default App
