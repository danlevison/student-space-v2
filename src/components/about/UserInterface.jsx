import React from 'react'
import Image from "next/image"
import mobileView from "../../../public/assets/mobile-view.jpg"
import desktopView from "../../../public/assets/desktop-view.jpg"

const UserInterface = () => {
  return (
    <section className="bg-[#f6f7fa] w-full flex flex-col justify-center items-center" style={{ minHeight: "calc(100vh - 6rem)"}}>
        <div className="max-w-[1440px] mx-auto px-8 py-16">
            <div className="flex flex-col justify-center items-center">
              <div className="md:text-center">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-black capitalize">
                  <span className="bg-[linear-gradient(#FFF3A0,#FFEB79)] bg-[0_70%] bg-[size:100%_35%] bg-no-repeat">User-friendly interface</span>
                  </h2>
                  <p className="text-tertiaryTextClr font-medium leading-7 py-4">Take advantage of intuitive features that make your teaching experience more enjoyable and efficient. The user-friendly interface ensures that you can effortlessly navigate through the app, finding the tools you need with ease. Student Space has been thoughtfully designed to be accessible on various devices, giving you the freedom to manage your classroom anytime, anywhere.</p>
              </div>
              <div className="flex flex-col md:flex-row justify-center items-center gap-10 mt-5">
                <div>
                  <Image src={mobileView} 
                    quality={100} 
                    alt="/" 
                    className="rounded-xl w-full max-w-[300px]"
                    style={{objectFit: "cover"}} 
                  />
                </div>
                <div>
                  <Image 
                    src={desktopView} 
                    quality={100} 
                    alt="/" 
                    className="w-full max-w-[1000px]"
                    style={{objectFit: "cover"}}  
                  />
                </div>
              </div>
            </div>
        </div>
    </section>
  )
}

export default UserInterface