import React from "react";
import Scribble from "../Scribble";
import UserMessage from "./UserMessage";
import ConditionalNavigationBtn from "./ConditionalNavigationBtn";
import { landingPageScribbles } from "@/utils/scribbles";

const LandingPage = () => {
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
  );
};

export default LandingPage;
