import React from 'react'
import Image from "next/image"
import { TiTickOutline } from "react-icons/ti"
import RewardManagement from "./about/RewardManagement"
import ClassroomManagement from "./about/ClassroomManagement"
import UserInterface from "./about/UserInterface"
import square from "../../public/assets/grey-square.png"

const About = () => {
  return (
    <section id="about" className="bg-white w-full">
        <div className="flex flex-col justify-center items-center">
          <div className="max-w-[1440px] mx-auto py-16 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-[250px] px-10 min-h-screen">
                <div className="text-secondaryTextClr">
                    <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold py-6">What is Student Space?</h2>
                    <p className="leading-7 text-tertiaryTextClr">Welcome to Student Space, the ultimate platform designed specifically for primary school teachers by a passionate educator. As a primary school teacher, we understand the importance of an organised and efficient classroom environment that fosters student growth and success. That's why we created <span className="font-bold text-yellow-400">Student Space</span> - your one-stop solution for seamless reward management and daily classroom management tools.</p>
                    <div className="font-bold text-secondaryTextClr capitalize pt-8">
                        <div className="flex items-center gap-2">
                          <div className="border-2 border-yellow-500 rounded-full">
                              <TiTickOutline size={20} className="text-yellow-500" />
                          </div>
                          <p>Manage rewards</p>
                        </div>
                        <div className="flex items-center py-6 gap-2">
                          <div className="border-2 border-yellow-500 rounded-full">
                              <TiTickOutline size={20} className="text-yellow-500" />
                          </div>
                          <p>Daily management tools</p>
                        </div>
                        <div className="flex items-center gap-2">
                           <div className="border-2 border-yellow-500 rounded-full">
                              <TiTickOutline size={20} className="text-yellow-500" />
                            </div>
                            <p>User-friendly interface</p>
                        </div>
                      </div>
                </div>

                <div>
                  <Image src={square} alt="/" width={400} height={400} />
                </div>
            </div>
            </div>
            <RewardManagement />
            <ClassroomManagement />
            <UserInterface />
        </div>
    </section>
  )
}

export default About