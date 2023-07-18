"use client"

import React from 'react'
import Link from "next/link"
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from "../utils/firebase"
import Scribble from "./Scribble"

const LandingPage = () => {
  const [user, loading] = useAuthState(auth)

  const scribblesSvgs = [
    { src: '/assets/Scribbles/24.svg', alt: 'Red Scribble', className: 'absolute top-10 left-0 w-[75px] md:w-[150px]' },
    { src: '/assets/Scribbles/22.svg', alt: 'Red Bolt Scribble', className: 'absolute bottom-0 right-20 w-[75px] md:w-[150px] rotate-12' },
    { src: '/assets/Scribbles/23.svg', alt: 'Black Scribble', className: 'absolute top-32 right-6 w-[50px] md:w-[100px]' },
    { src: '/assets/Scribbles/21.svg', alt: 'Green Scribble', className: "absolute bottom-32 left-16 w-[50px] md:w-[75px]" },
    { src: '/assets/Scribbles/57.svg', alt: 'Arrow Scribble', className: "absolute bottom-72 right-2 sm:right-7 md:right-32 lg:right-56 w-[40px] md:w-[75px]" },
    { src: '/assets/Scribbles/53.svg', alt: 'Star Scribble', className: "absolute top-64 md:top-32 w-[30px] md:w-[40px]" },
    { src: '/assets/Scribbles/49.svg', alt: 'Sparkle Scribble', className: "absolute bottom-72 left-10 md:left-24 w-[30px] md:w-[40px]" },
    { src: '/assets/Scribbles/45.svg', alt: 'Scratch Scribble', className: "hidden lg:block absolute top-44 left-60 w-[30px] md:w-[40px]" },
    { src: '/assets/Scribbles/50.svg', alt: 'Blue Scribble', className: "hidden lg:block absolute bottom-0 w-[100px] md:w-[200px]" },
  ]

  return (
    <section className="flex flex-col justify-center items-center w-full text-center h-full py-80 relative">
      {/* TODO: Make scribble component (save images in array and loop over to render <Image />) */}
      <Scribble scribblesSvgs={scribblesSvgs} />
      <div className="max-w-[1440px] w-full h-full mx-auto p-2 flex flex-col justify-center items-center relative">
        <h1 className="text-4xl md:text-6xl lg:text-8xl text-center uppercase tracking-wider text-yellow-400">Student Space</h1>
        <h2 className="order-[-1] text-sm lg:text-xl text-center text-secondaryTextClr pb-1">Elevate Classroom Engagement.</h2>
        <h2 className="md:text-lg lg:text-2xl text-center py-6 text-secondaryTextClr capitalize">Crafted exclusively for primary teachers.</h2>
        <h3 className="text-2xl md:text-xl lg:text-2xl text-center py-4 text-secondaryTextClr">Get Started!</h3>
        {user ? 
        <Link href={"/dashboard"} className="py-3 px-16 text-lg lg:text-xl bg-buttonClr text-primaryTextClr rounded-full hover:scale-105 duration-300">Dashboard</Link>
        : <Link href={"/login"} className="py-2 px-10 md:py-3 md:px-16 text-lg md:text-xl bg-buttonClr text-primaryTextClr rounded-full hover:scale-105 duration-300">Sign in</Link>}
      </div>
    </section>
  )
}

export default LandingPage