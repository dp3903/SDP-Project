import React from 'react'
import { Button } from '../ui/button'
import BlurFade from '../ui/blur-fade'
import { Link } from 'react-router-dom'

function Landing() {
  return (
    <div className='w-[100vw] h-[100vh] flex justify-stretch bg-bg-2 bg-no-repeat bg-cover'>

      <div className="absolute text-xl font-semibold py-8 top-0 w-[100vw] flex flex-row flex-nowrap justify-around backdrop-blur backdrop-contrast-50">
          <h1>
            <Link to='/'>
              Welcome To Hermes
            </Link>
          </h1>
          <ul className='flex flex-row flex-nowrap justify-around gap-10'>
            <li>
              <Link to="/authenticate">Sign-in or Register</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
      </div>


      <div className='h-full w-full p-20 flex flex-col justify-center'>
        <BlurFade delay={.25} inView>
          <h1 className='text-8xl font-bold tracking-tighter font-display'>
            LET'S LEARN
          </h1>
        </BlurFade>
        <BlurFade delay={0.25 * 2} inView>
          <p className='w-2/3 text-xl font-semibold'>
            We recommend best learning resources for any computer science student out there.
          </p>
        </BlurFade>
        <BlurFade delay={0.25 * 3} inView>
          <Button className='p-4 m-4 w-fit'>Get started</Button>
        </BlurFade>
      </div>

      <div className='right-0 bg-landing-bg bg-no-repeat bg-contain bg-right w-full h-full'></div>
    
    </div>
  )
}

export default Landing