import React, { useContext, useState, useEffect } from 'react'
import Image from "next/image"
import { Dialog } from '@headlessui/react'
import StudentDataContext from "@/StudentDataContext"
import { doc, collection, updateDoc } from 'firebase/firestore'
import { db } from "../../../utils/firebase"
import { AiOutlineClose } from 'react-icons/ai'
import { FaAward } from 'react-icons/fa'
import pointsSound from "../../../../public/audio/points.mp3"

const Randomiser = ({ openRandomiser, setOpenRandomiser }) => {
  const { studentData, setStudentData, userUid, userClassName } = useContext(StudentDataContext)
  const [randomStudent, setRandomStudent] = useState("")

  const getRandomStudent = () => {
    const randomIndex = Math.floor(Math.random() * studentData.length)
    const student = studentData.map((student) => student)
    const selectedStudent = student[randomIndex]
    setRandomStudent(selectedStudent)
  }

  useEffect(() => {
    getRandomStudent()
  }, [openRandomiser])

  const handlePointClick = async () => {
    try {
      // Increment the points in the studentData state
      const updatedStudentData = studentData.map((student) => {
        if (student.name === randomStudent.name) {
          return { ...student, points: student.points + 1 }
        }
        return student
      })

      // Update the randomStudent state with the updated points
      setRandomStudent((prevRandomStudent) => {
        return { ...prevRandomStudent, points: prevRandomStudent.points + 1 }
      })
      
      const pointsAudio = new Audio(pointsSound)
      pointsAudio.volume = 0.2
      pointsAudio.play()
      
      setStudentData(updatedStudentData)

      // Update the points in the users firebase studentData and display in the users class
      if (userUid && userClassName) {
        const classCollectionRef = collection(db, 'users', userUid, userClassName)
        const classDocumentRef = doc(classCollectionRef, userUid)
    
        await updateDoc(classDocumentRef, {
          studentData: updatedStudentData,
        })
      }
    } catch (error) {
        console.error('Error updating student points:', error)
    }
  } 
    
  return (
    <Dialog open={openRandomiser} onClose={() => setOpenRandomiser(false)} className="relative z-50">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-modalBackdropClr" aria-hidden="true" />

      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="p-5 w-full h-full lg:w-[600px] lg:h-[400px] rounded-xl bg-blue-100">
          <div className="flex justify-between items-center pb-4">
            <Dialog.Title className="font-bold text-xl">Random Student</Dialog.Title>
            <button onClick={() => setOpenRandomiser(false)}>
              <AiOutlineClose
                size={28}
                className="bg-white text-secondaryTextClr hover:bg-buttonClr rounded-full hover:text-primaryTextClr p-1"
              />
            </button>
          </div>

          <div className="flex flex-col justify-center items-center gap-6 h-full">
              <div key={randomStudent.uuid} className="relative flex flex-col justify-center items-center p-8 shadow-lg rounded-md bg-[#f5f5f5] w-[300px] lg:w-[400px] h-[250px]">
                <p className="font-bold text-3xl tracking-wide">{randomStudent.name}</p>
                <p className="text-center text-primaryTextClr text-2xl w-[60px] p-2 bg-iconClr rounded-lg mx-auto my-1">{randomStudent.points}</p>
                <button 
                  onClick={handlePointClick}
                >
                    <FaAward size={40} className="absolute top-2 right-1 text-iconClr hover:text-yellow-500 hover:scale-110 duration-300 ease-in"/>
                </button>
                <Image 
                  src={randomStudent.avatar}
                  alt="/"
                  width={80}
                  height={80}
                  className="rounded-full absolute top-1 left-1"
                  style={{
                      objectFit: "cover"
                  }}
                  />
              </div>
            <button onClick={getRandomStudent} className="pb-8">Choose again</button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}

export default Randomiser