import React from 'react'
import Link from "next/link"
import Image from "next/image"
import bagAvatar from "../../../public/assets/avatars/bag.svg"

const DemoClassLink = () => {
  return (
    <div className="w-[230px] h-[230px] bg-white border border-[#5065A8] shadow-lg rounded-2xl hover:scale-105 duration-300 ease-out">
        <Link href={"/democlass"}>
            <div className="flex flex-col justify-center items-center h-full gap-4">
            <Image
                className="rounded-xl border-2 border-black bg-orange-100 p-2" 
                src={bagAvatar}
                alt="Class avatar"
                width={100}
                height={100}
            />
            <h2 className="text-4xl font-cabinSketch font-[400]">Demo Class</h2>
            </div>
        </Link>
    </div>
  )
}

export default DemoClassLink