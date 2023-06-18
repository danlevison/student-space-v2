import Link from "next/link"
import React from 'react'

const LandingPage = () => {
  return (
    <section className="flex flex-col justify-center items-center w-full text-center min-h-screen py-10 md:py-0 relative">
      <div className="absolute top-0 left-0 w-full h-full bg-[url('../../public/assets/student-space-bg.jpg')] bg-no-repeat bg-cover">
        <div className="w-full h-full bg-black opacity-60"></div>
      </div>
      <div className="max-w-[1240px] w-full h-full mx-auto p-2 flex flex-col justify-center items-center relative">
        <h1 className="text-3xl md:text-6xl lg:text-8xl text-center uppercase tracking-wider text-primaryTextClr">Student Space</h1>
        <h2 className="order-[-1] text-sm lg:text-lg text-center text-primaryTextClr">Elevate Classroom Engagement.</h2>
        <h2 className="text-lg md:text-lg lg:text-2xl text-center py-6 text-primaryTextClr">Crafted by a Primary Teacher, Exclusively for Primary Teachers.</h2>
        <h3 className="text-2xl md:text-xl lg:text-2xl text-center py-4 text-primaryTextClr">Get Started!</h3>
        <Link href={"/login"} className="py-3 px-8 text-lg bg-buttonClr text-primaryTextClr rounded-lg hover:scale-105 duration-300">Sign in</Link>
      </div>
    </section>
  )
}

export default LandingPage