import React from 'react'
import { TiTickOutline } from "react-icons/ti"
import Image from "next/image"
import square from "../../../public/assets/grey-square.png"

const ClassroomManagement = () => {
  return (
    <section className="bg-white py-24 w-full">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-32 px-10">
            <div className="flex flex-col">
                <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold underline capitalize">Classroom management</h2>
                <p className="text-tertiaryTextClr leading-7 py-4">We believe that effective classroom management is key to nurturing a productive and inclusive learning environment. Our comprehensive suite of tools are designed to simplify your daily tasks, saving you valuable time and energy, allowing you to focus on what truly matters - your students' education.</p>

                <div className="pt-4 font-bold text-secondaryTextClr capitalize">
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
                <Image src={square} alt="/" width={500} height={400} />
            </div> 
        </div>
    </section>
  )
}

export default ClassroomManagement