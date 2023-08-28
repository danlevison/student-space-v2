import React from 'react'
import Image from "next/image"
import { TiTickOutline } from "react-icons/ti"
import RewardManagement from "./RewardManagement"
import ClassroomManagement from "./ClassroomManagement"
import UserInterface from "./UserInterface"
import studentRewardImg from "../../../public/assets/student-reward.svg"

const About = () => {
  return (
    <section id="about" className="bg-[#fcf9f4] w-full">
        <div className="flex flex-col justify-center items-center">

          <div className="max-w-[1440px] mx-auto py-24 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10 lg:gap-0 px-10">
              <div className="text-secondaryTextClr">
                <h2 className="text-2xl md:text-3xl lg:text-4xl 2xl:text-5xl font-bold underline">What is Student Space?</h2>
                <p className="leading-7 text-tertiaryTextClr py-4">Welcome to Student Space, the ultimate platform designed specifically for primary school teachers by a passionate educator. As an ex-primary school teacher, I understand the importance of an organised and efficient classroom environment that fosters student growth and success. That's why I created <span className="font-bold text-yellow-400">Student Space</span> - your one-stop solution for seamless reward management and daily classroom management tools.</p>
                <div className="font-bold text-secondaryTextClr capitalize pt-3 text-sm sm:text-base">
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
                <div className="flex justify-center items-center">
                  <Image src={studentRewardImg} alt="Illustration of student" className="w-full max-w-[300px] hover:scale-105 duration-300" />
                </div>
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