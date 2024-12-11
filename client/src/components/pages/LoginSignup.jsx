import React from 'react'
import { useEffect, useRef, useState } from 'react'
import { SignIn } from './SignIn'
import { SignUp } from './SignUp'

function LoginSignup() {

    const [index,setIndex] = useState(0);
    const signInref = useRef();
    const signUpref = useRef();
  
    const [highlightStyle, setHighlightStyle] = useState({ width: 0, left: 0 });
    const [highlightSignIn, setHighlightSignIn] = useState({ width: 100 });
    const [highlightSignUp, setHighlightSignUp] = useState({ width: 0 });
  
    const signInClick = (e)=>{
  
      const { offsetLeft, offsetWidth } = signInref.current;
      setHighlightStyle({ width: offsetWidth, left: offsetLeft });
  
      setTimeout(()=>{
        setHighlightSignIn({ width: 100 })
      },400);
      setHighlightSignUp({ width: 0 })
    };
  
    const signUpClick = (e)=>{
  
      const { offsetLeft, offsetWidth } = signUpref.current;
      setHighlightStyle({ width: offsetWidth, left: offsetLeft });
  
      setHighlightSignIn({ width: 0 })
      setTimeout(()=>{
        setHighlightSignUp({ width: 100 })
      },400);
    }
  
    useEffect(()=>{
      const { offsetLeft, offsetWidth } = signInref.current;
      setHighlightStyle({ width: offsetWidth, left: offsetLeft });
    },[]);
  
    return (
      <>
        <div className='w-full flex flex-col items-center'>
  
          <div className="relative flex justify-center items-center w-1/4">
            <ul className="nav-items m-0 p-0 flex list-none gap-10">
              
                <li
                  className="nav-item font-bold text-lg py-[10px] px-[20px] text-gray-700 cursor-pointer relative"
                  onClick={signInClick}
                  ref={signInref}
                >
                  Sign in
                </li>
                
                <li
                  className="nav-item font-bold text-lg py-[10px] px-[20px] text-gray-700 cursor-pointer relative"
                  onClick={signUpClick}
                  ref={signUpref}
                  >
                  Sign up
                </li>
  
            </ul>
            <div
              className="nav-highlight absolute bottom-0 left-0 h-[4px] bg-blue-600 rounded-md"
              style={{
                width: `${highlightStyle.width}px`,
                left: `${highlightStyle.left}px`,
                transition: "all 0.3s ease",
              }}
            />
          </div>
  
          <div className='flex flex-row w-full mt-2 justify-center overflow-x-hidden flex-nowrap'>
            <div className='w-1/4  relative flex flex-row overflow-x-hidden flex-nowrap'>
  
              <div className='overflow-hidden relative left-0'
                style={{
                  width: `${highlightSignIn.width}%`,
                  transition: "all .3s ease",
                  whiteSpace: "nowrap"
                }}
              >
                <SignIn signUpClick={signUpClick}></SignIn>
              </div>
              
            
              <div className='overflow-hidden relative right-0'
                style={{
                  width: `${highlightSignUp.width}%`,
                  transition: "all .3s ease",
                  whiteSpace: "nowrap"
                }}
                >
                <SignUp signInClick={signInClick}></SignUp>
              </div>
            </div>
  
          </div>
        </div>
      </>
    );
}

export default LoginSignup