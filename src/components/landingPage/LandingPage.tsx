import React from "react"
import Scribble from "../Scribble"
import UserMessage from "./UserMessage"
import ConditionalNavigationBtn from "./ConditionalNavigationBtn"

const LandingPage = () => {
  const landingPageScribbles = [
    {
      src: "/assets/Scribbles/24.svg",
      className: "absolute top-10 left-0 w-[75px] md:w-[100px] 2xl:w-[150px]",
    },
    {
      src: "/assets/Scribbles/22.svg",
      className:
        "absolute bottom-20 md:bottom-0 right-20 w-[75px] md:w-[100px] 2xl:w-[150px] rotate-12",
    },
    {
      src: "/assets/Scribbles/23.svg",
      className: "absolute top-32 right-6 w-[50px] md:w-[75px] 2xl:w-[100px]",
    },
    {
      src: "/assets/Scribbles/21.svg",
      className: "absolute bottom-32 left-16 w-[50px] md:w-[75px]",
    },
    {
      src: "/assets/Scribbles/57.svg",
      className:
        "absolute bottom-72 md:bottom-44 2xl:bottom-96 right-7 md:right-56 2xl:right-56 w-[40px] md:w-[50px] 2xl:w-[75px]",
    },
    {
      src: "/assets/Scribbles/53.svg",
      className: "absolute top-52 md:top-28 2xl:top-32 w-[25px] 2xl:w-[40px]",
    },
    {
      src: "/assets/Scribbles/49.svg",
      className: "absolute bottom-72 left-10 md:left-24 w-[30px] md:w-[40px]",
    },
    {
      src: "/assets/Scribbles/45.svg",
      className:
        "hidden 2xl:block absolute top-72 left-72 w-[30px] 2xl:w-[40px]",
    },
    {
      src: "/assets/Scribbles/50.svg",
      className: "hidden lg:block absolute bottom-0 w-[100px] 2xl:w-[150px]",
    },
  ]

  return (
    <section className="flex flex-col justify-center items-center w-full text-center min-h-screen py-24 relative">
      <Scribble scribblesSvgs={landingPageScribbles} />
      <div className="max-w-[1440px] w-full h-full mx-auto p-2 flex flex-col justify-center items-center relative">
        <h1 className="text-4xl md:text-6xl lg:text-8xl text-center font-bold uppercase tracking-wider text-yellow-400">
          Student Space
        </h1>
        <h2 className="order-[-1] text-sm lg:text-xl text-center text-secondaryTextClr pb-1">
          Elevate Classroom Engagement.
        </h2>
        <h2 className="md:text-lg lg:text-2xl text-center text-secondaryTextClr capitalize">
          Crafted exclusively for primary teachers.
        </h2>
        <UserMessage />
        <ConditionalNavigationBtn />
      </div>
    </section>
  )
}

export default LandingPage
