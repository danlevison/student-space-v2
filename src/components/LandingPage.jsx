"use client"

import React from 'react'
import Link from "next/link"
import Image from "next/image"
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from "../../utils/firebase"
import LandingPageBg from "../../public/assets/confetti.png"

const LandingPage = () => {
  const [user, loading] = useAuthState(auth)

  return (
    <section className="flex flex-col justify-center items-center w-full text-center min-h-screen py-10 md:py-24 relative">
      <div className="absolute w-full h-full">
        <Image 
          src={LandingPageBg}
          alt="/"
          quality={100}
          placeholder="blur"
          fill
          sizes="100vw"
          style={{
            objectFit: "cover"
          }}
        />
        {/* <div className="w-full h-full bg-black opacity-60"></div> */}
      </div>
      <div className="max-w-[1440px] w-full h-full mx-auto p-2 flex flex-col justify-center items-center relative">
        <h1 className="text-3xl md:text-6xl lg:text-8xl text-center uppercase tracking-wider text-yellow-400">Student Space</h1>
        <h2 className="order-[-1] text-sm lg:text-xl text-center text-primaryTextClr pb-1">Elevate Classroom Engagement.</h2>
        <h2 className="text-lg md:text-lg lg:text-2xl text-center py-6 text-primaryTextClr capitalize">Crafted exclusively for primary teachers.</h2>
        <h3 className="text-2xl md:text-xl lg:text-2xl text-center py-4 text-primaryTextClr">Get Started!</h3>
        {user ? 
        <Link href={"/dashboard"} className="py-3 px-16 text-lg lg:text-xl bg-buttonClr text-primaryTextClr rounded-full hover:scale-105 duration-300">Dashboard</Link>
        : <Link href={"/login"} className="py-3 px-16 text-lg lg:text-xl bg-buttonClr text-primaryTextClr rounded-full hover:scale-105 duration-300">Sign in</Link>}
      </div>
    </section>
  )
}

export default LandingPage