import React from 'react'
import { TiTickOutline } from "react-icons/ti"
import Image from "next/image"
import square from "../../../public/assets/grey-square.png"

const RewardManagement = () => {
  return (
    <section className="bg-[#f6f7fa] py-16 lg:py-32 w-full">
        <div className="max-w-[1240px] mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-32 px-10">
            <div>
                <Image src={square} alt="/" width={400} height={400} />
            </div>
            <div className="flex flex-col">
                <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold underline capitalize">Reward management</h2>
                <p className="text-tertiaryTextClr leading-7 py-4">We understand the powerful impact of positive reinforcement on student motivation and engagement. Through our points system, you can easily track and distribute rewards, ensuring that every achievement is acknowledged and celebrated.</p>

                <div className="pt-4 font-bold text-secondaryTextClr capitalize">
                    <div className="flex items-center gap-2">
                        <div className="border-2 border-yellow-500 rounded-full">
                            <TiTickOutline size={20} className="text-yellow-500" />
                        </div>
                        <p>Award points</p>
                    </div>
                    <div className="flex items-center py-6 gap-2">
                        <div className="border-2 border-yellow-500 rounded-full">
                            <TiTickOutline size={20} className="text-yellow-500" />
                        </div>
                        <p>Create a positive classroom atmosphere</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="border-2 border-yellow-500 rounded-full">
                            <TiTickOutline size={20} className="text-yellow-500" />
                        </div>
                        <p>Promote personal and academic growth</p>
                    </div>
                </div>
              </div>
             
        </div>
    </section>
  )
}

export default RewardManagement