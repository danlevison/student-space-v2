import React from 'react'
import Link from "next/link"
import Image from "next/image"
import children from "../../../public/assets/happy-children.svg"
import { TiTickOutline } from "react-icons/ti"
import { FiArrowRight } from "react-icons/fi"

const RewardManagement = () => {
  return (
    <section className="bg-[#f6f7fa] w-full py-16 lg:py-24 xl:py-40">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-16 lg:gap-32 px-8">
            <div className="order-2 lg:order-1 flex justify-center items-center hover:scale-105 duration-300">
                <Image 
                    src={children} 
                    alt="Illustration of happy children" 
                    className="rounded-3xl w-full max-w-[800px]"
                    style={{objectFit: "cover"}} 
                />
            </div>
            <div className="flex flex-col order-1">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black capitalize py-4">
                    <span className="bg-[linear-gradient(#FFF3A0,#FFEB79)] bg-[0_70%] bg-[size:100%_35%] bg-no-repeat">Reward management</span>
                </h2>
                <p className="text-tertiaryTextClr font-medium leading-7 py-4">Positive reinforcement has a powerful impact on student motivation and engagement. Through the points system, you can easily track and distribute rewards, ensuring that every achievement is acknowledged and celebrated.</p>

                <div className="flex flex-col gap-6 pt-4 font-bold text-secondaryTextClr text-left text-sm sm:text-base">
                    <div className="flex items-center gap-2">
                        <div className="border-2 border-yellow-500 rounded-full">
                            <TiTickOutline size={20} className="text-yellow-500" role="presentation" />
                        </div>
                        <p>Award Points to Students</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="border-2 border-yellow-500 rounded-full">
                            <TiTickOutline size={20} className="text-yellow-500" role="presentation" />
                        </div>
                        <p>Award Points to Table Groups</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="border-2 border-yellow-500 rounded-full">
                            <TiTickOutline size={20} className="text-yellow-500" role="presentation" />
                        </div>
                        <p>Create a Positive Classroom Atmosphere</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="border-2 border-yellow-500 rounded-full">
                            <TiTickOutline size={20} className="text-yellow-500" role="presentation" />
                        </div>
                        <p>Promote Personal and Academic Growth</p>
                    </div>
                    <Link 
                        href={"/login"}
                        className="group flex items-center gap-2 text-yellow-500 w-fit"
                    >
                        Get Started Now! 
                        <FiArrowRight size={20} className="group-hover:translate-x-1 duration-300" role="presentation" />
                    </Link>
                </div>
              </div>
        </div>
    </section>
  )
}

export default RewardManagement