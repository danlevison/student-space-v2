import React from 'react'
import Image from "next/image"
import square from "../../../public/assets/grey-square.png"

const UserInterface = () => {
  return (
    <section className="bg-[#f6f7fa] py-16 lg:py-52 w-full">
        <div className="max-w-[1440px] mx-auto px-10">
            <div className="flex flex-col justify-center items-center">
              <div className="md:text-center">
                  <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold underline capitalize">Friendly User-Interface</h2>
                  <p className="text-tertiaryTextClr leading-7 py-4">Take advantage of intuitive features that make your teaching experience more enjoyable and efficient. The user-friendly interface ensures that you can effortlessly navigate through the app, finding the tools you need with ease. I have thoughtfully designed Student Space to be accessible on various devices, giving you the freedom to manage your classroom anytime, anywhere.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                <Image src={square} alt="/" width={400} height={400} />
                <Image src={square} alt="/" width={400} height={400} />
                <Image src={square} alt="/" width={400} height={400} />
              </div>
            </div>
        </div>
    </section>
  )
}

export default UserInterface