"use client"

import React, {useContext} from 'react'
import Image from 'next/image'
import StudentDataContext from "@/context/StudentDataContext"
import { doc, updateDoc } from 'firebase/firestore'
import { db } from "../../../utils/firebase"
import { FaAward } from 'react-icons/fa'
import pointsSound from "../../../../public/audio/points.mp3"

const StudentCard = ( {avatars} ) => {
    const { studentData, setStudentData, userUid, params, setShowConfetti } = useContext(StudentDataContext)
   
    const handlePointClick = async (uuid) => {
        try {
          // Find the student with the given UUID
          const studentToUpdate = studentData.find((student) => student.uuid === uuid)
      
          if (!studentToUpdate) {
            console.error('Student not found')
            return
          }
      
          // Increment the points in the studentData state
          const updatedStudentData = studentData.map((student) => {
            if (student.uuid === uuid) {
              return { ...student, points: student.points + 1 }
            }
            return student
          })
  
          const pointsAudio = new Audio(pointsSound)
          pointsAudio.volume = 0.2
          pointsAudio.play() 
      
          // Update the studentData state to reflect the new points in the demoClass
          setStudentData(updatedStudentData)
  
          // Check if the student now has 50 points
          if (studentToUpdate.points + 1 === 50) {
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
        } catch (error) {
          console.error('Error updating student points:', error)
        }
      }
  
      const handleAvatarClick = async (uuid) => {
        try {
          // Find the student with the given UUID
          const studentToUpdate = studentData.find((student) => student.uuid === uuid)
    
          if (!studentToUpdate) {
            console.error('Student not found')
            return
          }
    
          // Get the current avatar index for the student
          const currentAvatarIndex = avatars.findIndex((image) => image.src === studentToUpdate.avatar.src)
    
          // Get the index of the next avatar in the images array
          const nextIndex = (currentAvatarIndex + 1) % avatars.length
    
          // Get the new avatar image from the images array
          const newAvatar = avatars[nextIndex]
    
          // Update the avatar in the demoStudentData state
          const updatedStudentData = studentData.map((student) => {
            if (student.uuid === uuid) {
              return { ...student, avatar: newAvatar }
            }
            return student
          })
    
          // Update the studentData state to reflect the new avatar in the demoClass
          setStudentData(updatedStudentData)
    
          // Update the avatar in the users firebase studentData and display in the users class
          if (userUid && params.classroom_id) {
            const classDocumentRef = doc(db, "users", userUid, "classes", params.classroom_id)
        
            await updateDoc(classDocumentRef, {
              studentData: updatedStudentData,
            })
          }
          
        } catch (error) {
          console.error('Error updating student avatar:', error)
        }
      }

  return (
    <>
        {studentData.map((student) => (
            <div key={student.uuid} className="relative flex flex-col justify-center items-center p-8 shadow-lg rounded-md bg-[#f5f5f5]">
                <p className="font-bold tracking-wide text-center">{student.name}</p>
                <p className="text-center text-primaryTextClr w-[50px] p-2 bg-iconClr rounded-lg mx-auto my-1">{student.points}</p>
                <button onClick={() => handlePointClick(student.uuid)}>
                    <FaAward size={30} className="absolute top-2 right-1 text-iconClr hover:text-yellow-500 hover:scale-110 duration-300 ease-in"/>
                </button>
                <button
                    onClick={() => handleAvatarClick(student.uuid)} 
                    className="absolute top-1 left-1"
                >
                    <Image 
                      src={student.avatar}
                      alt="Student Avatar: Sketched Animal"
                      width={60}
                      height={60}
                      style={{
                          objectFit: "cover"
                      }}
                    />
                </button>
            </div>
        ))}
    </>
  )
}

export default StudentCard