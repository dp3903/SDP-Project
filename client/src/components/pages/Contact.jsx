import React from 'react'
import { Link } from 'react-router-dom'
import png4 from '../../assets/png4.png'
import { Mail, Phone } from 'lucide-react'

function Contact() {
  return (
    <div className='h-[100vh] custom-scrollbar overflow-y-auto overflow-x-clip bg-gradient-to-br from-cyan-500 to-fuchsia-500'>
      <div className="absolute text-xl font-semibold py-8 top-0 w-[100vw] flex flex-row flex-nowrap justify-around backdrop-blur shadow-lg">
          <h1>
            <Link to='/'>
              Welcome To Hermes
            </Link>
          </h1>
          <ul className='flex flex-row flex-nowrap justify-around gap-10'>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
      </div>

      <div className='mt-40 m-10 lg:m-60 font-semibold'>
        <div className="grid lg:grid-cols-3 gap-20">
          <div className="col lg:col-span-2">
            <h1 className='text-6xl font-display m-10'>
              Contact us
            </h1>
            <div>
              Want to get in touch with our team? we are always welcome for any feedback that you may provide. For any assistance or queries, please utilize the given below contact information to directly communicate with our team. We will try our best to provide any help we can in case of a need of assistance.
            </div>
          </div>
          <div className="col">
            <img src={png4} alt="contactus img" className='h-full w-full object-contain' />
          </div>
          <div className="col grid lg:grid-cols-2 gap-20 lg:col-span-3">
            <div className="col bg-[rgba(255,255,255,0.6)] shadow-md hover:shadow-xl hover:bg-white transition-all duration-200 hover:scale-105 p-10 text-center rounded-xl">
              <Mail className='m-auto size-10 mb-10'/>
              Mail us at abc@123.com
            </div>
            <div className="col bg-[rgba(255,255,255,0.6)] shadow-md hover:shadow-xl hover:bg-white transition-all duration-200 hover:scale-105 p-10 text-center rounded-xl">
              <Phone className='m-auto size-10 mb-10'/>
              Call us at 999,999,9999
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact