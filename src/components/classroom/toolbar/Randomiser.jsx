import React, { useContext, useState, useEffect } from 'react'
import Image from "next/image"
import { Dialog } from '@headlessui/react'
import StudentDataContext from "@/context/StudentDataContext"
import { doc, updateDoc } from 'firebase/firestore'
import { db } from "../../../utils/firebase"
import { AiOutlineClose } from 'react-icons/ai'
import { FaAward } from 'react-icons/fa'
import pointsSound from "../../../../public/audio/points.mp3"
import Confetti from 'react-confetti'
import { useWindowSize } from "@reactuses/core"

const Randomiser = ({ openRandomiser, setOpenRandomiser }) => {
  const { studentData, setStudentData, userUid, params, showConfetti, setShowConfetti } = useContext(StudentDataContext)
  const [randomStudent, setRandomStudent] = useState("")
  const { width, height } = useWindowSize()

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
      if (randomStudent && randomStudent.name) {
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

        // Check if the student now has 50 points
        if (randomStudent.points + 1 === 50) {
          setShowConfetti(true)

          // After 5 seconds, hide the confetti
          setTimeout(() => {
            setShowConfetti(false)
          }, 5000)
        }
  
        // Update the points in the users firebase studentData and display in the users class
        if (userUid && params.classroom_id) {
          const classDocumentRef = doc(db, "users", userUid, "classes", params.classroom_id)
      
          await updateDoc(classDocumentRef, {
            studentData: updatedStudentData,
          })
        }
      }

    } catch (error) {
      console.error('Error updating student points:', error)
    }
  }
    
  return (
    <>
      { showConfetti && <Confetti width={width} height={height} gravity={0.05} numberOfPieces={300} className="w-full" /> }
      <Dialog open={openRandomiser} onClose={() => setOpenRandomiser(false)} className="relative z-[50]">
        {/* Backdrop */}
        <div className="fixed inset-0 bg-modalBackdropClr" aria-hidden="true" />

        {/* Full-screen container to center the panel */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="p-5 w-full max-w-[600px] h-full max-h-[400px] rounded-xl bg-blue-100">
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
              <div key={randomStudent?.uuid} className="relative flex flex-col justify-center items-center p-8 shadow-lg rounded-md bg-[#f5f5f5] w-full max-w-[400px] h-[250px]">
                {randomStudent ? (
                  <>
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
                      className="absolute top-1 left-1"
                      style={{
                        objectFit: "cover"
                      }}
                    />
                  </>
                ) : (
                  <p>No student data available</p>
                )}
              </div>
              <button onClick={getRandomStudent} className="pb-8">Choose again</button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  )
}

export default Randomiser
