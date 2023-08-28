import React from 'react'
import { TiTickOutline } from "react-icons/ti"
import Image from "next/image"
import teacher from "../../../public/assets/teacher-students.svg"

const ClassroomManagement = () => {
  return (
    <section className="bg-[#fcf9f4] py-24 w-full">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-32 px-10">
            <div className="flex flex-col">
                <h2 className="text-2xl md:text-3xl lg:text-4xl 2xl:text-5xl font-bold underline capitalize">Classroom management</h2>
                <p className="text-tertiaryTextClr leading-7 py-4">Effective classroom management is key to nurturing a productive and inclusive learning environment. Student Space provides a comprehensive suite of tools that are designed to simplify your daily tasks, saving you valuable time and energy, allowing you to focus on what truly matters - your students' education.</p>

                <div className="pt-4 font-bold text-secondaryTextClr capitalize text-sm sm:text-base">
                    <div className="flex items-center gap-2">
                        <div className="border-2 border-yellow-500 rounded-full">
                            <TiTickOutline size={20} className="text-yellow-500" />
                        </div>
                        <p>Student randomiser</p>
                    </div>
                    <div className="flex items-center py-6 gap-2">
                        <div className="border-2 border-yellow-500 rounded-full">
                            <TiTickOutline size={20} className="text-yellow-500" />
                        </div>
                        <p>Task-list</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="border-2 border-yellow-500 rounded-full">
                            <TiTickOutline size={20} className="text-yellow-500" />
                        </div>
                        <p>Countdown timer</p>
                    </div>
                </div>
              </div>
              <div>
                <div className="flex justify-center items-center">
                    <Image src={teacher} alt="/" className="w-full max-w-[600px] hover:scale-105 duration-300" />
                </div>
            </div> 
        </div>
    </section>
  )
}

export default ClassroomManagement