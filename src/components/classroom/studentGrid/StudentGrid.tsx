"use client"

import React, { useState, useContext } from "react"
import Image from "next/image"
import StudentDataContext from "@/context/StudentDataContext"
import { RiAddLine } from "react-icons/ri"
import StudentCard from "./StudentCard"
import AddStudent from "./AddStudent"
import Confetti from "react-confetti"
import { useWindowSize } from "@reactuses/core"
// Avatars
import coinAvatar from "../../../../public/assets/avatars/coin.png"
import sheepAvatar from "../../../../public/assets/avatars/sheep.svg"
import monkeyAvatar from "../../../../public/assets/avatars/monkey.svg"
import rabbitAvatar from "../../../../public/assets/avatars/rabbit.svg"
import frogAvatar from "../../../../public/assets/avatars/frog.svg"
import snakeAvatar from "../../../../public/assets/avatars/snake.svg"
import chickenAvatar from "../../../../public/assets/avatars/chicken.svg"
import giraffeAvatar from "../../../../public/assets/avatars/giraffe.svg"
import pandaAvatar from "../../../../public/assets/avatars/panda.svg"
import penguinAvatar from "../../../../public/assets/avatars/penguin.svg"
import dogAvatar from "../../../../public/assets/avatars/dog.svg"
import cheetahAvatar from "../../../../public/assets/avatars/cheetah.svg"
import lionAvatar from "../../../../public/assets/avatars/lion.svg"
import otterAvatar from "../../../../public/assets/avatars/otter.svg"
import ClassTotal from "./ClassTotal"

const StudentGrid = () => {
  const { studentData } = useContext(StudentDataContext)
  const [isAddStudentModalOpen, setIsAddStudentModalOpen] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const { width, height } = useWindowSize()
  const avatars: HTMLImageElement[] = [
    monkeyAvatar,
    rabbitAvatar,
    pandaAvatar,
    cheetahAvatar,
    sheepAvatar,
    chickenAvatar,
    penguinAvatar,
    dogAvatar,
    giraffeAvatar,
    snakeAvatar,
    otterAvatar,
    frogAvatar,
    lionAvatar,
  ]

  const handleAddStudentModal = () => {
    setIsAddStudentModalOpen(true)
  }

  return (
    <>
      {studentData.length === 0 ? (
        <div className="flex flex-col justify-center items-center h-full w-3/4 lg:w-1/2 mx-auto rounded-lg shadow-lg p-4 sm:mt-10 bg-[#f5f5f5]">
          <h2 className="text-center font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl">
            Add your students!
          </h2>
          <p className="text-center py-8 sm:text-lg">
            Engage your students by easily tracking and distributing rewards,
            ensuring that every achievement is acknowledged and celebrated!
          </p>
          <button
            onClick={handleAddStudentModal}
            className="bg-buttonClr p-3 md:p-4 rounded-lg text-primaryTextClr hover:scale-105 duration-300"
          >
            Add students
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4 items-center px-10">
          <ClassTotal studentData={studentData} />
          <StudentCard avatars={avatars} setShowConfetti={setShowConfetti} />
          <button
            onClick={handleAddStudentModal}
            className="flex flex-col justify-center items-center max-w-[435px] p-[2.40rem] shadow-lg rounded-md bg-[#f5f5f5] hover:scale-105 duration-300"
          >
            <p className="text-lg font-bold">Add student</p>
            <RiAddLine size={30} />
          </button>
          {showConfetti && (
            <Confetti
              width={width}
              height={height}
              gravity={0.05}
              numberOfPieces={300}
              className="w-full"
            />
          )}
        </div>
      )}
      {/* Add Student Modal */}
      {isAddStudentModalOpen && (
        <AddStudent
          avatars={avatars}
          isAddStudentModalOpen={isAddStudentModalOpen}
          setIsAddStudentModalOpen={setIsAddStudentModalOpen}
        />
      )}
    </>
  )
}

export default StudentGrid
