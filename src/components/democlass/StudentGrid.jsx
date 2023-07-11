import React, {useState, useContext} from 'react'
import Image from 'next/image'
import DemoStudentDataContext from "../../DemoStudentDataContext"
import { FaAward } from 'react-icons/fa'
import { IoMdSettings } from 'react-icons/io'
import { RiAddLine } from "react-icons/ri"
import AddStudent from "./AddStudent"
import bearAvatar from "../../../public/assets/avatars/bear.png"
import catAvatar from "../../../public/assets/avatars/cat.png"
import rabbitAvatar from "../../../public/assets/avatars/rabbit.png"
import pandaAvatar from "../../../public/assets/avatars/panda.png"
import chickenAvatar from "../../../public/assets/avatars/chicken.png"
import dogAvatar from "../../../public/assets/avatars/dog.png"

const StudentGrid = () => {
    const { demoStudentData, setDemoStudentData } = useContext(DemoStudentDataContext)  
    const [isAddStudentModalOpen, setIsAddStudentModalOpen] = useState(false)
    const [currentAvatarIndex, setCurrentAvatarIndex] = useState(0);

    const handlePointClick = (uuid) => {
        setDemoStudentData((prevStudents) => {
          return prevStudents.map((student) => {
            if (student.uuid === uuid) {
              return { ...student, points: student.points + 1 }
            }
            return student
          })
        })
      }

      const handleAvatarClick = (uuid) => {
        const images = [catAvatar, rabbitAvatar, pandaAvatar, bearAvatar, chickenAvatar, dogAvatar]
        setDemoStudentData((prevDemoStudentData) => {
          return prevDemoStudentData.map((student) => {
            if (student.uuid === uuid) {
              const nextIndex = (currentAvatarIndex + 1) % images.length
              return { ...student, avatar: images[nextIndex] }
            }
            return student
          })
        })
        setCurrentAvatarIndex((prevIndex) => (prevIndex + 1) % images.length)
      }

      const handleAddStudentModal = () => {
        setIsAddStudentModalOpen(true)
      }

      return (
            <div className="grid grid-cols-[repeat(auto-fit,minmax(210px,1fr))] gap-4 items-center px-10">
                {demoStudentData.map((student) => (
                    <div key={student.uuid} className="relative flex flex-col justify-center items-center p-8 shadow-lg rounded-md bg-[#f5f5f5]">
                      <p className="font-bold tracking-wide">{student.name}</p>
                      <p className="text-center text-primaryTextClr w-[50px] p-2 bg-blue-400 rounded-lg mx-auto my-1">{student.points}</p>
                      <button onClick={() => handlePointClick(student.uuid)}>
                          <FaAward size={30} className="absolute top-2 right-1 text-iconClr hover:text-yellow-500 hover:scale-110 duration-300 ease-in"/>
                      </button>
                      <button
                        onClick={() => handleAvatarClick(student.uuid)} 
                        className="absolute top-1 left-1">
                          <Image 
                          src={student.avatar}
                          alt="/"
                          width={60}
                          height={60}
                          className="rounded-full"
                          style={{
                              objectFit: "cover"
                          }}
                          />
                      </button>
                      <button className="absolute bottom-2 right-2">
                          <IoMdSettings size={20} className="text-gray-400"/>
                      </button>
                    </div>
                ))}
                <button onClick={handleAddStudentModal} className="flex flex-col justify-center items-center max-w-[210px] p-[2.40rem] shadow-lg rounded-md bg-[#f5f5f5] hover:scale-105 duration-300">
                    <p className="text-lg font-bold">Add student</p>
                    <RiAddLine size={30} />
                </button>
                
                {/* Add Student Modal */}
                 {isAddStudentModalOpen && <AddStudent isAddStudentModalOpen={isAddStudentModalOpen} setIsAddStudentModalOpen={setIsAddStudentModalOpen} />}
            </div>
      )
  }
  
  export default StudentGrid