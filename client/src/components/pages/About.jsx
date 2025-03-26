import React from 'react'
import { Link } from 'react-router-dom'
import png2 from "../../assets/png_2.png"
import png3 from "../../assets/png-3.png"
import png4 from "../../assets/design.png"
import png5 from "../../assets/design-2.png"

function About() {
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

        <div className='m-10 lg:m-40 mt-60'>
            <div className="grid col-span-1 lg:grid-cols-3 gap-20 gap-x-40">
                <div className="col lg:col-span-2  lg:order-first">
                    <h1 className="text-center font-bold text-2xl font-display mb-4">Empowering Learners with the Best Learning Resources!</h1>
                    <div className='font-semibold'>
                        Welcome to Hermes! Our mission is to help learners find the best online learning resources for computer and IT students tailored to their needs. Whether you're a beginner or an expert, we guide you to the right materials.
                    </div>
                </div>
                <div className="col  lg:order-2">
                    <img src={png2} alt="img-1" className='h-full w-full object-contain' />
                </div>

                
                <div className="col lg:col-span-2 lg:order-4">
                    <h1 className="text-center font-bold text-2xl font-display">Our Mission</h1>
                    <div className='font-semibold'>
                        In today’s vast digital world, finding the right learning resource can be overwhelming. We simplify this by curating, categorizing, and recommending high-quality learning materials.
                        Whether you're a student, a professional, or a self-learner, we provide trusted resources across various domains like programming, data science, AI, and more.
                        We also provide personalized roadmaps creation which helps you in tracking your progress for your determined path.
                    </div>
                </div>
                <div className="col lg:order-3">
                    <img src={png3} alt="img-1" className='h-full w-full object-contain' />
                </div>

                
                <div className="col lg:col-span-2 lg:order-5">
                    <h1 className="text-center font-bold text-2xl font-display">How It Works</h1>
                    <div className='font-semibold'>
                        In simple words, We analyze various learning resources based on user reviews, ratings, and tags. Our system intelligently suggests the best materials tailored to your learning preferences. Various metrics are taken into consideration to calculate best resources that you may find engaging and thus provide you the best experience into the world of computers.
                    </div>
                </div>
                <div className="col lg:order-6">
                    <img src={png4} alt="img-1" className='h-full w-full object-contain' />
                </div>
                
                
                <div className="col lg:col-span-2 lg:order-8">
                    <h1 className="text-center font-bold text-2xl font-display">Key Features</h1>
                    <ul className='font-semibold list-disc'>
                        <li>
                            Personalized Recommendations – Find what resources fits you the best!
                        </li>
                        <li>
                            Community Ratings & Reviews – Get feedback from real learners and experienced scholars.
                        </li>
                        <li>
                            Diverse Categories – From frontend development to AI & ML to game development.
                        </li>
                        <li>
                            Easy Access to Quality Content – No more endless searching on the web or asking AI for Recommendations!
                        </li>
                    </ul>
                </div>
                <div className="col lg:order-7">
                    <img src={png5} alt="img-1" className='h-full w-full object-contain' />
                </div>
            </div>
        </div>
    </div>
  )
}

export default About