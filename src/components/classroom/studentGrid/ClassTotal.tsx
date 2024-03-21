import React from "react"
import Image from "next/image"
import coinAvatar from "../../../../public/assets/avatars/coin.png"

export default function ClassTotal({ studentData }) {
  const classTotal = studentData.reduce((acc, curr) => {
    return acc + curr.points
  }, 0)

  return (
    <div className="relative flex flex-col justify-center items-center p-8 shadow-lg rounded-md bg-[#f5f5f5]">
      <p className="font-bold tracking-wide text-center">Class Total</p>
      <p className="text-center text-primaryTextClr w-[50px] p-2 bg-iconClr rounded-lg mx-auto my-1">
        {classTotal}
      </p>
      <Image
        src={coinAvatar}
        alt="Sketched coin"
        width={55}
        height={55}
        className="absolute top-1 left-1"
        style={{
          objectFit: "cover",
        }}
      />
    </div>
  )
}
